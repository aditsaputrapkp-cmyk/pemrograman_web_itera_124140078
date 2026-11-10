"""Latihan polymorphism melalui tiga channel notifikasi yang seragam."""


class NotifikasiEmail:
    """Channel notifikasi email."""

    def __init__(self, alamat_email: str):
        """Menyimpan alamat email tujuan default untuk broadcast."""
        self.penerima_default = alamat_email

    def kirim(self, pesan: str, penerima: str) -> bool:
        """Mengirim simulasi pesan melalui email."""
        print(f"[Email] Ke {penerima}: {pesan}")
        return True


class NotifikasiSMS:
    """Channel notifikasi SMS."""

    def __init__(self, nomor_telepon: str):
        """Menyimpan nomor tujuan default untuk broadcast."""
        self.penerima_default = nomor_telepon

    def kirim(self, pesan: str, penerima: str) -> bool:
        """Mengirim simulasi pesan singkat melalui SMS."""
        print(f"[SMS] Ke {penerima}: {pesan}")
        return True


class NotifikasiWhatsApp:
    """Channel notifikasi WhatsApp."""

    def __init__(self, nomor_telepon: str):
        """Menyimpan nomor tujuan default untuk broadcast."""
        self.penerima_default = nomor_telepon

    def kirim(self, pesan: str, penerima: str) -> bool:
        """Mengirim simulasi pesan melalui WhatsApp."""
        print(f"[WhatsApp] Ke {penerima}: {pesan}")
        return True


def broadcast_pengumuman(daftar_channel: list, pesan: str) -> None:
    """Mengirim pengumuman melalui semua objek yang memiliki method kirim()."""
    print("=== BROADCAST PENGUMUMAN ===")
    for channel in daftar_channel:
        channel.kirim(pesan, channel.penerima_default)


if __name__ == "__main__":
    channel_aktif = [
        NotifikasiEmail("adit@example.com"),
        NotifikasiSMS("081234567890"),
        NotifikasiWhatsApp("081234567890"),
    ]
    broadcast_pengumuman(channel_aktif, "Perpustakaan tutup pukul 16.00 hari ini.")
