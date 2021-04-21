//==========================
//selector
const p1ScoreDisplay = document.getElementById("player1score");
const p2ScoreDisplay = document.getElementById("player2score");
const wScoreDisplay = document.querySelector("p span");
const inputScore = document.getElementById("inputScore");
const p1Btn = document.getElementById("player1Btn");
const p2Btn = document.getElementById("player2Btn");
const resetBtn = document.getElementById("resetBtn");

//==================
//Data
let p1Score = 0;
let p2Score = 0;
let gameOver = false;
let min = 1;
let winingScore = 0;

function getRandomInt(min,winingScore){
    min = Math.ceil(min);
    winingScore = Math.floor(winingScore);
    return Math.floor(Math.random() * (winingScore - min) + min);
}

function winner(oldScore,winingScore){
    
    if(oldScore === winingScore){
        if(p1Score===winingScore){
            p1ScoreDisplay.classList.add('winner');
        }else{
            p2ScoreDisplay.classList.add('winner');
        }
        gameOver = true;
        p1Btn.setAttribute('disabled', 'disabled');
        p2Btn.setAttribute('disabled', 'disabled');
    }
}

function reset() {
    p1Score = 0;
    p2Score = 0;
    gameOver = false;
    p1ScoreDisplay.textContent = p1Score;
    p2ScoreDisplay.textContent = p2Score;
    
    p1ScoreDisplay.classList.remove('winner');
    p2ScoreDisplay.classList.remove('winner');
    p1Btn.removeAttribute('disabled');
    p2Btn.removeAttribute('disabled');
}

p1Btn.addEventListener('click', ()=>{
  if(!gameOver){
    //Data change 
    p1Score ++;
    winner(p1Score,winingScore);
    //show changed data
    p1ScoreDisplay.textContent = p1Score;
  }    

})

p2Btn.addEventListener('click', ()=>{
    if(!gameOver){
        //Data change
    p2Score++;
    winner(p2Score,winingScore);
    //show changed data
    p2ScoreDisplay.textContent = p2Score;
    }

})
inputScore.addEventListener('change', ()=>{
    winingScore = Number(inputScore.value);
    winingScore = getRandomInt(min,winingScore);
    wScoreDisplay.textContent = winingScore
    inputScore.value = '';
    reset();
});

resetBtn.addEventListener('click', ()=>{
    reset();
    wScoreDisplay.textContent = 0;
});

