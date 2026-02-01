import { flipCard } from "./ui.js";

// Faces array
const faces = [
    "images/fire.png", "images/fire.png",
    "images/island.png", "images/island.png",
    "images/jersey.png", "images/jersey.png",
    "images/king.png", "images/king.png",
    "images/pirate.png", "images/pirate.png",
    "images/teddy.png", "images/teddy.png",
    "images/tongue.png", "images/tongue.png",
    "images/worker.png", "images/worker.png",
];

// Game state
let cards;
let firstCard;
let secondCard;
let lockBoard;
let attempts;
let matches;

export function startGame() {
    cards = shuffleDeck(); 
    resetBoardState();
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    attempts = 0;
    matches = 0;
}

function shuffleDeck() {
    const copyFaces = [...faces]; // Copy by data
    const cards = document.querySelectorAll(".card"); // Select all cards
    for (let i = 0; i < cards.length; i++) {
        let rand = Math.floor(Math.random() * copyFaces.length); // Get random face
        cards[i].dataset.face = copyFaces[rand]; // Add data-face
        copyFaces.splice(rand, 1); // Remove used face
    }
    console.log(cards);
    return cards;
}

function resetBoardState() {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.src = "images/back.png"; // Face down
        card.dataset.flipped = "false"; // Logical state
    });
}

export function onCardClick(e) {
    const card = e.currentTarget;
    if (lockBoard || card.dataset.flipped === "true" || card === firstCard) return;

    card.src = card.dataset.face; // Show face
    flipCard(card); // Animate flip

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        lockBoard = true;

        // Check match
        if (firstCard.dataset.face === secondCard.dataset.face) {
            matches += 1;
            firstCard.dataset.flipped = "true";
            secondCard.dataset.flipped = "true";
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        } else {
            setTimeout(() => {
                firstCard.src = "images/back.png";
                secondCard.src = "images/back.png";
                firstCard = null;
                secondCard = null;
                lockBoard = false;
            }, 1000);
        }
        attempts++;
    }

    if (matches === 8) {
        setTimeout(() => {
            alert(`🎉 You matched all cards in ${attempts} attempts`);
            document.querySelector(".overlay").classList.remove("hidden");
        }, 500);
    }
}