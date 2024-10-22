import "./style.css"; /*  for importing style.css */

let automaticSlidShow;

function startSlideShow() {
  automaticSlidShow = setInterval(slideShow, 3000);
}

const carouselPrevBtn = document.querySelector(".carousel__prev-btn");
carouselPrevBtn.addEventListener("click", (e) => {
  clearInterval(automaticSlidShow);
  slideShow(e);
  startSlideShow();
});

const carouselNextBtn = document.querySelector(".carousel__next-btn");
carouselNextBtn.addEventListener("click", (e) => {
  clearInterval(automaticSlidShow);
  slideShow(e);
  startSlideShow();
});

const carouselIndicators = document.querySelectorAll(".carousel__indicator");
carouselIndicators.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    clearInterval(automaticSlidShow);
    slideShow(null, index);
    startSlideShow();
  });
});

function slideShow(e, index) {
  const slides = Array.from(document.querySelectorAll(".carousel__slide"));
  const activeSlide = document.querySelector("[data-active = true]");
  const activeIndex = slides.indexOf(activeSlide);
  const indicators = Array.from(
    document.querySelectorAll(".carousel__indicator")
  );
  let newIndex;
  let offset;
  if (e) {
    const btn = e.target;
    offset = btn.dataset.carouselBtn === "next" ? 1 : -1;
    newIndex = activeIndex + offset;
  } else if (typeof index === "number") {
    newIndex = index;
  } else {
    offset = 1;
    newIndex = activeIndex + offset;
  }

  if (newIndex < 0) newIndex = slides.length - 1;
  if (newIndex >= slides.length) newIndex = 0;

  slides[activeIndex].dataset.active = "false";
  slides[activeIndex].classList.toggle("none");
  slides[newIndex].dataset.active = "true";
  slides[newIndex].classList.toggle("none");

  const oldChildren = indicators[activeIndex].children[0];
  const newChildren = indicators[newIndex].children[0];

  oldChildren.classList.replace("fa-solid", "fa-regular");
  newChildren.classList.replace("fa-regular", "fa-solid");
}

startSlideShow();
