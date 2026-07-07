// navigation.js

const menuButton = document.querySelector("#menu");
const navList = document.querySelector("nav ul");

menuButton.addEventListener("click", () => {
    navList.classList.toggle("open");

    if (menuButton.textContent === "☰") {
        menuButton.textContent = "✕";
    } else {
        menuButton.textContent = "☰";
    }
});