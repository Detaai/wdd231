// Animate membership cards on initial page load
window.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.level-card');
  cards.forEach((card, i) => {
    card.classList.add('card-animate');
    card.style.animationDelay = `${i * 0.2 + 0.2}s`;
  });
});
