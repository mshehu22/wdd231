const spotlightContainer = document.querySelector("#spotlight-container");


async function getSpotlights() {

    if (!spotlightContainer) return;


    try {

        // members.json is in wdd231/data
        const response = await fetch("../../data/members.json");


        if (!response.ok) {
            throw new Error("Unable to load member data");
        }


        const result = await response.json();


        // Get the members array
        const members = result.members;


        // Select Gold (3) and Silver (2) members
        const premiumMembers = members.filter(member =>
            member.membership === 2 ||
            member.membership === 3
        );


        // Randomize members
        premiumMembers.sort(() => Math.random() - 0.5);


        // Select only 3 members
        const selectedMembers = premiumMembers.slice(0, 3);


        selectedMembers.forEach(displaySpotlight);


    } catch (error) {

        spotlightContainer.innerHTML =
            "<p>Unable to load member spotlights.</p>";

        console.error(error);

    }

}



function displaySpotlight(member) {


    const card = document.createElement("section");


    card.className = "spotlight-card";


    card.innerHTML = `

        <img 
            src="../../images/${member.image}" 
            alt="${member.name} logo"
            loading="lazy"
        >


        <h3>
            ${member.name}
        </h3>


        <p>
            ${member.address}
        </p>


        <p>
            ${member.phone}
        </p>


        <p>
            Membership Level:
            ${member.membership === 3 ? "Gold" : "Silver"}
        </p>


        <a href="${member.website}" 
           target="_blank"
           rel="noopener noreferrer">
            Visit Website
        </a>

    `;


    spotlightContainer.appendChild(card);

}



// Start spotlight display
getSpotlights();
