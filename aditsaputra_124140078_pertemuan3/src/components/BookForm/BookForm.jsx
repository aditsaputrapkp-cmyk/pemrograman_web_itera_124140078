import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BookIcon from "../BookIcons.jsx";
import "./BookForm.css";

const emptyForm = {
  title: "",
  author: "",
  genre: "Fiksi",
  status: "Ingin dibeli",
  pages: "",
  rating: 0,
  note: "",
};
const genres = [
  "Fiksi",
  "Sastra dunia",
  "Sejarah",
  "Pengembangan diri",
  "Sains",
  "Biografi",
  "Lainnya",
];

export default function BookForm({ initialBook, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(
      initialBook
        ? { ...emptyForm, ...initialBook, pages: initialBook.pages || "" }
        : emptyForm,
    );
    setErrors({});
  }, [initialBook]);

  const change = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };
  const submit = (event) => {
    event.preventDefault();
    // Validasi eksplisit memberi feedback yang terlihat, bukan hanya mengandalkan browser.
    const nextErrors = {
      title: form.title.trim() ? "" : "Judul buku wajib diisi.",
      author: form.author.trim() ? "" : "Nama penulis wajib diisi.",
    };
    if (nextErrors.title || nextErrors.author) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    onSave({
      ...form,
      pages: Number(form.pages) || 0,
      rating: form.status === "Dimiliki" ? Number(form.rating) : 0,
    });
  };

  return (
    <form className="book-form" onSubmit={submit}>
      <div className="form-heading">
        <div>
          <span className="eyebrow">FORMULIR KOLEKSI</span>
          <h2>{initialBook ? "Ubah detail buku" : "Buku baru, cerita baru"}</h2>
        </div>
        <button
          type="button"
          className="close-form"
          onClick={onCancel}
          aria-label="Tutup formulir"
        >
          <BookIcon name="close" />
        </button>
      </div>
      <div className="form-grid">
        <label className="field full-field">
          Judul buku
          <input
            autoFocus
            name="title"
            value={form.title}
            onChange={change}
            aria-invalid={Boolean(errors.title)}
            placeholder="Contoh: Bumi Manusia"
          />
          {errors.title && (
            <small className="field-error" role="alert">
              {errors.title}
            </small>
          )}
        </label>
        <label className="field">
          Nama penulis
          <input
            name="author"
            value={form.author}
            onChange={change}
            aria-invalid={Boolean(errors.author)}
            placeholder="Nama penulis"
          />
          {errors.author && (
            <small className="field-error" role="alert">
              {errors.author}
            </small>
          )}
        </label>
        <label className="field">
          Genre
          <select name="genre" value={form.genre} onChange={change}>
            {genres.map((genre) => (
              <option key={genre}>{genre}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Status buku
          <select name="status" value={form.status} onChange={change}>
            <option>Dimiliki</option>
            <option>Sedang dibaca</option>
            <option>Ingin dibeli</option>
          </select>
        </label>
        <label className="field">
          Jumlah halaman
          <input
            type="number"
            min="0"
            name="pages"
            value={form.pages}
            onChange={change}
            placeholder="0"
          />
        </label>
        {form.status === "Dimiliki" && (
          <label className="field">
            Nilai untuk buku
            <select name="rating" value={form.rating} onChange={change}>
              <option value="0">Belum dinilai</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option value={value} key={value}>
                  {value} dari 5 bintang
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="field full-field">
          Catatan kecil <span className="optional">(opsional)</span>
          <textarea
            rows="2"
            name="note"
            value={form.note}
            onChange={change}
            placeholder="Kutipan, kesan, atau pengingat untuk diri sendiri…"
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="button" className="button-quiet" onClick={onCancel}>
          Batal
        </button>
        <button type="submit" className="button-primary">
          {initialBook ? "Simpan perubahan" : "Tambahkan ke koleksi"}{" "}
          <span>
            <BookIcon name="arrow" />
          </span>
        </button>
      </div>
    </form>
  );
}

BookForm.propTypes = {
  initialBook: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    author: PropTypes.string,
    genre: PropTypes.string,
    status: PropTypes.string,
    pages: PropTypes.number,
    rating: PropTypes.number,
    note: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
