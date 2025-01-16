'use strict';





const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);




const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElem = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElem);

// vidio
const playButton = document.querySelector('.play-btn');
const video = document.querySelector('video');

// untuk klik tombol play
playButton.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playButton.classList.add('hidden'); 
  } else {
    video.pause();
    playButton.classList.remove('hidden'); 
  }
});


video.addEventListener('play', () => {
  playButton.classList.add('hidden');
});


video.addEventListener('pause', () => {
  playButton.classList.remove('hidden');
});

video.addEventListener('ended', () => {
  playButton.classList.remove('hidden');
});

// caousel

jQuery(document).ready(function ($) {
  $(".slider-img").on("click", function () {
    $(".slider-img").removeClass("active");
    $(this).addClass("active");
  });
});

// animasi home 
window.addEventListener("scroll", function () {
  const elements = document.querySelectorAll('.animate-on-scroll');

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('animate__animated');
    } else {
      el.classList.remove('animate__animated');
    }
  });
});

window.addEventListener("scroll", function () {
  const elements = document.querySelectorAll('.animate-on-scroll');

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('animate__animated');
      if (!el.classList.contains('animate__fadeInUp') && !el.classList.contains('animate__fadeInLeft')) {
        el.classList.add('animate__fadeInUp'); 
      }
    } else {
      el.classList.remove('animate__animated');
    }
  });
});

// animasi about
window.addEventListener('scroll', () => {
  const aboutContent = document.querySelector('.about-content');
  const image = document.querySelector('.about-banner .img-holder img');
  
  if (window.scrollY > 100) {
    aboutContent.classList.add('show');
    image.classList.add('show');
  } else {
    aboutContent.classList.remove('show');
    image.classList.remove('show');
  }

  const scrollUpBtn = document.getElementById('scrollUp');
  if (window.scrollY > 200) {
    scrollUpBtn.style.display = 'block';
  } else {
    scrollUpBtn.style.display = 'none';
  }
});



