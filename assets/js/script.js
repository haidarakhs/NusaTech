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

/**
 * Animasi
 */
const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains("animate__animated")) {
      requestAnimationFrame(() => {
        entry.target.classList.add("animate__animated", "animate__fadeInDown");
      });
      observer.unobserve(entry.target); 
    }
  });
};

const handleAboutScroll = () => {
  const scrollY = window.scrollY;
  const aboutContent = document.querySelector(".about-content");
  const aboutImage = document.querySelector(".about-image");
  const scrollUpBtn = document.querySelector(".scroll-up-btn");

  if (aboutContent && aboutImage && scrollUpBtn) {
    aboutContent.classList.toggle("show", scrollY > 100);
    aboutImage.classList.toggle("show", scrollY > 100);

   
    scrollUpBtn.style.display = scrollY > 200 ? "block" : "none";
  }
};

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

const createIntersectionObserver = (selector, animationClass) => {
  const observer = new IntersectionObserver((entries, observer) => {
    handleIntersection(entries, observer);
  }, {
    threshold: 0.2,
    once: true,
  });

  document.querySelectorAll(selector).forEach((el) => observer.observe(el));
};

const initScrollAnimations = () => {
  const scrollElements = document.querySelectorAll(".scroll-animate");
  const scrollObserver = new IntersectionObserver((entries, observer) => {
    handleIntersection(entries, observer);
  }, {
    threshold: 0.25,
    once: true,
  });

  scrollElements.forEach((el) => scrollObserver.observe(el));
};

createIntersectionObserver(".animate-on-scroll", "animate__fadeInDown");
initScrollAnimations();

window.addEventListener("scroll", debounce(handleAboutScroll, 50));
