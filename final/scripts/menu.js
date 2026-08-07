// =======================================
// Masa Delight Abuja
// WDD 231 Final Project
// Author: Magdalene Shehu
// =======================================

// ---------- Footer Year ----------

const year = document.querySelector("#year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// ---------- DOM Elements ----------

const menuContainer = document.querySelector("#menuItems");

const allButton = document.querySelector("#showAll");
const breakfastButton = document.querySelector("#showBreakfast");
const grillsButton = document.querySelector("#showGrills");
const soupsButton = document.querySelector("#showSoups");

const modal = document.querySelector("#menuModal");
const modalContent = document.querySelector("#modalContent");
const closeModal = document.querySelector("#closeModal");

let menuItems = [];


// ---------- Load Menu Data ----------

async function loadMenu() {

    if (!menuContainer) {
        return;
    }

    try {

        const response = await fetch("data/menu.json");

        if (!response.ok) {
            throw new Error("Unable to load menu data.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Menu data must be an array.");
        }

        menuItems = data;

        displayMenu(menuItems);

        setActiveButton(allButton);

    } catch (error) {

        console.error("Menu loading error:", error);

        menuContainer.innerHTML = `
            <p class="error">
                Unable to load the menu at this time.
                Please refresh the page and try again.
            </p>
        `;
    }
}


// ---------- Display Menu ----------

function displayMenu(items) {

    if (!menuContainer) {
        return;
    }

    menuContainer.innerHTML = "";

    if (items.length === 0) {

        menuContainer.innerHTML = `
            <p class="error">
                No meals are available in this category.
            </p>
        `;

        return;
    }

    items.forEach(item => {

        const card = document.createElement("article");

        card.classList.add("card");

        card.innerHTML = `
            <img
                src="${item.image}"
                alt="${item.name}"
                width="400"
                height="300"
                loading="lazy">

            <div class="card-content">

                <h3>${item.name}</h3>

                <p>
                    ${item.description}
                </p>

                <p class="price">
                    ₦${Number(item.price).toLocaleString()}
                </p>

                <p>
                    <strong>Category:</strong>
                    ${item.category}
                </p>

                <button
                    class="details-btn"
                    type="button"
                    aria-label="View details for ${item.name}">
                    View Details
                </button>

            </div>
        `;

        const detailsButton =
            card.querySelector(".details-btn");

        if (detailsButton) {

            detailsButton.addEventListener("click", () => {
                openModal(item);
            });

        }

        menuContainer.appendChild(card);

    });
}


// ---------- Filter Helper ----------

function filterByCategory(category) {

    const filteredMeals = menuItems.filter(item => {

        return item.category &&
            item.category.toLowerCase() === category.toLowerCase();

    });

    displayMenu(filteredMeals);
}


// ---------- All Meals Button ----------

if (allButton) {

    allButton.addEventListener("click", () => {

        displayMenu(menuItems);

        setActiveButton(allButton);

    });

}


// ---------- Breakfast Button ----------

if (breakfastButton) {

    breakfastButton.addEventListener("click", () => {

        filterByCategory("Breakfast");

        setActiveButton(breakfastButton);

    });

}


// ---------- Grills Button ----------

if (grillsButton) {

    grillsButton.addEventListener("click", () => {

        filterByCategory("Grill");

        setActiveButton(grillsButton);

    });

}


// ---------- Soups Button ----------

if (soupsButton) {

    soupsButton.addEventListener("click", () => {

        filterByCategory("Soup");

        setActiveButton(soupsButton);

    });

}


// ---------- Active Filter Button ----------

function setActiveButton(activeButton) {

    const buttons = [
        allButton,
        breakfastButton,
        grillsButton,
        soupsButton
    ];

    buttons.forEach(button => {

        if (button) {

            button.classList.remove("active");

            button.setAttribute(
                "aria-pressed",
                "false"
            );

        }

    });

    if (activeButton) {

        activeButton.classList.add("active");

        activeButton.setAttribute(
            "aria-pressed",
            "true"
        );

    }
}


// ---------- Open Meal Modal ----------

function openModal(item) {

    if (!modal || !modalContent) {
        return;
    }

    modalContent.innerHTML = `
        <img
            src="${item.image}"
            alt="${item.name}"
            width="500"
            height="350"
            loading="lazy">

        <h2>${item.name}</h2>

        <p>
            ${item.description}
        </p>

        <p>
            <strong>Category:</strong>
            ${item.category}
        </p>

        <p class="price">
            ₦${Number(item.price).toLocaleString()}
        </p>

        <p>
            Freshly prepared by Masa Delight Abuja.
        </p>
    `;

    if (typeof modal.showModal === "function") {

        modal.showModal();

    } else {

        modal.setAttribute("open", "");

    }

}


// ---------- Close Modal ----------

function closeMenuModal() {

    if (!modal) {
        return;
    }

    if (typeof modal.close === "function") {

        modal.close();

    } else {

        modal.removeAttribute("open");

    }

}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeMenuModal
    );

}


// ---------- Close Modal by Clicking Outside ----------

if (modal) {

    modal.addEventListener("click", event => {

        const rect =
            modal.getBoundingClientRect();

        const clickedOutside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

        if (clickedOutside) {

            closeMenuModal();

        }

    });

}


// ---------- Close Modal With Escape ----------

if (modal) {

    modal.addEventListener("cancel", event => {

        event.preventDefault();

        closeMenuModal();

    });

}


// ---------- Initialize ----------

loadMenu();