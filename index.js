const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", () => {
    overlay.classList.add("hidden");
    document.getElementById("instructions").textContent = "Play again"
    startGame();
});


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

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;
let matches = 0;

function startGame() {
    cards = shuffleDeck();
    attempts = 0;
    matches = 0;
    cards.forEach((card) => {
        card.addEventListener("click", handleClick)
        card.dataset.flipped = "false";
    }
);}

function shuffleDeck() {
    const original = [...faces]; // Copy by data
    const cardElements = document.querySelectorAll(".card"); // Select all element nodes(.card) 
    while (original.length > 0) {
        let rand = Math.floor(Math.random() * original.length);
        cardElements[16 - original.length].src = "images/back.png"; // Reset element nodes (Back showing)
        cardElements[16 - original.length].dataset.face = original[rand]; // Add data-set to each element node
        original.splice(rand, 1); // Delete from original deck
    }
    console.log(cardElements);
    return cardElements;
};

async function handleClick(e) {
    const card = e.currentTarget;
    if (lockBoard || card.dataset.flipped === "true" || card === firstCard) return;

    card.src = card.dataset.face;
    await flipCard(card);
    attempts += 0.5;

        if (!firstCard) {
            firstCard = card;
        } 
        else {
            secondCard = card;
            lockBoard = true;

            // Check match
            if (firstCard.dataset.face === secondCard.dataset.face) {
                // Match
                matches += 1;
                firstCard.dataset.flipped = "true";
                secondCard.dataset.flipped = "true";
                firstCard = null;
                secondCard = null;
                lockBoard = false;
            } else {
                // Not match
                setTimeout(() => {
                    firstCard.src = "images/back.png";
                    secondCard.src = "images/back.png";
                    firstCard = null;
                    secondCard = null;
                    lockBoard = false;
                }, 1000);
            }
    }
    if(matches === 8) {
        setTimeout(() => {
            alert(`🎉 You matched all cards in ${attempts} attempts`);
            overlay.classList.remove ("hidden");
        }, 500); 
    };
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function waitForAnimation(element, animationName) {
    return new Promise(resolve => {
        element.addEventListener("animationend", (e) => {
            if (e.animationName === animationName) resolve();
        }, { once: true });
    });
}

async function flipCard(card) {
    card.classList.add('flip');
    await waitForAnimation(card, 'flipCard'); 
    card.classList.remove('flip');
}





