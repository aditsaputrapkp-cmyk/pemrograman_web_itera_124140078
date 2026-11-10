"""Latihan encapsulation dengan property dan setter untuk data gaji."""


class Karyawan:
    """Menyimpan data karyawan dan melindungi gaji pokok dengan validasi."""

    UMR_MINIMUM = 3_200_000

    def __init__(self, nama: str, jabatan: str, gaji_pokok: int):
        """Membuat karyawan dan memvalidasi gaji melalui property setter."""
        self.nama = nama
        self.jabatan = jabatan
        self.gaji_pokok = gaji_pokok

    @property
    def gaji_pokok(self) -> int:
        """Membaca gaji pokok tanpa membuka atribut private secara langsung."""
        return self.__gaji_pokok

    @gaji_pokok.setter
    def gaji_pokok(self, nilai: int) -> None:
        """Menolak gaji pokok yang lebih rendah daripada batas minimum."""
        if nilai < self.UMR_MINIMUM:
            raise ValueError(
                f"Gaji pokok minimal Rp{self.UMR_MINIMUM:,.0f}."
            )
        self.__gaji_pokok = nilai

    def hitung_gaji_bersih(self, pajak_persen: float) -> float:
        """Menghitung gaji setelah pajak dengan persentase 0 sampai 100."""
        if not 0 <= pajak_persen <= 100:
            raise ValueError("Pajak harus berada antara 0 dan 100 persen.")
        return self.gaji_pokok * (1 - pajak_persen / 100)


if __name__ == "__main__":
    karyawan = Karyawan("Adit", "Staf Administrasi", 4_500_000)
    print(f"Gaji pokok: Rp{karyawan.gaji_pokok:,.0f}")
    print(f"Gaji bersih setelah pajak 5%: Rp{karyawan.hitung_gaji_bersih(5):,.0f}")

    try:
        karyawan.gaji_pokok = 3_000_000
    except ValueError as error:
        print("Validasi setter:", error)
