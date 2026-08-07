// ======================================
// Masa Delight Abuja
// WDD 231 Final Project
// main.js
// Author: Magdalene Shehu
// ======================================

import {
    displayYear,
    setupNavigation,
    formatPrice
} from "./utils.js";

displayYear();
setupNavigation();

const featuredContainer = document.querySelector("#featuredItems");
const visitMessage = document.querySelector("#visitMessage");

// ----------------------------
// Local Storage
// ----------------------------

const lastVisit = localStorage.getItem("lastVisit");

if (visitMessage) {
    if (!lastVisit) {
        visitMessage.textContent =
            "Welcome! We hope you enjoy our delicious masa.";
    } else {
        const previousVisit = new Date(lastVisit);

        visitMessage.textContent =
            `Welcome back! Your last visit was ${previousVisit.toLocaleDateString()}.`;
    }

    localStorage.setItem("lastVisit", new Date().toISOString());
}

// ----------------------------
// Fetch Featured Meals
// ----------------------------

async function loadFeaturedMeals() {
    try {
        const response = await fetch("data/menu.json");

        if (!response.ok) {
            throw new Error("Unable to load menu data.");
        }

        const meals = await response.json();

        displayFeatured(meals.slice(0, 6));
    } catch (error) {
        console.error("Error loading featured meals:", error);

        if (featuredContainer) {
            featuredContainer.innerHTML = `
                <p>
                    Sorry, the featured menu could not be loaded.
                    Please try again later.
                </p>
            `;
        }
    }
}

// ----------------------------
// Display Featured Meals
// ----------------------------

function displayFeatured(meals) {
    if (!featuredContainer) {
        return;
    }

    featuredContainer.innerHTML = "";

    meals.forEach((meal) => {
        const card = document.createElement("article");

        card.classList.add("card");

        card.innerHTML = `
            <img
                src="${meal.image}"
                alt="${meal.name}"
                width="400"
                height="300"
                loading="lazy">

            <div class="card-content">

                <h3>${meal.name}</h3>

                <p>${meal.description}</p>

                <p class="price">
                    ${formatPrice(meal.price)}
                </p>

                <p>
                    <strong>Category:</strong>
                    ${meal.category}
                </p>

                <a href="menu.html" class="button">
                    View Menu
                </a>

            </div>
        `;

        featuredContainer.appendChild(card);
    });
}

// ----------------------------
// Start Application
// ----------------------------

loadFeaturedMeals();