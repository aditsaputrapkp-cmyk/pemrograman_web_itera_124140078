import "./Stats.css";
import PropTypes from "prop-types";
import BookIcon from "../../components/BookIcons.jsx";

export default function Stats({ books, stats }) {
  const ownedBooks = books
    .filter((book) => book.status === "Dimiliki")
    .sort((a, b) => (b.rating || 0) - (a.rating || 0));
  const genreCounts = books.reduce((counts, book) => {
    counts[book.genre] = (counts[book.genre] || 0) + 1;
    return counts;
  }, {});
  const genreEntries = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);
  const maxGenre = Math.max(1, ...genreEntries.map(([, count]) => count));

  return (
    <div className="page-content stats-page">
      <section className="stats-intro">
        <span className="eyebrow">BUKAN SOAL SEBERAPA CEPAT</span>
        <h1>
          Jejak kecil
          <br />
          <em>di antara halaman.</em>
        </h1>
        <p>
          Setiap buku di rak menyimpan perjalanan tersendiri. Ini catatan
          koleksi dan bacaanmu.
        </p>
        <div className="stats-intro-mark">
          <BookIcon name="sparkle" />
        </div>
      </section>
      <section className="stats-overview">
        <article className="stat-card stat-card-main">
          <span className="stat-label">BUKU DIMILIKI</span>
          <div
            className="progress-ring"
            style={{ "--progress": `${stats.ownedRate * 3.6}deg` }}
          >
            <div>
              <strong>{stats.owned}</strong>
              <small>dari {stats.total}</small>
            </div>
          </div>
          <span className="stat-foot">
            {stats.ownedRate}% dari seluruh koleksi
          </span>
        </article>
        <article className="stat-card">
          <span className="stat-label">HALAMAN DILALUI</span>
          <strong className="big-stat">
            {stats.pagesRead.toLocaleString("id-ID")}
          </strong>
          <span className="stat-foot">
            halaman dari buku yang sedang dibaca
          </span>
          <span className="stat-card-symbol">
            <BookIcon name="pages" />
          </span>
        </article>
        <article className="stat-card">
          <span className="stat-label">NILAI RATA-RATA</span>
          <strong className="big-stat">
            {stats.averageRating ? stats.averageRating.toFixed(1) : "—"}
            <small> / 5</small>
          </strong>
          <span className="stat-foot stat-stars">★★★★★</span>
          <span className="stat-card-symbol">
            <BookIcon name="bookmark" />
          </span>
        </article>
        <article className="stat-card">
          <span className="stat-label">GENRE FAVORIT</span>
          <strong className="favorite-genre">{stats.favoriteGenre}</strong>
          <span className="stat-foot">paling banyak ada di koleksimu</span>
          <span className="stat-card-symbol">
            <BookIcon name="books" />
          </span>
        </article>
      </section>
      <div className="stats-columns">
        <section className="stats-panel genre-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">WARNA-WARNI RAKMU</span>
              <h2>Genre yang dibaca</h2>
            </div>
            <span className="panel-icon">
              <BookIcon name="arrow" />
            </span>
          </div>
          {genreEntries.length ? (
            <div className="genre-bars">
              {genreEntries.map(([name, count], index) => (
                <div className="genre-row" key={name}>
                  <div className="genre-name">
                    <span className={`genre-dot dot-${index % 5}`} />
                    {name}
                    <small>{count} buku</small>
                  </div>
                  <div className="bar-track">
                    <span
                      className={`bar-fill fill-${index % 5}`}
                      style={{
                        width: `${Math.max(8, (count / maxGenre) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="stats-empty">
              Tambahkan buku ke koleksi untuk melihat sebaran genre.
            </p>
          )}
          <div className="genre-note">
            {genreEntries.length ? (
              <>
                <b>{genreEntries.length} genre</b> sudah menemukan tempat di
                rakmu.
              </>
            ) : (
              "Rakmu sedang menunggu cerita pertama."
            )}
          </div>
        </section>
        <section className="stats-panel finished-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">YANG TINGGAL DI INGATAN</span>
              <h2>Buku paling berkesan</h2>
            </div>
            <span className="panel-icon">
              <BookIcon name="sparkle" />
            </span>
          </div>
          {ownedBooks.length ? (
            <div className="finished-list">
              {ownedBooks.slice(0, 4).map((book, index) => (
                <div className="finished-row" key={book.id}>
                  <span className="finished-number">0{index + 1}</span>
                  <div className="finished-book">
                    <strong>{book.title}</strong>
                    <small>{book.author}</small>
                  </div>
                  <span className="finished-rating">
                    {book.rating ? `${book.rating} ★` : "—"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="stats-empty">
              Buku yang kamu tandai dimiliki akan muncul di sini.
            </p>
          )}
          <div className="finished-total">
            <span>MASIH DALAM PERJALANAN</span>
            <strong>
              {stats.reading + stats.wantToBuy} <small>buku</small>
            </strong>
          </div>
        </section>
      </div>
      <div className="stats-quote">
        <span>“</span>
        <p>Membaca adalah cara kita berjalan jauh tanpa harus beranjak.</p>
        <small>SEBUAH PENGINGAT UNTUK HARI INI</small>
      </div>
    </div>
  );
}

const bookShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  genre: PropTypes.string,
  rating: PropTypes.number,
});

Stats.propTypes = {
  books: PropTypes.arrayOf(bookShape).isRequired,
  stats: PropTypes.shape({
    total: PropTypes.number.isRequired,
    owned: PropTypes.number.isRequired,
    reading: PropTypes.number.isRequired,
    wantToBuy: PropTypes.number.isRequired,
    pagesRead: PropTypes.number.isRequired,
    averageRating: PropTypes.number.isRequired,
    favoriteGenre: PropTypes.string.isRequired,
    ownedRate: PropTypes.number.isRequired,
  }).isRequired,
};
