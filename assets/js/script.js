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
const setupNavbar = () => {
  const navbar = document.querySelector("[data-navbar]");
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const overlay = document.querySelector("[data-overlay]");

  const toggleNavbar = () => {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  const closeNavbar = () => {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
  };

  addEventListeners(navTogglers, "click", toggleNavbar);
  addEventListeners(navLinks, "click", closeNavbar);
};

/**
 * Scroll Effects
 */
const setupScrollEffects = () => {
  const header = document.querySelector("[data-header]");
  const backTopBtn = document.querySelector("[data-back-top-btn]");

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const isScrolled = scrollY > 100;
    header.classList.toggle("active", isScrolled);
    backTopBtn.classList.toggle("active", isScrolled);
  };

  window.addEventListener("scroll", debounce(handleScroll, 100));
};

/**
 * Video Play/Pause
 */
const setupVideoControls = () => {
  const playButton = document.querySelector(".play-btn");
  const video = document.querySelector("video");

  const togglePlayButtonVisibility = () => {
    playButton.classList.toggle("hidden", !video.paused);
  };

  playButton.addEventListener("click", () => (video.paused ? video.play() : video.pause()));
  video.addEventListener("play", togglePlayButtonVisibility);
  video.addEventListener("pause", togglePlayButtonVisibility);
  video.addEventListener("ended", togglePlayButtonVisibility);
};

/**
 * Carousel
 */
const setupCarousel = () => {
  const sliderImages = document.querySelectorAll(".slider-img");

  const loadImage = (img) => {
    const imgSrc = img.getAttribute("data-src");
    if (imgSrc) {
      img.src = imgSrc;
      img.removeAttribute("data-src");
    }
  };

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
const setupScrollAnimations = () => {
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

  const createIntersectionObserver = (selector) => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.2, once: true });
    document.querySelectorAll(selector).forEach((el) => observer.observe(el));
  };

  createIntersectionObserver(".animate-on-scroll");
  createIntersectionObserver(".scroll-animate");
};

/**
 * Scroll Up Button
 */
const setupScrollUpButton = () => {
  const aboutContent = document.querySelector(".about-content");
  const aboutImage = document.querySelector(".about-image");
  const scrollUpBtn = document.querySelector(".scroll-up-btn");

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (aboutContent && aboutImage && scrollUpBtn) {
      aboutContent.classList.toggle("show", scrollY > 100);
      aboutImage.classList.toggle("show", scrollY > 100);
      scrollUpBtn.style.display = scrollY > 200 ? "block" : "none";
    }
  };

  window.addEventListener("scroll", debounce(handleScroll, 50));
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
