// dates.js

// Current Year
const currentYear = new Date().getFullYear();
document.querySelector("#currentyear").textContent = currentYear;

// Last Modified
document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;