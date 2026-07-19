const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

// Mobile menu
menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

// Fetch members
async function getMembers() {
    try {
        const response = await fetch("../data/members.json");

        if (!response.ok) {
            throw new Error("Could not fetch members.");
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

            <p>Membership Level: ${member.membership}</p>

            <a href="${member.website}"
               target="_blank"
               rel="noopener">
               Visit Website
            </a>
        `;

        membersContainer.appendChild(card);
    });
}

// Grid view
gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

// List view
listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});

// Footer
document.querySelector("#year").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    document.lastModified;

// Start
getMembers();