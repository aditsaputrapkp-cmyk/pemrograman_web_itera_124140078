# Mini POS — Kantin Kampus

## Identitas

| Keterangan | Isi |
| --- | --- |
| Nama Lengkap | Adit Saputra |
| NIM | 124140078 |
| Kelas Praktikum | RA |
| Program Studi | Teknik Informatika, Institut Teknologi Sumatera |
| Pertemuan | 1 — JavaScript Dasar |

## Deskripsi Aplikasi

Mini POS merupakan aplikasi kasir sederhana untuk kantin atau toko kampus. Aplikasi digunakan untuk mencatat barang dalam keranjang, menghitung total belanja dan diskon, serta menentukan kembalian dari uang yang diterima kasir. Data keranjang disimpan menggunakan localStorage agar tetap tersedia saat halaman di-refresh.

Tampilan disusun berurutan ke bawah: **form input barang → keranjang belanja → ringkasan pembayaran**. Aplikasi dibuat menggunakan HTML, CSS, dan JavaScript tanpa framework.

## Struktur Proyek

Nama repository: **`pemrograman_web_itera_124140078`**.

Nama folder pertemuan: **`aditsaputra_124140078_pertemuan1`**.

| File atau folder di dalam folder pertemuan | Fungsi |
| --- | --- |
| `index.html` | Struktur aplikasi Mini POS. |
| `style.css` | Tampilan aplikasi dan tata letak responsif. |
| `script.js` | Validasi, perhitungan, pengelolaan keranjang, dan localStorage. |
| `README.md` | Seluruh dokumentasi tugas dan praktikum. |
| `modul/index.html` | Halaman contoh praktikum JavaScript Dasar. |
| `modul/style.css` | Styling sederhana untuk halaman praktikum. |
| `modul/script.js` | Contoh kode dari langkah-langkah praktikum. |
| `screenshots/` | Tempat menyimpan screenshot aplikasi. |

## Panduan Menjalankan

1. Ekstrak ZIP, lalu buka folder `pemrograman_web_itera_124140078` di VS Code.
2. Pasang ekstensi **Live Server** apabila belum tersedia.
3. Klik kanan pada `aditsaputra_124140078_pertemuan1/index.html`, lalu pilih **Open with Live Server**.
4. Isi nama barang, harga satuan, dan jumlah. Klik **Tambah Barang** untuk memasukkan data ke keranjang.
5. Isi **Uang Bayar** setelah barang ditambahkan untuk melihat kembalian atau kekurangan uang.
6. Gunakan **Hapus** untuk menghapus satu barang. Gunakan **Transaksi Baru / Reset**, lalu **Ya, Kosongkan** setelah transaksi selesai.
7. Untuk menjalankan contoh praktikum, buka `modul/index.html` menggunakan Live Server. Hasil `console.log()` dapat dilihat melalui **F12 → Console**.

File `index.html` juga dapat dibuka langsung di browser. Live Server disarankan agar penyimpanan browser konsisten. Fetch API pada halaman praktikum membutuhkan internet, sedangkan Mini POS tidak memerlukan koneksi API.

## Daftar Fitur

- [x] Validasi nama barang wajib diisi, minimal 3 karakter.
- [x] Validasi harga satuan berupa angka positif minimal Rp500.
- [x] Validasi jumlah berupa bilangan bulat minimal 1.
- [x] Pesan kesalahan merah ditampilkan di bawah input terkait; barang tidak valid ditolak.
- [x] Form otomatis dikosongkan setelah penambahan berhasil.
- [x] Tabel keranjang menampilkan No, Nama Barang, Harga Satuan, Qty, Subtotal, dan Aksi.
- [x] Subtotal dan total belanja dihitung otomatis.
- [x] Diskon otomatis 10% untuk total belanja minimal Rp50.000.
- [x] Nominal diskon dan total akhir ditampilkan dalam format Rupiah.
- [x] Kembalian dihitung saat uang bayar diisi; kekurangan uang diberi keterangan.
- [x] Hapus barang memperbarui total, diskon, dan kembalian.
- [x] Keranjang disimpan dan dimuat menggunakan localStorage.
- [x] Transaksi baru mengosongkan keranjang dan membersihkan penyimpanan Mini POS.
- [x] File HTML, CSS, dan JavaScript dipisahkan; tampilan menyesuaikan layar kecil.

## Isi Folder Praktikum `modul/`

| Materi | Contoh yang dijalankan |
| --- | --- |
| Variabel & Kondisional | `var`, `let`, `const`, output console dan HTML, grade nilai, ternary, dan `switch` nama hari. |
| Loop & Fungsi | `for` daftar nilai dan rata-rata, `while` countdown, `for...of`, fungsi sapaan, serta kalkulator tambah, kurang, kali, dan bagi. |
| Array & Objek | Array buah dengan `push`, `pop`, `sort`, `map`, dan `filter`; objek mahasiswa dengan method serta tambah, ubah, dan hapus properti. |
| DOM & API | Tambah item, hapus item terakhir, ubah warna latar, serta Fetch API yang menampilkan lima post menggunakan `async/await` dan `try/catch`. |

Folder ini mengikuti contoh pada langkah praktikum. Data Budi dan Budi Santoso merupakan data contoh materi. ID judul countdown dibedakan dari ID tempat output agar hasil perulangan tampil pada elemen yang benar.

## Tangkapan Layar

Dokumentasi aplikasi terdiri dari empat screenshot yang tersimpan di folder `screenshots/`.

### 1. Form Utama

Form input menampilkan kolom **Nama Barang**, **Harga Satuan**, dan **Jumlah / Qty**, tombol **Tambah Barang**, serta tombol **Transaksi Baru / Reset**. Petunjuk di bawah input menjelaskan batas minimal nama 3 karakter, harga Rp500, dan jumlah 1.

![Form utama Mini POS dengan kolom nama barang, harga satuan, dan jumlah](screenshots/Form%20Utama.png)

### 2. Validasi Error

Screenshot memperlihatkan input **Air Mineral** dengan harga **Rp499** dan jumlah **0**. Setelah tombol **Tambah Barang** ditekan, pesan kesalahan merah muncul pada harga dan jumlah karena harga minimal Rp500 dan jumlah harus berupa bilangan bulat minimal 1. Data tersebut tidak ditambahkan ke keranjang.

![Validasi error pada harga Rp499 dan jumlah 0](screenshots/Validasi%20Error.png)

### 3. Tabel Barang

Keranjang menampilkan **3 barang dengan total 6 unit**. Setiap baris memuat nomor, nama barang, harga satuan, jumlah, subtotal, dan tombol **Hapus**. Data pada screenshot adalah:

| Nama Barang | Harga Satuan | Qty | Subtotal |
| --- | --- | --- | --- |
| Buku Tulis | Rp7.000 | 1 | Rp7.000 |
| Pulpen | Rp3.000 | 2 | Rp6.000 |
| Sampul | Rp500 | 3 | Rp1.500 |
| **Total** | | **6** | **Rp14.500** |

![Tabel keranjang berisi Buku Tulis, Pulpen, dan Sampul](screenshots/Tabel%20Barang.png)

### 4. Ringkasan Pembayaran

Total belanja dan total akhir adalah **Rp14.500**. Diskon masih **0% (Rp0)** karena total belanja belum mencapai Rp50.000; aplikasi menampilkan informasi bahwa diperlukan tambahan Rp35.500 untuk mendapat diskon. Dengan uang bayar **Rp15.000**, kembalian yang ditampilkan adalah **Rp500**, disertai status bahwa uang mencukupi.

![Ringkasan pembayaran dengan total Rp14.500, uang bayar Rp15.000, dan kembalian Rp500](screenshots/Ringkasan%20Pembayaran.png)

## Penjelasan Teknis Singkat

### Validasi input

Event `submit` ditangani menggunakan `event.preventDefault()` agar halaman tidak di-refresh. Fungsi `validasiBarang()` memeriksa nama setelah `trim()`, harga sebagai angka minimal 500, serta jumlah sebagai bilangan bulat minimal 1. Jika terdapat kesalahan, pesan ditampilkan di bawah input dan penambahan dihentikan. Jika valid, objek barang dimasukkan ke array `keranjang`, disimpan, dan dirender ke tabel. Form kemudian di-reset.

### Perhitungan transaksi

Fungsi `hitungRingkasan()` menghitung subtotal setiap barang dan menjumlahkannya menggunakan perulangan. Diskon ditentukan dari total belanja, lalu dikurangi untuk memperoleh total akhir. Event `input` pada uang bayar memanggil `hitungPembayaran()` untuk menghitung kembalian. Fungsi ini juga dijalankan setelah isi keranjang berubah.

| Perhitungan | Rumus |
| --- | --- |
| Subtotal | Harga Satuan × Qty |
| Total Belanja | Jumlah seluruh subtotal |
| Diskon | 10% × Total Belanja jika total ≥ Rp50.000; selain itu 0 |
| Total Akhir | Total Belanja − Diskon |
| Kembalian | Uang Bayar − Total Akhir |

Jika uang bayar kurang, aplikasi menampilkan jumlah kekurangannya. Jika uang pas, kembalian bernilai Rp0. Sesuai screenshot tabel barang dan ringkasan pembayaran, total belanja adalah Rp7.000 + Rp6.000 + Rp1.500 = Rp14.500. Karena total belum mencapai Rp50.000, diskon bernilai Rp0 dan total akhir tetap Rp14.500. Pembayaran Rp15.000 menghasilkan kembalian Rp500.

### Serialisasi localStorage

`simpanKeranjang()` menyimpan array dengan `JSON.stringify()` menggunakan key `miniPosKeranjang`. Saat halaman dibuka, `muatKeranjang()` membaca data menggunakan `JSON.parse()`, memeriksa formatnya, lalu menampilkannya kembali. Kesalahan pembacaan atau penyimpanan ditangani dengan pesan peringatan.

Transaksi baru menggunakan `localStorage.removeItem("miniPosKeranjang")`. Nominal uang bayar tidak disimpan sehingga perlu diisi kembali setelah refresh. Penyimpanan berlaku pada browser dan alamat aplikasi yang sama.

## Pengumpulan

Buat repository GitHub **Public** bernama `pemrograman_web_itera_124140078`, lalu unggah folder `aditsaputra_124140078_pertemuan1` beserta isinya langsung ke root repository. Sertakan folder `screenshots/` yang berisi empat gambar dokumentasi di atas. Pastikan identitas dan seluruh file sudah lengkap sebelum mengirim URL repository melalui formulir kelas **RA**.
