
kontak = {
    "Sobri": "081234567890",
    "Siburi": "082345678901",
}


def tambah_kontak(nama: str, nomor: str) -> None:
    kontak[nama] = nomor


def cari_kontak(nama: str) -> str:
    return kontak.get(nama, "Kontak tidak ditemukan")


def tampilkan_semua() -> None:
    for nama, nomor in kontak.items():
        print(f"{nama:<10}{nomor}")


while True:
    print("\n1. Tambah kontak")
    print("2. Cari kontak")
    print("3. Tampilkan semua kontak")
    print("4. Keluar")
    pilihan = input("Pilih menu: ")

    if pilihan == "1":
        nama_baru = input("Nama: ")
        nomor_baru = input("Nomor telepon: ")
        tambah_kontak(nama_baru, nomor_baru)
        print("Kontak ditambahkan.")
    elif pilihan == "2":
        nama_cari = input("Nama yang dicari: ")
        print(cari_kontak(nama_cari))
    elif pilihan == "3":
        tampilkan_semua()
    elif pilihan == "4":
        break
    else:
        print("Pilihan tidak valid.")
