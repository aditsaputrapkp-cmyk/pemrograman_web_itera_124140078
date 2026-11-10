# =====================================================================
# Berkas: 01_everything_is_object.py
# Deskripsi: Eksplorasi objek bawaan dengan type(), id(), dan __class__
# =====================================================================

# Nilai dasar Python merupakan instance dari class bawaan.
angka = 42
pesan = "Praktikum Pemrograman Web ITERA"
daftar_nilai = [85, 90, 78]

print("Tipe objek 'angka'        :", type(angka), "| Class:", angka.__class__)
print("Tipe objek 'pesan'        :", type(pesan), "| Class:", pesan.__class__)
print("Tipe objek 'daftar_nilai' :", type(daftar_nilai), "| Class:", daftar_nilai.__class__)

# Method upper() dan split() berasal dari class str.
print("\nManipulasi string via method class str:")
print("Versi Huruf Besar :", pesan.upper())
print("Pecah Kata        :", pesan.split(" "))

# Fungsi juga merupakan objek tingkat pertama.
def salam():
    """Mengembalikan salam sederhana."""
    return "Halo dari fungsi!"


print("\nTipe objek fungsi 'salam' :", type(salam))
print("Identitas memori (id)     :", hex(id(salam)))
