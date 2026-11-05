
data_mahasiswa = [
    {"nama": "Adit Saputra", "nim": "124140078",
     "nilai_uts": 100, "nilai_uas": 100, "nilai_tugas": 100},
    {"nama": "Hafizh Aistel", "nim": "124140108",
     "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 80},
    {"nama": "Syahid Sarasehan", "nim": "118140204",
     "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 70},
    {"nama": "Syehab Hayabusa", "nim": "124140050",
     "nilai_uts": 55, "nilai_uas": 50, "nilai_tugas": 60},
    {"nama": "Aryo Amel", "nim": "124140074",
     "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 42},
    {"nama": "Farid Bizher", "nim": "1241440056",
     "nilai_uts": 78, "nilai_uas": 82, "nilai_tugas": 75},
]


def hitung_nilai_akhir(uts: float, uas: float, tugas: float) -> float:
    return 0.3 * uts + 0.4 * uas + 0.3 * tugas


def tentukan_grade(nilai: float) -> str:
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"


for mhs in data_mahasiswa:
    mhs["nilai_akhir"] = hitung_nilai_akhir(
        mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"])
    mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])

print(f"{'Nama':<18}{'NIM':<12}{'Nilai Akhir':>12}{'Grade':>8}")
print("-" * 50)
for mhs in data_mahasiswa:
    print(f"{mhs['nama']:<18}{mhs['nim']:<12}"
          f"{mhs['nilai_akhir']:>12.2f}{mhs['grade']:>8}")

tertinggi = max(data_mahasiswa, key=lambda m: m["nilai_akhir"])
terendah = min(data_mahasiswa, key=lambda m: m["nilai_akhir"])

print()
print(f"Tertinggi: {tertinggi['nama']} ({tertinggi['nim']}), "
      f"{tertinggi['nilai_akhir']:.2f}, grade {tertinggi['grade']}")
print(f"Terendah : {terendah['nama']} ({terendah['nim']}), "
      f"{terendah['nilai_akhir']:.2f}, grade {terendah['grade']}")
