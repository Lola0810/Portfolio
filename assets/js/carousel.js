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

const listenForCardClick = () => {
  const container = document.getElementById("abilities-component");
  container.addEventListener("click", (event) => {
      let target = event.target.closest(".abilitie-item");
      if (!target) return;

      let contentTarget = target.querySelector(".abilitie-content");

      const items = container.querySelectorAll(".abilitie-item");
      const images = container.querySelectorAll(".abilitie-image");
      const content = container.querySelectorAll(".abilitie-content");
      if (!target.classList.contains("selected")) {
          items.forEach(item => {
              item.classList.remove("selected");
              item.classList.remove("hover");
          });

          content.forEach(item => {
              item.classList.remove("active");
          });

          target.classList.add("selected");
          target.classList.add("hover");
          contentTarget.classList.add("active");
          let id = target.dataset.id;

          images.forEach(img => {
              img.classList.remove("active");
              if (img.dataset.id === id) img.classList.add("active");
          });
      }
  });
}

const redirectToProjectWithTag = (tag) => {
  window.location.href = `./views/projects.html?tag=${tag}`;
}

document.addEventListener("DOMContentLoaded", () => {
  startCarousel();
  updateCarousel();
  listenForCardClick();
});