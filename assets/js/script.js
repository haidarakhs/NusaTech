"use strict";
const addEventOnElem = (elements, eventType, callback) => {
  elements.forEach((elem) => elem.addEventListener(eventType, callback));
};

/**
 * Navbar
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = () => {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};
addEventOnElem(navTogglers, "click", toggleNavbar);
const closeNavbar = () => {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};
addEventOnElem(navLinks, "click", closeNavbar);

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const handleScroll = () => {
  const scrollY = window.scrollY;
  header.classList.toggle("active", scrollY > 100);
  backTopBtn.classList.toggle("active", scrollY > 100);
};

window.addEventListener("scroll", debounce(handleScroll, 100));

/**
 * Video Play/Pause 
 */
const playButton = document.querySelector(".play-btn");
const video = document.querySelector("video");

const togglePlayButtonVisibility = () => {
  playButton.classList.toggle("hidden", !video.paused);
};

playButton.addEventListener("click", () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

video.addEventListener("play", togglePlayButtonVisibility);
video.addEventListener("pause", togglePlayButtonVisibility);
video.addEventListener("ended", togglePlayButtonVisibility);

/**
 * Carousel 
 */
const sliderImages = document.querySelectorAll(".slider-img");

sliderImages.forEach((img) => {
  img.addEventListener("click", () => {
    sliderImages.forEach((el) => el.classList.remove("active"));
    img.classList.add("active");
  });
});

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
