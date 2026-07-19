// Footer year
const year = document.querySelector("#year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// Footer last modified date
const lastModified = document.querySelector("#lastModified");

if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}