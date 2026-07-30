// Hidden timestamp
document.querySelector("#timestamp").value = new Date().toISOString();

// Footer year
document.querySelector("#year").textContent = new Date().getFullYear();

// Last modified
document.querySelector("#lastModified").textContent =
`Last Modified: ${document.lastModified}`;

// Membership dialogs
const modals = [
    ["npBtn", "npModal"],
    ["bronzeBtn", "bronzeModal"],
    ["silverBtn", "silverModal"],
    ["goldBtn", "goldModal"]
];

modals.forEach(([buttonId, modalId]) => {
    const button = document.querySelector(`#${buttonId}`);
    const modal = document.querySelector(`#${modalId}`);

    if (button && modal) {
        button.addEventListener("click", () => {
            modal.showModal();
        });

        modal.querySelector(".close").addEventListener("click", () => {
            modal.close();
        });
    }
});