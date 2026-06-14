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

const quizCards = Array.from(document.querySelectorAll(".quiz-card[data-answer]"));

quizCards.forEach((card) => {
  const answer = card.dataset.answer;
  const buttons = Array.from(card.querySelectorAll("[data-choice]"));
  const feedback = card.querySelector(".feedback");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const isCorrect = button.dataset.choice === answer;

      buttons.forEach((choiceButton) => {
        choiceButton.classList.remove("is-selected", "is-correct", "is-wrong");
      });

      button.classList.add("is-selected", isCorrect ? "is-correct" : "is-wrong");

      if (feedback) {
        feedback.textContent = isCorrect ? "答對了！" : "再想想，這題可以回到相關章節找線索。";
        feedback.classList.toggle("is-correct", isCorrect);
        feedback.classList.toggle("is-wrong", !isCorrect);
      }
    });
  });
});

const revealButtons = Array.from(document.querySelectorAll(".reveal-answer"));

revealButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".fill-card");
    const answer = card ? card.querySelector(".answer") : null;

    if (!answer) {
      return;
    }

    const willShow = answer.hasAttribute("hidden");
    answer.toggleAttribute("hidden", !willShow);
    button.textContent = willShow ? "隱藏答案" : "顯示答案";
  });
});

const gameCards = Array.from(document.querySelectorAll('.game-card[data-game="category"]'));

gameCards.forEach((card) => {
  const checkButton = card.querySelector(".check-game");
  const selects = Array.from(card.querySelectorAll("select[data-answer]"));
  const feedback = card.querySelector(".game-feedback");

  selects.forEach((select) => {
    select.addEventListener("change", () => {
      if (feedback) {
        feedback.textContent = "";
        feedback.classList.remove("is-correct", "is-wrong");
      }
    });
  });

  if (!checkButton || !feedback) {
    return;
  }

  checkButton.addEventListener("click", () => {
    const answeredCount = selects.filter((select) => select.value).length;
    const correctCount = selects.filter((select) => select.value === select.dataset.answer).length;
    const isComplete = answeredCount === selects.length;
    const isCorrect = correctCount === selects.length;

    feedback.classList.toggle("is-correct", isCorrect);
    feedback.classList.toggle("is-wrong", !isCorrect);

    if (!isComplete) {
      feedback.textContent = "還有題目沒有分類。";
      return;
    }

    feedback.textContent = isCorrect
      ? "分類成功，三個觀察項目都放對了。"
      : `目前答對 ${correctCount} 題，請再調整分類。`;
  });
});
