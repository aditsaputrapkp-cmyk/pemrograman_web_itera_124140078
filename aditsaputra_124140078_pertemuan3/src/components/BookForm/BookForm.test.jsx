import { fireEvent, render, screen } from "@testing-library/react";
import BookForm from "./BookForm.jsx";

describe("BookForm", () => {
  test("menampilkan feedback visual saat judul dan penulis kosong", () => {
    const onSave = vi.fn();
    render(<BookForm onSave={onSave} onCancel={vi.fn()} />);

    fireEvent.click(
      screen.getByRole("button", { name: /tambahkan ke koleksi/i }),
    );

    expect(screen.getByText("Judul buku wajib diisi.")).toBeInTheDocument();
    expect(screen.getByText("Nama penulis wajib diisi.")).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  test("mengirim buku yang valid ke parent", () => {
    const onSave = vi.fn();
    render(<BookForm onSave={onSave} onCancel={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText("Contoh: Bumi Manusia"), {
      target: { value: "Bumi Manusia" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nama penulis"), {
      target: { value: "Pramoedya Ananta Toer" },
    });
    fireEvent.change(screen.getByLabelText("Status buku"), {
      target: { value: "Dimiliki" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /tambahkan ke koleksi/i }),
    );

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Bumi Manusia",
        author: "Pramoedya Ananta Toer",
        status: "Dimiliki",
      }),
    );
  });
});
