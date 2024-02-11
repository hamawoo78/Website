
const hands = [
  { name: 'PAPER', imgSrc: 'images/paper.jpg' },
  { name: 'ROCK', imgSrc: 'images/rock.jpg' },
  { name: 'SCISSORS', imgSrc: 'images/scissor.jpg' }
];

let gamePlayed = false;
let userHand;
let resultMessage = "";
let winner = "";

let userWinCount = 0;
let gameCount = 0;

const playAgainDiv = document.getElementById('playAgain');
const playBtn = document.createElement('button');

const userHandBoxDiv = document.querySelector('#userHandBox');
const comHandBoxDiv = document.querySelector('#comHandBox');
const resultBoxDiv = document.querySelector('#resultBox');
const winCountDiv = document.querySelector('#winCount');
const gameCountDiv = document.querySelector('#gameCount');
const btnBasketDiv = document.querySelector('#btn_basket');

const userHandDiv = document.createElement('div');
const comHandDiv = document.createElement('div');
const resultDiv = document.createElement('div');


// below AI help to to create

for (const hand of hands) {
  const btn = document.createElement('button');
  btn.classList.add('button');
  btn.innerHTML = `<img src="${hand.imgSrc}" alt="${hand.name}">`;
  btn.id = hand.name;
  // buttonContainer.appendChild(btn);
  btn_basket.append(btn);
  btn.addEventListener('click', getHand);
}


function getHand(e) {
  userHand = convertHandToNumber(e.currentTarget.id)
  game();
}

function convertHandToNumber(hand) {
  switch (hand) {
    case "ROCK":
      userHand = 0;
      return userHand;

    case "PAPER":
      userHand = -1;
      return userHand;

    case "SCISSORS":
      userHand = 1;
      return userHand;
  }
}


function game() {

  while (!gamePlayed) {
    let random = Math.floor(Math.random() * hands.length);
    let comHand = random - 1;

    let userHandMessage = `You choose ${hands[userHand + 1].name} !`;
    let comHandMessage = `The Computer chooses ${hands[comHand + 1].name} !`;

    let winning_hand = 2;
    if (userHand !== comHand) {
      if (Math.abs(userHand) === Math.abs(comHand)) {
        winning_hand = Math.max(userHand, comHand)
      }
      else {
        winning_hand = Math.min(userHand, comHand)
      }
    }

    if (winning_hand === 2) {
      resultMessage = "It's Tie!";
      document.getElementById("winner").style.backgroundColor = "#FF9472";
    }
    else if (winning_hand === comHand) {
      resultMessage = "You lose";
      document.getElementById("winner").style.backgroundColor = "#13CA91";
    }
    else {
      resultMessage = "You win!";
      document.getElementById("winner").style.backgroundColor = "#E847AE";
      userWinCount++;
    }

    gameCount++;

    btnBasketDiv.style.opacity = '0.5';

    userHandDiv.textContent = userHandMessage;
    comHandDiv.textContent = comHandMessage;
    resultDiv.textContent = resultMessage;

    userHandBoxDiv.append(userHandDiv);
    comHandBoxDiv.append(comHandDiv);
    resultBoxDiv.append(resultDiv);

    winCountDiv.textContent = `You win ${userWinCount} times`;
    gameCountDiv.textContent = `Game Count : ${gameCount} `;

    gamePlayed = true;
    playAgain()
  }
}

function playAgain() {
  playBtn.id = 'playAgainId'
  playBtn.innerText = `Play Again?`;
  playBtn.addEventListener('click', reStartGame);
  playAgainDiv.append(playBtn);
}


function reStartGame() {
  playBtn.remove();
  userHandDiv.remove();
  comHandDiv.remove();
  resultDiv.remove();
  document.getElementById("winner").style.backgroundColor = "#000000";
  btnBasketDiv.style.opacity = '1.0';
  gamePlayed = false;
}