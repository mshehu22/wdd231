const url = "data/members.json";

const cards = document.querySelector("#members");

async function getMembers() {

    const response = await fetch(url);

    const data = await response.json();

    displayMembers(data.members);
}

function displayMembers(members) {

    cards.innerHTML = "";

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

            <a href="${member.website}"
               target="_blank">
               Visit Website
            </a>
        `;

        cards.appendChild(card);
    });
}

getMembers();

document.querySelector("#grid").addEventListener("click", () => {

    cards.classList.add("grid");

    cards.classList.remove("list");
});

document.querySelector("#list").addEventListener("click", () => {

    cards.classList.add("list");

    cards.classList.remove("grid");
});

document.getElementById("year").textContent =
    new Date().getFullYear();

document.getElementById("lastModified").textContent =
    `Last Modified: ${document.lastModified}`;



const menuButton =
    document.querySelector("#menu");

const navigation =
    document.querySelector(".navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

});