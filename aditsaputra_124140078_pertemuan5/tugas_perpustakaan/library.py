"""Kelas untuk mengelola koleksi, pencarian, anggota, dan transaksi pinjam."""

from library_item import LibraryItem
from member import Member


class Library:
    """Mengelola item dan anggota dengan koleksi internal yang bersifat private."""

    def __init__(self, nama: str):
        """Membuat perpustakaan dengan koleksi item dan anggota yang kosong."""
        self._nama = nama
        self.__koleksi: dict[str, LibraryItem] = {}
        self.__anggota: dict[str, Member] = {}

    @property
    def nama(self) -> str:
        """Mengembalikan nama perpustakaan."""
        return self._nama

    def tambah_item(self, item: LibraryItem) -> bool:
        """Menambahkan item jika tipenya sesuai dan ID belum digunakan."""
        if not isinstance(item, LibraryItem):
            print("Gagal: item harus berupa turunan LibraryItem.")
            return False
        if item.item_id in self.__koleksi:
            print(f"Gagal: ID {item.item_id} sudah terdaftar.")
            return False

        self.__koleksi[item.item_id] = item
        print(f"Berhasil menambahkan: {item.judul} (ID: {item.item_id})")
        return True

    def tambah_anggota(self, anggota: Member) -> bool:
        """Mendaftarkan anggota jika ID anggota belum digunakan."""
        if anggota.member_id in self.__anggota:
            print(f"Gagal: ID anggota {anggota.member_id} sudah terdaftar.")
            return False
        self.__anggota[anggota.member_id] = anggota
        print(f"Berhasil mendaftarkan anggota: {anggota}")
        return True

    def cari_item(self, kata_kunci: str) -> list[LibraryItem]:
        """Mencari ID secara tepat atau judul yang memuat kata kunci."""
        kata_kunci = kata_kunci.strip().casefold()
        if not kata_kunci:
            return []

        hasil = []
        for item in self.__koleksi.values():
            if item.item_id.casefold() == kata_kunci or kata_kunci in item.judul.casefold():
                hasil.append(item)
        return hasil

    def cari_item_by_id(self, item_id: str) -> LibraryItem | None:
        """Mencari satu item berdasarkan ID."""
        return self.__koleksi.get(item_id.strip())

    def cari_item_by_judul(self, judul: str) -> list[LibraryItem]:
        """Mencari item berdasarkan sebagian atau seluruh judul."""
        kata_kunci = judul.strip().casefold()
        if not kata_kunci:
            return []
        return [
            item for item in self.__koleksi.values()
            if kata_kunci in item.judul.casefold()
        ]

    def daftar_item_tersedia(self) -> list[LibraryItem]:
        """Mengembalikan item yang belum dipinjam tanpa membuka koleksi internal."""
        return [item for item in self.__koleksi.values() if item.is_tersedia]

    def tampilkan_katalog(self, hanya_tersedia: bool = True) -> None:
        """Menampilkan katalog; get_detail() berjalan polimorfik sesuai jenis item."""
        item_katalog = (
            self.daftar_item_tersedia()
            if hanya_tersedia
            else list(self.__koleksi.values())
        )
        label = "Item tersedia" if hanya_tersedia else "Semua item"
        print(f"\n{label} di {self.nama}:")
        if not item_katalog:
            print("  Belum ada item untuk ditampilkan.")
            return

        for nomor, item in enumerate(item_katalog, start=1):
            print(f"  {nomor}. {item.get_detail()}")

    def pinjam_item(self, item_id: str, member_id: str) -> bool:
        """Memproses pinjaman jika item tersedia dan anggota terdaftar."""
        item = self.cari_item_by_id(item_id)
        anggota = self.__anggota.get(member_id.strip())
        if item is None:
            print(f"Gagal meminjam: item {item_id} tidak ditemukan.")
            return False
        if anggota is None:
            print(f"Gagal meminjam: anggota {member_id} tidak terdaftar.")
            return False
        if not item.is_tersedia or not anggota.tambah_pinjaman(item):
            print(f"Gagal meminjam: {item.judul} sedang tidak tersedia.")
            return False

        item.pinjam()
        print(f"Berhasil dipinjam: {item.judul} oleh {anggota.nama}.")
        return True

    def kembalikan_item(
        self, item_id: str, member_id: str, hari_terlambat: int = 0
    ) -> int | None:
        """Mencatat pengembalian dan mengembalikan nominal denda, atau None jika gagal."""
        item = self.cari_item_by_id(item_id)
        anggota = self.__anggota.get(member_id.strip())
        if item is None or anggota is None or not anggota.memiliki_pinjaman(item_id):
            print("Gagal mengembalikan: item atau data pinjaman tidak ditemukan.")
            return None

        denda = item.hitung_denda(hari_terlambat)
        anggota.selesaikan_pinjaman(item_id)
        item.kembalikan()
        print(f"Berhasil dikembalikan: {item.judul}. Denda: Rp{denda:,}.")
        return denda
