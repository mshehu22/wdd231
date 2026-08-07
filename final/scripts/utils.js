// =======================================
// Masa Delight Abuja
// WDD 231 Final Project
// utils.js
// Author: Magdalene Shehu
// =======================================


// -------------------------------
// Footer Year
// -------------------------------

export function displayYear() {

    const year = document.querySelector("#year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

}


// -------------------------------
// Mobile Navigation
// -------------------------------

export function setupNavigation() {

    const menuButton = document.querySelector("#menuButton");
    const navigation = document.querySelector("#navigation");

    if (!menuButton || !navigation) return;

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("open");

        menuButton.textContent =
            navigation.classList.contains("open")
                ? "✖"
                : "☰";

    });

}


// -------------------------------
// Currency Formatter
// -------------------------------

export function formatPrice(price) {

    return `₦${price.toLocaleString()}`;

}


// -------------------------------
// Save to Local Storage
// -------------------------------

export function saveToStorage(key, value) {

    localStorage.setItem(key, JSON.stringify(value));

}


// -------------------------------
// Read from Local Storage
// -------------------------------

export function getFromStorage(key) {

    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : null;

}