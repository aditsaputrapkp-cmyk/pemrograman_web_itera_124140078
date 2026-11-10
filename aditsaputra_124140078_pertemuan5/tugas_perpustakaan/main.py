"""Program utama untuk mencoba sistem manajemen perpustakaan sederhana."""

from library import Library
from library_item import Book, Magazine
from member import Member


def tampilkan_hasil_pencarian(perpustakaan: Library, kata_kunci: str) -> None:
    """Mencetak hasil pencarian yang cocok dengan ID atau judul."""
    print(f"\nPencarian '{kata_kunci}':")
    hasil = perpustakaan.cari_item(kata_kunci)
    if not hasil:
        print("  Item tidak ditemukan.")
        return
    for item in hasil:
        print(f"  {item.get_detail()}")


def main() -> None:
    """Menambahkan koleksi, mencoba pencarian, katalog, pinjam, dan kembali."""
    perpustakaan = Library("Perpustakaan ITERA")

    buku_1 = Book("B001", "Laskar Pelangi", "Andrea Hirata", 529)
    buku_2 = Book("B002", "Bumi Manusia", "Pramoedya Ananta Toer", 535)
    majalah_1 = Magazine("M001", "National Geographic", "Edisi 08", "Agustus 2026")

    print("MENAMBAHKAN ITEM")
    perpustakaan.tambah_item(buku_1)
    perpustakaan.tambah_item(buku_2)
    perpustakaan.tambah_item(majalah_1)

    anggota = Member("A001", "Aditsaputra")
    print("\nMENDAFTARKAN ANGGOTA")
    perpustakaan.tambah_anggota(anggota)

    print("\nKATALOG AWAL")
    perpustakaan.tampilkan_katalog()

    print("\nPENCARIAN ITEM")
    tampilkan_hasil_pencarian(perpustakaan, "Laskar")
    tampilkan_hasil_pencarian(perpustakaan, "M001")

    print("\nSTATUS DAN PEMINJAMAN")
    print(f"Status {buku_1.judul} sebelum dipinjam: {buku_1.is_dipinjam}")
    perpustakaan.pinjam_item("B001", "A001")
    print(f"Status {buku_1.judul} setelah dipinjam: {buku_1.is_dipinjam}")
    perpustakaan.tampilkan_katalog()

    print("\nPENGEMBALIAN")
    perpustakaan.kembalikan_item("B001", "A001", hari_terlambat=2)
    print(f"Status {buku_1.judul} setelah dikembalikan: {buku_1.is_dipinjam}")
    perpustakaan.tampilkan_katalog()


if __name__ == "__main__":
    main()
