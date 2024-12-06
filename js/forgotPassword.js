(function () {
  document
    .getElementById("forgotPasswordForm")
    .addEventListener("submit", ResetPassword, false);
})();

function ResetPassword() {
  event.preventDefault();

  ClearErrorAlerts();

  const inputEmail = document.getElementById("email").value;
  const inputNewPassword = document.getElementById("password").value;

  const usersDetails = JSON.parse(localStorage.getItem("usersDetails")) || [];

  const user = usersDetails.find((user) => user.email === inputEmail);

  const form = document.getElementById("forgotPasswordForm");

  if (user) {
    user.password = inputNewPassword;

    localStorage.setItem("usersDetails", JSON.stringify(usersDetails));

    ShowSuccessAlert(form);

    setTimeout(() => {
      window.location.href = "./index.html";
    }, 2000);
  } else {
    ShowErrorAlert(form);
  }
}

function ClearErrorAlerts() {
  const alert = document.getElementById("errorAlert");
  if (alert) alert.remove();
}

function ShowErrorAlert(form) {
  // display red alert
  const errorAlert = document.createElement("div");
  errorAlert.id = "errorAlert";
  errorAlert.setAttribute("class", "alert alert-danger mt-2");
  errorAlert.setAttribute("role", "alert");
  errorAlert.textContent = "Invalid Credentials!";
  form.append(errorAlert);
}

function ShowSuccessAlert(form) {
  const successfulAlert = document.createElement("div");
  successfulAlert.setAttribute("class", "alert alert-success mt-2");
  successfulAlert.setAttribute("role", "alert");
  successfulAlert.textContent =
    "Password reset successful! You will be redirected shortly.";

  form.appendChild(successfulAlert);
}
