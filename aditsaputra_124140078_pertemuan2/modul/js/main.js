import * as demos from './app.js';
import { exercises } from './latihan.js';
import { AsyncExercises } from './latihan-async.js';

const demoList = [
  ['1. Let dan Const', 'Function scope, block scope, dan isi objek const', demos.demoVariables],
  ['2. Arrow Functions', 'Berbagai bentuk penulisan fungsi', demos.demoArrowFunctions],
  ['3. Template Literals', 'Interpolasi variabel dan string multi-baris', demos.demoTemplateLiterals],
  ['4. Destructuring', 'Ekstraksi properti objek dan elemen array', demos.demoDestructuring],
  ['5. Spread dan Rest', 'Menyalin data dan menerima argumen fleksibel', demos.demoSpreadRest],
  ['6. Default Parameters', 'Nilai bawaan pada parameter fungsi', demos.demoDefaultParams],
  ['7. Classes', 'Constructor, method, inheritance, dan instanceof', demos.demoClasses],
  ['8. Enhanced Object Literals', 'Property shorthand, method shorthand, dynamic keys', demos.demoObjectLiterals],
  ['9. Modern Array Methods', 'map, filter, find, some, every, dan reduce', demos.demoArrayMethods],
  ['10. Advanced Arrays', 'Array.from, Array.of, flat, flatMap, includes', demos.demoAdvancedArrays],
  ['11. Promises', 'then, catch, chaining, all, dan race', demos.demoPromises],
  ['12. Async/Await', 'Pemanggilan berurutan, paralel, dan try/catch', demos.demoAsyncAwait]
];

// Sama dengan pola helper addOutput pada bagian Setup Project.
export function addOutput(container, title, subtitle, content) {
  const card = document.createElement('article');
  card.className = 'output-item';
  const heading = document.createElement('h3');
  heading.textContent = title;
  const description = document.createElement('p');
  description.textContent = subtitle;
  const result = document.createElement('pre');
  result.textContent = content;
  card.append(heading, description, result);
  container.appendChild(card);
  return result;
}

let demoVersion = 0;
document.getElementById('runBtn').addEventListener('click', async () => {
  const version = ++demoVersion;
  const output = document.getElementById('output');
  const button = document.getElementById('runBtn');
  output.innerHTML = '';
  button.disabled = true;
  document.getElementById('demo-status').textContent = 'Menjalankan 12 demo…';
  const jobs = demoList.map(async ([title, subtitle, run]) => {
    const result = addOutput(output, title, subtitle, 'Memuat…');
    try { result.textContent = JSON.stringify(await run(), null, 2); }
    catch (error) { result.textContent = `Error ditangani: ${error.message}`; }
  });
  await Promise.all(jobs);
  if (version !== demoVersion) return;
  button.disabled = false;
  document.getElementById('demo-status').textContent = 'Seluruh 12 demo selesai. Error const ditunjukkan pada bagian latihan mandiri.';
});

document.getElementById('clearBtn').addEventListener('click', () => {
  ++demoVersion;
  document.getElementById('output').innerHTML = '';
  document.getElementById('runBtn').disabled = false;
  document.getElementById('demo-status').textContent = 'Output dibersihkan.';
});

document.getElementById('run-exercises').addEventListener('click', () => {
  const output = document.getElementById('exercise-output');
  output.innerHTML = '';
  exercises.forEach(({ title, topic, run }) => {
    try { addOutput(output, title, topic, JSON.stringify(run(), null, 2)); }
    catch (error) { addOutput(output, title, topic, `Error ditangani: ${error.message}`); }
  });
});

new AsyncExercises();
