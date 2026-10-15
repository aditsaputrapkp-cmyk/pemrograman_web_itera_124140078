// Arrow functions untuk DOM, keamanan output, tanggal, dan operasi asinkron.
export const $ = (selector) => document.querySelector(selector);
export const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

export const getToday = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(date);
  const read = (type) => parts.find((part) => part.type === type).value;
  return `${read('year')}-${read('month')}-${read('day')}`;
};

export const isValidDate = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

export const addDays = (day, amount) => {
  const date = new Date(`${day}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
};

export const formatDate = (day, full = false) => new Intl.DateTimeFormat('id-ID', {
  day: 'numeric', month: full ? 'long' : 'short', ...(full ? { year: 'numeric' } : {})
}).format(new Date(`${day}T12:00:00`));

export const dueInfo = ({ deadline, completed }, today = getToday()) => {
  if (completed) return { label: 'Selesai', className: 'done-badge', icon: 'check' };
  if (deadline < today) return { label: `Lewat tenggat · ${formatDate(deadline)}`, className: 'overdue', icon: 'clock' };
  if (deadline === today) return { label: 'Hari ini', className: 'today-due', icon: 'calendar' };
  if (deadline === addDays(today, 1)) return { label: 'Besok', className: '', icon: 'calendar' };
  return { label: formatDate(deadline), className: '', icon: 'calendar' };
};

export const calculateStats = (tasks, today = getToday()) => tasks.reduce((result, { completed, deadline }) => ({
  total: result.total + 1,
  completed: result.completed + Number(completed),
  pending: result.pending + Number(!completed),
  soon: result.soon + Number(!completed && deadline >= today && deadline <= addDays(today, 7))
}), { total: 0, completed: 0, pending: 0, soon: 0 });

export const debounce = (callback, delay = 200) => {
  let timer;
  return (...argumentsList) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...argumentsList), delay);
  };
};

export const weatherDescription = (code) => {
  if (code === 0) return 'Cerah';
  if ([1, 2].includes(code)) return 'Cerah berawan';
  if (code === 3) return 'Berawan';
  if ([45, 48].includes(code)) return 'Berkabut';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Gerimis';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Hujan';
  if ([95, 96, 99].includes(code)) return 'Hujan petir';
  return 'Kondisi cuaca lainnya';
};

export const fetchJSON = async (url, timeout = 8000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Permintaan gagal (HTTP ${response.status}).`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
};
