(function () {
  document
    .getElementById("registerForm")
    .addEventListener("submit", RegisterUser, false);
})();

function RegisterUser() {
  event.preventDefault();

  const form = document.getElementById("registerForm");

  // if the user inputs invalid information before, and then starts the
  // registration process once again, we want to clear previous error alerts
  ClearErrorAlerts();

  if (
    document.getElementById("password").value !==
    document.getElementById("confirmPassword").value
  ) {
    ShowErrorAlert(form, "Wrong password!");
    setTimeout(() => {
      ClearErrorAlerts();
    }, 1000);
    return;
  }

  // Create a new user object
  const newUser = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    dob: document.getElementById("dob").value,

    addressLine1: document.getElementById("addressLine1").value,
    addressLine2: document.getElementById("addressLine2").value,
    eirCode: document.getElementById("eircode").value,

    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    loggedIn: "true",
  };

  // Retrieve the usersDetails array from localStorage, or initialize it if it doesn't exist
  let usersDetails = JSON.parse(localStorage.getItem("usersDetails")) || [];

  const userExists = usersDetails.some((user) => user.email === newUser.email);

  // Log out all other users
  const loggedInUsers = usersDetails.some((user) => user.loggedIn === "true");
  if (loggedInUsers) {
    loggedInUsers.forEach((user) => {
      user.loggedIn = "false";
    });
  }

  if (userExists) {
    ShowErrorAlert(
      form,
      "This user already exists. Please use a different email."
    );
    setTimeout(() => {
      ClearErrorAlerts();
    }, 1000);
    return;
  }

  // if no error, push user to the array
  usersDetails.push(newUser);

  // Save the updated array back to localStorage
  localStorage.setItem("usersDetails", JSON.stringify(usersDetails));

  // Success alert
  ShowSuccessAlert(form);

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 2000);
}

function ClearErrorAlerts() {
  const alert = document.getElementById("errorAlert");
  if (alert) alert.remove();
}

function ShowErrorAlert(form, message) {
  const errorAlert = document.createElement("div");
  errorAlert.id = "errorAlert";
  errorAlert.setAttribute("class", "alert alert-danger");
  errorAlert.setAttribute("role", "alert");
  errorAlert.textContent = message;
  form.append(errorAlert);
}

function ShowSuccessAlert(form) {
  const successfulAlert = document.createElement("div");
  successfulAlert.setAttribute("class", "alert alert-success");
  successfulAlert.setAttribute("role", "alert");
  successfulAlert.textContent =
    "Register successful! You will be redirected shortly.";

  form.appendChild(successfulAlert);
}
