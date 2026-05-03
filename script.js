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

    const item = {
      name,
      quantity: qty,
      meat,
      notes,
    };
    cart.push(item);
    updateCartCount();
  });

  function updateCartCount() {
    let total = 0;

    cart.forEach((item) => {
      total += item.quantity;
    });
    cartCount.textContent = total;
  }
});

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

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <strong>${item.name}</strong><br>
      Quantity: ${item.quantity}<br>
      ${item.meat ? "Meat: " + item.meat + "<br>" : ""}
      ${item.notes ? "Notes: " + item.notes + "<br>" : ""}
      <button onclick="removeItem(${index})">Remove</button>
    `;

    cartItemsContainer.appendChild(div);
  });
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCart();
}
