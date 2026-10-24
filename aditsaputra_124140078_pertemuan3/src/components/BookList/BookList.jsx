import "./BookList.css";
import PropTypes from "prop-types";
import BookIcon from "../BookIcons.jsx";

const statusClass = {
  Dimiliki: "done",
  "Sedang dibaca": "reading",
  "Ingin dibeli": "later",
};

function BookCover({ book, index }) {
  const palettes = [
    "cover-olive",
    "cover-rose",
    "cover-ochre",
    "cover-blue",
    "cover-plum",
    "cover-sage",
  ];
  return (
    <div
      className={`book-cover ${palettes[index % palettes.length]}`}
      aria-hidden="true"
    >
      <span className="cover-topline">
        RUANG BACA&nbsp; / &nbsp;{String(index + 1).padStart(2, "0")}
      </span>
      <span className="cover-title">{book.title}</span>
      <span className="cover-rule" />
      <span className="cover-author">{book.author}</span>
      <span className="cover-mark">
        <BookIcon name="sparkle" />
      </span>
    </div>
  );
}

BookCover.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default function BookList({ books, onEdit, onDelete }) {
  if (!books.length)
    return (
      <div className="empty-state">
        <span className="empty-icon">
          <BookIcon name="search" />
        </span>
        <h3>Belum ada buku di rak ini</h3>
        <p>
          Coba ganti kata pencarian atau filter, atau tambahkan buku baru ke
          koleksi.
        </p>
      </div>
    );

  return (
    <div className="book-grid">
      {books.map((book, index) => (
        <article className="book-card" key={book.id}>
          <div className="cover-wrap">
            <BookCover book={book} index={index} />
            <span className={`status-pill ${statusClass[book.status]}`}>
              {book.status}
            </span>
          </div>
          <div className="book-info">
            <div className="book-meta">
              <span>{book.genre}</span>
              <span>{book.pages || "—"} hlm</span>
            </div>
            <h3>{book.title}</h3>
            <p className="book-author">{book.author}</p>
            {book.note && <p className="book-note">“{book.note}”</p>}
            <div className="book-bottom">
              <span className="book-rating">
                {book.status === "Dimiliki" && book.rating > 0 ? (
                  <>
                    {"★".repeat(Number(book.rating))}
                    <span className="rating-empty">
                      {"★".repeat(5 - Number(book.rating))}
                    </span>
                  </>
                ) : (
                  <span className="not-rated">
                    {book.status === "Sedang dibaca"
                      ? "Sedang dibaca"
                      : book.status === "Ingin dibeli"
                        ? "Masuk daftar beli"
                        : "Buku milikmu"}
                  </span>
                )}
              </span>
              <div className="book-actions">
                <button
                  onClick={() => onEdit(book)}
                  aria-label={`Edit ${book.title}`}
                  title="Edit buku"
                >
                  <BookIcon name="edit" />
                </button>
                <button
                  onClick={() => onDelete(book)}
                  aria-label={`Hapus ${book.title}`}
                  title="Hapus buku"
                >
                  <BookIcon name="remove" />
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

const bookShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  pages: PropTypes.number,
  rating: PropTypes.number,
  note: PropTypes.string,
});

BookList.propTypes = {
  books: PropTypes.arrayOf(bookShape).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
