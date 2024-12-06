document.addEventListener("DOMContentLoaded", async () => {
  DisplayUserData();
  document.getElementById("checkOutForm").addEventListener(
    "submit",
    async () => {
      await CheckOutCart();
    },
    false
  );
});

function DisplayUserData() {
  const usersDetails = JSON.parse(localStorage.getItem("usersDetails")) || [];

  const loggedInUser = usersDetails.find((user) => user.loggedIn === "true");

  if (loggedInUser) {
    document;
    const userFields = [
      { id: "firstName", value: loggedInUser.firstName },
      { id: "lastName", value: loggedInUser.lastName },
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

async function CheckOutCart() {
  event.preventDefault();

  // clear previous error alerts
  const errorAlert = document.getElementById("errorAlert");
  const container = document.getElementById("container");

  ClearErrorAlerts();

  const inputNameOnCard = document.getElementById("nameOnCard").value.trim();
  const inputCardNumber = document.getElementById("cardNumber").value;
  const inputCvc = parseInt(document.getElementById("cvc").value);

  let cardData = {};

  try {
    const response = await fetch("../source/paymentCardDetails.json");

    cardData = await response.json();
  } catch (error) {
    ShowErrorAlert(
      container,
      "Failed to process payment details! Please try again later."
    );
    return;
  }

  if (
    inputNameOnCard === cardData.nameOnCard &&
    inputCardNumber === cardData.cardNumber &&
    inputCvc === cardData.cvc
  ) {
    ShowSuccessAlert(container);

    // Keep the alert visible for 3 seconds before redirecting
    // also keeping the cart count until the user is being redirected
    setTimeout(() => {
      // clear the cart
      let numberOfItemsInCart = localStorage.setItem("numberOfItemsInCart", 0);

      const cartIcon = document.getElementById("cartCount");

      cartIcon.textContent = numberOfItemsInCart;

      localStorage.setItem("currentCartItems", JSON.stringify([])); // empty array = empty cart

      window.location = "../index.html";
    }, 3000);
  } else {
    // invalid payment details
    ShowErrorAlert(container, "Invalid Credentials!");
  }
}

function ClearErrorAlerts() {
  const alert = document.getElementById("errorAlert");
  if (alert) alert.remove();
}

function ShowErrorAlert(container, message) {
  // display red alert
  const errorAlert = document.createElement("div");
  errorAlert.id = "errorAlert";
  errorAlert.setAttribute("class", "alert alert-danger mt-2");
  errorAlert.setAttribute("role", "alert");
  errorAlert.textContent = message;
  container.append(errorAlert);
}

function ShowSuccessAlert(container) {
  const successfulAlert = document.createElement("div");
  successfulAlert.setAttribute("class", "alert alert-success mt-2");
  successfulAlert.setAttribute("role", "alert");
  successfulAlert.textContent =
    "Payment successful! You will be redirected to home page shortly.";

  container.appendChild(successfulAlert);
}
