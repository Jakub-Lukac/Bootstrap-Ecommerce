function InitializePage() {
  DisplayGreetingMessage(), DisplayCartCount(), SetupAccountButton();
}
function SetupAccountButton() {
  let t = document.getElementById("accBtn"),
    e = GetLoggedInUser();
  t.setAttribute(
    "href",
    e
      ? getRelativePath("pages/userAccount.html")
      : getRelativePath("pages/login.html")
  );
}
function getRelativePath(t) {
  let e = window.location.pathname.split("/").length - 2,
    n = "../".repeat(e);
  return n + t;
}
function DisplayGreetingMessage() {
  let t = document.getElementById("userGreeting"),
    e = GetLoggedInUser();
  e
    ? ((t.textContent = `Welcome ${e.firstName}`), t.classList.remove("d-none"))
    : ((t.textContent = ""), t.classList.add("d-none"));
}
function DisplayCartCount() {
  let t = document.getElementById("cartCount"),
    e = localStorage.getItem("numberOfItemsInCart") || 0;
  t.textContent = e;
}
function GetLoggedInUser() {
  let t = JSON.parse(localStorage.getItem("usersDetails")) || [];
  return console.log(t), t.find((t) => "true" === t.loggedIn);
}
InitializePage();
