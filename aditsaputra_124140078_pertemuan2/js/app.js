import { $, escapeHTML, getToday, isValidDate, formatDate, dueInfo, calculateStats, fetchJSON, weatherDescription } from './modules/utils.js';
import { STORAGE_KEY, PRIORITIES, WEATHER_URL, createSampleTasks } from './modules/data.js';

// Model setiap tugas. Destructuring dan default parameters digunakan di constructor.
export class TaskItem {
  constructor({ id = crypto.randomUUID(), title, course, deadline, priority = 'medium', note = '', completed = false, createdAt = new Date().toISOString() }) {
    this.id = id;
    this.title = title.trim();
    this.course = course.trim();
    this.deadline = deadline;
    this.priority = priority;
    this.note = note.trim();
    this.completed = completed;
    this.createdAt = createdAt;
  }

  static validate({ title, course, deadline, priority = 'medium', note = '' }) {
    if (typeof title !== 'string' || !title.trim() || title.trim().length > 120) throw new Error('Nama tugas harus diisi, maksimal 120 karakter.');
    if (typeof course !== 'string' || !course.trim() || course.trim().length > 80) throw new Error('Mata kuliah harus diisi, maksimal 80 karakter.');
    if (!isValidDate(deadline)) throw new Error('Tenggat harus berupa tanggal yang valid.');
    if (!Object.hasOwn(PRIORITIES, priority)) throw new Error('Prioritas tugas tidak valid.');
    if (typeof note !== 'string' || note.length > 600) throw new Error('Catatan maksimal 600 karakter.');
  }

  get priorityLabel() { return PRIORITIES[this.priority].label; }
  get isOverdue() { return !this.completed && this.deadline < getToday(); }
}

// Pengelola state, localStorage, CRUD, rendering, dan data API.
export class DashboardApp {
  constructor() {
    this.tasks = [];
    this.filters = { status: 'all', search: '', priority: 'all', sort: 'deadline' };
    this.deleteId = null;
    this.toastTimer = null;
    this.lastDay = getToday();
    this.storage = this.getStorage();
    this.loadTasks();
  }

  getStorage() {
    try {
      const storage = window.localStorage;
      const key = `${STORAGE_KEY}-check`;
      storage.setItem(key, 'ok');
      storage.removeItem(key);
      return storage;
    } catch {
      this.showStorageNotice('Penyimpanan browser tidak tersedia. Perubahan hanya bertahan selama halaman ini terbuka.');
      return null;
    }
  }

  showStorageNotice(message) {
    const notice = $('#storage-notice');
    notice.textContent = message;
    notice.hidden = false;
  }

  loadTasks() {
    if (!this.storage) return;
    const raw = this.storage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw);
      if (saved.version !== 1 || !Array.isArray(saved.tasks)) throw new Error('Format penyimpanan tidak sesuai.');
      const ids = new Set();
      this.tasks = saved.tasks.map((item) => {
        TaskItem.validate(item);
        if (typeof item.id !== 'string' || !item.id || ids.has(item.id) || typeof item.completed !== 'boolean' || typeof item.createdAt !== 'string' || Number.isNaN(Date.parse(item.createdAt))) throw new Error('Data tugas tidak valid.');
        ids.add(item.id);
        return new TaskItem(item);
      });
    } catch {
      // Salinan data lama disimpan sebelum pengguna membuat data baru.
      try {
        this.storage.setItem(`${STORAGE_KEY}-recovery-${Date.now()}`, raw);
        this.tasks = [];
        this.showStorageNotice('Data lama tidak dapat dibaca. Salinannya telah disimpan di browser; daftar baru dimulai kosong.');
      } catch {
        this.storage = null;
        this.tasks = [];
        this.showStorageNotice('Data lama tidak dapat dibaca. Perubahan sementara hanya bertahan selama halaman ini terbuka.');
      }
    }
  }

  commitTasks(nextTasks) {
    // Simpan sebelum mengganti state agar kegagalan menulis tidak dianggap sukses.
    if (this.storage) this.storage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, tasks: nextTasks }));
    this.tasks = nextTasks;
    this.render();
  }

  addTask(data) {
    TaskItem.validate(data);
    const task = new TaskItem(data);
    this.commitTasks([...this.tasks, task]);
    return task;
  }

  updateTask(id, changes) {
    const previous = this.tasks.find((task) => task.id === id);
    if (!previous) throw new Error('Tugas tidak ditemukan.');
    const updated = { ...previous, ...changes, id: previous.id, createdAt: previous.createdAt };
    TaskItem.validate(updated);
    this.commitTasks(this.tasks.map((task) => task.id === id ? new TaskItem(updated) : task));
  }

  deleteTask(id) {
    this.commitTasks(this.tasks.filter((task) => task.id !== id));
  }

  toggleTask(id) {
    const task = this.tasks.find((item) => item.id === id);
    if (task) this.updateTask(id, { completed: !task.completed });
  }

  getVisibleTasks() {
    const { status, search, priority, sort } = this.filters;
    const keyword = search.toLocaleLowerCase('id-ID');
    const compare = (a, b) => {
      if (sort === 'newest') return b.createdAt.localeCompare(a.createdAt);
      if (sort === 'priority') return PRIORITIES[a.priority].rank - PRIORITIES[b.priority].rank || a.deadline.localeCompare(b.deadline);
      return a.deadline.localeCompare(b.deadline) || PRIORITIES[a.priority].rank - PRIORITIES[b.priority].rank;
    };
    return this.tasks
      .filter(({ completed }) => status === 'all' || (status === 'completed' ? completed : !completed))
      .filter((task) => priority === 'all' || task.priority === priority)
      .filter(({ title, course }) => `${title} ${course}`.toLocaleLowerCase('id-ID').includes(keyword))
      .sort(compare);
  }

  renderTask(task) {
    const { id, title, course, deadline, note, priority, completed } = task;
    const due = dueInfo(task);
    // Semua teks dari pengguna di-escape sebelum masuk ke template HTML.
    return `
      <article class="task-row ${completed ? 'completed' : ''}" data-task-id="${escapeHTML(id)}">
        <input type="checkbox" class="task-check" data-action="toggle" data-id="${escapeHTML(id)}" ${completed ? 'checked' : ''} aria-label="${completed ? 'Tandai belum selesai' : 'Tandai selesai'}: ${escapeHTML(title)}">
        <div class="task-content"><h3 class="task-title">${escapeHTML(title)}</h3><span class="course-label">${escapeHTML(course)}</span>
          ${note ? `<p class="task-note">${escapeHTML(note)}</p>` : ''}
        </div>
        <div class="task-deadline"><span class="due-badge ${due.className}" title="Tenggat: ${escapeHTML(deadline)}">${due.label}</span><time datetime="${escapeHTML(deadline)}">${formatDate(deadline, true)}</time></div>
        <span class="badge priority-${priority}"><span class="sr-only">Prioritas </span>${task.priorityLabel}</span>
        <div class="task-actions"><button class="icon-button" data-action="edit" data-id="${escapeHTML(id)}" aria-label="Edit tugas: ${escapeHTML(title)}" title="Edit tugas"><svg class="icon"><use href="#i-edit"/></svg></button><button class="icon-button delete" data-action="delete" data-id="${escapeHTML(id)}" aria-label="Hapus tugas: ${escapeHTML(title)}" title="Hapus tugas"><svg class="icon"><use href="#i-trash"/></svg></button></div>
      </article>`;
  }

  render() {
    const visible = this.getVisibleTasks();
    const { total, completed, pending, soon } = calculateStats(this.tasks);
    const summary = { total, completed, pending, soon };
    Object.entries(summary).forEach(([key, value]) => { $(`#stat-${key}`).textContent = value; });
    $('#count-all').textContent = total;
    $('#count-pending').textContent = pending;
    $('#count-completed').textContent = completed;
    $('#task-list').innerHTML = visible.map((task) => this.renderTask(task)).join('');
    $('#list-caption').textContent = `${visible.length} dari ${total} tugas ditampilkan`;
    $('#empty-state').hidden = visible.length > 0;
    $('#empty-title').textContent = total ? 'Tidak ada tugas yang sesuai' : 'Mulai dari satu tugas';
    $('#empty-description').textContent = total ? 'Coba ubah pencarian atau filter untuk melihat tugas lainnya.' : 'Catat tugas kuliah pertamamu, lalu atur tenggat dan prioritasnya.';
    $('#sample-tasks').hidden = total > 0;
    $('#save-status').textContent = this.storage ? 'Data disimpan di browser ini' : 'Penyimpanan sementara · data belum tersimpan di browser';
    const percent = total ? Math.round(completed / total * 100) : 0;
    $('#progress-percent').textContent = `${percent}%`;
    $('#progress-bar').value = percent;
    $('#progress-bar').textContent = `${percent}%`;
    $('#progress-copy').textContent = total ? `${completed} dari ${total} tugas sudah selesai.` : 'Belum ada tugas yang dicatat.';
    const next = this.tasks.filter((task) => !task.completed).sort((a, b) => a.deadline.localeCompare(b.deadline) || PRIORITIES[a.priority].rank - PRIORITIES[b.priority].rank)[0];
    $('#focus-content').innerHTML = next ? `
      <p class="focus-title">${escapeHTML(next.title)}</p><p class="focus-course">${escapeHTML(next.course)}</p><div class="focus-bottom"><span>${dueInfo(next).label}</span><button data-focus-id="${escapeHTML(next.id)}">Lihat tugas</button></div>`
      : `<p class="focus-empty">${total ? 'Semua tugas sudah selesai. Nikmati waktu istirahatmu.' : 'Tugas dengan tenggat paling dekat akan muncul di sini.'}</p>`;
  }

  openForm(id = null) {
    const task = id ? this.tasks.find((item) => item.id === id) : null;
    $('#task-form').reset();
    $('#task-id').value = task?.id ?? '';
    $('#task-title').value = task?.title ?? '';
    $('#task-course').value = task?.course ?? '';
    $('#task-deadline').value = task?.deadline ?? getToday();
    $('#task-priority').value = task?.priority ?? 'medium';
    $('#task-note').value = task?.note ?? '';
    $('#form-heading').textContent = task ? 'Edit tugas' : 'Tambah tugas';
    $('#save-task').textContent = task ? 'Simpan perubahan' : 'Simpan tugas';
    $('#form-error').hidden = true;
    $('#task-dialog').showModal();
    $('#task-title').focus();
  }

  submitForm(event) {
    event.preventDefault();
    const { title, course, deadline, priority, note } = Object.fromEntries(new FormData(event.currentTarget));
    const id = $('#task-id').value;
    try {
      if (id) this.updateTask(id, { title, course, deadline, priority, note });
      else this.addTask({ title, course, deadline, priority, note });
      $('#task-dialog').close();
      this.showToast(id ? 'Perubahan tugas disimpan.' : 'Tugas baru ditambahkan.');
    } catch (error) {
      $('#form-error').textContent = error.name === 'QuotaExceededError' ? 'Penyimpanan browser penuh. Tugas belum tersimpan.' : error.message;
      $('#form-error').hidden = false;
    }
  }

  requestDelete(id) {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) return;
    this.deleteId = id;
    $('#delete-description').textContent = `“${task.title}” akan dihapus dari daftar tugas.`;
    $('#delete-dialog').showModal();
    $('#cancel-delete').focus();
  }

  confirmDelete() {
    try {
      this.deleteTask(this.deleteId);
      this.deleteId = null;
      $('#delete-dialog').close();
      this.showToast('Tugas dihapus.');
    } catch {
      $('#delete-dialog').close();
      this.showToast('Tugas belum dihapus karena penyimpanan browser gagal.');
    }
  }

  loadSampleTasks() {
    if (this.tasks.length) return;
    try {
      this.commitTasks(createSampleTasks().map((data) => new TaskItem(data)));
      this.showToast('Data contoh ditambahkan. Tenggatnya hanya untuk demonstrasi.');
    } catch {
      this.showToast('Data contoh belum tersimpan karena penyimpanan browser gagal.');
    }
  }

  showToast(message) {
    const toast = $('#toast');
    clearTimeout(this.toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    this.toastTimer = setTimeout(() => { toast.hidden = true; }, 3500);
  }

  updateClock() {
    const now = new Date();
    $('#today-label').textContent = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' }).format(now);
    $('#clock').textContent = `${new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' }).format(now)} WIB`;
    const day = getToday(now);
    if (day !== this.lastDay) { this.lastDay = day; this.render(); }
  }

  async loadWeather() {
    const container = $('#weather-content');
    const button = $('#refresh-weather');
    container.setAttribute('aria-busy', 'true');
    container.innerHTML = '<p class="muted">Memuat cuaca…</p>';
    button.disabled = true;
    try {
      const { current_weather: current } = await fetchJSON(WEATHER_URL);
      if (!current || !Number.isFinite(current.temperature) || !Number.isFinite(current.weathercode)) throw new Error('Respons cuaca tidak valid.');
      const measured = typeof current.time === 'string' ? current.time.slice(11, 16) : '';
      container.innerHTML = `<div class="weather-main"><svg class="icon"><use href="#i-sun"/></svg><div><p class="temperature">${Math.round(current.temperature)}<span>°C</span></p><p class="weather-detail">${weatherDescription(current.weathercode)}</p></div></div><p class="weather-note">${measured ? `Waktu data: ${escapeHTML(measured)} WIB` : 'Data cuaca terkini'}</p>`;
    } catch {
      container.innerHTML = '<p class="weather-error">Cuaca belum tersedia. Periksa koneksi lalu tekan tombol muat ulang.</p>';
    } finally {
      container.setAttribute('aria-busy', 'false');
      button.disabled = false;
    }
  }
}
