
const products = [
  {name:"ફ્રિજ",emoji:"🧊",price:18000,cost:15000,stock:3,startStock:3},
  {name:"ટીવી",emoji:"📺",price:12000,cost:9500,stock:4,startStock:4},
  {name:"AC",emoji:"❄️",price:25000,cost:21000,stock:2,startStock:2},
  {name:"પંખો",emoji:"🌀",price:1800,cost:1200,stock:8,startStock:8},
  {name:"વોશિંગ મશીન",emoji:"🧺",price:14000,cost:11500,stock:3,startStock:3},
  {name:"સ્પીકર",emoji:"🔊",price:2500,cost:1700,stock:6,startStock:6},
  {name:"મોબાઇલ",emoji:"📱",price:9000,cost:7500,stock:5,startStock:5},
  {name:"મિક્સર",emoji:"🥣",price:2200,cost:1600,stock:7,startStock:7}
];

let currentCustomer = false;

function renderProducts(){
  const area=document.getElementById("products");
  area.innerHTML="";

  products.forEach((p,index)=>{
    const card=document.createElement("div");
    card.className="product";

    card.innerHTML=`
      <div class="emoji">${p.emoji}</div>
      <h3>${p.name}</h3>
      <p>વેચાણ ભાવ: ₹${p.price}</p>
      <p>સ્ટોક: ${p.stock} નંગ</p>
      <button ${p.stock<1?"disabled":""} onclick="sellProduct(${index})">
        ગ્રાહકને વેચો
      </button>
      <button onclick="restock(${index})">સ્ટોક વધારો</button>
    `;

    area.appendChild(card);
  });
}

function nextCustomer(){
  if(currentCustomer){
    say("પહેલાં હાલના ગ્રાહકની ખરીદી પૂરી કરો.");
    return;
  }

  currentCustomer=true;
  customerEnter();

  document.getElementById("customerStatus").textContent="સામાન જોઈ રહ્યા છે";

  setTimeout(()=>{
    say("ગ્રાહક કહે છે: ભાઈ, મને ઘર માટે ઇલેક્ટ્રોનિક સામાન જોઈએ છે.");
    ayanTalk();
  },700);

  setTimeout(()=>{
    baghaHelp();
    say("Bagha કહે છે: આવો સાહેબ, આ અમારી દુકાનનો સરસ સામાન છે.");
  },2200);
}

function sellProduct(index){
  if(!currentCustomer){
    say("પહેલાં નવો ગ્રાહક બોલાવો.");
    return;
  }

  const product=products[index];

  if(product.stock<1){
    say("માફ કરશો, આ સામાન અત્યારે ઉપલબ્ધ નથી.");
    return;
  }

  moveCharacter("bagha",30,205);
  moveCharacter("ayan",35,265);
  document.getElementById("customerStatus").textContent="કાઉન્ટર પર";

  say("ગ્રાહક કહે છે: મને "+product.name+" આપો. તેની કિંમત કેટલી છે?");

  setTimeout(()=>{
    say("આયન કહે છે: "+product.name+" ની કિંમત "+product.price+" રૂપિયા છે.");
  },1400);

  setTimeout(()=>{
    natuWork();
  },2600);

  setTimeout(()=>{
    makeSale(product);
    say("નટુ કાકા કહે છે: બિલ તૈયાર છે. કુલ "+product.price+" રૂપિયા થયા.");
    document.getElementById("customerStatus").textContent="ખરીદી પૂરી";
    renderProducts();
  },3900);

  setTimeout(()=>{
    say("ગ્રાહક કહે છે: આભાર! ફરી આવીશ.");
    customerLeave();
    currentCustomer=false;
  },5600);
}

function restock(index){
  const p=products[index];
  const purchaseCost=p.cost*2;

  if(cash<purchaseCost){
    say("સ્ટોક ખરીદવા માટે પૂરતા પૈસા નથી.");
    return;
  }

  cash-=purchaseCost;
  p.stock+=2;
  lastBill=`સ્ટોક ખરીદી: ${p.name}
2 નંગ ખરીદ્યા
ખર્ચ: ₹${purchaseCost}`;

  updateAccounts();
  renderProducts();
  say("નટુ કાકા કહે છે: બે "+p.name+" નો નવો સ્ટોક આવી ગયો.");
}

function saveGame(){
  try{
    const data={
      cash,totalSales,totalProfit,customersServed,lastBill,
      stocks:products.map(p=>p.stock)
    };
    localStorage.setItem("aaElectronicsGame",JSON.stringify(data));
  }catch(error){
    console.log("ગેમ સેવ થઈ શકી નથી",error);
  }
}

function loadGame(){
  try{
    const raw=localStorage.getItem("aaElectronicsGame");
    if(!raw) return;

    const data=JSON.parse(raw);
    if(typeof data.cash==="number") cash=data.cash;
    if(typeof data.totalSales==="number") totalSales=data.totalSales;
    if(typeof data.totalProfit==="number") totalProfit=data.totalProfit;
    if(typeof data.customersServed==="number") customersServed=data.customersServed;
    if(typeof data.lastBill==="string") lastBill=data.lastBill;

    if(Array.isArray(data.stocks)){
      data.stocks.forEach((stock,index)=>{
        if(products[index] && Number.isInteger(stock) && stock>=0){
          products[index].stock=stock;
        }
      });
    }
  }catch(error){
    console.log("જૂનો સેવ થયેલો ડેટા વાંચી શકાયો નથી",error);
  }
}

loadGame();
renderProducts();
updateAccounts();
say("આપનું AA ELECTRIC & ELECTRONICS માં સ્વાગત છે!");
