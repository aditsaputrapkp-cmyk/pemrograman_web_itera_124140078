import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  // Lazy initializer membaca storage sebelum render pertama tanpa flash data kosong.
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    // Setiap update state diserialisasi kembali ke key localStorage yang sama.
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Data Ruang Baca tidak dapat disimpan.", error);
    }
  }, [key, value]);

  return [value, setValue];
}
