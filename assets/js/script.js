"use strict";

/**
 * Utility Functions
 */
const addEventListeners = (elements, eventType, callback) => {
  elements.forEach((element) => element.addEventListener(eventType, callback));
};

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

/**
 * Navbar Toggle
 */
const toggleNavbarVisibility = (navbar, overlay) => {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

const closeNavbar = (navbar, overlay) => {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

const setupNavbar = () => {
  const navbar = document.querySelector("[data-navbar]");
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const overlay = document.querySelector("[data-overlay]");

  addEventListeners(navTogglers, "click", () => toggleNavbarVisibility(navbar, overlay));
  addEventListeners(navLinks, "click", () => closeNavbar(navbar, overlay));
};

/**
 * Scroll Effects
 */
const handleScroll = () => {
  const header = document.querySelector("[data-header]");
  const backTopBtn = document.querySelector("[data-back-top-btn]");
  const scrollY = window.scrollY;

  header.classList.toggle("active", scrollY > 100);
  backTopBtn.classList.toggle("active", scrollY > 100);
};

const setupScrollEffects = () => {
  window.addEventListener("scroll", debounce(handleScroll, 100));
};

/**
 * Video Play/Pause
 */
const togglePlayButtonVisibility = (playButton, video) => {
  playButton.classList.toggle("hidden", !video.paused);
};

const setupVideoControls = () => {
  const playButton = document.querySelector(".play-btn");
  const video = document.querySelector("video");

  playButton.addEventListener("click", () => video.paused ? video.play() : video.pause());
  video.addEventListener("play", () => togglePlayButtonVisibility(playButton, video));
  video.addEventListener("pause", () => togglePlayButtonVisibility(playButton, video));
  video.addEventListener("ended", () => togglePlayButtonVisibility(playButton, video));
};

/**
 * Carousel
 */
const loadImage = (img) => {
  const imgSrc = img.getAttribute("data-src");
  if (imgSrc) {
    img.src = imgSrc;
    img.removeAttribute("data-src");
  }
};

const setupCarousel = () => {
  const sliderImages = document.querySelectorAll(".slider-img");

  sliderImages.forEach((img) => {
    img.addEventListener("click", () => {
      sliderImages.forEach((el) => el.classList.remove("active"));
      img.classList.add("active");
    });

    if (img.classList.contains("active")) loadImage(img);
  });
};

/**
 * Scroll Animations
 */
const animateOnIntersection = (entry, observer) => {
  if (entry.isIntersecting && !entry.target.classList.contains("animate__animated")) {
    requestAnimationFrame(() => {
      entry.target.classList.add("animate__animated", "animate__fadeInDown");
    });
    observer.unobserve(entry.target);
  }
};

const setupScrollAnimations = () => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => animateOnIntersection(entry, observer));
  }, { threshold: 0.2, once: true });

  document.querySelectorAll(".animate-on-scroll, .scroll-animate")
    .forEach((el) => observer.observe(el));
};

/**
 * Scroll Up Button
 */
const handleScrollUpButton = () => {
  const scrollY = window.scrollY;
  const scrollUpBtn = document.querySelector(".scroll-up-btn");
  
  if (scrollUpBtn) {
    scrollUpBtn.style.display = scrollY > 200 ? "block" : "none";
  }

  const aboutContent = document.querySelector(".about-content");
  const aboutImage = document.querySelector(".about-image");

  if (aboutContent && aboutImage) {
    aboutContent.classList.toggle("show", scrollY > 100);
    aboutImage.classList.toggle("show", scrollY > 100);
  }
};

const setupScrollUpButton = () => {
  window.addEventListener("scroll", debounce(handleScrollUpButton, 50));
};

/**
 * Initialize All Features
 */
const initialize = () => {
  setupNavbar();
  setupScrollEffects();
  setupVideoControls();
  setupCarousel();
  setupScrollAnimations();
  setupScrollUpButton();
};

initialize();
