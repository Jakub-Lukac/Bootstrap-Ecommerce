function RegisterUser() {
  event.preventDefault(), ClearErrorAlerts();
  let e = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      dob: document.getElementById("dob").value,
      addressLine1: document.getElementById("addressLine1").value,
      addressLine2: document.getElementById("addressLine2").value,
      eirCode: document.getElementById("eircode").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      loggedIn: "true",
    },
    t = JSON.parse(localStorage.getItem("usersDetails")) || [],
    r = t.some((t) => t.email === e.email),
    l = t.some((e) => "true" === e.loggedIn);
  l &&
    l.forEach((e) => {
      e.loggedIn = "false";
    });
  let s = document.getElementById("registerForm");
  if (r) {
    ShowErrorAlert(s);
    return;
  }
  t.push(e),
    localStorage.setItem("usersDetails", JSON.stringify(t)),
    ShowSuccessAlert(s),
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 2e3);
}
function ClearErrorAlerts() {
  let e = document.getElementById("errorAlert");
  e && e.remove();
}
function ShowErrorAlert(e) {
  let t = document.createElement("div");
  (t.id = "errorAlert"),
    t.setAttribute("class", "alert alert-danger"),
    t.setAttribute("role", "alert"),
    (t.textContent = "This user already exists. Please use a different email."),
    e.append(t);
}
function ShowSuccessAlert(e) {
  let t = document.createElement("div");
  t.setAttribute("class", "alert alert-success"),
    t.setAttribute("role", "alert"),
    (t.textContent = "Register successful! You will be redirected shortly."),
    e.appendChild(t);
}
document
  .getElementById("registerForm")
  .addEventListener("submit", RegisterUser, !1);
