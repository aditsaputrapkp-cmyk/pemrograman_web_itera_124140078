
"""Konstanta PI dipakai oleh rumus luas dan keliling lingkaran."""
PI = 3.14159


"""Rumus dasar luas dan keliling bangun datar."""
def luas_persegi(sisi: float) -> float:
    return sisi * sisi


def keliling_persegi(sisi: float) -> float:
    return 4 * sisi


def luas_persegi_panjang(panjang: float, lebar: float) -> float:
    return panjang * lebar


def keliling_persegi_panjang(panjang: float, lebar: float) -> float:
    return 2 * (panjang + lebar)


"""Rumus lingkaran menggunakan konstanta PI yang didefinisikan di atas."""
def luas_lingkaran(jari_jari: float) -> float:
    return PI * jari_jari * jari_jari


def keliling_lingkaran(jari_jari: float) -> float:
    return 2 * PI * jari_jari


"""Rumus konversi suhu dari Celsius ke skala lain."""
def celsius_ke_fahrenheit(celsius: float) -> float:
    return celsius * 9 / 5 + 32


def celsius_ke_kelvin(celsius: float) -> float:
    return celsius + 273.15
