
"""Membaca suhu dalam Celsius dan menghitung padanan Fahrenheit serta Kelvin."""
celsius = float(input("Suhu (Celsius): "))

fahrenheit = celsius * 9 / 5 + 32
kelvin = celsius + 273.15

"""Menampilkan hasil konversi dengan dua angka di belakang koma."""
print(f"{celsius:.2f} C = {fahrenheit:.2f} F")
print(f"{celsius:.2f} C = {kelvin:.2f} K")
