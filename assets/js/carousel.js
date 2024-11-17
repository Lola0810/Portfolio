const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

const items = Array.from(document.querySelectorAll(".carousel-item"));
let currentIndex = 0;

let switchingTimeoutId = undefined;
let isSwitching = false;

const SWITCHING_TIMEOUT = 4e3; // 4 seconds
const CAROUSEL_AUTOMATIC_SLIDE_TIMEOUT = 5e3; // 5 seconds

function startCarousel() {
  setInterval(() => {
    if(isSwitching) {
      return;
    }
    nextSlide();
  }, CAROUSEL_AUTOMATIC_SLIDE_TIMEOUT);
}

function updateCarousel(lock) {
  items.forEach((item, index) => {
    item.classList.toggle("hidden", index !== currentIndex);
  });

  if(lock) {
    isSwitching = true;
    clearTimeout(switchingTimeoutId);
    switchingTimeoutId = setTimeout(() => {
      isSwitching = false
    }, SWITCHING_TIMEOUT);
  }
}

function nextSlide(lockAutomaticSwitch) {
  if(currentIndex>=items.length-1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  updateCarousel(lockAutomaticSwitch);
}
function previousSlide(lockAutomaticSwitch) {
  if(currentIndex <= 0) {
    currentIndex = items.length-1;
  } else {
    currentIndex--;
  }
  updateCarousel(lockAutomaticSwitch);
}

prevBtn.onclick = () => previousSlide(true);
nextBtn.onclick = () => nextSlide(true);
document.addEventListener("DOMContentLoaded", () => {
  startCarousel();
  updateCarousel();
});