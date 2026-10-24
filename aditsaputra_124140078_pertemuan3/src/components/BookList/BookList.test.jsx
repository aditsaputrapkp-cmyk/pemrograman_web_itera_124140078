import { fireEvent, render, screen } from "@testing-library/react";
import BookList from "./BookList.jsx";

const book = {
  id: "book-1",
  title: "Bumi Manusia",
  author: "Pramoedya Ananta Toer",
  genre: "Fiksi",
  status: "Dimiliki",
  pages: 535,
  rating: 5,
  note: "",
};

test("merender judul dan penulis buku", () => {
  render(<BookList books={[book]} onEdit={vi.fn()} onDelete={vi.fn()} />);
  expect(
    screen.getByRole("heading", { name: "Bumi Manusia" }),
  ).toBeInTheDocument();
  expect(screen.getAllByText("Pramoedya Ananta Toer")).toHaveLength(2);
});

test("mengirim buku yang dipilih ke callback edit dan hapus", () => {
  const onEdit = vi.fn();
  const onDelete = vi.fn();
  render(<BookList books={[book]} onEdit={onEdit} onDelete={onDelete} />);

  fireEvent.click(screen.getByRole("button", { name: "Edit Bumi Manusia" }));
  fireEvent.click(screen.getByRole("button", { name: "Hapus Bumi Manusia" }));

  expect(onEdit).toHaveBeenCalledWith(book);
  expect(onDelete).toHaveBeenCalledWith(book);
});
