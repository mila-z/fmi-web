document.addEventListener("DOMContentLoaded", () => {
  // Плавен скрол
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Скриване на кодови блокове
  document.querySelectorAll(".code-block").forEach((block) => {
    const btn = block.querySelector(".code-toggle");
    const pre = block.querySelector("pre");
    if (!btn || !pre) return;

    btn.addEventListener("click", () => {
      const collapsed = pre.classList.toggle("collapsed");
      btn.textContent = collapsed ? "Покажи кода" : "Скрий кода";
    });
  });
});

