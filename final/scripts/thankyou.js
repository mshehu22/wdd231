// =======================================
// Masa Delight Abuja
// WDD 231 Final Project
// Author: Magdalene Shehu
// =======================================

// ---------- Footer Year ----------

const year = document.querySelector("#year");

if (year) {
    year.textContent = new Date().getFullYear();
}

// ---------- Read Form Data ----------

const summary = document.querySelector("#orderSummary");

const params = new URLSearchParams(window.location.search);

const fullname = params.get("fullname") || "Not provided";
const phone = params.get("phone") || "Not provided";
const email = params.get("email") || "Not provided";
const meal = params.get("meal") || "Not selected";
const quantity = params.get("quantity") || "1";
const delivery = params.get("delivery") || "Not selected";
const date = params.get("date") || "Not selected";
const message = params.get("message") || "None";

if (summary) {

    summary.innerHTML = `

        <div class="summary-card">

            <h3>Customer Information</h3>

            <p>

                <strong>Name:</strong>

                ${fullname}

            </p>

            <p>

                <strong>Phone:</strong>

                ${phone}

            </p>

            <p>

                <strong>Email:</strong>

                ${email}

            </p>

            <hr>

            <h3>Order Details</h3>

            <p>

                <strong>Meal:</strong>

                ${meal}

            </p>

            <p>

                <strong>Quantity:</strong>

                ${quantity}

            </p>

            <p>

                <strong>Delivery Option:</strong>

                ${delivery}

            </p>

            <p>

                <strong>Preferred Date:</strong>

                ${date}

            </p>

            <p>

                <strong>Special Instructions:</strong>

                ${message}

            </p>

        </div>

    `;

}