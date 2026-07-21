document.querySelector("#timestamp").value =
new Date().toISOString();

const npModal =
document.querySelector("#npModal");

const bronzeModal =
document.querySelector("#bronzeModal");

const silverModal =
document.querySelector("#silverModal");

const goldModal =
document.querySelector("#goldModal");

document.querySelector("#npBtn")
.addEventListener("click", () => {
    npModal.showModal();
});

document.querySelector("#bronzeBtn")
.addEventListener("click", () => {
    bronzeModal.showModal();
});

document.querySelector("#silverBtn")
.addEventListener("click", () => {
    silverModal.showModal();
});

document.querySelector("#goldBtn")
.addEventListener("click", () => {
    goldModal.showModal();
});

document.querySelectorAll(".close")
.forEach(button => {

button.addEventListener("click", () => {
    button.parentElement.close();
});

});