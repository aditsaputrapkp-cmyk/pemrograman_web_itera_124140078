import { DashboardApp } from './app.js';
import { $, debounce } from './modules/utils.js';
import { STORAGE_KEY } from './modules/data.js';

const dashboard = new DashboardApp();
dashboard.render();
dashboard.updateClock();
setInterval(() => dashboard.updateClock(), 1000);

$('#add-task').addEventListener('click', () => dashboard.openForm());
$('#task-form').addEventListener('submit', (event) => dashboard.submitForm(event));
$('#close-form').addEventListener('click', () => $('#task-dialog').close());
$('#cancel-form').addEventListener('click', () => $('#task-dialog').close());
$('#sample-tasks').addEventListener('click', () => dashboard.loadSampleTasks());

$('.filter-tabs').addEventListener('click', (event) => {
  const tab = event.target.closest('[data-filter]');
  if (!tab) return;
  dashboard.filters = { ...dashboard.filters, status: tab.dataset.filter };
  document.querySelectorAll('[data-filter]').forEach((button) => {
    const selected = button === tab;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  dashboard.render();
});

$('#search').addEventListener('input', debounce((event) => {
  dashboard.filters = { ...dashboard.filters, search: event.target.value.trim() };
  dashboard.render();
}));

$('#priority-filter').addEventListener('change', (event) => {
  dashboard.filters = { ...dashboard.filters, priority: event.target.value };
  dashboard.render();
});
$('#sort-order').addEventListener('change', (event) => {
  dashboard.filters = { ...dashboard.filters, sort: event.target.value };
  dashboard.render();
});

// Event delegation menjaga tombol pada HTML hasil render tetap aktif.
$('#task-list').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === 'edit') dashboard.openForm(id);
  if (action === 'delete') dashboard.requestDelete(id);
});
$('#task-list').addEventListener('change', (event) => {
  if (!event.target.matches('[data-action="toggle"]')) return;
  try {
    dashboard.toggleTask(event.target.dataset.id);
  } catch {
    dashboard.render();
    dashboard.showToast('Status tugas belum tersimpan karena penyimpanan browser gagal.');
  }
});
$('#focus-content').addEventListener('click', (event) => {
  const button = event.target.closest('[data-focus-id]');
  if (button) dashboard.openForm(button.dataset.focusId);
});
$('#cancel-delete').addEventListener('click', () => $('#delete-dialog').close());
$('#confirm-delete').addEventListener('click', () => dashboard.confirmDelete());
$('#refresh-weather').addEventListener('click', () => dashboard.loadWeather());
dashboard.loadWeather();

// Perbarui daftar ketika pengguna mengubah data melalui tab browser lain.
window.addEventListener('storage', (event) => {
  if (event.key !== STORAGE_KEY && event.key !== null) return;
  dashboard.tasks = [];
  dashboard.loadTasks();
  dashboard.render();
});
