function LoginUser() {
  event.preventDefault(), ClearErrorAlerts();
  var e = document.getElementById("email").value,
    t = document.getElementById("password").value;
  let r = JSON.parse(localStorage.getItem("usersDetails")) || [];
  console.log(r);
  let l = r.find((r) => r.email === e && r.password === t),
    s = document.getElementById("loginForm");
  l
    ? ((l.loggedIn = "true"),
      localStorage.setItem("usersDetails", JSON.stringify(r)),
      ShowSuccessAlert(s),
      setTimeout(() => {
        window.location.href = "./shop.html";
      }, 2e3))
    : ShowErrorAlert(s);
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
    (t.textContent = "Invalid Login Credentials!"),
    e.append(t);
}
function ShowSuccessAlert(e) {
  let t = document.createElement("div");
  t.setAttribute("class", "alert alert-success mt-2"),
    t.setAttribute("role", "alert"),
    (t.textContent = "Login successful! You will be redirected shortly."),
    e.appendChild(t);
}
document.getElementById("loginForm").addEventListener("submit", LoginUser, !1);
