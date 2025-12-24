document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".sidebar-nav a");
  const sections = document.querySelectorAll("main section");
  const referenceLinks = document.querySelectorAll('a[href^="#src"]');

  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const id = link.getAttribute("href");
      document.querySelector(id)?.scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  // Scroll spy
  function onScroll() {
    let currentSection = null;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom > 120) {
        currentSection = section.id;
      }
    });

    if (currentSection) {
      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${currentSection}`
        );
      });
    }
  }

  window.addEventListener("scroll", onScroll);
  onScroll(); // initial highlight

  //highlight sources
  referenceLinks.forEach(link => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);

      if (!targetEl) return;

      // махаме стар highlight
      document
        .querySelectorAll(".reference-highlight")
        .forEach(el => el.classList.remove("reference-highlight"));

      // добавяме нов highlight
      targetEl.classList.add("reference-highlight");

      // махаме highlight след 2.5 секунди (по желание)
      setTimeout(() => {
        targetEl.classList.remove("reference-highlight");
      }, 2500);
    });
  });
});

