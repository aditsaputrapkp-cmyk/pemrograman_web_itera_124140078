import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { BookProvider, useBooks } from "./context/BookContext.jsx";
import BookIcon from "./components/BookIcons.jsx";
import useBookStats from "./hooks/useBookStats.js";
import Home from "./pages/Home/Home.jsx";
import Stats from "./pages/Stats/Stats.jsx";

function Shell() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/" aria-label="Ruang Baca, beranda">
          <span className="brand-mark">
            rb<span>.</span>
          </span>
          <span className="brand-name">
            ruang baca<small>perpustakaan pribadi</small>
          </span>
        </NavLink>
        <div className="sidebar-label">MENU</div>
        <nav className="side-nav" aria-label="Navigasi utama">
          <NavLink
            end
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">
              <BookIcon name="collection" />
            </span>{" "}
            Koleksi <span className="nav-count">{books.length}</span>
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">
              <BookIcon name="notes" />
            </span>{" "}
            Catatan baca
          </NavLink>
        </nav>
        <div className="sidebar-note">
          <span className="note-spark">
            <BookIcon name="sparkle" />
          </span>
          <p>“Satu halaman setiap hari tetaplah sebuah perjalanan.”</p>
          <small>CATATAN KECIL</small>
        </div>
        <div className="profile-chip">
          <span className="avatar">A</span>
          <span>
            Perpustakaanku<small>Ruang yang terus tumbuh</small>
          </span>
          <span className="profile-dots">···</span>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            Ruang Baca <span>/</span>{" "}
            <Routes>
              <Route path="/" element={<strong>Koleksi buku</strong>} />
              <Route
                path="/stats"
                element={<strong>Statistik koleksi</strong>}
              />
              <Route path="*" element={<strong>Perpustakaan</strong>} />
            </Routes>
          </div>
          <div className="topbar-right">
            <span className="today-date">RAK BACA PRIBADI</span>
            <span className="top-avatar">A</span>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home stats={stats} />} />
          <Route
            path="/stats"
            element={<Stats books={books} stats={stats} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <footer className="site-footer">
          <span>
            RUANG BACA <b>·</b> KOLEKSI PRIBADI
          </span>
          <span>
            Dirawat pelan-pelan{" "}
            <span className="footer-heart">
              <BookIcon name="heart" />
            </span>
          </span>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <BookProvider>
        <Shell />
      </BookProvider>
    </BrowserRouter>
  );
}
