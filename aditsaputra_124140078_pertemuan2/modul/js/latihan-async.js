import { wait, escapeHTML, debounce } from './modules/utils.js';

// Fetch riil dengan timeout. JSON lokal dan API publik memakai alur yang sama.
export async function fetchJSON(url, timeout = 6000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}: data belum dapat dimuat.`);
    return await response.json();
  } finally { clearTimeout(timer); }
}

export function createAPI(mode = 'local') {
  const endpoint = (resource) => mode === 'public'
    ? `https://jsonplaceholder.typicode.com/${resource}`
    : new URL(`../data/${resource}.json`, import.meta.url).href;
  return {
    users: () => fetchJSON(endpoint('users')),
    posts: () => fetchJSON(endpoint('posts')),
    async page(page = 1, limit = 4) {
      if (mode === 'public') {
        const items = await fetchJSON(`${endpoint('todos')}?_page=${page}&_limit=${limit}`);
        // JSONPlaceholder menyediakan 200 todos; total dibaca dari endpoint daftar.
        const all = await fetchJSON(endpoint('todos'));
        return { items, total: all.length };
      }
      const all = await fetchJSON(endpoint('todos'));
      return { items: all.slice((page - 1) * limit, page * limit), total: all.length };
    },
    async search(keyword) {
      const url = mode === 'public' ? `${endpoint('todos')}?q=${encodeURIComponent(keyword)}` : endpoint('todos');
      const items = await fetchJSON(url);
      return items.filter(({ title }) => title.toLowerCase().includes(keyword.toLowerCase())).slice(0, 10);
    }
  };
}

// Latihan 17: ambil dua endpoint dan gabungkan berdasarkan id.
export const fetchCombined = async (api) => {
  const [users, posts] = await Promise.all([api.users(), api.posts()]);
  return users.slice(0, 5).map(({ id, name }) => ({
    id, name, posts: posts.filter(({ userId }) => userId === id).map(({ title }) => title)
  }));
};

// Latihan 18: jeda bertambah dua kali lipat pada setiap kegagalan.
export async function withRetry(operation, { retries = 2, baseDelay = 200, onRetry = () => {} } = {}) {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try { return await operation(attempt); }
    catch (error) {
      if (attempt === retries) throw error;
      const delay = baseDelay * 2 ** attempt;
      onRetry({ attempt: attempt + 1, delay, message: error.message });
      await wait(delay);
    }
  }
}

// Latihan 19–20: batas penanganan error pada satu panel UI.
// Pola ini memakai try/catch/finally di JavaScript biasa.
export async function runAsyncBoundary({ button, status, output }, job, render) {
  button.disabled = true;
  status.className = 'status';
  status.textContent = 'Memuat data…';
  output.setAttribute('aria-busy', 'true');
  try {
    const result = await job();
    render(result);
    status.className = 'status success';
    status.textContent = 'Data berhasil dimuat.';
    return { success: true, result };
  } catch (error) {
    status.className = 'status error';
    status.textContent = 'Data gagal dimuat. Panel lain tetap dapat digunakan.';
    output.textContent = error.name === 'AbortError' ? 'Permintaan melewati batas waktu. Coba lagi.' : error.message;
    return { success: false, error: error.message };
  } finally {
    button.disabled = false;
    output.setAttribute('aria-busy', 'false');
  }
}

const elementsFor = (prefix, buttonId) => ({
  button: document.getElementById(buttonId),
  status: document.getElementById(`${prefix}-status`),
  output: document.getElementById(`${prefix}-output`)
});

const renderRecords = (container, items) => {
  container.innerHTML = items.length
    ? items.map(({ id, title, completed }) => `<div class="result-row"><strong>${escapeHTML(title)}</strong><span>#${id} · ${completed ? 'Selesai' : 'Belum selesai'}</span></div>`).join('')
    : '<p class="empty-result">Tidak ada data yang sesuai.</p>';
};

export class AsyncExercises {
  constructor() {
    this.mode = 'local';
    this.api = createAPI(this.mode);
    this.page = 1;
    this.limit = 4;
    this.total = 12;
    this.pageVersion = 0;
    this.searchVersion = 0;
    this.bindEvents();
    this.loadPage(1);
  }

  bindEvents() {
    document.getElementById('fetch-combined').addEventListener('click', () => {
      const elements = elementsFor('combined', 'fetch-combined');
      runAsyncBoundary(elements, () => fetchCombined(this.api), (data) => { elements.output.textContent = JSON.stringify(data, null, 2); });
    });

    document.getElementById('run-retry').addEventListener('click', () => {
      const elements = elementsFor('retry', 'run-retry');
      const log = [];
      const api = this.api;
      runAsyncBoundary(elements, () => withRetry(async (attempt) => {
        log.push(`Percobaan ${attempt + 1}`);
        if (attempt < 2) throw new Error('Kegagalan simulasi');
        return await api.users();
      }, { onRetry: ({ delay }) => { log.push(`Tunggu ${delay} ms`); elements.output.textContent = log.join('\n'); } }), (users) => {
        elements.output.textContent = `${log.join('\n')}\nBerhasil: ${users.length} pengguna.`;
      });
    });

    document.getElementById('run-loading').addEventListener('click', () => {
      const elements = elementsFor('loading', 'run-loading');
      const api = this.api;
      runAsyncBoundary(elements, async () => { await wait(650); return await api.users(); }, (users) => {
        elements.output.textContent = JSON.stringify(users.map(({ id, name }) => ({ id, name })), null, 2);
      });
    });

    const errorButtons = ['run-error', 'recover-error'].map((id) => document.getElementById(id));
    const runErrorPanel = async (elements, job, render) => {
      if (errorButtons.some((button) => button.disabled)) return;
      errorButtons.forEach((button) => { button.disabled = true; });
      try { return await runAsyncBoundary(elements, job, render); }
      finally { errorButtons.forEach((button) => { button.disabled = false; }); }
    };

    document.getElementById('run-error').addEventListener('click', () => {
      const elements = elementsFor('error', 'run-error');
      runErrorPanel(elements, async () => { await wait(200); throw new Error('Simulasi: server tidak dapat dihubungi. Gunakan tombol Coba lagi untuk memulihkan panel.'); }, () => {});
    });
    document.getElementById('recover-error').addEventListener('click', () => {
      const elements = elementsFor('error', 'recover-error');
      runErrorPanel(elements, () => this.api.users(), (data) => { elements.output.textContent = `Panel pulih. ${data.length} pengguna berhasil dimuat.`; });
    });

    document.getElementById('previous-page').addEventListener('click', () => this.loadPage(this.page - 1));
    document.getElementById('next-page').addEventListener('click', () => this.loadPage(this.page + 1));
    // Versi request berubah segera saat mengetik, sebelum waktu debounce berakhir.
    const searchLater = debounce((keyword, version) => this.search(keyword, version), 400);
    document.getElementById('async-search').addEventListener('input', (event) => {
      const keyword = event.target.value.trim();
      const version = ++this.searchVersion;
      if (!keyword) {
        document.getElementById('search-status').textContent = 'Ketik kata kunci untuk mulai mencari.';
        document.getElementById('search-output').innerHTML = '';
        document.getElementById('search-output').setAttribute('aria-busy', 'false');
        return;
      }
      document.getElementById('search-status').textContent = 'Menunggu ketikan selesai…';
      searchLater(keyword, version);
    });

    document.getElementById('api-mode').addEventListener('change', (event) => {
      this.mode = event.target.value;
      this.api = createAPI(this.mode);
      ++this.searchVersion;
      document.getElementById('async-search').value = '';
      document.getElementById('async-search').placeholder = this.mode === 'local' ? 'Contoh lokal: JavaScript, tugas, jaringan…' : 'Contoh API: delectus, quis, aut…';
      document.getElementById('search-output').innerHTML = '';
      document.getElementById('search-output').setAttribute('aria-busy', 'false');
      document.getElementById('search-status').textContent = 'Ketik kata kunci untuk mulai mencari.';
      this.loadPage(1);
    });
  }

  // Latihan 21: pergantian halaman melalui operasi async/await.
  async loadPage(targetPage) {
    const version = ++this.pageVersion;
    const status = document.getElementById('pagination-status');
    const output = document.getElementById('pagination-output');
    const previous = document.getElementById('previous-page');
    const next = document.getElementById('next-page');
    previous.disabled = true;
    next.disabled = true;
    status.className = 'status';
    status.textContent = 'Memuat halaman…';
    output.setAttribute('aria-busy', 'true');
    try {
      const { items, total } = await this.api.page(Math.max(1, targetPage), this.limit);
      if (version !== this.pageVersion) return;
      this.page = Math.max(1, targetPage);
      this.total = total;
      renderRecords(output, items);
      document.getElementById('page-label').textContent = `Halaman ${this.page} / ${Math.max(1, Math.ceil(total / this.limit))}`;
      status.className = 'status success';
      status.textContent = `${items.length} catatan ditampilkan dari ${total} catatan.`;
    } catch (error) {
      if (version !== this.pageVersion) return;
      status.className = 'status error';
      status.textContent = 'Halaman gagal dimuat. Ubah sumber data atau coba tombol navigasi kembali.';
      output.textContent = error.message;
    } finally {
      if (version === this.pageVersion) {
        previous.disabled = this.page <= 1;
        next.disabled = this.page >= Math.ceil(this.total / this.limit);
        output.setAttribute('aria-busy', 'false');
      }
    }
  }

  // Latihan 22: debounce dan perlindungan terhadap respons yang datang terlambat.
  async search(keyword, version) {
    if (version !== this.searchVersion) return;
    const status = document.getElementById('search-status');
    const output = document.getElementById('search-output');
    status.className = 'status';
    status.textContent = 'Mencari data…';
    output.setAttribute('aria-busy', 'true');
    try {
      const items = await this.api.search(keyword);
      if (version !== this.searchVersion) return;
      renderRecords(output, items);
      status.className = 'status success';
      status.textContent = `${items.length} hasil untuk “${keyword}”.`;
    } catch (error) {
      if (version !== this.searchVersion) return;
      status.className = 'status error';
      status.textContent = 'Pencarian gagal. Periksa koneksi atau gunakan JSON lokal.';
      output.textContent = error.message;
    } finally {
      if (version === this.searchVersion) output.setAttribute('aria-busy', 'false');
    }
  }
}
