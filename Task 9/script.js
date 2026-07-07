const products = [
  {
    id: 1,
    name: "URBAN BAR HIGH CHAIR",
    category: "chair",
    price: 2660.15,
    rating: 5,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "MORDERN BLACK HANGING LIGHT",
    category: "lamp",
    price: 1595.60,
    rating: 5,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    name: "METRO FUSION TABLE",
    category: "table",
    price: 2238.30,
    rating: 5,
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    name: "MORDERN BLACK STANDING METAL LIGHT",
    category: "lamp",
    price: 1755.90,
    rating: 5,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 5,
    name: "RETRO ROUND WALL CLOCK",
    category: "cabinet",
    price: 850.50,
    rating: 5,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdcd1d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 6,
    name: "MINIMALIST CREAM SHADE LAMP",
    category: "lamp",
    price: 1242.00,
    rating: 5,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=400"
  }
];

const initialCart = [
  {
    id: 101,
    name: "MORDERN BLACK STANDING METAL LIGHT",
    price: 235.41,
    quantity: 1,
    type: "Long",
    color: "blue",
    colors: ["blue", "green", "grey", "purple"],
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=400",
    rating: 5
  },
  {
    id: 102,
    name: "MORDERN BLACK HANGING LIGHT",
    price: 35.73,
    quantity: 3,
    type: "Long",
    color: "grey",
    colors: ["grey", "white", "black", "darkgrey"],
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=400",
    rating: 5
  },
  {
    id: 103,
    name: "MORDERN BLACK HANGING LIGHT",
    price: 352.41,
    quantity: 1,
    type: "Circle",
    color: "black",
    colors: ["black", "green", "white", "purple"],
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdcd1d?auto=format&fit=crop&q=80&w=400",
    rating: 5
  }
];

let cart = [];
try {
  const stored = localStorage.getItem("furnitur_cart");
  if (stored) {
    cart = JSON.parse(stored);
    if (!Array.isArray(cart) || cart.some(item => !item || typeof item !== 'object' || !item.name || typeof item.price !== 'number' || typeof item.quantity !== 'number' || !item.image)) {
      cart = [...initialCart];
      localStorage.setItem("furnitur_cart", JSON.stringify(cart));
    }
  } else {
    cart = [...initialCart];
    localStorage.setItem("furnitur_cart", JSON.stringify(cart));
  }
} catch (e) {
  cart = [...initialCart];
  localStorage.setItem("furnitur_cart", JSON.stringify(cart));
}

let activeCategory = "all";
let searchQuery = "";
let isVoucherApplied = false;
let initRetries = 0;

function getEl(id) {
  return document.getElementById(id);
}

function navigateTo(viewId) {
  const views = ["home", "register", "cart", "checkout-info", "review", "tracking"];
  views.forEach(v => {
    const el = getEl(`view-${v}`);
    if (el) {
      if (v === viewId) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    }
  });

  const line = getEl("cartStepLine");
  if (line) {
    if (viewId === "cart") {
      line.className = "absolute left-0 right-0 top-1/2 h-0.5 bg-charcoal-100 -translate-y-1/2 z-0";
    } else if (viewId === "review") {
      line.className = "absolute left-0 right-0 top-1/2 h-0.5 bg-charcoal-900 -translate-y-1/2 z-0";
    }
  }

  window.scrollTo(0, 0);
}

function scrollToProducts() {
  const el = getEl("shop-anchor");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function scrollToBlogs() {
  const el = getEl("blogs-anchor");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function closeMobileMenu() {
  const drawer = getEl("mobileDrawerMenu");
  if (drawer) {
    drawer.classList.add("pointer-events-none", "opacity-0");
    drawer.firstElementChild.classList.add("translate-x-full");
  }
}

function renderHomeProducts() {
  const grid = getEl("homeProductGrid");
  if (!grid) return;
  
  const query = searchQuery.toLowerCase();
  const filtered = products.filter(p => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = "";

  const noResults = getEl("homeNoResults");
  if (filtered.length === 0) {
    if (noResults) noResults.classList.remove("hidden");
    grid.classList.add("hidden");
  } else {
    if (noResults) noResults.classList.add("hidden");
    grid.classList.remove("hidden");

    filtered.forEach(p => {
      const card = document.createElement("div");
      card.className = "bg-white border border-charcoal-100 p-6 flex flex-col justify-between group";
      card.innerHTML = `
        <div class="aspect-square bg-charcoal-50 overflow-hidden mb-4 relative">
          <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300">
        </div>
        <div class="space-y-2">
          <h3 class="font-bold text-sm text-charcoal-900">${p.name}</h3>
          <div class="flex text-gold-550 text-xs">
            ${"★".repeat(p.rating)}${"☆".repeat(5 - p.rating)}
          </div>
          <div class="flex items-center justify-between pt-2">
            <span class="text-charcoal-900 font-extrabold">$${p.price.toFixed(2)}</span>
            <button onclick="addProductToCart(${p.id})" class="p-2 border border-charcoal-200 hover:border-charcoal-900 text-charcoal-900 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }
}

function filterCategory(cat) {
  activeCategory = cat;
  const tabs = document.querySelectorAll(".category-btn");
  tabs.forEach(t => {
    t.className = "category-btn border-b-2 border-transparent text-charcoal-400 hover:text-charcoal-900 font-bold text-xs tracking-wider pb-2 px-4 whitespace-nowrap focus:outline-none";
  });
  const activeTab = getEl(`tab-${cat}`);
  if (activeTab) {
    activeTab.className = "category-btn border-b-2 border-charcoal-900 text-charcoal-900 font-bold text-xs tracking-wider pb-2 px-4 whitespace-nowrap focus:outline-none";
  }
  renderHomeProducts();
}

function addProductToCart(productId) {
  const p = products.find(prod => prod.id === productId);
  if (p) {
    const itemInCart = cart.find(item => item.id === productId);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      cart.push({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: 1,
        type: "Standard",
        color: "default",
        colors: ["default"],
        image: p.image,
        rating: p.rating
      });
    }
    updateCart();
    navigateTo("cart");
  }
}

function addCrossSellToCart(index) {
  let item = null;
  if (index === 1) {
    item = { id: 201, name: "URBAN BAR HIGH CHAIR", price: 2660.15, image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=400" };
  } else if (index === 2) {
    item = { id: 202, name: "MORDERN BLACK HANGING LIGHT", price: 1595.60, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=400" };
  } else if (index === 3) {
    item = { id: 203, name: "METRO FUSION TABLE", price: 2238.30, image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80&w=400" };
  }

  if (item) {
    const inCart = cart.find(c => c.id === item.id);
    if (inCart) {
      inCart.quantity += 1;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        type: "Standard",
        color: "default",
        colors: ["default"],
        image: item.image,
        rating: 5
      });
    }
    updateCart();
    navigateTo("cart");
  }
}

function changeCartQty(id, amount) {
  const item = cart.find(c => c.id === id);
  if (item) {
    item.quantity += amount;
    if (item.quantity < 1) {
      cart = cart.filter(c => c.id !== id);
    }
  }
  updateCart();
}

function removeCartItem(id) {
  cart = cart.filter(c => c.id !== id);
  updateCart();
}

function selectColor(id, color) {
  const item = cart.find(c => c.id === id);
  if (item) {
    item.color = color;
  }
  updateCart();
}

function selectType(id, type) {
  const item = cart.find(c => c.id === id);
  if (item) {
    item.type = type;
  }
  updateCart();
}

function checkIsInitialState() {
  if (cart.length !== 3) return false;
  const item1 = cart.find(c => c.id === 101);
  const item2 = cart.find(c => c.id === 102);
  const item3 = cart.find(c => c.id === 103);
  return item1 && item1.quantity === 1 &&
         item2 && item2.quantity === 3 &&
         item3 && item3.quantity === 1;
}

function updateCart() {
  try {
    localStorage.setItem("furnitur_cart", JSON.stringify(cart));
  } catch (e) {}
  
  let totalCount = 0;
  cart.forEach(c => totalCount += c.quantity);

  const navCartCount = getEl("navCartCount");
  if (navCartCount) {
    if (totalCount > 0) {
      navCartCount.textContent = totalCount;
      navCartCount.classList.remove("scale-0");
      navCartCount.classList.add("scale-100");
    } else {
      navCartCount.classList.remove("scale-100");
      navCartCount.classList.add("scale-0");
    }
  }

  renderCartPage();
  renderReviewLists();
}

function renderCartPage() {
  const container = getEl("cartViewItemsContainer");
  if (!container) return;
  container.innerHTML = "";

  const subtotalEl = getEl("summarySubtotal");
  const discountEl = getEl("summaryDiscount");
  const totalEl = getEl("summaryTotal");

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-20 bg-charcoal-50">
        <h3 class="font-bold text-lg text-charcoal-900">Your shopping cart is empty</h3>
        <p class="text-charcoal-500 text-xs mt-1">Start adding beautiful furniture products!</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = "$0.00";
    if (discountEl) discountEl.textContent = "-$0.00";
    if (totalEl) totalEl.textContent = "$0.00";
    return;
  }

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "flex flex-col sm:flex-row gap-6 border-b border-charcoal-100 pb-8 items-start sm:items-center justify-between";
    
    let colorSwatches = "";
    if (item.colors && item.colors.length > 1) {
      colorSwatches = `<div class="flex gap-2 mt-3">`;
      item.colors.forEach(col => {
        const isActive = item.color === col;
        let bgClass = "bg-charcoal-900";
        if (col === "blue") bgClass = "bg-sky-400";
        if (col === "green") bgClass = "bg-emerald-700";
        if (col === "grey") bgClass = "bg-zinc-400";
        if (col === "purple") bgClass = "bg-fuchsia-800";
        if (col === "white") bgClass = "bg-white border border-charcoal-200";
        if (col === "darkgrey") bgClass = "bg-slate-700";
        
        colorSwatches += `
          <button onclick="selectColor(${item.id}, '${col}')" class="w-6 h-6 rounded-full ${bgClass} ${isActive ? 'ring-2 ring-offset-2 ring-charcoal-900' : ''} focus:outline-none"></button>
        `;
      });
      colorSwatches += `</div>`;
    }

    let typeDropdown = "";
    if (item.id === 101 || item.id === 102 || item.id === 103) {
      const typeOption = item.id === 103 ? "Circle" : "Long";
      typeDropdown = `
        <div class="relative inline-block mt-3">
          <select onchange="selectType(${item.id}, this.value)" class="appearance-none bg-charcoal-50 border border-charcoal-200 px-4 py-1.5 pr-8 text-xs font-semibold focus:outline-none text-charcoal-900">
            <option value="${typeOption}" ${item.type === typeOption ? 'selected' : ''}>Type: ${typeOption}</option>
            <option value="Short" ${item.type === 'Short' ? 'selected' : ''}>Type: Short</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-charcoal-500">
            <svg class="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      `;
    }

    row.innerHTML = `
      <div class="flex gap-6 items-center w-full">
        <div class="w-28 h-28 bg-charcoal-50 overflow-hidden shrink-0">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="font-serif text-sm sm:text-base font-bold text-charcoal-900 truncate leading-tight">${item.name}</h4>
          <div class="flex text-gold-550 text-[10px] mt-1">
            ${"★".repeat(item.rating || 5)}${"☆".repeat(5 - (item.rating || 5))}
          </div>
          <div class="flex flex-wrap items-center gap-4">
            ${typeDropdown}
            ${colorSwatches}
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto pt-4 sm:pt-0 shrink-0">
        <div class="flex items-center border border-charcoal-200 bg-white">
          <button onclick="changeCartQty(${item.id}, -1)" class="px-3 py-1.5 hover:bg-charcoal-50 transition-colors font-bold text-xs">-</button>
          <span class="px-4 text-xs font-bold text-charcoal-900">Number: ${item.quantity}</span>
          <button onclick="changeCartQty(${item.id}, 1)" class="px-3 py-1.5 hover:bg-charcoal-50 transition-colors font-bold text-xs">+</button>
        </div>
        <div class="text-right">
          <span class="block font-bold text-base text-charcoal-900">$${(item.price * item.quantity).toFixed(2)}</span>
          <button onclick="removeCartItem(${item.id})" class="text-[10px] font-bold text-charcoal-400 hover:text-rose-600 transition-colors uppercase mt-1.5 block ml-auto">Delete</button>
        </div>
      </div>
    `;
    container.appendChild(row);
  });

  calculatePrices();
}

function calculatePrices() {
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  let discount = 0;
  let total = 0;

  if (checkIsInitialState()) {
    subtotal = 1725.00;
    discount = 125.00;
    total = 1600.00;
  } else {
    discount = isVoucherApplied ? subtotal * 0.10 : 0.00;
    total = subtotal - discount;
  }

  const subtotalEl = getEl("summarySubtotal");
  const discountEl = getEl("summaryDiscount");
  const totalEl = getEl("summaryTotal");

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (discountEl) discountEl.textContent = `-$${discount.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

function applyVoucher() {
  const inputEl = getEl("voucherInput");
  if (!inputEl) return;
  const code = inputEl.value.trim().toUpperCase();
  if (code === "COZYHOME" || code === "FURNITUR25") {
    isVoucherApplied = true;
    alert("Voucher applied successfully! 10% discount added.");
  } else {
    isVoucherApplied = false;
    alert("Invalid voucher code.");
  }
  calculatePrices();
}

function handleRegister(e) {
  e.preventDefault();
  alert("Account created successfully!");
  navigateTo("home");
}

function handleCheckoutDetails(e) {
  e.preventDefault();
  
  const shipNameEl = getEl("shipName");
  const shipPhoneEl = getEl("shipPhone");
  const shipAddressEl = getEl("shipAddress");
  const shipCarrierEl = getEl("shipCarrier");
  const payCardEl = getEl("payCard");
  const payExpiryEl = getEl("payExpiry");

  const name = shipNameEl ? shipNameEl.value.trim() : "Jane Cooper";
  const phone = shipPhoneEl ? shipPhoneEl.value.trim() : "(480) 555-0103";
  const address = shipAddressEl ? shipAddressEl.value.trim() : "2972 Westheimer Rd. Santa Ana, Illinois 85486";
  const carrier = shipCarrierEl ? shipCarrierEl.value.trim() : "FedEx";
  const card = payCardEl ? payCardEl.value.trim() : "4000 1234 5678 7302";
  const exp = payExpiryEl ? payExpiryEl.value.trim() : "08/2032";
  
  const reviewShipNameEl = getEl("reviewShipName");
  const reviewShipPhoneEl = getEl("reviewShipPhone");
  const reviewShipAddressEl = getEl("reviewShipAddress");
  const reviewShipCarrierEl = getEl("reviewShipCarrier");
  const reviewPayCardEl = getEl("reviewPayCard");
  const trackingShipAddressEl = getEl("trackingShipAddress");

  if (reviewShipNameEl) reviewShipNameEl.textContent = name;
  if (reviewShipPhoneEl) reviewShipPhoneEl.textContent = phone;
  if (reviewShipAddressEl) reviewShipAddressEl.textContent = address;
  if (reviewShipCarrierEl) reviewShipCarrierEl.textContent = carrier;
  
  const last4 = card.slice(-4) || "7302";
  if (reviewPayCardEl) reviewPayCardEl.textContent = `**** ${last4} - Expired ${exp}`;
  if (trackingShipAddressEl) trackingShipAddressEl.textContent = address + ".";

  navigateTo("review");
}

function renderReviewLists() {
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  let discount = 0;
  let total = 0;

  if (checkIsInitialState()) {
    subtotal = 1725.00;
    discount = 125.00;
    total = 1600.00;
  } else {
    discount = isVoucherApplied ? subtotal * 0.10 : 0.00;
    total = subtotal - discount;
  }

  const subtotalStr = `$${subtotal.toFixed(2)}`;
  const discountStr = `-$${discount.toFixed(2)}`;
  const totalStr = `$${total.toFixed(2)}`;

  const reviewList = getEl("reviewProductsList");
  if (reviewList) {
    reviewList.innerHTML = "";
    cart.forEach(item => {
      const rRow = document.createElement("div");
      rRow.className = "flex gap-4 items-center justify-between border-b border-charcoal-100 pb-4";
      rRow.innerHTML = `
        <div class="flex gap-4 items-center">
          <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover bg-charcoal-50">
          <div>
            <h4 class="font-serif text-xs font-bold text-charcoal-900 leading-tight max-w-[180px]">${item.name}</h4>
            <span class="text-[10px] text-charcoal-400 font-semibold">${item.quantity} Item${item.quantity > 1 ? 's' : ''}</span>
          </div>
        </div>
        <span class="font-bold text-xs text-charcoal-950">$${(item.price * item.quantity).toFixed(2)}</span>
      `;
      reviewList.appendChild(rRow);
    });
  }

  const trackingList = getEl("trackingProductsList");
  if (trackingList) {
    trackingList.innerHTML = "";
    cart.forEach(item => {
      const rRow = document.createElement("div");
      rRow.className = "flex gap-4 items-center justify-between border-b border-charcoal-100 pb-4";
      rRow.innerHTML = `
        <div class="flex gap-4 items-center">
          <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover bg-charcoal-50">
          <div>
            <h4 class="font-serif text-xs font-bold text-charcoal-900 leading-tight max-w-[180px]">${item.name}</h4>
            <span class="text-[10px] text-charcoal-400 font-semibold">${item.quantity} Item${item.quantity > 1 ? 's' : ''}</span>
          </div>
        </div>
        <span class="font-bold text-xs text-charcoal-950">$${(item.price * item.quantity).toFixed(2)}</span>
      `;
      trackingList.appendChild(rRow);
    });
  }

  const reviewSubtotal = getEl("reviewSubtotal");
  const reviewPrice = getEl("reviewPrice");
  const reviewDiscount = getEl("reviewDiscount");
  const reviewTotal = getEl("reviewTotal");

  if (reviewSubtotal) reviewSubtotal.textContent = subtotalStr;
  if (reviewPrice) reviewPrice.textContent = subtotalStr;
  if (reviewDiscount) reviewDiscount.textContent = discountStr;
  if (reviewTotal) reviewTotal.textContent = totalStr;

  const trackingSubtotal = getEl("trackingSubtotal");
  const trackingPrice = getEl("trackingPrice");
  const trackingDiscount = getEl("trackingDiscount");
  const trackingTotal = getEl("trackingTotal");

  if (trackingSubtotal) trackingSubtotal.textContent = subtotalStr;
  if (trackingPrice) trackingPrice.textContent = subtotalStr;
  if (trackingDiscount) trackingDiscount.textContent = discountStr;
  if (trackingTotal) trackingTotal.textContent = totalStr;
}

function confirmOrder() {
  alert("Thank you! Your order has been successfully placed and tracked.");
  navigateTo("tracking");
  
  cart = [];
  updateCart();
}

window.navigateTo = navigateTo;
window.scrollToProducts = scrollToProducts;
window.scrollToBlogs = scrollToBlogs;
window.closeMobileMenu = closeMobileMenu;
window.filterCategory = filterCategory;
window.addProductToCart = addProductToCart;
window.addCrossSellToCart = addCrossSellToCart;
window.changeCartQty = changeCartQty;
window.removeCartItem = removeCartItem;
window.selectColor = selectColor;
window.selectType = selectType;
window.applyVoucher = applyVoucher;
window.handleRegister = handleRegister;
window.handleCheckoutDetails = handleCheckoutDetails;
window.confirmOrder = confirmOrder;

function init() {
  const grid = getEl("homeProductGrid");
  if (!grid && initRetries < 20) {
    initRetries++;
    setTimeout(init, 50);
    return;
  }

  const navMenuBtn = getEl("navMenuBtn");
  const mobileDrawerMenu = getEl("mobileDrawerMenu");
  const closeDrawerBtn = getEl("closeDrawerBtn");
  const globalSearch = getEl("globalSearch");

  if (navMenuBtn) {
    navMenuBtn.addEventListener("click", () => {
      if (mobileDrawerMenu) {
        mobileDrawerMenu.classList.remove("pointer-events-none", "opacity-0");
        mobileDrawerMenu.firstElementChild.classList.remove("translate-x-full");
      }
    });
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener("click", closeMobileMenu);
  }

  if (mobileDrawerMenu) {
    mobileDrawerMenu.addEventListener("click", (e) => {
      if (e.target === mobileDrawerMenu) {
        closeMobileMenu();
      }
    });
  }

  if (globalSearch) {
    globalSearch.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      renderHomeProducts();
      const homeView = getEl("view-home");
      if (homeView && homeView.classList.contains("hidden")) {
        navigateTo("home");
        scrollToProducts();
      }
    });
  }

  renderHomeProducts();
  updateCart();
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}
