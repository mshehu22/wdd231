const spotlightContainer =
document.querySelector("#spotlight-container");


async function getSpotlights() {

    if (!spotlightContainer) return;

    try {

        const response =
            await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data");
        }

        const data =
            await response.json();

        const premiumMembers =
            data.members.filter(member =>
                member.membership === 2 ||
                member.membership === 3
            );

        premiumMembers.sort(() =>
            Math.random() - 0.5
        );

        const selectedMembers =
            premiumMembers.slice(0, 3);

        spotlightContainer.innerHTML = "";

        selectedMembers.forEach(member => {

            const card =
                document.createElement("section");

            card.className =
                "spotlight-card";

            card.innerHTML = `

                <img
                    src="images/${member.image}"
                    alt="${member.name} logo"
                    loading="lazy">

                <h3>${member.name}</h3>

                <p>${member.address}</p>

                <p>${member.phone}</p>

                <p>
                    Membership Level:
                    ${member.membership === 3 ? "Gold" : "Silver"}
                </p>

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

    }

    catch (error) {

        spotlightContainer.innerHTML =
            "<p>Unable to load member spotlights.</p>";

        console.error(error);

    }

}


getSpotlights();