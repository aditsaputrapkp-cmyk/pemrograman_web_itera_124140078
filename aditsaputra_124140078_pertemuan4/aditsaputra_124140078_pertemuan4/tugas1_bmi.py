

def hitung_bmi(berat: float, tinggi: float) -> float:
    return berat / (tinggi * tinggi)


def tentukan_kategori(bmi: float) -> str:
    if bmi < 18.5:
        return "Berat badan kurang"
    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


berat_badan = float(input("Berat badan (kg): "))
tinggi_badan = float(input("Tinggi badan (m): "))

bmi = hitung_bmi(berat_badan, tinggi_badan)
kategori = tentukan_kategori(bmi)

print(f"BMI: {bmi:.2f}")
print(f"Kategori: {kategori}")
