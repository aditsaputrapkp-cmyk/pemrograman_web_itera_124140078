"""Latihan class Buku, method, dan dunder methods __str__ serta __len__."""


class Buku:
    """Menyimpan informasi buku dan menyediakan perilaku terkait buku."""

    def __init__(self, judul: str, penulis: str, harga_asli: float, jumlah_halaman: int):
        """Membuat buku setelah memeriksa harga dan jumlah halaman."""
        if harga_asli < 0 or jumlah_halaman < 0:
            raise ValueError("Harga dan jumlah halaman tidak boleh negatif.")
        self.judul = judul
        self.penulis = penulis
        self.harga_asli = harga_asli
        self.jumlah_halaman = jumlah_halaman

    def hitung_harga_diskon(self, persen: float) -> float:
        """Menghitung harga setelah potongan persen (0 sampai 100)."""
        if not 0 <= persen <= 100:
            raise ValueError("Persentase diskon harus berada antara 0 dan 100.")
        return self.harga_asli * (1 - persen / 100)

    def __str__(self) -> str:
        """Menampilkan kartu buku yang mudah dibaca."""
        return (
            f"{self.judul} oleh {self.penulis} | "
            f"Harga: Rp{self.harga_asli:,.0f} | Halaman: {self.jumlah_halaman}"
        )

    def __len__(self) -> int:
        """Membuat len(buku) mengembalikan jumlah halaman."""
        return self.jumlah_halaman


if __name__ == "__main__":
    buku = Buku("Belajar Python", "Adit Saputra", 85000, 240)
    print("Kartu buku:", buku)
    print("Harga setelah diskon 20%: Rp{:,.0f}".format(buku.hitung_harga_diskon(20)))
    print("Jumlah halaman:", len(buku))
