const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
  if (navbar.style.display === "block") {
    navbar.style.display = "none";
  } else {
    navbar.style.display = "block";
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navbar.style.display = "block";
  } else {
    navbar.style.display = "none";
  }
});
