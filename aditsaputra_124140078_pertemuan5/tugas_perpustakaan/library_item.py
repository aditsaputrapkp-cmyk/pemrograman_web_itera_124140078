"""Kelas dasar dan jenis item yang tersedia di perpustakaan."""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Kontrak umum item perpustakaan dengan status pinjam yang terenkapsulasi."""

    def __init__(self, item_id: str, judul: str):
        """Menyimpan identitas item dan mengatur status awalnya menjadi tersedia."""
        if not item_id.strip():
            raise ValueError("ID item tidak boleh kosong.")
        if not judul.strip():
            raise ValueError("Judul item tidak boleh kosong.")

        self.__item_id = item_id.strip()
        self._judul = judul.strip()
        self._dipinjam = False

    @property
    def item_id(self) -> str:
        """Mengembalikan ID item tanpa memberi akses untuk mengubahnya langsung."""
        return self.__item_id

    @property
    def judul(self) -> str:
        """Mengembalikan judul item."""
        return self._judul

    @property
    def is_dipinjam(self) -> bool:
        """Menampilkan status pinjam secara read-only."""
        return self._dipinjam

    @property
    def is_tersedia(self) -> bool:
        """Mengembalikan True jika item belum dipinjam."""
        return not self._dipinjam

    def pinjam(self) -> bool:
        """Mengubah status menjadi dipinjam jika item masih tersedia."""
        if self._dipinjam:
            return False
        self._dipinjam = True
        return True

    def kembalikan(self) -> bool:
        """Mengubah status menjadi tersedia jika item sedang dipinjam."""
        if not self._dipinjam:
            return False
        self._dipinjam = False
        return True

    @abstractmethod
    def get_detail(self) -> str:
        """Menyediakan detail item; setiap subclass wajib membuat formatnya."""
        raise NotImplementedError

    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> int:
        """Menghitung denda sesuai jenis item; wajib diimplementasikan subclass."""
        raise NotImplementedError

    def __str__(self) -> str:
        """Mengembalikan detail yang nyaman dibaca saat item dicetak."""
        return self.get_detail()


class Book(LibraryItem):
    """Buku dengan penulis dan jumlah halaman."""

    DENDA_PER_HARI = 1000

    def __init__(self, item_id: str, judul: str, penulis: str, jumlah_halaman: int):
        """Membuat buku dan memvalidasi data khusus buku."""
        super().__init__(item_id, judul)
        if not penulis.strip():
            raise ValueError("Nama penulis tidak boleh kosong.")
        if jumlah_halaman <= 0:
            raise ValueError("Jumlah halaman harus lebih dari 0.")

        self._penulis = penulis.strip()
        self._jumlah_halaman = jumlah_halaman

    def get_detail(self) -> str:
        """Membuat keterangan lengkap untuk buku."""
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return (
            f"[Buku] ID: {self.item_id} | Judul: {self.judul} | "
            f"Penulis: {self._penulis} | Halaman: {self._jumlah_halaman} | "
            f"Status: {status}"
        )

    def hitung_denda(self, hari_terlambat: int) -> int:
        """Menghitung denda buku sebesar Rp1.000 untuk setiap hari terlambat."""
        if hari_terlambat < 0:
            raise ValueError("Hari terlambat tidak boleh bernilai negatif.")
        return hari_terlambat * self.DENDA_PER_HARI


class Magazine(LibraryItem):
    """Majalah dengan nomor edisi dan bulan terbit."""

    DENDA_PER_HARI = 500

    def __init__(self, item_id: str, judul: str, nomor_edisi: str, bulan_terbit: str):
        """Membuat majalah dan menyimpan edisi terbitnya."""
        super().__init__(item_id, judul)
        if not nomor_edisi.strip() or not bulan_terbit.strip():
            raise ValueError("Nomor edisi dan bulan terbit harus diisi.")

        self._nomor_edisi = nomor_edisi.strip()
        self._bulan_terbit = bulan_terbit.strip()

    def get_detail(self) -> str:
        """Membuat keterangan lengkap untuk majalah."""
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return (
            f"[Majalah] ID: {self.item_id} | Judul: {self.judul} | "
            f"Edisi: {self._nomor_edisi} | Terbit: {self._bulan_terbit} | "
            f"Status: {status}"
        )

    def hitung_denda(self, hari_terlambat: int) -> int:
        """Menghitung denda majalah sebesar Rp500 untuk setiap hari terlambat."""
        if hari_terlambat < 0:
            raise ValueError("Hari terlambat tidak boleh bernilai negatif.")
        return hari_terlambat * self.DENDA_PER_HARI
