
"""Permainan berulang sampai pengguna menebak angka rahasia dengan benar."""
angka_rahasia = 7

while True:
    tebakan = int(input("Tebak angka: "))
    """Beri petunjuk arah berdasarkan perbandingan tebakan dengan jawaban."""
    if tebakan < angka_rahasia:
        print("Terlalu kecil!")
    elif tebakan > angka_rahasia:
        print("Terlalu besar!")
    else:
        print("Selamat, tebakan benar!")
        break
