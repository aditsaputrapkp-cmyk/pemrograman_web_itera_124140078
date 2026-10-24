import "./BookFilter.css";
import PropTypes from "prop-types";
import BookIcon from "../BookIcons.jsx";

export default function BookFilter({
  query,
  setQuery,
  status,
  setStatus,
  genre,
  setGenre,
  genres,
  sort,
  setSort,
}) {
  return (
    <div className="filter-panel">
      <label className="search-box">
        <span>
          <BookIcon name="search" />
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari judul atau penulis…"
          aria-label="Cari judul atau penulis"
        />
        {query && (
          <button onClick={() => setQuery("")} aria-label="Hapus pencarian">
            <BookIcon name="close" />
          </button>
        )}
      </label>
      <div className="filter-controls">
        <label className="select-filter">
          <span>GENRE</span>
          <select
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          >
            <option value="Semua">Semua genre</option>
            {genres.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="select-filter sort-filter">
          <span>URUTKAN</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="newest">Terbaru ditambahkan</option>
            <option value="title">Judul A–Z</option>
            <option value="author">Nama penulis</option>
          </select>
        </label>
      </div>
      <div className="status-tabs" role="group" aria-label="Filter status buku">
        {["Semua", "Dimiliki", "Sedang dibaca", "Ingin dibeli"].map((item) => (
          <button
            key={item}
            className={status === item ? "status-tab selected" : "status-tab"}
            onClick={() => setStatus(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired,
  setGenre: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
};
