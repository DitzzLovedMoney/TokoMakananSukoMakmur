// ====== DATA PRODUK KELOMPOK ====== 
const categories = { 
  "Nasi Goreng": [ 
  { id: 1, name: "Nasi Goreng Sayur", description: "Dengan sayur segar.", price: 17000 },
  { id: 2, name: "Nasi Goreng Telur", description: "Dengan telur orak-arik.", price: 18000 }, 
  { id: 3, name: "Nasi Goreng Ayam", description: "Dengan ayam suwir.", price: 19000 }, 
  { id: 4, name: "Nasi Goreng Seafood", description: "Dengan seafood lengkap.", price: 22000 }, 
  ], 
  "Mie Ayam": [ 
  { id: 5, name: "Mie Ayam Biasa", description: "Dengan ayam dan sayur.", price: 17000 }, 
  { id: 6, name: "Mie Ayam Ceker", description: "Tambahan ceker ayam.", price: 19000 }, 
  { id: 7, name: "Mie Ayam Bakso", description: "Dengan bakso kenyal.", price: 20000 }, 
  { id: 8, name: "Mie Ayam Bakso Jumbo", description: "Bakso jumbo + ayam.", price: 23000 }, 
  ], 
  "Bakso": [ 
  { id: 9, name: "Bakso Biasa", description: "Isi 5 + mie + kuah.", price: 17000 }, 
  { id: 10, name: "Bakso Jumbo", description: "Bakso besar isi daging.", price: 21000 }, 
  { id: 11, name: "Bakso Urat", description: "Dengan urat daging sapi.", price: 20000 }, 
  { id: 12, name: "Bakso Telur", description: "Isi telur puyuh.", price: 19000 }, 
  ], 
  "Kwetiau & Bihun": [ 
  { id: 13, name: "Kwetiau Goreng", description: "Kwetiau goreng lezat.", price: 19000 }, 
  { id: 14, name: "Kwetiau Kuah", description: "Dengan kuah kaldu.", price: 19000 }, 
  { id: 15, name: "Bihun Goreng", description: "Manis gurih pedas.", price: 18000 }, 
  { id: 16, name: "Bihun Kuah", description: "Hangat dan gurih.", price: 18000 }, 
  ], 
  "Menu Ayam": [ 
  { id: 17, name: "Ayam Geprek", description: "Pilih level pedas 1–5", price: 22000, isGeprek: true }, 
  { id: 18, name: "Ayam Goreng Biasa", description: "Ayam goreng bumbu tradisional.", price: 18000 }, 
  { id: 19, name: "Ayam Krispi", description: "Ayam goreng tepung renyah.", price: 19000 }, 
  { id: 20, name: "Ayam Goreng Kremes", description: "Ayam goreng + kremesan.", price: 19000 }, 
  ] 
};

// ====== TAMPILKAN PRODUK PER KATEGORI ======
const productList = document.getElementById("product-list");
for (const [category, items] of Object.entries(categories)) {
  const section = document.createElement("div");
  const heading = document.createElement("h2");
  heading.textContent = category;
  section.appendChild(heading);

  const grid = document.createElement("div");
  grid.className = "grid";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    if (item.isGeprek) {
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <label for="level-${item.id}">Level Pedas:</label>
        <select id="level-${item.id}">
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="4">Level 4</option>
          <option value="5">Level 5</option>
        </select>
        <p class="price">Rp ${item.price.toLocaleString()}</p>
        <button class="btn" onclick="addGeprekToCart(${item.id})">Tambah ke Keranjang</button>
      `;
    } else {
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p class="price">Rp ${item.price.toLocaleString()}</p>
        <button class="btn" onclick="addToCart(${item.id})">Tambah ke Keranjang</button>
      `;
    }

    grid.appendChild(card);
  });

  section.appendChild(grid);
  productList.appendChild(section);
}

// ====== KERANJANG BELANJA ======
const cart = [];
const cartItems = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

function addToCart(id) {
  let product;
  for (const items of Object.values(categories)) {
    product = items.find(p => p.id === id);
    if (product) break;
  }

  const existing = cart.find(p => p.name === product.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  }

  updateCart();
}

function addGeprekToCart(id) {
  const level = document.getElementById(`level-${id}`).value;
  const product = categories["Menu Ayam"].find(p => p.id === id);
  const nameWithLevel = `${product.name} Level ${level}`;

  const existing = cart.find(p => p.name === nameWithLevel);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: id, name: nameWithLevel, price: product.price, quantity: 1 });
  }

  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.quantity} - Rp ${itemTotal.toLocaleString()}
      <button onclick="decreaseQuantity(${item.id}, '${item.name}')">➖</button>
      <button onclick="increaseQuantity(${item.id}, '${item.name}')">➕</button>
    `;
    cartItems.appendChild(li);
  });

  totalPriceElement.textContent = `Total: Rp ${total.toLocaleString()}`;
}

function increaseQuantity(id, name) {
  const item = cart.find(p => p.id === id && p.name === name);
  if (item) {
    item.quantity += 1;
    updateCart();
  }
}

function decreaseQuantity(id, name) {
  const index = cart.findIndex(p => p.id === id && p.name === name);
  if (index !== -1) {
    cart[index].quantity -= 1;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    updateCart();
  }
}