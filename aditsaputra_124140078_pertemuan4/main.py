
"""Mengimpor modul dan beberapa fungsi yang akan dipakai untuk contoh perhitungan."""
import math_operations
from math_operations import luas_lingkaran, keliling_lingkaran
from math_operations import celsius_ke_fahrenheit as c_ke_f
from math_operations import celsius_ke_kelvin as c_ke_k

"""Menguji fungsi luas dan keliling persegi untuk beberapa panjang sisi."""
print("Persegi")
for sisi in [3, 5, 8.5]:
    luas = math_operations.luas_persegi(sisi)
    keliling = math_operations.keliling_persegi(sisi)
    print(f"sisi {sisi}: luas = {luas:.2f}, keliling = {keliling:.2f}")

"""Menguji perhitungan persegi panjang dengan pasangan panjang dan lebar."""
print("\nPersegi panjang")
for p, l in [(4, 2), (10, 6), (7.5, 3)]:
    luas = math_operations.luas_persegi_panjang(p, l)
    keliling = math_operations.keliling_persegi_panjang(p, l)
    print(f"{p} x {l}: luas = {luas:.2f}, keliling = {keliling:.2f}")

"""Menggunakan konstanta PI dan fungsi lingkaran dari modul."""
print(f"\nLingkaran (PI = {math_operations.PI})")
for r in [7, 10, 3.5]:
    print(f"r {r}: luas = {luas_lingkaran(r):.2f}, "
          f"keliling = {keliling_lingkaran(r):.2f}")

"""Menampilkan hasil konversi Celsius ke Fahrenheit dan Kelvin."""
print("\nKonversi suhu")
for c in [0, 25, 37, 100]:
    print(f"{c} C = {c_ke_f(c):.2f} F = {c_ke_k(c):.2f} K")
