const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const startChallengeButton = document.getElementById("startChallenge");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const howTo = document.getElementById("howTo");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;
const items = [
    {name: "rabbit", image: "./images/rabbit.png"},
    {name: "pelican", image: "./images/pelican.png"},
    {name: "duck", image: "./images/duck.png"},
    {name: "dog", image: "./images/dog.png"},
    {name: "sheep", image: "./images/sheep.png"},
    {name: "light-brownHorse", image: "./images/light-brownHorse.png"},
    {name: "brownHorse", image: "./images/brownHorse.png"},
    {name: "hen", image: "./images/hen.png"},
    {name: "whiteRabbit", image: "./images/whiteRabbit.png"},
    {name: "ibex", image: "./images/ibex.png"},
    {name: "cow", image: "./images/cow.png"},
    {name: "redBird", image: "./images/redBird.png"},
];
let seconds = 0;
let minutes = 0;
let movesCount = 0;
let winCount = 0;
const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};
const countDown = () => {
  minutes = 0;
  seconds -= 1;
  if(seconds == 0) {
    result.innerHTML = `<h2>GAME OVER</h2>
            <h4>Moves: ${movesCount}</h4>
            <q>Restart in 5 seconds</q>`;
            controls.classList.remove("hide");
            stopButton.classList.add("hide");
            startButton.classList.add("hide");
            startChallengeButton.classList.add("hide");
            howTo.classList.add("hide");
            setTimeout(reloadGame, 5000);
            clearInterval(interval);
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};
const reloadGame = () => {
  document.location.reload(true);
}
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};
const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1;
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>Great Job!</h2>
            <h4>Moves: ${movesCount}</h4>
            <q>Restart in 5 seconds</q>`;
            controls.classList.remove("hide");
            stopButton.classList.add("hide");
            startButton.classList.add("hide");
            startChallengeButton.classList.add("hide");
            howTo.classList.add("hide");
            setTimeout(reloadGame, 5000);
            clearInterval(interval);
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};
startButton.addEventListener("click", () => { 
  movesCount = 0;
  seconds = 0; 
  minutes = 0;  
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  interval = setInterval(timeGenerator, 1000);
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});
startChallengeButton.addEventListener("click", () => {
  movesCount = 0;
  minutes = 1;
  seconds = 60;
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  interval = setInterval(countDown, 1000);
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
})
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};