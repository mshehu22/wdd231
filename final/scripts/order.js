// ======================================
// Masa Delight Abuja
// WDD 231 Final Project
// order.js
// Author: Magdalene Shehu
// ======================================

import {
    displayYear,
    setupNavigation,
    saveToStorage,
    getFromStorage
} from "./utils.js";

displayYear();
setupNavigation();

const delivery = document.querySelector("#delivery");
const meal = document.querySelector("#meal");
const quantity = document.querySelector("#quantity");

// ------------------------------
// Restore Previous Selection
// ------------------------------

const savedDelivery = getFromStorage("deliveryOption");

if (savedDelivery) {
    delivery.value = savedDelivery;
}

// ------------------------------
// Save Delivery Option
// ------------------------------

delivery.addEventListener("change", () => {

    saveToStorage(
        "deliveryOption",
        delivery.value
    );

});

// ------------------------------
// Save Meal Selection
// ------------------------------

meal.addEventListener("change", () => {

    saveToStorage(
        "lastMeal",
        meal.value
    );

});

// ------------------------------
// Save Quantity
// ------------------------------

quantity.addEventListener("change", () => {

    saveToStorage(
        "lastQuantity",
        quantity.value
    );

});

// ------------------------------
// Restore Quantity
// ------------------------------

const previousQuantity = getFromStorage("lastQuantity");

if (previousQuantity) {

    quantity.value = previousQuantity;

}

// ------------------------------
// Restore Meal
// ------------------------------

const previousMeal = getFromStorage("lastMeal");

if (previousMeal) {

    meal.value = previousMeal;

}