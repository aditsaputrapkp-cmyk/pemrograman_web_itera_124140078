import { useMemo, useState } from "react";
import { useBooks } from "../../context/BookContext.jsx";
import BookForm from "../../components/BookForm/BookForm.jsx";
import BookList from "../../components/BookList/BookList.jsx";
import BookFilter from "../../components/BookFilter/BookFilter.jsx";
import BookIcon from "../../components/BookIcons.jsx";
import "./Home.css";
import PropTypes from "prop-types";

export default function Home({ stats }) {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Semua");
  const [genre, setGenre] = useState("Semua");
  const [sort, setSort] = useState("newest");
  const genres = useMemo(
    () => [...new Set(books.map((book) => book.genre).filter(Boolean))].sort(),
    [books],
  );

  const visibleBooks = useMemo(
    () =>
      books
        .filter((book) => status === "Semua" || book.status === status)
        .filter((book) => genre === "Semua" || book.genre === genre)
        .filter((book) =>
          `${book.title} ${book.author}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
        )
        .sort((a, b) =>
          sort === "title"
            ? a.title.localeCompare(b.title)
            : sort === "author"
              ? a.author.localeCompare(b.author)
              : b.addedAt.localeCompare(a.addedAt),
        ),
    [books, status, genre, query, sort],
  );

  const closeForm = () => {
    setShowForm(false);
    setEditingBook(null);
  };
  const saveBook = (book) => {
    if (editingBook) updateBook(editingBook.id, book);
    else addBook(book);
    closeForm();
  };
  const askDelete = (book) => {
    if (window.confirm(`Hapus “${book.title}” dari koleksi?`))
      deleteBook(book.id);
  };

  return (
    <div className="page-content home-page">
      <section className="welcome-banner">
        <div className="banner-copy">
          <span className="eyebrow">
            SABTU, 24 OKTOBER 2026{" "}
            <i>
              <BookIcon name="sparkle" />
            </i>{" "}
            JEDA SEJENAK
          </span>
          <h1>
            Rak kecil,
            <br />
            <em>cerita tak berujung.</em>
          </h1>
          <p>
            Semua yang sedang dan ingin kamu baca, terkumpul di satu tempat.
          </p>
          <button
            className="banner-cta"
            onClick={() => {
              setEditingBook(null);
              setShowForm((shown) => !shown);
            }}
          >
            {showForm && !editingBook ? (
              "Tutup formulir"
            ) : (
              <>
                <BookIcon name="add" /> Tambah buku baru
              </>
            )}
          </button>
        </div>
        <div className="banner-art" aria-hidden="true">
          <div className="art-sun" />
          <div className="art-book art-book-one">
            <span>
              CATATAN
              <br />
              MUSIM
            </span>
          </div>
          <div className="art-book art-book-two">
            <span>
              HALAMAN
              <br />
              BERIKUTNYA
            </span>
          </div>
          <div className="art-book art-book-three" />
          <div className="art-vase">
            <span />
          </div>
          <span className="art-star">
            <BookIcon name="sparkle" />
          </span>
          <span className="art-caption">BACA PERLAHAN</span>
        </div>
        <div className="banner-index">
          01 <span>/</span> 03
        </div>
      </section>

      <section className="summary-strip" aria-label="Ringkasan koleksi">
        <div className="summary-item">
          <span className="summary-icon">
            <BookIcon name="books" />
          </span>
          <div>
            <strong>{stats.total}</strong>
            <small>BUKU DI RAK</small>
          </div>
        </div>
        <div className="summary-item">
          <span className="summary-icon reading-icon">
            <BookIcon name="reading" />
          </span>
          <div>
            <strong>{stats.reading}</strong>
            <small>SEDANG DIBACA</small>
          </div>
        </div>
        <div className="summary-item">
          <span className="summary-icon finished-icon">
            <BookIcon name="owned" />
          </span>
          <div>
            <strong>{stats.owned}</strong>
            <small>BUKU DIMILIKI</small>
          </div>
        </div>
        <div className="summary-item">
          <span className="summary-icon">
            <BookIcon name="add" />
          </span>
          <div>
            <strong>{stats.wantToBuy}</strong>
            <small>INGIN DIBELI</small>
          </div>
        </div>
        <div className="summary-caption">
          Setiap buku punya waktunya sendiri.
        </div>
      </section>

      <section className="collection-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">KURASI PRIBADI</span>
            <h2>
              Isi rak bukumu <span>({books.length})</span>
            </h2>
          </div>
          <div className="section-aside">
            CATATAN BACA{" "}
            <span>
              <BookIcon name="arrow" />
            </span>
          </div>
        </div>
        {showForm && (
          <BookForm
            initialBook={editingBook}
            onSave={saveBook}
            onCancel={closeForm}
          />
        )}
        <BookFilter
          query={query}
          setQuery={setQuery}
          status={status}
          setStatus={setStatus}
          genre={genre}
          setGenre={setGenre}
          genres={genres}
          sort={sort}
          setSort={setSort}
        />
        <div className="results-line">
          <span>
            MENAMPILKAN <b>{visibleBooks.length}</b> DARI {books.length} BUKU
          </span>
          <span>
            URUTAN PILIHANMU{" "}
            <i>
              <BookIcon name="sparkle" />
            </i>
          </span>
        </div>
        <BookList
          books={visibleBooks}
          onEdit={(book) => {
            setEditingBook(book);
            setShowForm(true);
            window.scrollTo({ top: 340, behavior: "smooth" });
          }}
          onDelete={askDelete}
        />
      </section>
    </div>
  );
}

Home.propTypes = {
  stats: PropTypes.shape({
    total: PropTypes.number.isRequired,
    owned: PropTypes.number.isRequired,
    reading: PropTypes.number.isRequired,
    wantToBuy: PropTypes.number.isRequired,
  }).isRequired,
};
