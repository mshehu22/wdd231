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
    if (!menuContainer) {
        return;
    }

    try {
        const response = await fetch("data/menu.json");

        if (!response.ok) {
            throw new Error("Unable to fetch menu data.");
        }

        menuItems = await response.json();

        if (!Array.isArray(menuItems)) {
            throw new Error("Menu data is not in the correct format.");
        }

        displayMenu(menuItems);
        populateCategories();
        restoreFilter();

    } catch (error) {
        console.error("Menu loading error:", error);

        menuContainer.innerHTML = `
            <p class="error">
                Unable to load menu items.
                Please refresh the page.
            </p>
        `;
    }
}


// ---------- Create Category Options ----------

function populateCategories() {
    if (!categorySelect) {
        return;
    }

    const categories = [
        ...new Set(menuItems.map(item => item.category))
    ].sort();

    categorySelect.innerHTML = `
        <option value="all">All Categories</option>
    `;

    categories.forEach(category => {
        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categorySelect.appendChild(option);
    });
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
                No menu items found for this category.
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

        const button = card.querySelector(".details-btn");

        if (button) {
            button.addEventListener("click", () => {
                openDialog(item);
            });
        }

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

        const filteredItems = menuItems.filter(
            item => item.category === category
        );

        displayMenu(filteredItems);
    });
}


// ---------- Restore Previous Filter ----------

function restoreFilter() {
    if (!categorySelect) {
        return;
    }

    const savedCategory = localStorage.getItem("selectedCategory");

    if (!savedCategory) {
        return;
    }

    const categoryExists = [
        ...categorySelect.options
    ].some(option => option.value === savedCategory);

    if (!categoryExists) {
        localStorage.removeItem("selectedCategory");
        categorySelect.value = "all";
        displayMenu(menuItems);
        return;
    }

    categorySelect.value = savedCategory;

    if (savedCategory === "all") {
        displayMenu(menuItems);
        return;
    }

    const filteredItems = menuItems.filter(
        item => item.category === savedCategory
    );

    displayMenu(filteredItems);
}


// ---------- Modal Dialog ----------

function openDialog(item) {
    if (!dialog || !dialogContent) {
        return;
    }

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
            ₦${Number(item.price).toLocaleString()}
        </p>
    `;

    if (typeof dialog.showModal === "function") {
        dialog.showModal();
    } else {
        dialog.setAttribute("open", "");
    }

    if (closeDialog) {
        closeDialog.focus();
    }
}


// ---------- Close Dialog Button ----------

if (closeDialog && dialog) {
    closeDialog.addEventListener("click", () => {
        dialog.close();
    });
}


// ---------- Close Dialog When Clicking Outside ----------

if (dialog) {
    dialog.addEventListener("click", event => {
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


// ---------- Close Dialog With Escape ----------

if (dialog) {
    dialog.addEventListener("cancel", event => {
        event.preventDefault();
        dialog.close();
    });
}


// ---------- Initialize ----------

getMenu();