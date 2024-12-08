(function () {
  document
    .getElementById("contactForm")
    .addEventListener("submit", SendMessage, false);
})();

function SendMessage() {
  event.preventDefault();
  const form = document.getElementById("contactForm");

  const firstName = document.getElementById("firstName").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const brandEmail = "rydex@gmail.com";

  const emailContent = `
    From: ${firstName} <${email}>
    To: ${brandEmail}
    Subject: Message from ${firstName}
    
    Message:
    ${message}
  `;

  console.log(emailContent);

  // no errors should occur in this scenario, as all fields must be populated (they are required)
  ShowSuccessAlert(form);

  setTimeout(() => {
    ClearAlerts();
  }, 2000);
}

function ClearAlerts() {
  const alert = document.getElementById("successAlert");
  if (alert) alert.remove();
}

function ShowSuccessAlert(form) {
  const successfulAlert = document.createElement("div");
  successfulAlert.id = "successAlert";
  successfulAlert.setAttribute("class", "alert alert-success mt-2");
  successfulAlert.setAttribute("role", "alert");
  successfulAlert.textContent = "Email sent successfully!";

  form.appendChild(successfulAlert);
}
