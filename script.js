let cart = [];

document.querySelectorAll(".menu-card").forEach((card) => {
  const minus = card.querySelector(".quantity button:first-child");
  const plus = card.querySelector(".quantity button:last-child");
  const qtyDisplay = card.querySelector(".quantity span");

  let quantity = 1;

  plus.addEventListener("click", () => {
    quantity++;
    qtyDisplay.textContent = quantity;
  });

  minus.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      qtyDisplay.textContent = quantity;
    }
  });
});

const cartCount = document.getElementById("cart-count");

document.querySelectorAll(".menu-card").forEach((card) => {
  const addBtn = card.querySelector(".add-btn");

  addBtn.addEventListener("click", () => {
    const name = card.querySelector("h3").textContent;
    const qty = parseInt(card.querySelector(".quantity span").textContent);

    const select = card.querySelector("select");
    const meat = select ? select.value : null;

    const notesField = card.querySelector("textarea");
    const notes = notesField ? notesField.value : null;

    const price = getPrice(name);

    const item = {
      name,
      quantity: qty,
      meat,
      notes,
      price,
    };
    cart.push(item);
    updateCartCount();
  });
});

function updateCartCount() {
  let total = 0;

  cart.forEach((item) => {
    total += item.quantity;
  });

  document.getElementById("cart-count").textContent = total;
}

const cartIcon = document.querySelector(".cart-icon");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");

cartIcon.addEventListener("click", () => {
  renderCart();
  cartModal.style.display = "block";
});

closeCart.addEventListener("click", () => {
  cartModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
  }
});

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    div.innerHTML = `
      <strong>${item.name}</strong><br>
      Quantity: ${item.quantity}<br>
      ${item.meat ? "Meat: " + item.meat + "<br>" : ""}
      ${item.notes ? "Notes: " + item.notes + "<br>" : ""}
      Price: $${item.price.toFixed(2)}<br>
      Item Total: $${itemTotal.toFixed(2)}<br>
    `;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    removeBtn.addEventListener("click", () => {
      removeItem(index);
    });

    div.appendChild(removeBtn);
    cartItemsContainer.appendChild(div);
  });

  document.getElementById("cart-total").textContent =
    `Total: $${total.toFixed(2)}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCart();
}

function getPrice(name) {
  const prices = {
    Tacos: 3.75,
    "Regular Burrito": 15.5,
    "Super Burrito": 16.25,
    "Wet Burrito": 18.25,
    Quesadillas: 14.5,
    Chilaquiles: 17.25,
    "Chorizo Plate": 19.25,
    Enchiladas: 19.5,
    Huaraches: 12.5,
    Horchata: 4.25,
    Jamaica: 4.25,
    Jarritos: 3.25,
  };

  return prices[name] || 0;
}
