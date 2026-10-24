import { createContext, useContext, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage.js";

const BookContext = createContext(null);

const starterBooks = [
  {
    id: "b1",
    title: "Laut Bercerita",
    author: "Leila S. Chudori",
    genre: "Fiksi",
    status: "Dimiliki",
    pages: 379,
    rating: 5,
    note: "Kisah yang tinggal lama setelah halaman terakhir.",
    addedAt: "2026-09-04",
  },
  {
    id: "b2",
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    genre: "Pengembangan diri",
    status: "Sedang dibaca",
    pages: 344,
    rating: 0,
    note: "Baca beberapa halaman setiap pagi.",
    addedAt: "2026-09-12",
  },
  {
    id: "b3",
    title: "Pulang",
    author: "Tere Liye",
    genre: "Fiksi",
    status: "Dimiliki",
    pages: 400,
    rating: 4,
    note: "",
    addedAt: "2026-08-19",
  },
  {
    id: "b4",
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Pengembangan diri",
    status: "Ingin dibeli",
    pages: 320,
    rating: 0,
    note: "Cari edisi terjemahan.",
    addedAt: "2026-09-20",
  },
  {
    id: "b5",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "Sejarah",
    status: "Dimiliki",
    pages: 512,
    rating: 5,
    note: "",
    addedAt: "2026-07-30",
  },
  {
    id: "b6",
    title: "Perempuan di Titik Nol",
    author: "Nawal El Saadawi",
    genre: "Sastra dunia",
    status: "Ingin dibeli",
    pages: 176,
    rating: 0,
    note: "",
    addedAt: "2026-09-22",
  },
];

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage(
    "ruang-baca-books-v1",
    starterBooks,
  );

  // Migrasikan status dari draft katalog awal agar data tersimpan tetap terbaca.
  useEffect(() => {
    setBooks((current) => {
      let changed = false;
      const migrated = current.map((book) => {
        const status =
          book.status === "Selesai"
            ? "Dimiliki"
            : book.status === "Ingin dibaca"
              ? "Ingin dibeli"
              : book.status;
        if (status === book.status) return book;
        changed = true;
        return { ...book, status };
      });
      return changed ? migrated : current;
    });
  }, [setBooks]);

  // Functional updates mencegah aksi cepat menulis dari snapshot state lama.
  const addBook = (book) =>
    setBooks((current) => [
      {
        ...book,
        id: crypto.randomUUID(),
        addedAt: new Date().toISOString().slice(0, 10),
      },
      ...current,
    ]);
  const updateBook = (id, updates) =>
    setBooks((current) =>
      current.map((book) => (book.id === id ? { ...book, ...updates } : book)),
    );
  const deleteBook = (id) =>
    setBooks((current) => current.filter((book) => book.id !== id));

  const value = useMemo(
    () => ({ books, addBook, updateBook, deleteBook }),
    [books],
  );
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = { children: PropTypes.node.isRequired };

export function useBooks() {
  const context = useContext(BookContext);
  if (!context)
    throw new Error("useBooks harus digunakan di dalam BookProvider.");
  return context;
}
