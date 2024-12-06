function DisplayCartItems() {
  let e = JSON.parse(localStorage.getItem("currentCartItems")),
    t = document.getElementById("shoppingCard"),
    n = 0;
  if (e && 0 !== e.length) {
    e.forEach((i) => {
      let a = document.createElement("div");
      (a.id = `cart-item-${i.id}`),
        a.setAttribute(
          "class",
          "p-3 border-bottom d-flex flex-md-row flex-column justify-content-around align-items-md-center align-items-xs-start gap-2 gap-md-5"
        );
      let l = document.createElement("img");
      (l.src = i.image_source),
        (l.style.width = "150px"),
        (l.style.height = "auto");
      let r = document.createElement("div");
      r.setAttribute("class", "mt-2 w-75");
      let d = document.createElement("div");
      d.setAttribute("class", "fw-bold"),
        (d.textContent = `${i.brand} ${i.model_name}`);
      let c = document.createElement("div");
      c.setAttribute("class", "text-wrap text-break"),
        (c.textContent = `${i.short_description}`),
        r.append(d, c);
      let s = document.createElement("div");
      s.setAttribute(
        "class",
        "mt-2 d-flex flex-row gap-2 align-items-center justify-content-start justify-content-md-center"
      );
      let o = document.createElement("div"),
        m = document.createElement("i");
      m.setAttribute("class", "bi bi-patch-plus-fill fs-3"),
        m.addEventListener("click", () => IncrementItemCount(e, i), !1),
        o.appendChild(m);
      let p = document.createElement("div");
      (p.id = `quantity-text-${i.id}`), (p.textContent = `${i.quantity}`);
      let u = document.createElement("div"),
        f = document.createElement("i");
      f.setAttribute("class", "bi bi-patch-minus-fill fs-3"),
        f.addEventListener("click", () => DecrementItemCount(e, i), !1),
        u.appendChild(f),
        s.append(u, p, o);
      let y = document.createElement("div");
      (y.id = `price-${i.id}`),
        y.setAttribute("class", "mt-2 fw-bold text-success"),
        (y.innerHTML = `${i.quantity * i.price}&euro;`);
      let I = document.createElement("i");
      I.setAttribute("class", "bi bi-trash-fill"),
        (I.id = `removeItem-${i.id}`),
        I.addEventListener("click", () => RemoveItem(e, i)),
        t.appendChild(a),
        a.appendChild(l),
        a.appendChild(r),
        a.appendChild(s),
        a.appendChild(y),
        a.appendChild(I),
        (n += i.quantity * i.price);
    });
    let i = document.createElement("div");
    (i.id = "final-price"),
      i.setAttribute("class", "text-end me-3 pb-4 fw-bold fs-5"),
      (i.innerHTML = `Final Price: ${n}&euro;`),
      t.appendChild(i);
  } else {
    let a = document.createElement("div");
    (a.textContent = "Your cart is empty!"),
      a.setAttribute(
        "class",
        "display-1 p-5 text-center fw-bold text-secondary"
      ),
      t.appendChild(a);
  }
}
function RemoveItem(e, t) {
  let n = e.findIndex((e) => e.id === t.id);
  if (-1 !== n) {
    e.splice(n, 1), UpdateLocalStorage(e);
    let i = document.getElementById(`cart-item-${t.id}`);
    i && i.remove(), UpdateFinalPrice(e);
  }
}
function UpdateLocalStorage(e) {
  localStorage.setItem("currentCartItems", JSON.stringify(e));
  let t = e.reduce((e, t) => e + t.quantity, 0),
    n = document.getElementById("cartCount");
  (n.textContent = t), localStorage.setItem("numberOfItemsInCart", t);
}
function IncrementItemCount(e, t) {
  let n = e.findIndex((e) => e.id === t.id);
  -1 !== n
    ? (e[n].quantity++,
      UpdateLocalStorage(e),
      UpdateItemDetails(e, n, t),
      UpdateFinalPrice(e))
    : console.error("Item not found in the cart.");
}
function DecrementItemCount(e, t) {
  let n = e.findIndex((e) => e.id === t.id);
  if (-1 !== n) {
    if (e[n].quantity > 0) {
      if ((e[n].quantity--, 0 === e[n].quantity)) {
        e.splice(n, 1);
        let i = document.getElementById(`cart-item-${t.id}`);
        i && i.remove();
      }
      UpdateLocalStorage(e), UpdateItemDetails(e, n, t), UpdateFinalPrice(e);
    } else console.error("Item quantity cannot be less than 0.");
  } else console.error("Item not found in the cart.");
}
function UpdateItemDetails(e, t, n) {
  let i = document.getElementById(`quantity-text-${n.id}`);
  i && (i.textContent = `${e[t].quantity}`);
  let a = document.getElementById(`price-${n.id}`);
  a && (a.textContent = `${e[t].quantity * e[t].price}`);
}
function UpdateFinalPrice(e) {
  let t = document.getElementById("final-price"),
    n = e.reduce((e, t) => e + t.quantity * t.price, 0);
  if (0 === n) {
    t && t.remove();
    let i = document.getElementById("shoppingCard"),
      a = document.createElement("div");
    (a.textContent = "Your cart is empty!"),
      a.setAttribute("class", "display-1 p-5 text-center"),
      i.appendChild(a);
    return;
  }
  if (t) {
    t.textContent = `Final Price: ${n}€`;
    return;
  }
}
function GoBackToShop() {
  window.location = "./shop.html";
}
function Checkout() {
  window.location = "./checkout.html";
}
document.addEventListener("DOMContentLoaded", () => {
  DisplayCartItems(),
    document
      .getElementById("goBack")
      .addEventListener("click", GoBackToShop, !1),
    document
      .getElementById("proceedToPayment")
      .addEventListener("click", Checkout, !1);
});
