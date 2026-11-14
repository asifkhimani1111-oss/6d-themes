
function moveCharacter(id,left,top,animation="walking"){
  const person=document.getElementById(id);
  if(!person) return;

  person.classList.add(animation);
  person.style.left=left+"%";
  person.style.top=top+"px";

  setTimeout(()=>{
    person.classList.remove("walking","working");
  },1500);
}

function ayanTalk(){
  moveCharacter("ayan",25,265);
  say("નમસ્તે! અમારી દુકાનમાં આપનું સ્વાગત છે. શું બતાવું?");
}

function baghaHelp(){
  moveCharacter("bagha",38,205);
  say("આવો સાહેબ! હું તમને સરસ સામાન બતાવું છું.");
}

function natuWork(){
  moveCharacter("natu",45,265,"working");
  say("આયન ભાઈ, હું બિલ અને હિસાબ તૈયાર કરું છું.");
}

function customerEnter(){
  const customer=document.getElementById("customer");
  customer.classList.remove("hidden");
  customer.style.left="88%";
  customer.style.top="265px";

  setTimeout(()=>{
    customer.classList.add("walking");
    customer.style.left="58%";
  },100);

  setTimeout(()=>{
    customer.classList.remove("walking");
  },1400);
}

function customerLeave(){
  const customer=document.getElementById("customer");
  customer.classList.add("walking");
  customer.style.left="90%";

  setTimeout(()=>{
    customer.classList.add("hidden");
    customer.classList.remove("walking");
  },1400);
}
