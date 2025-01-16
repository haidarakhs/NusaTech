"use strict";

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * Navbar toggle functionality.
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

addEventOnElem(navLinks, "click", closeNavbar);

/**
 * Header and back-to-top button visibility on scroll.
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const handleScroll = () => {
  const scrollY = window.scrollY;
  header.classList.toggle("active", scrollY > 100);
  backTopBtn.classList.toggle("active", scrollY > 100);
};

window.addEventListener("scroll", debounce(handleScroll, 100));

/**
 * Video play/pause functionality.
 */
const playButton = document.querySelector(".play-btn");
const video = document.querySelector("video");

playButton.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playButton.classList.add("hidden");
  } else {
    video.pause();
    playButton.classList.remove("hidden");
  }
});

video.addEventListener("play", () => playButton.classList.add("hidden"));
video.addEventListener("pause", () => playButton.classList.remove("hidden"));
video.addEventListener("ended", () => playButton.classList.remove("hidden"));

/**
 * Carousel functionality using jQuery.
 */
jQuery(document).ready(function ($) {
  $(".slider-img").on("click", function () {
    $(".slider-img").removeClass("active");
    $(this).addClass("active");
  });
});

/**
 * Animate elements on scroll using IntersectionObserver.
 */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate__animated", "animate__fadeInUp");
      } else {
        entry.target.classList.remove("animate__animated", "animate__fadeInUp");
      }
    });
  },
  { threshold: 0.1 } 
);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});


const aboutContent = document.querySelector(".about-content");
const aboutImage = document.querySelector(".about-banner .img-holder img");
const scrollUpBtn = document.getElementById("scrollUp");

const handleAboutScroll = () => {
  const scrollY = window.scrollY;

  aboutContent.classList.toggle("show", scrollY > 100);
  aboutImage.classList.toggle("show", scrollY > 100);
  scrollUpBtn.style.display = scrollY > 200 ? "block" : "none";
};

window.addEventListener("scroll", debounce(handleAboutScroll, 100));


function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
