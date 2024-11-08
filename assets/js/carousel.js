document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;

  function updateCarousel() {
    items.forEach((item, index) => {
      item.classList.toggle('hidden', index !== currentIndex);
    });
  }

  updateCarousel();

  document.querySelector('.prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
    updateCarousel();
  });

  document.querySelector('.next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  });
});