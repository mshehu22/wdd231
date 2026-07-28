// ==========================
// Responsive Navigation
// ==========================

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");

        menuButton.setAttribute("aria-expanded", isOpen);

        menuButton.textContent = isOpen ? "✕" : "☰";

    });

}

// ==========================
// Footer Year
// ==========================

const year = document.querySelector("#year");

if (year) {

    year.textContent = new Date().getFullYear();

}

// ==========================
// Last Modified Date
// ==========================

const lastModified = document.querySelector("#lastModified");

if (lastModified) {

    lastModified.textContent = `Last Modified: ${document.lastModified}`;

}