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

// ---------- Navigation ----------

const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("open");

        const expanded = navigation.classList.contains("open");

        menuButton.setAttribute("aria-expanded", expanded);

        menuButton.textContent = expanded ? "✖" : "☰";

    });
}

// ---------- DOM Elements ----------

const menuContainer = document.querySelector("#menuContainer");
const categorySelect = document.querySelector("#category");

const dialog = document.querySelector("#menuDialog");
const dialogContent = document.querySelector("#dialogContent");
const closeDialog = document.querySelector("#closeDialog");

let menuItems = [];

// ---------- Fetch Menu Data ----------

async function getMenu() {

    try {

        const response = await fetch("data/menu.json");

        if (!response.ok) {
            throw new Error("Unable to fetch menu data.");
        }

        menuItems = await response.json();

        displayMenu(menuItems);

        restoreFilter();

    }

    catch (error) {

        console.error(error);

        if (menuContainer) {

            menuContainer.innerHTML = `

                <p class="error">

                    Unable to load menu items.

                    Please refresh the page.

                </p>

            `;

        }

    }

}

// ---------- Display Menu ----------

function displayMenu(items) {

    if (!menuContainer) return;

    menuContainer.innerHTML = "";

    items.forEach(item => {

        const card = document.createElement("article");

        card.classList.add("card");

        card.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
                loading="lazy">

            <div class="card-content">

                <h3>${item.name}</h3>

                <p>${item.description}</p>

                <p class="price">

                    ₦${item.price.toLocaleString()}

                </p>

                <p>

                    <strong>Category:</strong>

                    ${item.category}

                </p>

                <button
                    class="details-btn"
                    type="button">

                    View Details

                </button>

            </div>

        `;

        const button = card.querySelector(".details-btn");

        button.addEventListener("click", () => {

            openDialog(item);

        });

        menuContainer.appendChild(card);

    });

}

// ---------- Filter Menu ----------

if (categorySelect) {

    categorySelect.addEventListener("change", () => {

        const category = categorySelect.value;

        localStorage.setItem("selectedCategory", category);

        if (category === "all") {

            displayMenu(menuItems);

            return;

        }

        const filtered = menuItems.filter(item => item.category === category);

        displayMenu(filtered);

    });

}

// ---------- Restore Previous Filter ----------

function restoreFilter() {

    if (!categorySelect) return;

    const savedCategory = localStorage.getItem("selectedCategory");

    if (!savedCategory) return;

    categorySelect.value = savedCategory;

    if (savedCategory === "all") {

        displayMenu(menuItems);

        return;

    }

    const filtered = menuItems.filter(item => item.category === savedCategory);

    displayMenu(filtered);

}

// ---------- Modal Dialog ----------

function openDialog(item) {

    if (!dialog || !dialogContent) return;

    dialogContent.innerHTML = `

        <h2>${item.name}</h2>

        <img
            src="${item.image}"
            alt="${item.name}"
            loading="lazy">

        <p>

            ${item.description}

        </p>

        <p>

            <strong>Category:</strong>

            ${item.category}

        </p>

        <p class="price">

            ₦${item.price.toLocaleString()}

        </p>

    `;

    dialog.showModal();

    if (closeDialog) {
        closeDialog.focus();
    }

}

// ---------- Close Dialog ----------

if (closeDialog && dialog) {

    closeDialog.addEventListener("click", () => {

        dialog.close();

    });

    dialog.addEventListener("click", (event) => {

        const rect = dialog.getBoundingClientRect();

        const clickedOutside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

        if (clickedOutside) {
            dialog.close();
        }

    });

}

// ---------- Initialize ----------

getMenu();