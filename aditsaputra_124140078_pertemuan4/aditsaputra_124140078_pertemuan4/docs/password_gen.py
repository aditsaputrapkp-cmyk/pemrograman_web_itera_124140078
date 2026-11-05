import random
import string


def buat_password_acak(panjang: int = 8) -> str:
    karakter = string.ascii_letters + string.digits
    password = ""
    for _ in range(panjang):
        password += random.choice(karakter)
    return password
