// chamber/scripts/nav.js
// Handles hamburger menu and active nav highlighting for all pages

document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      nav.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
    hamburger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        nav.classList.toggle('open');
        hamburger.classList.toggle('open');
      }
    });
  }
  // Close nav on link click (mobile)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
});
