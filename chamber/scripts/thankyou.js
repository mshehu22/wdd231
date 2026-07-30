const params = new URLSearchParams(window.location.search);

document.querySelector("#results").innerHTML = `
<p><strong>First Name:</strong> ${params.get("fname")}</p>

<p><strong>Last Name:</strong> ${params.get("lname")}</p>

<p><strong>Email:</strong> ${params.get("email")}</p>

<p><strong>Mobile Phone:</strong> ${params.get("phone")}</p>

<p><strong>Business/Organization:</strong> ${params.get("organization")}</p>

<p><strong>Membership Level:</strong> ${params.get("membership")}</p>

<p><strong>Application Submitted:</strong> ${params.get("timestamp")}</p>
`;