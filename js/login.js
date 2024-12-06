(function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", LoginUser, false);
})();

function LoginUser() {
  event.preventDefault();

  // clear previous error alerts
  ClearErrorAlerts();

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  const usersDetails = JSON.parse(localStorage.getItem("usersDetails")) || [];

  console.log(usersDetails);

  const user = usersDetails.find(
    (user) => user.email === email && user.password === password
  );

  const form = document.getElementById("loginForm");

  if (user) {
    // successful login, user redirected to shop.html

    user.loggedIn = "true";
    localStorage.setItem("usersDetails", JSON.stringify(usersDetails));

    ShowSuccessAlert(form);

    setTimeout(() => {
      window.location.href = "./shop.html";
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
  errorAlert.textContent = "Invalid Login Credentials!";
  form.append(errorAlert);
}

function ShowSuccessAlert(form) {
  const successfulAlert = document.createElement("div");
  successfulAlert.setAttribute("class", "alert alert-success mt-2");
  successfulAlert.setAttribute("role", "alert");
  successfulAlert.textContent =
    "Login successful! You will be redirected shortly.";

  form.appendChild(successfulAlert);
}
