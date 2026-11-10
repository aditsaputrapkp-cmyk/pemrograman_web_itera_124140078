"""Latihan abstract class dan implementasi layanan penyimpanan simulasi."""

from abc import ABC, abstractmethod


class FileStorage(ABC):
    """Kontrak layanan penyimpanan file yang harus dipenuhi setiap subclass."""

    @abstractmethod
    def upload_file(self, nama_file: str, data_bytes: bytes) -> bool:
        """Menyimpan data file; implementasi disediakan subclass."""
        raise NotImplementedError

    @abstractmethod
    def download_file(self, nama_file: str) -> bytes | None:
        """Mengambil data file; implementasi disediakan subclass."""
        raise NotImplementedError


class LocalDiskStorage(FileStorage):
    """Simulasi penyimpanan lokal dengan kamus sebagai isi folder virtual."""

    def __init__(self, folder: str = "storage_lokal"):
        """Menetapkan nama folder lokal dan membuat tempat simpan kosong."""
        self.folder = folder
        self._file_tersimpan: dict[str, bytes] = {}

    def upload_file(self, nama_file: str, data_bytes: bytes) -> bool:
        """Menyimpan bytes ke penyimpanan lokal simulasi."""
        if not nama_file or not isinstance(data_bytes, bytes):
            return False
        self._file_tersimpan[nama_file] = data_bytes
        print(f"[Local Disk] File '{nama_file}' disimpan di folder '{self.folder}'.")
        return True

    def download_file(self, nama_file: str) -> bytes | None:
        """Mengambil bytes file dari penyimpanan lokal simulasi."""
        data = self._file_tersimpan.get(nama_file)
        if data is None:
            print(f"[Local Disk] File '{nama_file}' tidak ditemukan.")
            return None
        print(f"[Local Disk] File '{nama_file}' berhasil dibaca.")
        return data


class CloudStorage(FileStorage):
    """Simulasi penyimpanan cloud menggunakan kamus sebagai server virtual."""

    def __init__(self, nama_server: str = "cloud-itera"):
        """Menetapkan nama server cloud dan membuat tempat simpan kosong."""
        self.nama_server = nama_server
        self._file_tersimpan: dict[str, bytes] = {}

    def upload_file(self, nama_file: str, data_bytes: bytes) -> bool:
        """Mengunggah bytes ke server cloud simulasi."""
        if not nama_file or not isinstance(data_bytes, bytes):
            return False
        self._file_tersimpan[nama_file] = data_bytes
        print(f"[Cloud: {self.nama_server}] File '{nama_file}' berhasil diunggah.")
        return True

    def download_file(self, nama_file: str) -> bytes | None:
        """Mengunduh bytes file dari server cloud simulasi."""
        data = self._file_tersimpan.get(nama_file)
        if data is None:
            print(f"[Cloud: {self.nama_server}] File '{nama_file}' tidak ditemukan.")
            return None
        print(f"[Cloud: {self.nama_server}] File '{nama_file}' berhasil diunduh.")
        return data


if __name__ == "__main__":
    isi_file = b"Materi OOP Python"
    penyimpanan_lokal = LocalDiskStorage()
    penyimpanan_cloud = CloudStorage()

    for penyimpanan in (penyimpanan_lokal, penyimpanan_cloud):
        penyimpanan.upload_file("materi.txt", isi_file)
        hasil_download = penyimpanan.download_file("materi.txt")
        print("Isi file:", hasil_download)
