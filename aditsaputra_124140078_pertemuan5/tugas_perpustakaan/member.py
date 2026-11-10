"""Data dan perilaku anggota perpustakaan."""

from library_item import LibraryItem


class Member:
    """Mewakili anggota dan menyimpan pinjaman dalam atribut private."""

    def __init__(self, member_id: str, nama: str):
        """Membuat anggota dengan ID dan nama yang valid."""
        if not member_id.strip() or not nama.strip():
            raise ValueError("ID dan nama anggota harus diisi.")

        self.__member_id = member_id.strip()
        self._nama = nama.strip()
        self.__pinjaman: dict[str, LibraryItem] = {}

    @property
    def member_id(self) -> str:
        """Mengembalikan ID anggota."""
        return self.__member_id

    @property
    def nama(self) -> str:
        """Mengembalikan nama anggota."""
        return self._nama

    @property
    def daftar_pinjaman(self) -> tuple[LibraryItem, ...]:
        """Memberikan salinan baca-saja dari item yang sedang dipinjam."""
        return tuple(self.__pinjaman.values())

    def tambah_pinjaman(self, item: LibraryItem) -> bool:
        """Mencatat item yang berhasil dipinjam oleh anggota."""
        if item.item_id in self.__pinjaman or item.is_dipinjam:
            return False
        self.__pinjaman[item.item_id] = item
        return True

    def selesaikan_pinjaman(self, item_id: str) -> LibraryItem | None:
        """Menghapus dan mengembalikan catatan pinjaman berdasarkan ID item."""
        return self.__pinjaman.pop(item_id, None)

    def memiliki_pinjaman(self, item_id: str) -> bool:
        """Memeriksa apakah anggota meminjam item dengan ID tersebut."""
        return item_id in self.__pinjaman

    def __str__(self) -> str:
        """Menampilkan nama dan ID anggota."""
        return f"{self._nama} ({self.__member_id})"
