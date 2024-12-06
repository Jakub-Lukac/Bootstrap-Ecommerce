document.addEventListener("DOMContentLoaded", async () => {
  /*fetch("./source/bikes.json") // Path to your local JSON file
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayBikeProductItems(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      // adjust this so it wont be written to console, but to the screen
    });*/

  // ADJUST ERROR HANDLING
  const errorContainer = document.createElement("div");
  document.body.appendChild(errorContainer);

  try {
    //  await keyword (blocking behaviour) ==> Each "function" must finish before the next one starts
    const response = await fetch("./source/bikes.json");

    /*if (!response.ok) {
       throw new Error(`HTTP error! Status: ${response.status}`);
    }*/

    const data = await response.json();
    displayBikeProductItems(data);
  } catch (error) {
    console.error(error);
  }
});

function displayBikeProductItems(bikes) {
  const container = document.getElementById("products-container");
  bikes.forEach((bike) => {
    const col = document.createElement("div");
    col.setAttribute("class", "col-md-6 col-lg-4");

    const card = document.createElement("div");
    card.setAttribute("class", "card shadow");

    const img = document.createElement("img");
    img.src = bike.image_source;
    img.alt = bike.model_name;
    img.setAttribute("class", "card-img-top");
    img.setAttribute("alt", "Card image caption");

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.textContent = `${bike.brand} ${bike.model_name}`;
    cardTitle.setAttribute("class", "card-title fw-bold");

    const cardDescription = document.createElement("p");
    cardDescription.textContent = `${bike.short_description}...`;
    cardDescription.setAttribute("class", "card-text text-secondary");

    const yearOfMake = document.createElement("div");
    const yearOfMakeStaticText = document.createElement("span");
    yearOfMakeStaticText.textContent = "Year of Make : ";
    yearOfMakeStaticText.setAttribute("class", "fw-bold");
    const yearOfMakeDynamicText = document.createElement("span");
    yearOfMakeDynamicText.textContent = `${bike.year_of_make}`;
    yearOfMakeDynamicText.setAttribute("class", "text-secondary");

    yearOfMake.setAttribute("class", "card-text ");
    yearOfMake.append(yearOfMakeStaticText, yearOfMakeDynamicText);

    const price = document.createElement("div");
    const priceStaticText = document.createElement("span");
    priceStaticText.textContent = "Price : ";
    priceStaticText.setAttribute("class", "fw-bold");
    const priceDynamicText = document.createElement("span");
    // using innerHTML instead of textContent, as textContent can not interpret euro sign (html entity)
    priceDynamicText.innerHTML = `${bike.price} &euro;`;
    priceDynamicText.setAttribute("class", "fw-bold text-success");

    price.setAttribute("class", "card-text mt-3 mb-3");
    price.append(priceStaticText, priceDynamicText);

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Add to cart";
    button.setAttribute("class", "btn btn-dark");

    button.addEventListener(
      "click",
      // function that calls AddToCart, otherwise every time I reload the page, the count would get incremented by 6
      function () {
        AddToCart(bike);
      },
      false
    );

    container.appendChild(card);
    container.append(col);
    col.appendChild(card);
    card.appendChild(img);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(yearOfMake);
    cardBody.appendChild(price);
    cardBody.appendChild(button);
  });
}

function AddToCart(bikeItem) {
  // Increment count
  let numberOfItemsInCart =
    parseInt(localStorage.getItem("numberOfItemsInCart")) || 0;

  numberOfItemsInCart++;

  localStorage.setItem("numberOfItemsInCart", numberOfItemsInCart);

  // Display count in card in navbar
  DisplayCartCount();

  // Update cart localStorage property (array of objects)
  let currentCartItems =
    JSON.parse(localStorage.getItem("currentCartItems")) || [];

  // Check if bike is already in the cart
  let existingItemIndex = currentCartItems.findIndex(
    (item) => item.id === bikeItem.id
  );

  if (existingItemIndex !== -1) {
    // If the bike is already in the cart, increment its quantity
    currentCartItems[existingItemIndex].quantity += 1;
  } else {
    // If the bike is not in the cart, add it as a new entry with a quantity of 1
    currentCartItems.push({ ...bikeItem, quantity: 1 });

    // ... - spread operator, copies all the properties of selected object
    // allows us to include new properties, even if they werent originally there
  }

  console.log(currentCartItems);

  localStorage.setItem("currentCartItems", JSON.stringify(currentCartItems));
}

// Displaying current cart count
function DisplayCartCount() {
  const cartIcon = document.getElementById("cartCount");
  const numberOfItemsInCart = localStorage.getItem("numberOfItemsInCart") || 0;

  cartIcon.textContent = numberOfItemsInCart;
}
