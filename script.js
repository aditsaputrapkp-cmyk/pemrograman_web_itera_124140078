"use strict";

// Array objek menjadi sumber data utama. Tampilan selalu dirender dari array ini.
const storageKey = "miniPosKeranjang";
const batasDiskon = 50000;
const persentaseDiskon = 0.1;
const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR", maximumFractionDigits: 2,
  minimumFractionDigits: 0
});

const itemForm = document.getElementById("item-form");
const nameInput = document.getElementById("item-name");
const priceInput = document.getElementById("item-price");
const qtyInput = document.getElementById("item-qty");
const paymentInput = document.getElementById("payment-input");
const cartBody = document.getElementById("cart-body");
const resetDialog = document.getElementById("reset-dialog");
let keranjang = [];

function formatRupiah(nilai) {
  return rupiahFormatter.format(nilai);
}

function bulatkanUang(nilai) {
  return Math.round((nilai + Number.EPSILON) * 100) / 100;
}

function tampilkanPesan(pesan) {
  const elemen = document.getElementById("transaction-message");
  elemen.textContent = pesan;
  elemen.hidden = pesan === "";
}

function tampilkanMasalahPenyimpanan(pesan) {
  const elemen = document.getElementById("storage-message");
  elemen.textContent = pesan;
  elemen.hidden = pesan === "";
  document.getElementById("storage-status").textContent = pesan
    ? "Penyimpanan browser bermasalah. Periksa pesan di atas."
    : "Keranjang tersimpan otomatis di browser.";
}

function tampilkanError(input, errorId, pesan) {
  document.getElementById(errorId).textContent = pesan;
  input.setAttribute("aria-invalid", pesan ? "true" : "false");
}

function bersihkanErrorForm() {
  tampilkanError(nameInput, "name-error", "");
  tampilkanError(priceInput, "price-error", "");
  tampilkanError(qtyInput, "qty-error", "");
}

// Number("") bernilai 0, sehingga input kosong diperiksa sebelum konversi.
function validasiBarang(nama, hargaMentah, qtyMentah) {
  const harga = Number(hargaMentah);
  const qty = Number(qtyMentah);
  const errors = { nama: "", harga: "", qty: "" };

  if (nama.trim().length < 3) {
    errors.nama = "Nama barang wajib diisi, minimal 3 karakter.";
  }
  if (hargaMentah.trim() === "" || !Number.isFinite(harga) || harga < 500) {
    errors.harga = "Harga satuan harus berupa angka positif minimal Rp500.";
  } else if (!Number.isSafeInteger(Math.round(harga * 100))) {
    errors.harga = "Nominal harga terlalu besar untuk dihitung dengan aman.";
  }
  if (qtyMentah.trim() === "" || !Number.isSafeInteger(qty) || qty < 1) {
    errors.qty = "Jumlah harus berupa bilangan bulat minimal 1.";
  }
  if (!errors.harga && !errors.qty && !Number.isSafeInteger(Math.round(harga * qty * 100))) {
    errors.qty = "Subtotal terlalu besar. Kurangi harga atau jumlah barang.";
  }
  return errors;
}

function simpanKeranjang() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(keranjang));
    tampilkanMasalahPenyimpanan("");
  } catch (error) {
    tampilkanMasalahPenyimpanan("Keranjang belum tersimpan. Izinkan penyimpanan browser; data saat ini dapat hilang setelah refresh.");
  }
}

function muatKeranjang() {
  try {
    const dataTersimpan = localStorage.getItem(storageKey);
    if (dataTersimpan === null) return;
    const data = JSON.parse(dataTersimpan);
    if (!Array.isArray(data)) throw new Error("Format keranjang tidak valid.");

    // Data dari storage juga diperiksa, sehingga JSON rusak tidak merusak UI.
    for (const barang of data) {
      if (!barang || typeof barang.nama !== "string" || typeof barang.harga !== "number" || typeof barang.qty !== "number") {
        throw new Error("Data barang tidak valid.");
      }
      const errors = validasiBarang(barang.nama, String(barang.harga), String(barang.qty));
      if (errors.nama || errors.harga || errors.qty) throw new Error("Data barang tidak valid.");
    }
    const ringkasan = hitungRingkasan(data);
    if (!Number.isSafeInteger(Math.round(ringkasan.totalBelanja * 100))) {
      throw new Error("Total keranjang terlalu besar.");
    }
    keranjang = data.map(function (barang) {
      return { nama: barang.nama.trim(), harga: barang.harga, qty: barang.qty };
    });
    tampilkanMasalahPenyimpanan("");
  } catch (error) {
    keranjang = [];
    tampilkanMasalahPenyimpanan("Data keranjang gagal dimuat atau tidak valid. Klik Transaksi Baru / Reset untuk membersihkan data yang bermasalah.");
  }
}

// Perulangan menjumlahkan subtotal seluruh barang, lalu menentukan diskon.
function hitungRingkasan(daftarBarang) {
  let totalSen = 0;
  let jumlahUnit = 0;
  for (const barang of daftarBarang) {
    totalSen += Math.round(barang.harga * barang.qty * 100);
    jumlahUnit += barang.qty;
  }
  const totalBelanja = totalSen / 100;
  const diskon = totalBelanja >= batasDiskon
    ? bulatkanUang(totalBelanja * persentaseDiskon) : 0;
  const totalAkhir = bulatkanUang(totalBelanja - diskon);
  return { totalBelanja, diskon, totalAkhir, jumlahUnit };
}

function buatSel(teks, className = "") {
  const sel = document.createElement("td");
  sel.textContent = teks; // Nama barang diperlakukan sebagai teks, bukan HTML.
  sel.className = className;
  return sel;
}

function renderKeranjang() {
  cartBody.replaceChildren();
  keranjang.forEach(function (barang, index) {
    const baris = document.createElement("tr");
    baris.appendChild(buatSel(String(index + 1)));
    baris.appendChild(buatSel(barang.nama));
    baris.appendChild(buatSel(formatRupiah(barang.harga), "number-cell"));
    baris.appendChild(buatSel(String(barang.qty), "number-cell"));
    baris.appendChild(buatSel(formatRupiah(bulatkanUang(barang.harga * barang.qty)), "number-cell"));

    const selAksi = document.createElement("td");
    const tombolHapus = document.createElement("button");
    tombolHapus.type = "button";
    tombolHapus.className = "delete-button";
    tombolHapus.textContent = "Hapus";
    tombolHapus.setAttribute("aria-label", "Hapus " + barang.nama);
    tombolHapus.addEventListener("click", function () { hapusBarang(index); });
    selAksi.appendChild(tombolHapus);
    baris.appendChild(selAksi);
    cartBody.appendChild(baris);
  });

  document.getElementById("empty-state").hidden = keranjang.length !== 0;
  const hasil = hitungRingkasan(keranjang);
  document.getElementById("cart-count").textContent = keranjang.length + " barang · " + hasil.jumlahUnit + " unit";
  document.getElementById("subtotal-value").textContent = formatRupiah(hasil.totalBelanja);
  document.getElementById("discount-value").textContent = "− " + formatRupiah(hasil.diskon);
  document.getElementById("discount-label").textContent = hasil.totalBelanja >= batasDiskon ? "(10%)" : "(0%)";
  document.getElementById("total-value").textContent = formatRupiah(hasil.totalAkhir);

  let pesanDiskon = "Tambahkan barang untuk memulai transaksi.";
  if (hasil.totalBelanja >= batasDiskon) {
    pesanDiskon = "Diskon 10% sudah diterapkan pada transaksi ini.";
  } else if (keranjang.length > 0) {
    pesanDiskon = "Tambah " + formatRupiah(bulatkanUang(batasDiskon - hasil.totalBelanja)) + " lagi untuk mendapat diskon.";
  }
  document.getElementById("discount-note").textContent = pesanDiskon;
  hitungPembayaran();
}

function hapusBarang(index) {
  const nama = keranjang[index].nama;
  keranjang.splice(index, 1);
  simpanKeranjang();
  renderKeranjang();
  tampilkanPesan(nama + " dihapus dari keranjang.");
}

function hitungPembayaran() {
  const status = document.getElementById("payment-status");
  const change = document.getElementById("change-value");
  const nilaiMentah = paymentInput.value;
  const uangBayar = Number(nilaiMentah);
  const hasil = hitungRingkasan(keranjang);
  status.className = "payment-status";
  change.textContent = "—";
  tampilkanError(paymentInput, "payment-error", "");

  if (keranjang.length === 0) {
    status.textContent = "Tambahkan barang terlebih dahulu.";
    return;
  }
  if (nilaiMentah.trim() === "" && !paymentInput.validity.badInput) {
    status.textContent = "Masukkan nominal uang bayar untuk menghitung kembalian.";
    return;
  }
  if (paymentInput.validity.badInput || !Number.isFinite(uangBayar) || uangBayar < 0 || !Number.isSafeInteger(Math.round(uangBayar * 100))) {
    tampilkanError(paymentInput, "payment-error", "Uang bayar harus berupa angka valid dan tidak boleh negatif.");
    status.textContent = "Periksa nominal pembayaran.";
    status.classList.add("error");
    return;
  }

  const selisih = bulatkanUang(uangBayar - hasil.totalAkhir);
  if (selisih < 0) {
    status.textContent = "Uang belum mencukupi. Kekurangan " + formatRupiah(-selisih) + ".";
    status.classList.add("error");
  } else {
    change.textContent = formatRupiah(selisih);
    status.textContent = selisih === 0 ? "Pembayaran pas. Tidak ada kembalian." : "Uang mencukupi. Kembalian siap diberikan.";
    status.classList.add("success");
  }
}

function transaksiBaru() {
  keranjang = [];
  itemForm.reset();
  paymentInput.value = "";
  bersihkanErrorForm();
  try {
    // Hanya data Mini POS dihapus; data aplikasi lain di browser tetap aman.
    localStorage.removeItem(storageKey);
    tampilkanMasalahPenyimpanan("");
  } catch (error) {
    tampilkanMasalahPenyimpanan("Keranjang di halaman sudah kosong, tetapi data browser gagal dibersihkan. Izinkan penyimpanan sebelum refresh.");
  }
  renderKeranjang();
  tampilkanPesan("Transaksi baru siap. Keranjang dan uang bayar sudah dikosongkan.");
  nameInput.focus();
}

itemForm.addEventListener("submit", function (event) {
  event.preventDefault();
  tampilkanPesan("");
  const nama = nameInput.value.trim();
  const errors = validasiBarang(nama, priceInput.value, qtyInput.value);
  tampilkanError(nameInput, "name-error", errors.nama);
  tampilkanError(priceInput, "price-error", errors.harga);
  tampilkanError(qtyInput, "qty-error", errors.qty);
  if (errors.nama || errors.harga || errors.qty) {
    if (errors.nama) nameInput.focus();
    else if (errors.harga) priceInput.focus();
    else qtyInput.focus();
    return;
  }

  const barang = { nama: nama, harga: Number(priceInput.value), qty: Number(qtyInput.value) };
  const calonKeranjang = [...keranjang, barang];
  if (!Number.isSafeInteger(Math.round(hitungRingkasan(calonKeranjang).totalBelanja * 100))) {
    tampilkanError(priceInput, "price-error", "Total transaksi terlalu besar untuk dihitung dengan aman.");
    return;
  }
  keranjang.push(barang);
  simpanKeranjang();
  renderKeranjang();
  itemForm.reset();
  bersihkanErrorForm();
  tampilkanPesan(nama + " ditambahkan ke keranjang.");
  nameInput.focus();
});

paymentInput.addEventListener("input", hitungPembayaran);
document.getElementById("reset-button").addEventListener("click", function () { resetDialog.showModal(); });
document.getElementById("cancel-reset").addEventListener("click", function () { resetDialog.close(); });
document.getElementById("confirm-reset").addEventListener("click", function () {
  resetDialog.close();
  transaksiBaru();
});

muatKeranjang();
renderKeranjang();
