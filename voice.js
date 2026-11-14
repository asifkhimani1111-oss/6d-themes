
let lastSpoken = "આપનું સ્વાગત છે!";

function say(message){
  lastSpoken = message;
  const box = document.getElementById("message");
  if(box) box.textContent = message;

  if(!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(message);
  speech.lang = "gu-IN";
  speech.rate = 0.9;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}

function speakLast(){
  say(lastSpoken);
}
