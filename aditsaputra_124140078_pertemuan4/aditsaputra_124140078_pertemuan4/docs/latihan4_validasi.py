def validasi_password(password: str) -> bool:
    ada_angka = False
    for karakter in password:
        if karakter.isdigit():
            ada_angka = True
    return len(password) >= 8 and ada_angka


daftar_uji = ["abc123", "password", "password1", "12345678", "Ab1",
              "belajarpython3"]

for pw in daftar_uji:
    print(f"{pw:<16} -> {validasi_password(pw)}")
