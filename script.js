const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navbar.classList.toggle("active");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navbar.style.display = "block";
  } else {
    navbar.style.display = "none";
  }
});
