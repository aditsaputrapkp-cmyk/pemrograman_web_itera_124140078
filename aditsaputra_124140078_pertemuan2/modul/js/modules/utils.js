export const formatRupiah = (number) => new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', maximumFractionDigits: 0
}).format(number);

export const capitalize = (text = '') => text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
export const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
export const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

export const debounce = (callback, delay = 400) => {
  let timer;
  return (...argumentsList) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...argumentsList), delay);
  };
};
