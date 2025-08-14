const holes = document.querySelectorAll('.hole');
const scoreboard = document.getElementById('scoreboard');
const hitSound = document.getElementById('hit-sound');
const failSound = document.getElementById('fail-sound');

let round = 1;
let correctClicks = 0;
let numbersInHoles = [];

function startRound(){
  correctClicks = 0;
  numbersInHoles = [];

  // Reset holes
  holes.forEach(h => { 
    h.textContent=''; 
    h.dataset.number='0'; 
    h.style.background='#1f2534';
  });

  // Pick 3 random holes to put numbers (hidden)
  let indices = [];
  while(indices.length<3){
    let r = Math.floor(Math.random()*6);
    if(!indices.includes(r)) indices.push(r);
  }

  indices.forEach(i => {
    holes[i].dataset.number = Math.floor(Math.random()*9)+1; // store number hidden
    numbersInHoles.push(i);
  });

  updateScoreboard();
}

function updateScoreboard(){
  scoreboard.textContent=`Round: ${round} | Correct: ${correctClicks}`;
}

function clickHole(e){
  const hole = e.currentTarget;
  const number = hole.dataset.number;
  if(number!=='0'){
    // correct hole
    hitSound.currentTime=0; hitSound.play();
    hole.textContent = number; // reveal number
    hole.style.background='#2a9d2a'; // green
    hole.dataset.number='0'; // mark as clicked
    correctClicks++;
    if(correctClicks===3){
      round++;
      setTimeout(()=>{ startRound(); },500);
    }
  } else {
    // blank hole → fail
    failSound.currentTime=0; failSound.play();
    hole.style.background='#c72c2c'; // red
    setTimeout(()=>{ alert(`Game Over! You reached Round ${round}`); round=1; startRound(); },500);
  }
  updateScoreboard();
}

holes.forEach(h => h.addEventListener('click',clickHole));

startRound();
