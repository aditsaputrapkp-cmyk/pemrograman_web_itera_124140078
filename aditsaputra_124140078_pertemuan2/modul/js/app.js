import { sampleUsers, sampleProducts } from './modules/data.js';
import { formatRupiah, capitalize, wait } from './modules/utils.js';

// Dua belas demo mengikuti urutan topik pertemuan 2.
export function demoVariables() {
  var oldVar = 'Old variable';
  { var oldVar = 'Changed inside block'; }
  let newLet = 'New let variable';
  let innerLet;
  { let newLet = 'Different variable inside block'; innerLet = newLet; }
  const PI = 3.14159;
  const user = { name: 'John', age: 30 };
  user.age = 31;
  return { oldVar, newLet, innerLet, PI, user };
}

export function demoArrowFunctions() {
  function regularSum(a, b) { return a + b; }
  const arrowSum = (a, b) => { return a + b; };
  const shortArrowSum = (a, b) => a + b;
  const sayHello = () => 'Hello World!';
  const square = x => x * x;
  return { regularSum: regularSum(5, 3), arrowSum: arrowSum(5, 3), shortArrowSum: shortArrowSum(5, 3), sayHello: sayHello(), square: square(4) };
}

export function demoTemplateLiterals() {
  const name = 'John';
  const age = 30;
  const oldWay = 'Nama saya ' + name + ' dan umur saya ' + age + ' tahun.';
  const newWay = `Nama saya ${name} dan umur saya ${age} tahun.`;
  const multiLine = `Nama: ${name}\nUmur: ${age}`;
  return { oldWay, newWay, multiLine, expression: `Perkiraan tahun lahir: ${new Date().getFullYear() - age}` };
}

export function demoDestructuring() {
  const person = { firstName: 'John', lastName: 'Doe', address: { city: 'Jakarta', postalCode: '12345' } };
  const { firstName, lastName } = person;
  const { firstName: fName, lastName: lName, hobby = 'coding', address: { city, postalCode } } = person;
  const [firstColor, secondColor, ...restColors] = ['red', 'green', 'blue', 'yellow', 'purple'];
  const [, , thirdColor] = ['red', 'green', 'blue'];
  let a = 1;
  let b = 2;
  [a, b] = [b, a];
  return { firstName, lastName, fName, lName, hobby, city, postalCode, firstColor, secondColor, thirdColor, restColors, swapped: { a, b } };
}

export function demoSpreadRest() {
  const numbers = [1, 2, 3];
  const person = { name: 'John', age: 30 };
  const sum = (...values) => values.reduce((total, value) => total + value, 0);
  const process = (first, second, ...rest) => ({ first, second, rest });
  return { original: numbers, copyArray: [...numbers], extendedArray: [...numbers, 4, 5], mergedArrays: [...numbers, ...[4, 5, 6]], copyObject: { ...person }, extendedObject: { ...person, age: 31, email: 'john@example.com' }, restSum: sum(1, 2, 3, 4, 5), restProcess: process('a', 'b', 'c', 'd', 'e') };
}

export function demoDefaultParams() {
  const greet = (name = 'Guest', greeting = 'Hello') => `${greeting}, ${name}!`;
  const createUser = (name, role = 'user', createdAt = new Date().toISOString()) => ({ name, role, createdAt });
  const createOrder = (product, quantity = 1, price = 0, total = quantity * price) => ({ product, quantity, price, total });
  return { defaultGreeting: greet(), customGreeting: greet('John', 'Hi'), validEmptyString: greet('', 'Hi'), withExpression: createUser('Alice'), usingPreviousParameter: createOrder('Laptop', 2, 1000000) };
}

export function demoClasses() {
  class User {
    constructor(name, email) { this.name = name; this.email = email; this.createdAt = new Date(); }
    getInfo() { return `${this.name} (${this.email})`; }
    getCreatedDate() { return this.createdAt.toLocaleDateString('id-ID'); }
  }
  class Admin extends User {
    constructor(name, email, role = 'admin') { super(name, email); this.role = role; }
    getInfo() { return `${super.getInfo()} — ${this.role}`; }
    hasAccess(module) { return ['dashboard', 'users'].includes(module); }
  }
  const user = new User('John Doe', 'john@example.com');
  const admin = new Admin('Admin User', 'admin@example.com');
  return { user: user.getInfo(), created: user.getCreatedDate(), admin: admin.getInfo(), adminHasAccess: admin.hasAccess('dashboard'), userInstance: user instanceof User, inheritedInstance: admin instanceof User };
}

export function demoObjectLiterals() {
  const name = 'John';
  const age = 30;
  const prefix = 'user';
  const person = { name, age, sayHello() { return `Hello, ${name}!`; }, ['skill_' + 1]: 'JavaScript', ['skill_' + 2]: 'HTML' };
  return { person, methodResult: person.sayHello(), computed: { [`${prefix}_id`]: 123, [`${prefix}_name`]: 'john_doe' }, importedUtility: capitalize('javascript') };
}

export function demoArrayMethods() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return {
    map: numbers.map((number) => number * 2),
    filter: numbers.filter((number) => number % 2 === 0),
    find: sampleUsers.find(({ name }) => name === 'Jane Smith'),
    some: sampleUsers.some(({ active }) => active),
    every: sampleUsers.every(({ age }) => age >= 18),
    reduce: numbers.reduce((sum, number) => sum + number, 0),
    chaining: sampleUsers.filter(({ active }) => active).map(({ name }) => name),
    totalActiveAge: sampleUsers.filter(({ active }) => active).reduce((sum, { age }) => sum + age, 0),
    formattedPrice: formatRupiah(sampleProducts[0].price)
  };
}

export function demoAdvancedArrays() {
  const numbers = [1, 2, 3, 4, 5];
  const nested = [1, [2, 3], [[4, 5], 6]];
  return { clone: [...numbers], combined: [...numbers, ...[6, 7, 8]], from: Array.from('hello'), fromWithMap: Array.from(numbers, (number) => number * number), of: Array.of(1, 'two', { three: 3 }), flat: nested.flat(), deepFlat: nested.flat(2), flatMap: numbers.flatMap((number) => [number, number * 2]), includes: numbers.includes(3) };
}

const simulateUser = (id, delay = 120) => new Promise((resolve, reject) => {
  setTimeout(() => id > 0 ? resolve({ id, name: `User ${id}` }) : reject(new Error('ID user tidak valid')), delay);
});

export function demoPromises() {
  const basic = simulateUser(1).then((user) => `Sukses: ${user.name}`);
  const chain = simulateUser(2).then((user) => simulateUser(3).then((second) => `${user.name} dan ${second.name}`));
  const all = Promise.all([4, 5, 6].map((id) => simulateUser(id))).then((users) => users.map(({ name }) => name));
  const race = Promise.race([simulateUser(7, 60), simulateUser(8, 140)]).then(({ name }) => name);
  const failure = simulateUser(-1).catch((error) => error.message);
  return Promise.all([basic, chain, all, race, failure]).then(([basic, chain, all, race, handledError]) => ({ basic, chain, all, race, handledError }));
}

export async function demoAsyncAwait() {
  const getUserData = async (id) => {
    const user = await simulateUser(id);
    await wait(100);
    const posts = [{ id: 1, userId: user.id, title: 'Post 1' }, { id: 2, userId: user.id, title: 'Post 2' }];
    return { user, posts };
  };
  const single = await getUserData(42);
  const parallel = await Promise.all([101, 102, 103].map((id) => getUserData(id)));
  let handledError;
  try { await getUserData(-1); } catch (error) { handledError = error.message; }
  return { single, parallel: parallel.map(({ user }) => user.name), totalPosts: parallel.reduce((sum, { posts }) => sum + posts.length, 0), handledError };
}
