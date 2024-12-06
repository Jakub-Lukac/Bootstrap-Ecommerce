function DisplayUserData() {
  let e = JSON.parse(localStorage.getItem("usersDetails")) || [],
    t = e.find((e) => "true" === e.loggedIn);
  if (t) {
    document;
    let r = [
      { id: "firstName", value: t.firstName },
      { id: "lastName", value: t.lastName },
      { id: "addressLine1", value: t.addressLine1 },
      { id: "addressLine2", value: t.addressLine2 },
      { id: "eircode", value: t.eirCode },
      { id: "email", value: t.email },
    ];
    r.forEach(({ id: e, value: t }) => {
      document.getElementById(e).setAttribute("value", t);
    });
  }
}
async function CheckOutCart() {
  event.preventDefault(), document.getElementById("errorAlert");
  let e = document.getElementById("container");
  ClearErrorAlerts();
  let t = document.getElementById("nameOnCard").value.trim(),
    r = document.getElementById("cardNumber").value,
    a = parseInt(document.getElementById("cvc").value),
    l = {};
  try {
    let n = await fetch("../source/paymentCardDetails.json");
    l = await n.json();
  } catch (s) {
    ShowErrorAlert(
      e,
      "Failed to process payment details! Please try again later."
    );
    return;
  }
  t === l.nameOnCard && r === l.cardNumber && a === l.cvc
    ? (ShowSuccessAlert(e),
      setTimeout(() => {
        let e = localStorage.setItem("numberOfItemsInCart", 0),
          t = document.getElementById("cartCount");
        (t.textContent = e),
          localStorage.setItem("currentCartItems", JSON.stringify([])),
          (window.location = "../index.html");
      }, 3e3))
    : ShowErrorAlert(e, "Invalid Credentials!");
}
function ClearErrorAlerts() {
  let e = document.getElementById("errorAlert");
  e && e.remove();
}
function ShowErrorAlert(e, t) {
  let r = document.createElement("div");
  (r.id = "errorAlert"),
    r.setAttribute("class", "alert alert-danger mt-2"),
    r.setAttribute("role", "alert"),
    (r.textContent = t),
    e.append(r);
}
function ShowSuccessAlert(e) {
  let t = document.createElement("div");
  t.setAttribute("class", "alert alert-success mt-2"),
    t.setAttribute("role", "alert"),
    (t.textContent =
      "Payment successful! You will be redirected to home page shortly."),
    e.appendChild(t);
}
document.addEventListener("DOMContentLoaded", async () => {
  DisplayUserData(),
    document.getElementById("checkOutForm").addEventListener(
      "submit",
      async () => {
        await CheckOutCart();
      },
      !1
    );
});
