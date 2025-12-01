

// 0. Модифицировать функцию подсчета стоимости товаров из прошлого задания. Теперь для расчета стоимости, 
// товары должны соответствовать хотя бы одному из условий:
//      - товар в наличии
//      - стоимость товаров одного вида выше 500
// Пример входных данных:
// const products = [
//     { name: 'A', price: 100, quantity: 2, inStock: true },
//     { name: 'B', price: 40, quantity: 5, inStock: false },
//     { name: 'C', price: 10, quantity: 1, inStock: true },
//     { name: 'D', price: 200, quantity: 3, inStock: false }
// ]; 
// 
interface cartItems {
  name: string;
  price: number;
  quantity: number;
  inStock: boolean;
}

function getTotalCost(allItems: cartItems[]) {
  // let totalCost = 0;
  //     for (const item of allItems){
  //     let cost = item.price * item.quantity;
  //     totalCost += cost;
  // }
  // return totalCost;

  return allItems
    .filter((item) => item.inStock || item.quantity * item.price > 500)
    .reduce((acc, num) => acc + num.price * num.quantity, 0);
}

const products: cartItems[] = [
  { name: "A", price: 100, quantity: 2, inStock: true },
  { name: "B", price: 40, quantity: 5, inStock: false },
  { name: "C", price: 10, quantity: 1, inStock: true },
  { name: "D", price: 200, quantity: 3, inStock: true },
];

console.log(getTotalCost(products));


// 1. Для оплаты корпоративного инструмента нам нужно узнать сколько у нас пользователей с разными ролями, 
// т.к. разные роли нуждаются в разных видах подпискиНа входе у нас .json файл с данными пользователей содержащий свойства: id, username, role
// На выходе нам нужен объект вида:
// {
//     role_1: {
//          count: 5,
//          users: [{id, username}, {id, username}, ...]
//     },
//     role_1: {
//          count: 20,
//          users: [{id, username}, {id, username}, ...]
//     },
//     ...
// }

// import fs from "fs";

import { readFileSync } from "fs";

const data = readFileSync("src/HW15/fileHW15.json", "utf-8");

type userRole = "Admin" | "Standard user";

interface User {
  id: number;
  username: string;
  role: userRole;
}

const stringObj: User[] = JSON.parse(data);
const uniqueRoles = Array.from(new Set(stringObj.map((item) => item.role)));
const nrOfUsersByRole = [];

for (const oneRole of uniqueRoles) {
  let singleRole = stringObj.filter((item) => item.role === oneRole);
  nrOfUsersByRole.push({
    [oneRole]: {
      count: singleRole.length,
      users: singleRole.map(({ id, username }) => ({ id, username })),
    },
  });
}

// console.log(nrOfUsersByRole);
console.dir(nrOfUsersByRole, { depth: null });
// console.log(JSON.stringify(nrOfUsersByRole, null, 2));

// если роли известны
// const nrOfUsersByRole = {
//   Admin: {
//     count: admin.length,
//     users: adminUsers,
//   },
//   StandardUser: {
//     count: su.length,
//     users: suUsers,
//   },
// };
// const admin = stringObj.filter((item) => item.role === "Admin");
// const su = stringObj.filter((item) => item.role === "Standard User");

// const adminUsers = admin.map(({ id, username }) => ({ id, username }));
// const suUsers = su.map(({ id, username }) => ({ id, username }));

// const nrOfUsersByRole = {
//   Admin: {
//     count: admin.length,
//     users: adminUsers,
//   },
//   StandardUser: {
//     count: su.length,
//     users: suUsers,
//   },
// };

// console.log(nrOfUsersByRole);
// console.log(JSON.stringify(nrOfUsersByRole, null, 2));
