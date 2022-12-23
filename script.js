// ==================================================
//animated man graphics:
const canvas = document.getElementById('hangman');
const context = canvas.getContext("2d");

clearCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)
}

Draw = (part) => {
  switch (part) {
    case 'gallows':
      context.strokeStyle = '#008793';
      context.lineWidth = 10;
      context.beginPath();
      context.moveTo(175, 225);
      context.lineTo(5, 225);
      context.moveTo(40, 225);
      context.lineTo(25, 5);
      context.lineTo(100, 5);
      context.lineTo(100, 25);
      context.stroke();
      break;

    case 'head':
      context.lineWidth = 5;
      context.beginPath();
      context.arc(100, 50, 25, 0, Math.PI * 2, true);
      context.closePath();
      context.stroke();
      break;

    case 'body':
      context.beginPath();
      context.moveTo(100, 75);
      context.lineTo(100, 140);
      context.stroke();
      break;

    case 'rightHarm':
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(60, 100);
      context.stroke();
      break;

    case 'leftHarm':
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(140, 100);
      context.stroke();
      break;

    case 'rightLeg':
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(80, 190);
      context.stroke();
      break;

    case 'rightFoot':
      context.beginPath();
      context.moveTo(82, 190);
      context.lineTo(70, 185);
      context.stroke();
      break;

    case 'leftLeg':
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(125, 190);
      context.stroke();
      break;

    case 'leftFoot':
      context.beginPath();
      context.moveTo(122, 190);
      context.lineTo(135, 185);
      context.stroke();
      break;
  }
}

//hangman body parts list:
const drawsteps = [
  'rightFoot',
  'leftFoot',
  'leftLeg',
  'rightLeg',
  'leftHarm',
  'rightHarm',
  'body',
  'head',
  'gallows',
]
var step = 0;

//function that shows the animated man's body parts on each user mistake:
animate_man = function(lives) {
  var drawMe = lives;
  Draw(drawsteps[drawMe]);
}

// ====================================================================================================

//the game function:

play = function() {
  let win=false;
  let lose=false;
  let  wrong_chooces = []; 
  let underScore = [];
  let lives = 9; 
  const words_list = ['netanya', 'ashdod', 'raanana', 'eilat','haifa','jerusalem','hadera']; 
  
//chooses a random word from the list:
  let randNum = Math.floor(Math.random() * words_list.length); 
  let choosenWord = words_list[randNum]; 
  
//Dom manipulations:
  let docUnderScore = document.getElementsByClassName('underscore');//משתנה אשר מתייחס לשורה של הקווים התחתונים בתצוגה.
  let docWrongGuess = document.getElementsByClassName('wrongGuess');//משתנה אשר מתייחס לריבוע של הבחירות השגויות בתצוגה.

// //testing:
//   console.log(choosenWord)

//add underscore in the array:
  let generateUnderscore = () => {  
    for (let i = 0; i < choosenWord.length; i++) {
      underScore.push('_'); 
    }
    return underScore;
  }

document.addEventListener('keypress', (event) => { //uses the keybored keys as a input from the player
    timeSecond = 30;
    if (lives>= 1){ //if the player didnt lose yet
      let keyword = String.fromCharCode(event.keyCode);
      for (let i in choosenWord) {
        if (choosenWord[i] == keyword.toLowerCase()) {
          underScore[i] = keyword.toLowerCase();
          docUnderScore[0].innerHTML = underScore.join(' ');
          if (underScore.join('') == choosenWord) { //if the inputs from the users is equal to the word, so the player won.
            docUnderScore[0].innerHTML = "You win!";
            lives=0;
            win=true;
            let element=document.getElementById("reset");
            element.style.display= 'flex';  
          }
        }
      }

if (choosenWord.indexOf(keyword.toLowerCase()) <= -1 &&  wrong_chooces.indexOf(keyword.toLowerCase())<=-1 && lives >=1){
  lives -= 1;
  //add to wrong words array:
  wrong_chooces.push(keyword.toLowerCase());
  console.log( wrong_chooces);
  animate_man(lives);
  docWrongGuess[0].innerHTML =  wrong_chooces;
  if (lives < 1 ) {
    docUnderScore[0].innerHTML = "You Lost!";
    lose=true;
    wrong_chooces=[]
    docWrongGuess[0].innerHTML =  wrong_chooces;
    let element=document.getElementById("reset");
    element.style.display= 'flex';  
  }
}
  }
})

// shows the underscores in the html:
docUnderScore[0].innerHTML = generateUnderscore().join(' '); 

//=========================================================================================================
  
//timer:
const timer = document.querySelector("p"); //p represent the numbers of the timer in the html
let timeSecond=30;
displayTime(timeSecond);

const countDown = setInterval(() => {
  timeSecond--;
  displayTime(timeSecond);
  if (timeSecond <= 0) { 
    if (win!=true){docUnderScore[0].innerHTML = "You Lost!";} //if the time is over and the player didnt win yet
    endCount();
    lives = 0 ;
    let element=document.getElementById("reset");
     wrong_chooces=[];
    docWrongGuess[0].innerHTML =  wrong_chooces;
    element.style.display= 'flex';

    clearInterval(countDown);
  }
  if (win==true){
    endCount();
    timer.innerHTML = "Nice Job!";}
  if (lose==true){
    endCount();
    timer.innerHTML = "Try Again!";}
}, 1000);

function displayTime(second) { //shows the timer in this form - "00:00"
  const min = Math.floor(second / 60); 
  const sec = Math.floor(second % 60);
  timer.innerHTML = `
  ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
  `;
}

function endCount() {
  timeSecond=0;}
}

play();

//==============================================================================================
//reset button function:

document.getElementById('reset').onclick = function() {
  clearCanvas();
  underScore = [];
  wrong_chooces = [];
  lives=9;
  let element=document.getElementById("reset");
  element.style.display= 'none';  
  play();
} 

