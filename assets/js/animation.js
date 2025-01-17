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
  