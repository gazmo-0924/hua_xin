const submenuItems = Array.from(document.querySelectorAll(".has-submenu"));

submenuItems.forEach((item) => {
  const button = item.querySelector(".submenu-toggle");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

const slides = Array.from(document.querySelectorAll(".slide"));
const dots = Array.from(document.querySelectorAll(".dot"));
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let currentIndex = 0;
let timerId;

function showSlide(index) {
  if (!slides.length) {
    return;
  }

  currentIndex = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === currentIndex);
  });
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === currentIndex);
  });
}

function restartTimer() {
  if (!slides.length) {
    return;
  }

  clearInterval(timerId);
  timerId = setInterval(() => showSlide(currentIndex + 1), 4000);
}

if (prevButton && nextButton && dots.length) {
  prevButton.addEventListener("click", () => {
    showSlide(currentIndex - 1);
    restartTimer();
  });

  nextButton.addEventListener("click", () => {
    showSlide(currentIndex + 1);
    restartTimer();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      restartTimer();
    });
  });

  restartTimer();
}
