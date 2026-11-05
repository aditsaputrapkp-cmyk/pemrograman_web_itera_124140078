def validasi_password(password: str) -> bool:
    """Memeriksa apakah kata sandi memuat setidaknya satu angka."""
    ada_angka = False
    for karakter in password:
        if karakter.isdigit():
            ada_angka = True
    """Kata sandi sah jika panjangnya minimal 8 karakter dan mengandung angka."""
    return len(password) >= 8 and ada_angka


"""Daftar contoh untuk melihat hasil validasi pada beberapa kata sandi."""
daftar_uji = ["abc123", "password", "password1", "12345678", "Ab1",
              "belajarpython3"]

for pw in daftar_uji:
    print(f"{pw:<16} -> {validasi_password(pw)}")
