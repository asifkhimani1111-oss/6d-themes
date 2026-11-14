
let cash = 50000;
let totalSales = 0;
let totalProfit = 0;
let customersServed = 0;
let lastBill = "હજુ કોઈ બિલ બન્યું નથી.";

function updateAccounts(){
  document.getElementById("cash").textContent = cash;
  document.getElementById("salesCount").textContent = totalSales;
  document.getElementById("profit").textContent = totalProfit;
  document.getElementById("customerCount").textContent = customersServed;

  const totalStock = products.reduce((sum,p)=>sum+p.stock,0);
  document.getElementById("stockCount").textContent = totalStock;
  document.getElementById("bill").textContent = lastBill;
  saveGame();
}

function makeSale(product){
  if(product.stock < 1){
    say("આ સામાનનો સ્ટોક ખતમ થઈ ગયો છે.");
    return;
  }

  product.stock--;
  cash += product.price;
  totalSales++;
  totalProfit += product.price - product.cost;
  customersServed++;

  lastBill =
`AA ELECTRIC & ELECTRONICS
-------------------------
સામાન: ${product.name}
ભાવ: ₹${product.price}
ખરીદી કિંમત: ₹${product.cost}
નફો: ₹${product.price-product.cost}
-------------------------
કુલ બિલ: ₹${product.price}
નટુ કાકા: હિસાબ થઈ ગયો!`;

  updateAccounts();
}

function closeDay(){
  say("નટુ કાકા આજનો હિસાબ કરી રહ્યા છે.");
  moveCharacter("natu",45,265,"working");
  setTimeout(()=>{
    lastBill +=
`\n\nદિવસનો હિસાબ:
કુલ વેચાણ: ${totalSales}
કુલ નફો: ₹${totalProfit}
હાલની રોકડ: ₹${cash}`;
    updateAccounts();
    say("આજનો હિસાબ પૂરો થયો. આવતીકાલે ફરી દુકાન ખોલીશું.");
  },1200);
}

function resetGame(){
  if(!confirm("શું ખરેખર નવી ગેમ શરૂ કરવી છે? જૂનો હિસાબ ભૂંસાઈ જશે.")) return;
  cash=50000;
  totalSales=0;
  totalProfit=0;
  customersServed=0;
  lastBill="હજુ કોઈ બિલ બન્યું નથી.";
  products.forEach(p=>p.stock=p.startStock);
  updateAccounts();
  renderProducts();
  say("નવી ગેમ શરૂ થઈ ગઈ!");
}
