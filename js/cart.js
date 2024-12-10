document.addEventListener("DOMContentLoaded", () => {
  DisplayCartItems();
  document
    .getElementById("goBack")
    .addEventListener("click", GoBackToShop, false);
  document
    .getElementById("proceedToPayment")
    .addEventListener("click", Checkout, false);
});

function DisplayCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("currentCartItems"));

  const mainCard = document.getElementById("shoppingCard");

  let totalPrice = 0;

  if (cartItems && cartItems.length !== 0) {
    cartItems.forEach((cartItem) => {
      const card = document.createElement("div");
      card.id = `cart-item-${cartItem.id}`;
      card.setAttribute(
        "class",
        "p-3 border-bottom d-flex flex-md-row flex-column justify-content-around align-items-md-center align-items-xs-start gap-2 gap-md-5"
      );

      const img = document.createElement("img");
      img.src = cartItem.image_source;
      img.style.width = "150px";
      img.style.height = "auto";

      const nameAndDescription = document.createElement("div");
      nameAndDescription.setAttribute("class", "mt-2 w-75");

      const name = document.createElement("div");
      name.setAttribute("class", "fw-bold");
      name.textContent = `${cartItem.brand} ${cartItem.model_name}`;

      const description = document.createElement("div");
      description.setAttribute("class", "text-wrap text-break");
      description.textContent = `${cartItem.short_description}`;

      nameAndDescription.append(name, description);

      const quantity = document.createElement("div");
      quantity.setAttribute(
        "class",
        "mt-2 d-flex flex-row gap-2 align-items-center justify-content-start justify-content-md-center"
      );

      const quantityIncrement = document.createElement("div");
      const incrementSign = document.createElement("i");
      incrementSign.setAttribute("class", "bi bi-patch-plus-fill fs-3");
      incrementSign.addEventListener(
        "click",
        () => IncrementItemCount(cartItems, cartItem),
        false
      );
      quantityIncrement.appendChild(incrementSign);

      const quantityText = document.createElement("div");
      quantityText.id = `quantity-text-${cartItem.id}`;
      quantityText.textContent = `${cartItem.quantity}`;

      const quantityDecrement = document.createElement("div");
      const decrementSign = document.createElement("i");
      decrementSign.setAttribute("class", "bi bi-patch-minus-fill fs-3");
      decrementSign.addEventListener(
        "click",
        () => DecrementItemCount(cartItems, cartItem),
        false
      );
      quantityDecrement.appendChild(decrementSign);

      quantity.append(quantityDecrement, quantityText, quantityIncrement);

      const price = document.createElement("div");
      price.id = `price-${cartItem.id}`;
      price.setAttribute("class", "mt-2 fw-bold text-success");
      price.innerHTML = `${cartItem.quantity * cartItem.price}&euro;`;

      const removeItem = document.createElement("i");
      removeItem.setAttribute("class", "bi bi-trash-fill text-danger");
      removeItem.id = `removeItem-${cartItem.id}`;

      removeItem.addEventListener("click", () =>
        RemoveItem(cartItems, cartItem)
      );
      // by wrapping RemoveItem in anonymous function we prevent function RemoveItem from immediately executing

      mainCard.appendChild(card);
      card.appendChild(img);
      card.appendChild(nameAndDescription);
      card.appendChild(quantity);
      card.appendChild(price);
      card.appendChild(removeItem);

      totalPrice += cartItem.quantity * cartItem.price;
    });

    const finalPrice = document.createElement("div");
    finalPrice.id = "final-price";
    finalPrice.setAttribute("class", "text-end me-3 pb-4 fw-bold fs-5");
    finalPrice.innerHTML = `Final Price: ${totalPrice}&euro;`;

    mainCard.appendChild(finalPrice);
  } else {
    const emptyCart = document.createElement("div");
    emptyCart.textContent = "Your cart is empty!";
    emptyCart.setAttribute(
      "class",
      "display-1 p-5 text-center fw-bold text-secondary"
    );
    mainCard.appendChild(emptyCart);
  }

  // after displaying all the cart items, display final price
}

function RemoveItem(cartItems, cartItem) {
  // Find the index of the cart item
  let cartItemIndex = cartItems.findIndex((item) => item.id === cartItem.id);

  // Remove the item from the cart
  if (cartItemIndex !== -1) {
    cartItems.splice(cartItemIndex, 1);

    UpdateLocalStorage(cartItems);

    // Remove the item from the DOM
    const cardToRemove = document.getElementById(`cart-item-${cartItem.id}`);
    if (cardToRemove) {
      cardToRemove.remove();
    }

    // Update the final price display
    UpdateFinalPrice(cartItems);
  }
}

function UpdateLocalStorage(cartItems) {
  // Update the cart items in localStorage
  localStorage.setItem("currentCartItems", JSON.stringify(cartItems));

  // Re-calculating number of items in cart based on the count of items in currentItemsCart
  // we set initial value of total to 0, and we add to it the quantity of each item in cart
  // we use reduce method to accumulate the total quantity of items in the cart
  const numberOfItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartIcon = document.getElementById("cartCount");

  cartIcon.textContent = numberOfItemsInCart;

  localStorage.setItem("numberOfItemsInCart", numberOfItemsInCart);
}

function IncrementItemCount(cartItems, cartItem) {
  const cartItemIndex = cartItems.findIndex((item) => item.id === cartItem.id);

  if (cartItemIndex !== -1) {
    cartItems[cartItemIndex].quantity++;

    UpdateLocalStorage(cartItems);

    UpdateItemDetails(cartItems, cartItemIndex, cartItem);

    UpdateFinalPrice(cartItems);
  } else {
    console.error("Item not found in the cart.");
  }
}

function DecrementItemCount(cartItems, cartItem) {
  const cartItemIndex = cartItems.findIndex((item) => item.id === cartItem.id);

  if (cartItemIndex !== -1) {
    if (cartItems[cartItemIndex].quantity > 0) {
      cartItems[cartItemIndex].quantity--;

      if (cartItems[cartItemIndex].quantity === 0) {
        cartItems.splice(cartItemIndex, 1);
        const cardToRemove = document.getElementById(
          `cart-item-${cartItem.id}`
        );
        if (cardToRemove) {
          cardToRemove.remove();
        }
      }

      UpdateLocalStorage(cartItems);

      UpdateItemDetails(cartItems, cartItemIndex, cartItem);

      UpdateFinalPrice(cartItems);
    } else {
      console.error("Item quantity cannot be less than 0.");
    }
  } else {
    console.error("Item not found in the cart.");
  }
}

function UpdateItemDetails(cartItems, cartItemIndex, cartItem) {
  const quantityText = document.getElementById(`quantity-text-${cartItem.id}`);
  if (quantityText) {
    quantityText.textContent = `${cartItems[cartItemIndex].quantity}`;
  }

  const price = document.getElementById(`price-${cartItem.id}`);
  if (price) {
    price.textContent = `${
      cartItems[cartItemIndex].quantity * cartItems[cartItemIndex].price
    }`;
  }
}

function UpdateFinalPrice(cartItems) {
  const finalPriceElement = document.getElementById("final-price");

  let totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // if total price is zero, then we do not want to display final price, rather text statin that cart is empty
  if (totalPrice === 0) {
    // remove previous final price text, if there is any
    if (finalPriceElement) {
      finalPriceElement.remove();
    }
    const mainCard = document.getElementById("shoppingCard");
    const emptyCart = document.createElement("div");
    emptyCart.textContent = "Your cart is empty!";
    emptyCart.setAttribute(
      "class",
      "display-1 p-5 text-center fw-bold text-secondary"
    );
    mainCard.appendChild(emptyCart);
    return; // leave function
  }

  if (finalPriceElement) {
    finalPriceElement.textContent = `Final Price: ${totalPrice}€`;
    return;
  }
}

function GoBackToShop() {
  window.location = "./shop.html";
}

function Checkout() {
  window.location = "./checkout.html";
}
