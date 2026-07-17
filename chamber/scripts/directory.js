const membersContainer =
    document.querySelector("#members");

const gridButton =
    document.querySelector("#grid");

const listButton =
    document.querySelector("#list");

const menuButton =
    document.querySelector("#menu");

const navigation =
    document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

async function getMembers() {

    const response =
        await fetch("data/members.json");

    const data =
        await response.json();

    displayMembers(data);
}

function displayMembers(members) {

    members.forEach(member => {

        const card =
            document.createElement("section");

        card.classList.add("card");

        card.innerHTML = `

            <img src="${member.image}"
                 alt="${member.name} logo"
                 loading="lazy">

            <h2>${member.name}</h2>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>
                Membership Level:
                ${member.membershipLevel}
            </p>

            <a href="${member.website}"
               target="_blank"
               rel="noopener">
               Visit Website
            </a>
        `;

        membersContainer.appendChild(card);
    });
}

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});

document.querySelector("#year").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modified:
    ${document.lastModified}`;

getMembers();