
nama = "Adit Saputra"
nim = 124140078
angkatan = 2024
minat = "Pengembangan Web"

print("Nama", "NIM", "Angkatan", "Minat Penelitian", sep=" | ")
print(nama, nim, angkatan, minat, sep=" | ")

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

print("\nNama:\t" + nama)
print("NIM:\t" + str(nim))
