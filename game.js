var dealerSum = 0;
var playerSum = 0;

var dealerAceCount = 0;
var playerAceCount = 0;

var hidden;
var deck;

var canHit = true;

window.onload = function() {
  buildDeck();
  shuffleDeck();
  startGame();
}

function buildDeck() {
  let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  let types = ["C", "D", "H", "S"];
  deck = [];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]);
    }
  }
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

function startGame() {
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);

  while (dealerSum < 17) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./assets/w95/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);
  }

  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./assets/w95/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("player-cards").append(cardImg);
  }
  
  document.getElementById("hit").addEventListener('click', hit);
  document.getElementById("stay").addEventListener('click', stay);
}

// HIT
function hit() {
  if (!canHit) {
    return;
  }
  let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./assets/w95/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("player-cards").append(cardImg);

    if (reduceAce(playerSum, playerAceCount) > 21) {
      canHit = false;
      stay();
    }
}

// STAY
function stay() {
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  playerSum = reduceAce(playerSum, playerAceCount);

  canHit = false;
  document.getElementById("hidden").src = "./assets/w95/" + hidden + ".png";

  let message = "";
  if (playerSum > 21) {
    message = "You Lose!";
  } else if (dealerSum > 21) {
    message = "You Win!";
  } else if (playerSum == dealerSum) {
    message = "It's a Tie!";
  } else if (playerSum > dealerSum) {
    message = "You Win!";
  } else if (playerSum < dealerSum) {
    message = "You Lose!";
  }

  document.getElementById('hit').style.display = "none";
  document.getElementById('stay').style.display = "none";
  document.querySelector('.results-modal').style.display = "block";

  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("player-sum").innerText = playerSum;
  document.querySelector(".dealer-sum").innerText = dealerSum;
  document.querySelector(".player-sum").innerText = playerSum;

  document.getElementById("results").innerText = message;
}

function closeModal() {
  document.querySelector('.results-modal').style.display = "none";
}
function makeChoice() {
  document.querySelector('.choose-cards').style.display = "none";
}

function getValue(card) {
  let data = card.split("-");
  let value = data[0];

  if (isNaN(value)) {
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

// dealing w the ace
function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}
function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 22 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}

// choose your deck
$("input").on("change", function() {
  if($(this).prop("value") === "2") {
    $('#hidden').removeAttr("src", "./assets/w95/BACK_2.png");
    $('#hidden').attr("src", "./assets/w95/BACK_2.png");
  }
  if($(this).prop("value") === "3") {
    $('#hidden').attr("src", "./assets/w95/BACK_3.png");
    $('#hidden').removeAttr("src", "./assets/w95/BACK_2.png");
  }
  if($(this).prop("value") === "4") {
    $('#hidden').removeAttr("src", "./assets/w95/BACK_2.png");
    $('#hidden').attr("src", "./assets/w95/BACK_4.png");
  }
  if($(this).prop("value") === "5") {
    $('#hidden').removeAttr("src", "./assets/w95/BACK_2.png");
    $('#hidden').attr("src", "./assets/w95/BACK_5.png");
  }
  if($(this).prop("value") === "6") {
    $('#hidden').removeAttr("src", "./assets/w95/BACK_2.png");
    $('#hidden').attr("src", "./assets/w95/BACK_6.png");
  }
  if($(this).prop("value") === "7") {
    $('#hidden').removeAttr("src", "./assets/w95/BACK_2.png");
    $('#hidden').attr("src", "./assets/w95/BACK_7.png");
  }
  if($(this).prop("value") === "8") {
    $('#hidden').removeAttr("src", "./assets/w95/BACK_2.png");
    $('#hidden').attr("src", "./assets/w95/BACK_8.png");
  }
  if($(this).prop("value") === "9") {
    $('#hidden').removeAttr("src", "./assets/w95/BACK_2.png");
    $('#hidden').attr("src", "./assets/w95/BACK_9.png");
  }
  if($(this).prop("value") === "10") {
    $('#hidden').removeAttr("src", "./assets/w95/BACK_2.png");
    $('#hidden').attr("src", "./assets/w95/BACK_10.png");
  }
  if($(this).prop("value") === "11") {
    $('#hidden').removeAttr("src", "./assets/w95/BACK_2.png");
    $('#hidden').attr("src", "./assets/w95/BACK_11.png");
  }
  if($(this).prop("value") === "12") {
    $('#hidden').removeAttr("src", "./assets/w95/BACK_2.png");
    $('#hidden').attr("src", "./assets/w95/BACK_12.png");
  }
});
