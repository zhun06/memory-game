import { startGame, onCardClick} from "./game.js";

const overlay = document.querySelector(".overlay");
const overlayText = document.getElementById("overlayText");
const cards = document.querySelectorAll(".card");

overlay.addEventListener("click", () => { // click overlay to start game
    overlay.classList.add("hidden");
    overlayText.textContent = "Play again"; 
    startGame();
});

cards.forEach(card => card.addEventListener("click", onCardClick)); // add listener to each card