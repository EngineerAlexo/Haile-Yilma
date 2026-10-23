// Shared interactions. Every page still has its own body and section classes.
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll(".theme-toggle").forEach(button => {
    button.addEventListener("click", () => {
      document.body.classList.toggle("soft-dark");
      const enabled = document.body.classList.contains("soft-dark");
      button.setAttribute("aria-pressed", String(enabled));
      button.textContent = enabled ? "☾" : "☼";
    });
  });

  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".projects-page-grid .project-card");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      const categories = (card.dataset.category || "").split(" ");
      card.hidden = filter !== "all" && !categories.includes(filter);
    });
  }));
});