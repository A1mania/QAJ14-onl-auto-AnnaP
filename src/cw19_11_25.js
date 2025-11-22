// 2. У нас поменялись требования к паролю. Юзерам выслана ссылка на смену пароля. 
// Теперь когда они зайдут к нам на сайт, мы должны проверить, 
// что их новый пароль соответствует следующим требованиям:

//      - минимум 8 символов                       
//      | латинские буквы, максимум 15
//      - минимум одна заглавная буква      
//      - минимум одна цифра
//      - минимум один специальный символ из набора     | ^!@_$&*()-+
// а. Создайте функцию, которая будет принимать на вход строку (пароль) и возвращать true, 
// если пароль соответствует требованиям и false, если не соответствует.

function passwordValidate(password){
    const symbolAmount = /^.{8,15}$/;
    const hasCapital = /[A-Z]/;
    const hasInteger = /[0-9]/;
    const hasSpecial = /[\^!@_$&*()-\+]/;

    return (symbolAmount.test(password) && hasCapital.test(password) && hasInteger.test(password) && hasSpecial.test(password))
       
}

console.log(passwordValidate("Passwor^11"));
console.log(passwordValidate("Pas1wor"));
console.log(passwordValidate("Pa*1wor"));
console.log(passwordValidate("Password1!Password1!"));
console.log(passwordValidate(""));