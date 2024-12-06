function displayBikeProductItems(t) {
  let e = document.getElementById("products-container");
  t.forEach((t) => {
    let a = document.createElement("div");
    a.setAttribute("class", "col-md-6 col-lg-4");
    let n = document.createElement("div");
    n.setAttribute("class", "card shadow");
    let r = document.createElement("img");
    (r.src = t.image_source),
      (r.alt = t.model_name),
      r.setAttribute("class", "card-img-top"),
      r.setAttribute("alt", "Card image caption");
    let s = document.createElement("div");
    s.setAttribute("class", "card-body");
    let d = document.createElement("h5");
    (d.textContent = `${t.brand} ${t.model_name}`),
      d.setAttribute("class", "card-title fw-bold");
    let l = document.createElement("p");
    (l.textContent = `${t.short_description}...`),
      l.setAttribute("class", "card-text text-secondary");
    let c = document.createElement("div"),
      i = document.createElement("span");
    (i.textContent = "Year of Make : "), i.setAttribute("class", "fw-bold");
    let o = document.createElement("span");
    (o.textContent = `${t.year_of_make}`),
      o.setAttribute("class", "text-secondary"),
      c.setAttribute("class", "card-text "),
      c.append(i, o);
    let m = document.createElement("div"),
      p = document.createElement("span");
    (p.textContent = "Price : "), p.setAttribute("class", "fw-bold");
    let u = document.createElement("span");
    (u.innerHTML = `${t.price} &euro;`),
      u.setAttribute("class", "fw-bold text-success"),
      m.setAttribute("class", "card-text mt-3 mb-3"),
      m.append(p, u);
    let C = document.createElement("button");
    (C.type = "button"),
      (C.textContent = "Add to cart"),
      C.setAttribute("class", "btn btn-dark"),
      C.addEventListener(
        "click",
        function () {
          AddToCart(t);
        },
        !1
      ),
      e.appendChild(n),
      e.append(a),
      a.appendChild(n),
      n.appendChild(r),
      n.appendChild(s),
      s.appendChild(d),
      s.appendChild(l),
      s.appendChild(c),
      s.appendChild(m),
      s.appendChild(C);
  });
}
function AddToCart(t) {
  let e = parseInt(localStorage.getItem("numberOfItemsInCart")) || 0;
  e++, localStorage.setItem("numberOfItemsInCart", e), DisplayCartCount();
  let a = JSON.parse(localStorage.getItem("currentCartItems")) || [],
    n = a.findIndex((e) => e.id === t.id);
  -1 !== n ? (a[n].quantity += 1) : a.push({ ...t, quantity: 1 }),
    console.log(a),
    localStorage.setItem("currentCartItems", JSON.stringify(a));
}
function DisplayCartCount() {
  let t = document.getElementById("cartCount"),
    e = localStorage.getItem("numberOfItemsInCart") || 0;
  t.textContent = e;
}
document.addEventListener("DOMContentLoaded", async () => {
  let t = document.createElement("div");
  document.body.appendChild(t);
  try {
    let e = await fetch("../source/bikes.json"),
      a = await e.json();
    displayBikeProductItems(a);
  } catch (n) {
    console.error(n);
  }
});
