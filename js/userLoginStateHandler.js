(function () {
  InitializePage();
})();

function InitializePage() {
  DisplayGreetingMessage();
  DisplayCartCount();
  SetupAccountButton();
}

// Function to set up href attribute of user icon button on main page
// If there is loggedIn user, upon clicking on the button they will get redirected to the user account page
// otherwise they will get redirected to the login page
function SetupAccountButton() {
  const accBtn = document.getElementById("accBtn");
  const loggedInUser = GetLoggedInUser();

  /*accBtn.setAttribute(
    "href",
    loggedInUser
      ? GetRelativePath("pages/userAccount.html")
      : GetRelativePath("pages/login.html")
  );*/
  accBtn.setAttribute(
    "href",
    loggedInUser
      ? "/Bootstrap-Ecommerce/pages/userAccount.html"
      : "/Bootstrap-Ecommerce/pages/login.html"
  );
}

// window.location.pathname.split('/'): ["", "index.html"] // lenght 2
// window.location.pathname.split('/'): ["", "pages", "shop.html"] // length 3
function GetRelativePath(targetPath) {
  const currentPath = window.location.pathname;

  // Check if the current path contains index.html
  if (currentPath.includes("index.html")) {
    var a = `./${targetPath}`;
    return `./${targetPath}`;
  } else {
    var b = `./${targetPath.split("/").pop()}`;
    return `./${targetPath.split("/").pop()}`; // Get the filename only (e.g., 'login.html')
  }
}

// Once again we find the loggedIn user
// If there is loggedIn user, greeting message gets displayed
// otherwise no
function DisplayGreetingMessage() {
  const greetingElement = document.getElementById("userGreeting");
  const loggedInUser = GetLoggedInUser();

  if (loggedInUser) {
    greetingElement.textContent = `Welcome ${loggedInUser.firstName}`;
    greetingElement.classList.remove("d-none");
  } else {
    greetingElement.textContent = "";
    greetingElement.classList.add("d-none");
  }
}

// Displaying current cart count
function DisplayCartCount() {
  const cartIcon = document.getElementById("cartCount");
  const numberOfItemsInCart = localStorage.getItem("numberOfItemsInCart") || 0;

  cartIcon.textContent = numberOfItemsInCart;
}

function GetLoggedInUser() {
  const usersDetails = JSON.parse(localStorage.getItem("usersDetails")) || [];
  console.log(usersDetails);
  return usersDetails.find((user) => user.loggedIn === "true");
}
