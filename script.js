// Dev mode (ubah ke false kalau publish)
const isDev = true;
if (isDev) {
  document.getElementById("delete-history").classList.remove("hidden");
}

document.getElementById("delete-history").addEventListener("click", () => {
  const overlay = document.getElementById("delete-confirm-overlay");
  const title = document.getElementById("delete-confirm-title");
  const text = document.getElementById("delete-confirm-text");
  const yesBtn = document.getElementById("delete-yes");
  const noBtn = document.getElementById("delete-no");

  // Reset tampilan
  title.textContent = "Hapus Semua History?";
  text.textContent = "Anda yakin ingin menghapus semua riwayat transaksi?";
  yesBtn.style.display = "inline-block";
  noBtn.style.display = "inline-block";

  overlay.classList.remove("hidden");

  noBtn.onclick = () => {
    overlay.classList.add("hidden");
  };

  yesBtn.onclick = () => {
    // hapus data
    localStorage.removeItem("history");
    loadHistory();

    // ubah isi modal jadi pesan berhasil
    title.textContent = "✅ History Dihapus!";
    text.textContent = "Semua riwayat transaksi telah berhasil dihapus.";
    yesBtn.style.display = "none";
    noBtn.style.display = "none";

    // tutup otomatis 2 detik kemudian
    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 1500);
  };
});

// Tutup modal kalau klik luar kotak
document.getElementById("delete-confirm-overlay").addEventListener("click", (e) => {
  if (e.target.id === "delete-confirm-overlay") {
    e.target.classList.add("hidden");
  }
});

// ====== Maintenance Mode + Dev Access ======
const maintenanceMode = false;

// daftar kode akses yang diizinkan
const devAccessCodes = ["betatest", "dev1", "admin1"];

window.addEventListener("DOMContentLoaded", () => {
  if (maintenanceMode) {
    document.getElementById("maintenance").classList.remove("hidden");
    document.getElementById("app").style.display = "none";
  }
});

// Toggle form developer (popup)
document.getElementById("dev-toggle").addEventListener("click", () => {
  document.getElementById("dev-form").classList.remove("hidden");
});

// Cek kode akses developer
function checkDevCode() {
  const input = document.getElementById("dev-code").value.trim();
  const msg = document.getElementById("gate-message");

  if (devAccessCodes.includes(input)) {   // cek apakah ada di daftar
    document.getElementById("maintenance").classList.add("hidden");
    document.getElementById("app").style.display = "block";
    msg.textContent = "";
  } else {
    msg.textContent = "Kode akses salah!";
  }
}

// Tutup popup kalau klik luar card
document.getElementById("dev-form").addEventListener("click", (e) => {
  if (e.target.id === "dev-form") {
    e.target.classList.add("hidden");
  }
});

// ====== DATA PRODUK ====== 
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

// ====== TAMPILKAN PRODUK ======
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

// ====== KERANJANG ======
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
  const product = categories["Ayam"].find(p => p.id === id);
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
  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const li = document.createElement("li");
    li.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>${item.name}</span>
        <span>Rp ${itemTotal.toLocaleString()}</span>
      </div>
      <div style="margin-top: 4px; display: flex; align-items: center; gap: 5px;">
        <button onclick="decreaseQuantity(${item.id}, '${item.name}')">➖</button>
        <input type="number" min="1" value="${item.quantity}" 
          onchange="updateQuantity(${item.id}, '${item.name}', this.value)">
        <button onclick="increaseQuantity(${item.id}, '${item.name}')">➕</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  // Hitung diskon
  let discountAmount = 0;
  if (appliedPromo.discount > 0) {
    discountAmount = Math.floor(subtotal * appliedPromo.discount);
  }

  totalPriceElement.textContent = `Total: Rp ${(subtotal - discountAmount).toLocaleString()}`;
}

function updateQuantity(id, name, value) {
  const item = cart.find(p => p.id === id && p.name === name);
  if (item) {
    const qty = parseInt(value);
    if (qty > 0) {
      item.quantity = qty;
    } else {
      const index = cart.findIndex(p => p.id === id && p.name === name);
      cart.splice(index, 1);
    }
    updateCart();
  }
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
  cart.length = 0;
  updateCart();
});

const toggleCartBtn = document.getElementById("toggle-cart");
const cartPanel = document.getElementById("cart-panel");

toggleCartBtn.addEventListener("click", () => {
  if (cartPanel.classList.contains("active")) {
    cartPanel.classList.remove("active");
    setTimeout(() => cartPanel.classList.add("hidden"), 300);
    toggleCartBtn.textContent = "🛒 Lihat Keranjang";
  } else {
    cartPanel.classList.remove("hidden");
    setTimeout(() => cartPanel.classList.add("active"), 10);
    toggleCartBtn.textContent = "❌ Tutup Keranjang";
  }
});

// ====== CHECKOUT ======
function checkout() {
  const warning = document.getElementById("recipient-warning");
  warning.textContent = ""; // reset pesan

  if (cart.length === 0) {
    warning.textContent = "Keranjang masih kosong!";
    return;
  }

  const recipientName = document.getElementById("recipient-name").value.trim();
  if (!recipientName) {
    warning.textContent = "⚠️ Harap isi nama penerima sebelum checkout!";
    // Tambahkan efek getar biar kelihatan
    const input = document.getElementById("recipient-name");
    input.style.borderColor = "red";
    input.classList.add("shake");
    setTimeout(() => {
      input.classList.remove("shake");
      input.style.borderColor = "#ccc";
    }, 600);
    return;
  }

  // Lanjut ke proses normal
  const overlay = document.getElementById('confirm-overlay');
  const itemsUl = document.getElementById('cf-items');

  const paySelect = document.getElementById('payment');
  document.getElementById('cf-payment').textContent =
    paySelect ? paySelect.selectedOptions[0].textContent : '-';

  document.getElementById("cf-recipient").textContent = recipientName;

  // ====== Lanjut ke ringkasan ======
  itemsUl.innerHTML = '';
  let subtotal = 0;
  cart.forEach(it => {
    const total = it.price * it.quantity;
    subtotal += total;
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="kv">
        <span>${it.name} x${it.quantity}</span>
        <span>Rp ${total.toLocaleString()}</span>
      </div>
    `;
    itemsUl.appendChild(li);
  });

  let discountAmount = 0;
  if (appliedPromo.discount > 0) {
    discountAmount = Math.floor(subtotal * appliedPromo.discount);
  }

  document.getElementById('cf-subtotal').textContent = `Rp ${subtotal.toLocaleString()}`;
  document.getElementById('cf-discount').textContent = `Rp ${discountAmount.toLocaleString()}`;
  document.getElementById('cf-total').textContent = `Rp ${(subtotal - discountAmount).toLocaleString()}`;

  overlay.classList.remove('hidden');
}

// Tutup modal
document.getElementById('confirm-close').addEventListener('click', () => {
  document.getElementById('confirm-overlay').classList.add('hidden');
});
document.getElementById('confirm-overlay').addEventListener('click', (e) => {
  if (e.target.id === 'confirm-overlay') {
    e.target.classList.add('hidden');
  }
});

// ====== KONFIRMASI ORDER (Redirect ke WhatsApp + Simpan History) ======
document.getElementById('confirm-order').addEventListener('click', () => {
  const subtotal = document.getElementById('cf-subtotal').textContent;
  const discount = document.getElementById('cf-discount').textContent;
  const total = document.getElementById('cf-total').textContent;

// Ambil nama penerima
const recipientName = document.getElementById("recipient-name").value || "-";

// Metode pembayaran
const paySelect = document.getElementById("payment");
const paymentMethod = paySelect ? paySelect.selectedOptions[0].textContent : "-";

// Buat pesan WA
let message = "Halo, saya mau pesan:%0A";
cart.forEach(it => {
  message += `- ${it.name} x${it.quantity} = Rp ${(it.price * it.quantity).toLocaleString()}%0A`;
});
message += `%0ASubtotal: ${subtotal}%0ADiskon: ${discount}%0ATotal: ${total}%0A`;
message += `%0AMetode Pembayaran: ${paymentMethod}`;
message += `%0AAtas Nama: ${recipientName}`;

  // Nomor WA tujuan
  const phone = "6285148348928"; // GANTI dengan nomor WA kamu

  // Redirect ke WA
  const waUrl = `https://wa.me/${phone}?text=${message}`;
  window.open(waUrl, "_blank");

  // Simpan ke history
  const order = {
    items: [...cart],
    subtotal,
    discount,
    total,
    payment: paymentMethod,
    recipient: recipientName,
    date: new Date().toLocaleString()
  };
  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.push(order);
  localStorage.setItem("history", JSON.stringify(history));

  // Reset keranjang
  cart.length = 0;
  updateCart();
  document.getElementById('confirm-overlay').classList.add('hidden');
});

// ====== PROMO ======
let appliedPromo = { code: null, discount: 0 };
let usedPromos = JSON.parse(localStorage.getItem("usedPromos")) || [];

function applyPromo() {
  const code = document.getElementById("promo-code").value.trim().toUpperCase();
  const msg = document.getElementById("promo-message");

  // Jika kosong
  if (!code) {
    msg.textContent = "Masukkan kode promo terlebih dahulu.";
    msg.style.color = "red";
    return;
  }

  // Cek apakah sudah pernah dipakai
  if (usedPromos.includes(code)) {
    msg.textContent = "Kode promo ini sudah pernah digunakan!";
    msg.style.color = "red";
    return;
  }

  // Daftar kode promo valid
  const promos = {
    "DISKON10": 0.10,
    "DISKON5": 0.05,
    "GRANDOPENING": 1.00,
    "HEMAT": 0.15
  };

  if (promos.hasOwnProperty(code)) {
    appliedPromo = { code, discount: promos[code] };
    msg.textContent = `Kode promo berhasil! Diskon ${(promos[code] * 100)}% diterapkan.`;
    msg.style.color = "green";

    // Simpan promo yang sudah dipakai
    usedPromos.push(code);
    localStorage.setItem("usedPromos", JSON.stringify(usedPromos));

  } else {
    appliedPromo = { code: null, discount: 0 };
    msg.textContent = "Kode promo tidak valid.";
    msg.style.color = "red";
  }

  updateCart();
}

// ====== HISTORY ======
function loadHistory() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const listDiv = document.getElementById("history-list");

  if (!history.length) {
    listDiv.innerHTML = "<p>Belum ada transaksi.</p>";
  } else {
    listDiv.innerHTML = "";
    history.forEach((h, idx) => {
      const div = document.createElement("div");
      div.classList.add("confirm-section");
      div.innerHTML = `
        <h3>Transaksi #${idx + 1} (${h.date})</h3>
        <ul>
          ${h.items.map(it => `<li>${it.name} x${it.quantity} - Rp ${(it.price*it.quantity).toLocaleString()}</li>`).join("")}
        </ul>
        <p>Subtotal: ${h.subtotal}</p>
        <p>Diskon: ${h.discount}</p>
        <p><b>Total: ${h.total}</b></p>
      `;
      listDiv.appendChild(div);
    });
  }
}

document.getElementById("view-history").addEventListener("click", () => {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const listDiv = document.getElementById("history-list");
  listDiv.innerHTML = "";

  if (history.length === 0) {
    listDiv.innerHTML = "<p>Belum ada transaksi.</p>";
  } else {
        history.forEach((h, i) => {
      const div = document.createElement("div");
      div.classList.add("confirm-section");
      div.innerHTML = `
        <h3>Transaksi #${i+1} (${h.date})</h3>
        <ul>
          ${h.items.map(it => `<li>${it.name} x${it.quantity} - Rp ${(it.price*it.quantity).toLocaleString()}</li>`).join("")}
        </ul>
        <p>Subtotal: ${h.subtotal}</p>
        <p>Diskon: ${h.discount}</p>
        <p><b>Total: ${h.total}</b></p>
      `;
      listDiv.appendChild(div);
    });  // ✅ ini nutup forEach
  }       // ✅ ini nutup else

  document.getElementById("history-overlay").classList.remove("hidden");
});       // ✅ ini nutup addEventListener
  document.getElementById("history-close").addEventListener("click", () => {
  document.getElementById("history-overlay").classList.add("hidden");

});

