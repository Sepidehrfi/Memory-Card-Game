const cardsContainer = document.querySelector(".cards");
const startBtn = document.getElementById("startGame");
const input = document.getElementById("pairCount");

let cards = [];
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let totalPairs = 8;


function createCards() {
  cardsContainer.innerHTML = "";
  matched = 0;
  cardOne = cardTwo = null;
  disableDeck = false;

  const cardValues = Array.from({ length: totalPairs }, (_, i) => i + 1);
  const shuffled = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);

  shuffled.forEach((val) => {
    const card = document.createElement("li");
    card.classList.add("card");

    card.innerHTML = `
      <div class="view front-view">
        <img src="images/que_icon.svg" alt="icon">
      </div>
      <div class="view back-view">
        <img src="images/img-${val}.png" alt="card-img">
      </div>
    `;

    card.addEventListener("click", flipCard);
    cardsContainer.appendChild(card);
  });

  cards = document.querySelectorAll(".card");
}


function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck && clickedCard.classList.contains("card")) {
    clickedCard.classList.add("flip");

    if (!cardOne) {
      return (cardOne = clickedCard);
    }

    cardTwo = clickedCard;
    disableDeck = true;

    const img1 = cardOne.querySelector(".back-view img").src;
    const img2 = cardTwo.querySelector(".back-view img").src;

    matchCards(img1, img2);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched === totalPairs) {
      setTimeout(() => createCards(), 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = null;
    disableDeck = false;
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = null;
      disableDeck = false;
    }, 1200);
  }
}


startBtn.addEventListener("click", () => {
  const val = parseInt(input.value);
  if (val >= 2 && val <= 16) {
    totalPairs = val;
    createCards();
  } else {
    alert("The number must be between 2 and 16.");
  }
});


createCards();
