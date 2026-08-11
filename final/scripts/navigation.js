```javascript
// navigation.js
// Masa Delight Abuja

const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", isOpen);

        if (isOpen) {
            menuButton.innerHTML = "&times;";
            menuButton.setAttribute("aria-label", "Close Navigation");
        } else {
            menuButton.innerHTML = "&#9776;";
            menuButton.setAttribute("aria-label", "Open Navigation");
        }
    });
}
```
