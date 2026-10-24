import { fireEvent, render, screen } from "@testing-library/react";
import BookFilter from "./BookFilter.jsx";

const props = {
  query: "",
  setQuery: vi.fn(),
  status: "Semua",
  setStatus: vi.fn(),
  genre: "Semua",
  setGenre: vi.fn(),
  genres: ["Fiksi"],
  sort: "newest",
  setSort: vi.fn(),
};

test("meminta filter untuk menampilkan buku yang ingin dibeli", () => {
  render(<BookFilter {...props} />);
  fireEvent.click(screen.getByRole("button", { name: "Ingin dibeli" }));
  expect(props.setStatus).toHaveBeenCalledWith("Ingin dibeli");
});

test("mengirim teks pencarian dari input", () => {
  render(<BookFilter {...props} />);
  fireEvent.change(
    screen.getByRole("textbox", { name: "Cari judul atau penulis" }),
    { target: { value: "Pramoedya" } },
  );
  expect(props.setQuery).toHaveBeenCalledWith("Pramoedya");
});
