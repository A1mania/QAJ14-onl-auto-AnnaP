// 2. У нас поменялись требования к паролю. Юзерам выслана ссылка на смену пароля. Теперь когда они зайдут к нам на сайт, мы должны проверить, что их новый пароль соответствует следующим требованиям:
//      - минимум 8 символов                            | латинские буквы, максимум 15
//      - минимум одна заглавная буква      
//      - минимум одна цифра
//      - минимум один специальный символ из набора     | ^!@_$&*()-+
// а. Создайте функцию, которая будет принимать на вход строку (пароль) и возвращать true, если пароль соответствует требованиям и false, 
// если не соответствует.
// б. Нашим аналитикам интересно, какие цифры чаще всего используются юзерами в паролях. модифицируйте функцию так, 
// чтобы она вместо булевого значения возвращала объект по следующим примерам: 
//   input: 'Password123!' -> output: { isValid: true, digits: [1, 2, 3] }
//   input: 'myC00!Pa55w0rd' -> output: { isValid: true, digits: [0, 0, 5, 5, 0] }

function passwordValidate(password){
    const symbolAmount = /^.{8,15}$/;
    const hasCapital = /[A-Z]/;
    const hasInteger = /[0-9]/;
    const hasSpecial = /[\^!@_$&*()-\+]/;
    const digits = [];


    if (symbolAmount.test(password) && hasCapital.test(password) 
    && hasInteger.test(password) && hasSpecial.test(password)){
        for (let i = 0; i < password.length; i++){
        if (!isNaN(password[i])){
            digits.push(password[i]);
        }
        }
        return `isValid: true, digits: [${digits}]`
    }
    else{
        for (let i = 0; i < password.length; i++){
        if (!isNaN(password[i])){
            digits.push(password[i]);
        }
        }
        return `false, digits: [${digits}]`
    }
    }
 
console.log(passwordValidate("Passwor^12"));
console.log(passwordValidate("Pas1wor"));
console.log(passwordValidate("Pa*3wor"));
console.log(passwordValidate("Password1!Password3!"));
console.log(passwordValidate(""));

// 3. Наши пользователи ранее могли в качестве имени (username) выбрать как произвольное имя так и емейл.
// Теперь мы хотим убрать возможность использовать просто имя. 
// Чтобы обработать существубщие данные, создайте функцию, которая будет принимать на вход .json файл 
// с данными пользователей (username, name, last_name, email) и возвращать массив заготовленных сообщений 
// для коммуникации с юзерами. 
// На выходе должен быть объект с данными только по юзерам у которых username не является емейлом.
// Ожидаемый объект на выходе:
// {
//     username_1: {
//         email: 'email_1',
//         message: 'Hello {name} {last_name}, please update your username "{username_1}" to be a valid email to comply with our new policy.'
//     },
//     username_2: {
//         email: 'email_2',
//         message: 'Hello {name} {last_name}, please update your username "{username_2}" to be a valid email to comply with our new policy.'
//     },
//      ...
// }

import { readFileSync } from "fs";

const data = readFileSync("src/HW16/fileHW16.json", "utf-8");

const stringObj = JSON.parse(data);

const isValidEmail = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//
const messagesByUser = [];

for (const user of stringObj) {
  if (isValidEmail.test(user.username) === false) {
    messagesByUser.push({
      [user.username]: {
        email: user.email,
        message: `Hello ${user.name} ${user.last_name}, please update your username ${user.username} to be a valid email to comply with our new policy.`,
      },
    });
  }
}

console.log(messagesByUser);