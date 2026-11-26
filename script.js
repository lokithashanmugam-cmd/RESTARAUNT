const menuItems = [
  {
    name: "Garden glow bowl",
    category: "Veg",
    price: 12,
    description: "Crisp greens, roasted sweet potato, avocado & lemon tahini.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Creamy tomato pasta",
    category: "Veg",
    price: 14,
    description: "Slow-cooked tomato, basil, parmesan & a little kitchen magic.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Crispy halloumi pita",
    category: "Veg",
    price: 13,
    description: "Golden halloumi, crunchy slaw & herby yoghurt in warm pita.",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Miso-glazed salmon",
    category: "Non-Veg",
    price: 19,
    description: "Sweet-savoury glaze, sesame rice & bright seasonal greens.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Sunday roast chicken",
    category: "Non-Veg",
    price: 18,
    description: "Herb-roasted chicken, buttery potatoes & pan gravy.",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Mango cloud cheesecake",
    category: "Desserts",
    price: 8,
    description: "Silky cheesecake, ripe mango & a buttery biscuit base.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Brown butter cookies",
    category: "Desserts",
    price: 6,
    description: "Warm, chewy, chocolate-studded and made fresh each day.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&q=80",
    isNew: true
  },
  {
    name: "Chilli crunch tofu",
    category: "Veg",
    price: 15,
    description: "Crispy tofu, sticky chilli crunch & fluffy jasmine rice.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80",
    isNew: true
  }
];

const menuGrid = document.querySelector("#menu-grid");
const cartCount = document.querySelector(".cart-count");
const cartButton = document.querySelector(".cart-button");
const filterButtons = document.querySelectorAll(".filter-button");
const orderForm = document.querySelector("#order-form");
const formFeedback = document.querySelector("#form-feedback");
let cartItems = 0;

function renderMenu(category = "All") {
  const itemsToShow = category === "All"
    ? menuItems
    : menuItems.filter((item) => item.category === category);

  menuGrid.innerHTML = itemsToShow.map((item) => `
    <article class="menu-card">
      <div class="card-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <span class="category-tag">${item.category}</span>
        ${item.isNew ? '<span class="new-tag">New</span>' : ""}
      </div>
      <div class="card-content">
        <div class="card-title-row">
          <h3>${item.name}</h3>
          <span class="card-price">$${item.price}</span>
        </div>
        <p class="card-description">${item.description}</p>
        <button class="add-button" type="button" data-item="${item.name}">
          Add to cart <span aria-hidden="true">+</span>
        </button>
      </div>
    </article>
  `).join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((filter) => {
      const isSelected = filter === button;
      filter.classList.toggle("active", isSelected);
      filter.setAttribute("aria-pressed", String(isSelected));
    });
    renderMenu(button.dataset.filter);
  });
});

menuGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-button");
  if (!addButton) return;

  cartItems += 1;
  cartCount.textContent = String(cartItems);
  cartButton.setAttribute("aria-label", `Your cart, ${cartItems} ${cartItems === 1 ? "item" : "items"}`);
  addButton.innerHTML = "Added! <span aria-hidden=\"true\">✓</span>";
  window.setTimeout(() => {
    if (addButton.isConnected) {
      addButton.innerHTML = "Add to cart <span aria-hidden=\"true\">+</span>";
    }
  }, 1100);
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formFeedback.classList.remove("error");

  if (!orderForm.checkValidity()) {
    orderForm.reportValidity();
    formFeedback.textContent = "Please fill in each field with valid details.";
    formFeedback.classList.add("error");
    return;
  }

  const customerName = orderForm.elements.name.value.trim();
  formFeedback.textContent = `Thanks, ${customerName}! Your note is ready for our team.`;
  orderForm.reset();
});

renderMenu();
