document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.querySelector("main");
  
    // Animation pour chaque texte (h1, h2, h3, p, span)
    mainContent.querySelectorAll("h1, h2, h3, p, span").forEach((element) => {
      const words = element.innerText.split(" ");
      element.innerHTML = words
        .map((word) => `<span>${word}</span>`)
        .join(" ");
    });
  
    // Appliquer le délai d'animation pour chaque `span` dans le texte
    const spans = mainContent.querySelectorAll("span");
    spans.forEach((span, index) => {
      span.style.animationDelay = `${index * 0.1}s`;
    });
  
    // Animation pour chaque image
    const images = mainContent.querySelectorAll("img");
    images.forEach((image, index) => {
      image.style.animation = "fade-in 0.8s forwards cubic-bezier(0.11, 0, 0.5, 0)";
      image.style.animationDelay = `${spans.length * 0.1 + index * 0.2}s`; // Délai après les spans
    });
  });