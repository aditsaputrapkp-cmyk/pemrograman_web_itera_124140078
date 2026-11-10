"""Latihan pemodelan entitas sederhana untuk sistem kasir toko online."""


# Rancangan entitas sesuai instruksi latihan:
# Produk: nama, harga, stok | perilaku: hitung_diskon(), kurangi_stok().
# Keranjang: pemilik, daftar_produk, batas_item | perilaku: tambah_produk(), hitung_total().
# Pengguna: nama, email, alamat | perilaku: perbarui_alamat(), checkout().


class Produk:
    """Mewakili satu produk yang dijual toko."""

    def __init__(self, nama: str, harga: float, stok: int):
        """Menyimpan nama, harga, dan stok awal produk."""
        self.nama = nama
        self.harga = harga
        self.stok = stok

    def hitung_diskon(self, persen: float) -> float:
        """Mengembalikan harga setelah diskon persentase."""
        if not 0 <= persen <= 100:
            raise ValueError("Diskon harus berada antara 0 dan 100 persen.")
        return self.harga * (1 - persen / 100)

    def kurangi_stok(self, jumlah: int) -> bool:
        """Mengurangi stok jika jumlah yang diminta tersedia."""
        if jumlah <= 0 or jumlah > self.stok:
            return False
        self.stok -= jumlah
        return True


class Keranjang:
    """Menyimpan produk yang dipilih seorang pengguna."""

    def __init__(self, pemilik: str):
        """Membuat keranjang kosong untuk pemilik tertentu."""
        self.pemilik = pemilik
        self.daftar_produk: list[tuple[Produk, int]] = []
        self.batas_item = 20

    def tambah_produk(self, produk: Produk, jumlah: int = 1) -> bool:
        """Menambahkan produk ke keranjang jika stok dan batas item cukup."""
        jumlah_saat_ini = sum(jumlah_item for _, jumlah_item in self.daftar_produk)
        if jumlah <= 0 or jumlah_saat_ini + jumlah > self.batas_item or jumlah > produk.stok:
            return False
        self.daftar_produk.append((produk, jumlah))
        return True

    def hitung_total(self) -> float:
        """Menghitung total harga seluruh produk di keranjang."""
        return sum(produk.harga * jumlah for produk, jumlah in self.daftar_produk)


class Pengguna:
    """Mewakili pengguna toko yang dapat mengelola alamat dan checkout."""

    def __init__(self, nama: str, email: str, alamat: str):
        """Menyimpan identitas dan alamat pengguna."""
        self.nama = nama
        self.email = email
        self.alamat = alamat

    def perbarui_alamat(self, alamat_baru: str) -> None:
        """Mengganti alamat pengiriman pengguna."""
        self.alamat = alamat_baru

    def checkout(self, keranjang: Keranjang) -> float:
        """Mengosongkan stok untuk item yang tersedia dan mengembalikan total."""
        if keranjang.pemilik != self.nama:
            raise ValueError("Keranjang ini bukan milik pengguna tersebut.")
        for produk, jumlah in keranjang.daftar_produk:
            if jumlah > produk.stok:
                raise ValueError(f"Stok {produk.nama} tidak mencukupi.")
        total = keranjang.hitung_total()
        for produk, jumlah in keranjang.daftar_produk:
            produk.kurangi_stok(jumlah)
        keranjang.daftar_produk.clear()
        return total


if __name__ == "__main__":
    pengguna = Pengguna("Adit", "adit@example.com", "Bandar Lampung")
    produk = Produk("Buku OOP Python", 75000, 5)
    keranjang = Keranjang(pengguna.nama)
    keranjang.tambah_produk(produk, 2)

    print("Harga setelah diskon 10%:", produk.hitung_diskon(10))
    print("Total checkout:", pengguna.checkout(keranjang))
    print("Sisa stok:", produk.stok)
