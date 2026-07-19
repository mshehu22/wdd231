const url = "data/members.json";

const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

// Fetch members
async function getMembers() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not fetch member data.");
        }

        const data = await response.json();

        console.log(data);

        displayMembers(data.members);

    } catch (error) {
        console.error(error);
    }
}

// Display members
function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${member.image}"
                 alt="${member.name} logo"
                 loading="lazy">

            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>

            <a href="${member.website}" target="_blank">
                Visit Website
            </a>
        `;

        membersContainer.appendChild(card);
    });
}

// Grid button
gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

// List button
listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});

// Footer
const year = document.querySelector("#year");
if (year) {
    year.textContent = new Date().getFullYear();
}

const lastModified = document.querySelector("#lastModified");
if (lastModified) {
    lastModified.textContent = document.lastModified;
}

// Start
getMembers();