function ResetPassword() {
  event.preventDefault(), ClearErrorAlerts();
  let e = document.getElementById("email").value,
    t = document.getElementById("password").value,
    r = JSON.parse(localStorage.getItem("usersDetails")) || [],
    s = r.find((t) => t.email === e),
    l = document.getElementById("forgotPasswordForm");
  s
    ? ((s.password = t),
      localStorage.setItem("usersDetails", JSON.stringify(r)),
      ShowSuccessAlert(l),
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2e3))
    : ShowErrorAlert(l);
}
function ClearErrorAlerts() {
  let e = document.getElementById("errorAlert");
  e && e.remove();
}
function ShowErrorAlert(e) {
  let t = document.createElement("div");
  (t.id = "errorAlert"),
    t.setAttribute("class", "alert alert-danger mt-2"),
    t.setAttribute("role", "alert"),
    (t.textContent = "Invalid Credentials!"),
    e.append(t);
}
function ShowSuccessAlert(e) {
  let t = document.createElement("div");
  t.setAttribute("class", "alert alert-success mt-2"),
    t.setAttribute("role", "alert"),
    (t.textContent =
      "Password reset successful! You will be redirected shortly."),
    e.appendChild(t);
}
document
  .getElementById("forgotPasswordForm")
  .addEventListener("submit", ResetPassword, !1);
