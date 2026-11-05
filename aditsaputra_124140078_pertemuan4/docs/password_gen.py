"""Modul untuk memilih karakter acak dari huruf dan angka."""
import random
import string


def buat_password_acak(panjang: int = 8) -> str:
    """Kumpulan karakter yang boleh muncul pada password."""
    karakter = string.ascii_letters + string.digits
    password = ""
    """Pilih satu karakter acak sebanyak panjang yang diminta."""
    for _ in range(panjang):
        password += random.choice(karakter)
    return password
