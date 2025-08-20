// ====== DATA PRODUK KELOMPOK ====== 
const categories = { 
  "Nasi Goreng": [ 
  { id: 1, name: "Nasi Goreng Sayur", price: 13000, image: "src/Nasgor-Sayur.jpeg" },
  { id: 2, name: "Nasi Goreng Telur", price: 15000, image: "src/Nasgor-Telur.jpeg" }, 
  { id: 3, name: "Nasi Goreng Ayam", price: 16500, image: "src/Nasgor-Ayam.jpeg" }, 
  { id: 4, name: "Nasi Goreng Seafood", price: 20000, image: "src/Nasgor-Seafood.jpeg" }, 
  ], 
  "Mie Ayam": [ 
  { id: 5, name: "Mie Ayam", price: 10000, image: "src/mie-ayam.jpeg" }, 
  { id: 6, name: "Mie Ayam Ceker", price: 12000, image: "src/mie-ayam-ceker.jpeg" }, 
  { id: 7, name: "Mie Ayam Bakso", price: 13000, image: "src/mie-ayam-bakso.jpeg" }, 
  { id: 8, name: "Mie Ayam Bakso Jumbo", price: 15000, image: "src/mie-ayam-bakso-jumbo.jpeg" }, 
  ], 
  "Bakso": [ 
  { id: 9, name: "Bakso Biasa", price: 11000, image: "src/Bakso-Biasa.jpeg" }, 
  { id: 10, name: "Bakso Jumbo", price: 13000, image: "src/Bakso-Jumbo.jpeg" }, 
  { id: 11, name: "Bakso Urat", price: 18000, image: "src/Bakso-Urat.jpeg" }, 
  { id: 12, name: "Bakso Telur", price: 16000, image: "src/Bakso-Telur.jpeg" }, 
  ], 
  "Kwetiau & Bihun": [ 
  { id: 13, name: "Kwetiau Goreng", price: 19000, image: "src/Kwetiau-Goreng.jpeg" }, 
  { id: 14, name: "Kwetiau Kuah", price: 19000, image: "src/Kwetiau-Kuah.jpeg" }, 
  { id: 15, name: "Bihun Goreng", price: 18000, image: "src/Bihun-Goreng.jpeg" }, 
  { id: 16, name: "Bihun Kuah", price: 18000, image: "src/Bihun-Kuah.jpeg" }, 
  ], 
  "Ayam": [ 
  { id: 17, name: "Ayam Geprek", price: 16500, image: "src/Ayam-Geprek.jpeg", isGeprek: true }, 
  { id: 18, name: "Ayam Goreng", price: 10000, image: "src/Ayam-Goreng.jpeg" }, 
  { id: 19, name: "Ayam Krispi", price: 13000, image: "src/Ayam-Krispi.jpeg" }, 
  { id: 20, name: "Ayam Goreng Kremes", price: 15000, image: "src/Ayam-Kremes.jpeg " }, 
  ],
  "Minuman": [
  { id: 23, name: "Teh Panas", price: 3500, image: "src/Teh-Panas.jpeg" },
  { id: 24, name: "Teh Dingin", price: 3500, image: "src/Es-Teh.jpeg" },
  { id: 25, name: "Jeruk Panas", price: 3500, image: "src/Jeruk-Panas.jpeg" },
  { id: 26, name: "Jeruk Dingin", price: 3500, image: "src/Es-Jeruk.jpeg" }
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
    <img src="${item.image}" alt="${item.name}" class="product-image">
    <h3>${item.name}</h3>
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
    <img src="${item.image}" alt="${item.name}" class="product-image">
    <h3>${item.name}</h3>
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

document.getElementById("clear-cart").addEventListener("click", () => {
  cart.length = 0; // Kosongkan array keranjang
  updateCart();    // Perbarui tampilan
})
