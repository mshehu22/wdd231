const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

// Mobile Menu
if (menuButton) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
    });
}

// Fetch Member Data
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not fetch member data.");
        }

        const data = await response.json();

        // JSON contains { members: [...] }
        displayMembers(data.members);

    } catch (error) {
        console.error(error);
    }
}

// Display Members
function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");
        card.classList.add("card");

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy"
            >

            <h2>${member.name}</h2>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>
                Membership Level:
                ${member.membership}
            </p>

            <p>
                <a href="${member.website}"
                   target="_blank"
                   rel="noopener">
                    Visit Website
                </a>
            </p>
        `;

        membersContainer.appendChild(card);
    });
}

// Grid View
if (gridButton) {
    gridButton.addEventListener("click", () => {
        membersContainer.className = "grid";
    });
}

// List View
if (listButton) {
    listButton.addEventListener("click", () => {
        membersContainer.className = "list";
    });
}

// Footer
const year = document.querySelector("#year");
if (year) {
    year.textContent = new Date().getFullYear();
}

const lastModified = document.querySelector("#lastModified");
if (lastModified) {
    lastModified.textContent =
        `Last Modified: ${document.lastModified}`;
}

// Start Application
getMembers();