// Konfigurasi aplikasi dan data contoh. Contoh hanya dimuat saat tombol diklik.
import { addDays, getToday } from './utils.js';

export const STORAGE_KEY = 'ruang-kuliah-tasks-v1';
export const PRIORITIES = {
  high: { label: 'Tinggi', rank: 0 },
  medium: { label: 'Sedang', rank: 1 },
  low: { label: 'Rendah', rank: 2 }
};
export const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true&timezone=Asia%2FJakarta';

export const createSampleTasks = () => {
  const today = getToday();
  return [
    { title: 'Personal Dashboard — Pertemuan 2', course: 'Pengembangan Aplikasi Web', deadline: addDays(today, 2), priority: 'high', note: 'Lengkapi fitur ES6+, screenshot, dan README.', completed: false },
    { title: 'Latihan DFS Backtracking dan MRV', course: 'Inteligensi Buatan', deadline: addDays(today, 1), priority: 'high', note: 'Jalankan program dan catat hasilnya.', completed: false },
    { title: 'Laporan praktikum routing statik', course: 'Jaringan Komputer', deadline: addDays(today, 4), priority: 'medium', note: '', completed: false },
    { title: 'Baca materi metode penelitian', course: 'Metodologi Penelitian', deadline: addDays(today, 6), priority: 'low', note: '', completed: false },
    { title: 'Rangkum materi cipher klasik', course: 'Kriptografi', deadline: today, priority: 'medium', note: '', completed: true }
  ];
};
