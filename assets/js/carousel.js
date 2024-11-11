document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;
  let autoScrollInterval;

  function updateCarousel() {
    items.forEach((item, index) => {
      item.classList.toggle('hidden', index !== currentIndex);
    });
  }

  // Fonction pour démarrer le défilement automatique
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
      updateCarousel();
    }, 5000); // 5 secondes
  }

  // Fonction pour arrêter le défilement automatique
  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  // Initialise le carrousel
  updateCarousel();
  startAutoScroll();

  // Gestion du clic pour le bouton précédent
  document.querySelector('.prev-btn').addEventListener('click', () => {
    stopAutoScroll(); // Arrête le défilement auto
    currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
    updateCarousel();
    setTimeout(startAutoScroll, 8000); // Reprend après 8 secondes
  });

  // Gestion du clic pour le bouton suivant
  document.querySelector('.next-btn').addEventListener('click', () => {
    stopAutoScroll(); // Arrête le défilement auto
    currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
    setTimeout(startAutoScroll, 8000); // Reprend après 8 secondes
  });
});