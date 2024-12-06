(function () {
  PreloadUserData();
  document
    .getElementById("updateForm")
    .addEventListener("submit", UpdateUser, false);
  document.getElementById("logOut").addEventListener("click", LogOut, false);
})();

function PreloadUserData() {
  const usersDetails = JSON.parse(localStorage.getItem("usersDetails")) || [];
  const loggedInUser = usersDetails.find((user) => user.loggedIn === "true");

  if (loggedInUser) {
    const userFields = [
      { id: "firstName", value: loggedInUser.firstName },
      { id: "lastName", value: loggedInUser.lastName },
      { id: "dob", value: loggedInUser.dob },
      { id: "addressLine1", value: loggedInUser.addressLine1 },
      { id: "addressLine2", value: loggedInUser.addressLine2 },
      { id: "eircode", value: loggedInUser.eirCode },
      { id: "email", value: loggedInUser.email },
    ];

    // ids represent ids of html elements (text fields)

    userFields.forEach(({ id, value }) => {
      document.getElementById(id).setAttribute("value", value);
    });
  }
}

function UpdateUser(event) {
  event.preventDefault();
  // Clear any existing successfull alert
  RemoveAlert("successfulAlert");

  const usersDetails = JSON.parse(localStorage.getItem("usersDetails")) || [];
  const loggedInUser = usersDetails.find((user) => user.loggedIn === "true");

  if (loggedInUser) {
    const fields = [
      "firstName",
      "lastName",
      "dob",
      "addressLine1",
      "addressLine2",
      "eircode",
    ];
    fields.forEach((field) => {
      loggedInUser[field] = document.getElementById(field).value;
    });

    console.log(usersDetails);

    localStorage.setItem("usersDetails", JSON.stringify(usersDetails));

    // reseting password field
    document.getElementById("password").value = "";

    ShowSuccessAlert("Details updated successfully! Changes are now visible.");
    UpdateGreetingMessage(loggedInUser.firstName);
  }
}

function LogOut() {
  const usersDetails = JSON.parse(localStorage.getItem("usersDetails")) || [];
  const loggedInUser = usersDetails.find((user) => user.loggedIn === "true");

  if (loggedInUser) {
    loggedInUser.loggedIn = "false";
    localStorage.setItem("usersDetails", JSON.stringify(usersDetails));
    window.location.href = "./index.html";
  }
}

function ShowSuccessAlert(message) {
  const alert = document.createElement("div");
  alert.id = "successfulAlert";
  alert.className = "alert alert-success mt-2";
  alert.role = "alert";
  alert.textContent = message;
  document.getElementById("container").appendChild(alert);

  setTimeout(() => RemoveAlert("successfulAlert"), 3000);
}

function RemoveAlert(alertId) {
  const alert = document.getElementById(alertId);
  if (alert) alert.remove();
}

function UpdateGreetingMessage(firstName) {
  const greetingElement = document.getElementById("userGreeting");
  greetingElement.textContent = `Welcome ${firstName}`;
  greetingElement.classList.remove("d-none");
}
