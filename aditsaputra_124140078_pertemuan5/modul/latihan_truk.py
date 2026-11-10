"""Latihan inheritance dan method overriding pada armada truk ekspedisi."""


class Kendaraan:
    """Class induk kendaraan, mengikuti struktur dari materi inheritance."""

    def __init__(self, merek: str, model: str, tahun: int):
        """Menyimpan identitas kendaraan dan odometer awal."""
        self.merek = merek
        self.model = model
        self.tahun = tahun
        self.odometer = 0

    def deskripsi(self) -> str:
        """Mengembalikan deskripsi dasar kendaraan."""
        return f"{self.merek} {self.model} ({self.tahun})"

    def tambah_jarak(self, km: float) -> None:
        """Menambahkan kilometer tempuh jika nilainya positif."""
        if km > 0:
            self.odometer += km
            print(f"[{self.merek}] Menempuh +{km} km. Total odo: {self.odometer} km")
        else:
            print("Nilai kilometer tambahan tidak valid!")

    def klakson(self) -> str:
        """Mengembalikan bunyi klakson kendaraan."""
        return "Tin tin!"


class Truk(Kendaraan):
    """Truk yang dapat memuat barang hingga kapasitas maksimum."""

    def __init__(
        self,
        merek: str,
        model: str,
        tahun: int,
        kapasitas_maksimal_ton: float,
        muatan_saat_ini: float = 0,
    ):
        """Memanggil constructor induk dan memeriksa kapasitas serta muatan awal."""
        super().__init__(merek, model, tahun)
        if kapasitas_maksimal_ton <= 0:
            raise ValueError("Kapasitas truk harus lebih dari 0 ton.")
        if not 0 <= muatan_saat_ini <= kapasitas_maksimal_ton:
            raise ValueError("Muatan awal harus berada di antara 0 dan kapasitas truk.")
        self.kapasitas_maksimal_ton = kapasitas_maksimal_ton
        self.muatan_saat_ini = muatan_saat_ini

    def muat_barang(self, berat_ton: float) -> bool:
        """Memuat barang bila berat positif dan kapasitas belum terlampaui."""
        if berat_ton <= 0:
            print("Berat barang harus lebih dari 0 ton.")
            return False
        if self.muatan_saat_ini + berat_ton > self.kapasitas_maksimal_ton:
            print("Muatan ditolak: kapasitas maksimal truk akan terlampaui.")
            return False
        self.muatan_saat_ini += berat_ton
        print(f"Berhasil memuat {berat_ton} ton. Muatan sekarang: {self.muatan_saat_ini} ton.")
        return True

    def deskripsi(self) -> str:
        """Override deskripsi induk dengan informasi muatan truk."""
        return (
            f"{super().deskripsi()} | Muatan: {self.muatan_saat_ini}/"
            f"{self.kapasitas_maksimal_ton} ton"
        )


if __name__ == "__main__":
    truk = Truk("Hino", "Ranger", 2024, kapasitas_maksimal_ton=8)
    print(truk.deskripsi())
    truk.muat_barang(5.5)
    truk.muat_barang(3)
    print(truk.deskripsi())
