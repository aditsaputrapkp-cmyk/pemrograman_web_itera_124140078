
# Mengimpor fungsi pembuat password dari modul lokal.
import password_gen

# Memperlihatkan password default dan password dengan panjang yang ditentukan.
print("Password default :", password_gen.buat_password_acak())
print("Password 12 huruf:", password_gen.buat_password_acak(12))
print("Password 16 huruf:", password_gen.buat_password_acak(panjang=16))
