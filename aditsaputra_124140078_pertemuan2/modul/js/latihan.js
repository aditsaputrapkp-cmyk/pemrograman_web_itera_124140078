import { sampleProducts } from './modules/data.js';
import { formatRupiah, escapeHTML } from './modules/utils.js';

// Latihan 1–4: let/const, arrow function, dan template literals.
export function exerciseConst() {
  const value = 10;
  let errorMessage;
  try { value = 20; } catch (error) { errorMessage = `${error.name}: ${error.message}`; }
  const object = { score: 80 };
  object.score = 90;
  return { originalConstant: value, caughtError: errorMessage, mutableObjectProperty: object.score };
}

export function exerciseScopes() {
  var oldValue = 'luar';
  let newValue = 'luar';
  let inside;
  { var oldValue = 'dalam'; let newValue = 'dalam'; inside = newValue; }
  return { varOutside: oldValue, letOutside: newValue, letInside: inside };
}

export function exerciseArrows() {
  const add = (a, b) => { return a + b; };
  const multiply = (a, b) => a * b;
  const square = number => number ** 2;
  const greet = () => 'Selamat belajar ES6+';
  const createStudent = (name, nim) => ({ name, nim });
  return { explicitReturn: add(4, 6), implicitReturn: multiply(4, 6), singleParameter: square(5), noParameter: greet(), objectReturn: createStudent('Adit Saputra', '124140078') };
}

export function exerciseHTML() {
  const title = 'Personal Dashboard';
  const course = 'Pengembangan Aplikasi Web';
  const html = `<article class="task-card">\n  <h3>${escapeHTML(title)}</h3>\n  <p>${escapeHTML(course)}</p>\n</article>`;
  return { html, description: 'HTML string dibuat dengan interpolasi dan format multi-baris.' };
}

// Latihan 5–8: destructuring dan spread/rest.
export function exerciseNested() {
  const student = { profile: { academic: { university: { name: 'ITERA', city: 'Lampung Selatan' }, major: 'Teknik Informatika' } } };
  const { profile: { academic: { university: { name, city }, major } } } = student;
  return { name, city, major, levels: 'profile → academic → university → name/city' };
}

export const statistics = (...numbers) => {
  if (!numbers.length) return { min: null, max: null, average: null };
  if (!numbers.every(Number.isFinite)) throw new Error('Seluruh nilai harus berupa angka finite.');
  return { min: Math.min(...numbers), max: Math.max(...numbers), average: numbers.reduce((total, value) => total + value, 0) / numbers.length };
};

export function exerciseMerge() {
  const profile = { name: 'Adit', role: 'mahasiswa', active: false };
  const academic = { major: 'Informatika', role: 'praktikan' };
  const preferences = { theme: 'light', active: true };
  return { profile, academic, preferences, merged: { ...profile, ...academic, ...preferences, theme: 'blue' } };
}

export function exerciseForOf() {
  const result = [];
  for (const { name, category } of sampleProducts) result.push(`${name} — ${category}`);
  return { result };
}

// Latihan 9–12: inheritance, getter/setter, dan object literals.
export class Product {
  constructor(name, price = 0) { this.name = name; this.price = price; }
  get price() { return this._price; }
  set price(value) {
    if (!Number.isFinite(value) || value < 0) throw new Error('Harga tidak boleh negatif dan harus berupa angka.');
    this._price = value;
  }
  getInfo() { return `${this.name} — ${formatRupiah(this.price)}`; }
}

export class DigitalProduct extends Product {
  constructor(name, price, fileFormat = 'PDF') { super(name, price); this.fileFormat = fileFormat; }
  getInfo() { return `${super.getInfo()} — digital (${this.fileFormat})`; }
}

export class PhysicalProduct extends Product {
  constructor(name, price, weight = 1) { super(name, price); this.weight = weight; }
  getInfo() { return `${super.getInfo()} — fisik (${this.weight} kg)`; }
  shippingCost(rate = 10000) { return this.weight * rate; }
}

export function exerciseInheritance() {
  const digital = new DigitalProduct('Modul ES6+', 25000);
  const physical = new PhysicalProduct('Buku Catatan', 30000, 0.5);
  return { digital: digital.getInfo(), physical: physical.getInfo(), shipping: physical.shippingCost(), digitalIsProduct: digital instanceof Product, physicalIsProduct: physical instanceof Product };
}

export function exerciseGetterSetter() {
  const product = new Product('Buku', 40000);
  const before = product.price;
  product.price = 35000;
  let caughtError;
  try { product.price = -1000; } catch (error) { caughtError = error.message; }
  return { before, after: product.price, caughtError };
}

export function exerciseDynamicKeys() {
  const prefix = 'mahasiswa';
  const semester = 5;
  return { [`${prefix}_nama`]: 'Adit Saputra', [`${prefix}_nim`]: '124140078', [`semester_${semester}`]: 'aktif' };
}

export const createProfile = ({ name = 'Mahasiswa', major = 'Teknik Informatika', active = true } = {}) => ({ name, major, active });

// Latihan 13–16: pengolahan array modern.
export const groupBy = (items, key) => items.reduce((groups, item) => ({
  ...groups, [item[key]]: [...(groups[item[key]] ?? []), item]
}), {});

export const averageOf = (items, key) => items.length ? items.reduce((sum, item) => sum + item[key], 0) / items.length : 0;

export function exerciseFlat() {
  const nestedNumbers = [[1, 2], [3, [4, 5]], [6]];
  const courses = [{ course: 'PAW', tasks: ['Dashboard', 'Latihan ES6+'] }, { course: 'AI', tasks: ['Sudoku'] }];
  return { flatNumbers: nestedNumbers.flat(2), flatTasks: courses.flatMap(({ course, tasks }) => tasks.map((task) => ({ course, task }))) };
}

export function exerciseChaining() {
  const filtered = sampleProducts.filter(({ category, available }) => category === 'tech' && available);
  const total = sampleProducts
    .filter(({ category, available }) => category === 'tech' && available)
    .map(({ price, quantity }) => price * quantity)
    .reduce((sum, subtotal) => sum + subtotal, 0);
  return { selectedProducts: filtered.map(({ name }) => name), total, formattedTotal: formatRupiah(total) };
}

export const exercises = [
  { title: '1. Mengubah const dan menangani error', topic: 'Variabel', run: exerciseConst },
  { title: '2. Membandingkan var dan let dalam blok', topic: 'Variabel', run: exerciseScopes },
  { title: '3. Berbagai sintaks arrow function', topic: 'Arrow Functions', run: exerciseArrows },
  { title: '4. Membuat HTML string dengan template literal', topic: 'Template Literals', run: exerciseHTML },
  { title: '5. Nested destructuring minimal 3 level', topic: 'Destructuring', run: exerciseNested },
  { title: '6. Statistik dengan rest parameter', topic: 'Spread & Rest', run: () => statistics(70, 80, 90, 100) },
  { title: '7. Merge tiga objek dan override properti', topic: 'Spread & Rest', run: exerciseMerge },
  { title: '8. Destructuring dalam loop for...of', topic: 'Destructuring', run: exerciseForOf },
  { title: '9. Product, DigitalProduct, PhysicalProduct', topic: 'Classes', run: exerciseInheritance },
  { title: '10. Getter dan setter pada class', topic: 'Classes', run: exerciseGetterSetter },
  { title: '11. Computed property names', topic: 'Object Literals', run: exerciseDynamicKeys },
  { title: '12. Default parameter dan destructuring', topic: 'Default Parameters', run: () => ({ defaults: createProfile(), custom: createProfile({ name: 'Adit', active: false }) }) },
  { title: '13. Fungsi groupBy menggunakan reduce', topic: 'Array Methods', run: () => groupBy(sampleProducts, 'category') },
  { title: '14. Rata-rata array of objects', topic: 'Array Methods', run: () => ({ averagePrice: averageOf(sampleProducts, 'price') }) },
  { title: '15. Mengubah array bersarang menjadi flat', topic: 'Advanced Arrays', run: exerciseFlat },
  { title: '16. Analisis dengan filter, map, reduce', topic: 'Array Methods', run: exerciseChaining }
];
