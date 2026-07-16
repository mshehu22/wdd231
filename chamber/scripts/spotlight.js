const spotlightContainer =
    document.querySelector("#spotlight-container");

async function getSpotlights() {
    const response = await fetch("../data/members.json");
    const data = await response.json();

    const premiumMembers = data.filter(
        member =>
            member.membership === "Gold" ||
            member.membership === "Silver"
    );

    premiumMembers.sort(() => 0.5 - Math.random());

    const selected = premiumMembers.slice(0, 3);

    selected.forEach(displaySpotlight);
}