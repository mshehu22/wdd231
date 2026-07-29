// ==========================
// Spotlight Container
// ==========================

const spotlightContainer = document.querySelector("#spotlight-container");

// ==========================
// Load Spotlights
// ==========================

async function getSpotlights() {

    if (!spotlightContainer) return;

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const data = await response.json();

        const premiumMembers = data.members.filter(member =>
            member.membership === 2 || member.membership === 3
        );

        // Randomize members
        premiumMembers.sort(() => Math.random() - 0.5);

        // Select up to three members
        const selectedMembers = premiumMembers.slice(0, 3);

        spotlightContainer.innerHTML = "";

        selectedMembers.forEach(member => {

            const card = document.createElement("section");
            card.classList.add("spotlight-card");

            const membershipLevel =
                member.membership === 3 ? "Gold" : "Silver";

            card.innerHTML = `
                <img
                    src="images/${member.image}"
                    alt="${member.name} logo"
                    loading="lazy"
                    width="120"
                    height="120">

                <h3>${member.name}</h3>

                <p>${member.address}</p>

                <p>${member.phone}</p>

                <p><strong>${membershipLevel} Member</strong></p>

                <p>
                    <a href="${member.website}"
                       target="_blank"
                       rel="noopener noreferrer">
                        Visit Website
                    </a>
                </p>
            `;

            spotlightContainer.appendChild(card);

        });

    } catch (error) {

        spotlightContainer.innerHTML =
            "<p>Unable to load member spotlights.</p>";

        console.error(error);

    }

}

// ==========================
// Initialize
// ==========================

getSpotlights();