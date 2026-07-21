// Hidden timestamp
document.querySelector("#timestamp").value =
new Date().toISOString();

// Footer year
document.querySelector("#year").textContent =
new Date().getFullYear();

document.querySelector("#lastModified").textContent =
`Last Modification: ${document.lastModified}`;

// Modal buttons
const modals = [
    ["npBtn", "npModal"],
    ["bronzeBtn", "bronzeModal"],
    ["silverBtn", "silverModal"],
    ["goldBtn", "goldModal"]
];

modals.forEach(([buttonId, modalId]) => {
    const button = document.querySelector(`#${buttonId}`);
    const modal = document.querySelector(`#${modalId}`);

    button.addEventListener("click", () => {
        modal.showModal();
    });

    modal.querySelector(".close")
        .addEventListener("click", () => {
            modal.close();
        });
});