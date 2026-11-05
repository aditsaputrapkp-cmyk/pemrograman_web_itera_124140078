
# Menyiapkan data identitas yang akan ditampilkan.
nama = "Adit Saputra"
nim = 124140078
angkatan = 2024
minat = "Pengembangan Web"

# Menampilkan identitas dalam satu baris dengan pemisah kolom.
print("Nama", "NIM", "Angkatan", "Minat Penelitian", sep=" | ")
print(nama, nim, angkatan, minat, sep=" | ")

# Menyusun isi kartu, lalu merapikan setiap baris agar membentuk kotak.
lebar = 38
baris = [
    "KARTU IDENTITAS",
    "",
    f"Nama     : {nama}",
    f"NIM      : {nim}",
    f"Angkatan : {angkatan}",
    f"Minat    : {minat}",
]
kartu = "#" * lebar + "\n"
for isi in baris:
    kartu += "# " + isi.ljust(lebar - 4) + " #\n"
kartu += "#" * lebar
print("\n" + kartu)

# Contoh penggunaan tab dan konversi angka NIM menjadi teks.
print("\nNama:\t" + nama)
print("NIM:\t" + str(nim))
