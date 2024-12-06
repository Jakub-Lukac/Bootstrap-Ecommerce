function PreloadUserData() {
  let e = JSON.parse(localStorage.getItem("usersDetails")) || [],
    t = e.find((e) => "true" === e.loggedIn);
  if (t) {
    let s = [
      { id: "firstName", value: t.firstName },
      { id: "lastName", value: t.lastName },
      { id: "dob", value: t.dob },
      { id: "addressLine1", value: t.addressLine1 },
      { id: "addressLine2", value: t.addressLine2 },
      { id: "eircode", value: t.eirCode },
      { id: "email", value: t.email },
    ];
    s.forEach(({ id: e, value: t }) => {
      document.getElementById(e).setAttribute("value", t);
    });
  }
}
function UpdateUser(e) {
  e.preventDefault(), RemoveAlert("successfulAlert");
  let t = JSON.parse(localStorage.getItem("usersDetails")) || [],
    s = t.find((e) => "true" === e.loggedIn);
  s &&
    ([
      "firstName",
      "lastName",
      "dob",
      "addressLine1",
      "addressLine2",
      "eircode",
    ].forEach((e) => {
      s[e] = document.getElementById(e).value;
    }),
    console.log(t),
    localStorage.setItem("usersDetails", JSON.stringify(t)),
    (document.getElementById("password").value = ""),
    ShowSuccessAlert("Details updated successfully! Changes are now visible."),
    UpdateGreetingMessage(s.firstName));
}
function LogOut() {
  let e = JSON.parse(localStorage.getItem("usersDetails")) || [],
    t = e.find((e) => "true" === e.loggedIn);
  t &&
    ((t.loggedIn = "false"),
    localStorage.setItem("usersDetails", JSON.stringify(e)),
    (window.location.href = "../index.html"));
}
function ShowSuccessAlert(e) {
  let t = document.createElement("div");
  (t.id = "successfulAlert"),
    (t.className = "alert alert-success mt-2"),
    (t.role = "alert"),
    (t.textContent = e),
    document.getElementById("container").appendChild(t),
    setTimeout(() => RemoveAlert("successfulAlert"), 3e3);
}
function RemoveAlert(e) {
  let t = document.getElementById(e);
  t && t.remove();
}
function UpdateGreetingMessage(e) {
  let t = document.getElementById("userGreeting");
  (t.textContent = `Welcome ${e}`), t.classList.remove("d-none");
}
PreloadUserData(),
  document
    .getElementById("updateForm")
    .addEventListener("submit", UpdateUser, !1),
  document.getElementById("logOut").addEventListener("click", LogOut, !1);
