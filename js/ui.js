export function flipCard(card) {
    card.classList.add('flip');
    card.addEventListener('animationend', () => {
        card.classList.remove('flip');
    }, { once: true });
}