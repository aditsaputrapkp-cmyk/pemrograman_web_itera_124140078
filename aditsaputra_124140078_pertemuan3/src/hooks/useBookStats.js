import { useMemo } from "react";

export default function useBookStats(books) {
  // Statistik dihitung ulang hanya saat isi koleksi berubah.
  return useMemo(() => {
    const owned = books.filter((book) => book.status === "Dimiliki");
    const reading = books.filter((book) => book.status === "Sedang dibaca");
    const wantToBuy = books.filter((book) => book.status === "Ingin dibeli");
    const pagesRead = reading.reduce(
      (total, book) => total + (Number(book.pages) || 0),
      0,
    );
    const rated = owned.filter((book) => Number(book.rating) > 0);
    const averageRating = rated.length
      ? rated.reduce((total, book) => total + Number(book.rating), 0) /
        rated.length
      : 0;
    const genres = owned.reduce((map, book) => {
      const genre = book.genre || "Lainnya";
      map[genre] = (map[genre] || 0) + 1;
      return map;
    }, {});
    const favoriteGenre =
      Object.entries(genres).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

    return {
      total: books.length,
      owned: owned.length,
      reading: reading.length,
      wantToBuy: wantToBuy.length,
      pagesRead,
      averageRating,
      favoriteGenre,
      ownedRate: books.length
        ? Math.round((owned.length / books.length) * 100)
        : 0,
    };
  }, [books]);
}
