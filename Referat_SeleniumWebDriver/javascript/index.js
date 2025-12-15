document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".sidebar-nav a");
  const sections = document.querySelectorAll("main section");

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
});

