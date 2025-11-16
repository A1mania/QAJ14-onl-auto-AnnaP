// Сделать функцию, которая будет принимать инпут, а на выходе будет добавлять слово Супер

function addWordSuper (input:string, word="super") {

    const expr1 = /[a-zA-Z]+/;
    const expr2 = /[а-яА-Я]+/;
    if (expr1.test(input)){
        return word + " " + input;
    }
    else if (expr2.test(input)){
        return "супер" + " " + input;
    }    
    else if (typeof(input) !== "string") throw new Error ("Invalid data")
    };

console.log(addWordSuper("пример"));

const ifInputNumber = (value: string) => {
    const exp = /^\d*$/; //регулярное выражение
    return exp.test(value)
}

console.log(ifInputNumber("Привет"));
console.log(ifInputNumber("123"));

// 0. Создайте функцию для эмуляции броска кубика. На входе - колчество граней. На выходе - результат броска. 
// Реализация должна работать только со следующим количеством граней (но в будущем должно быть легко расширить этот набор): 2, 4, 6, 8, 10, 12, 20, 

function cubeThrowing(quantity:number) {
    if(Number.isInteger(quantity) && quantity%2 === 0 && quantity > 0){
        function randomInteger (min: number, max:number){
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        }
        let result = 0;
        for(let i=0; i<=quantity; i += 2){
            result += randomInteger(1,6);
        }
        return result;
    }
    else {
        throw new Error ("Isert valid value");
    }

}

console.log(cubeThrowing(30));

// 1. Создайте функцию, которая создает массив с 10 случайными числами и возвращает произведение 3 самых больших значений 



function getRandomNumber (min: number, max:number){
    
    return Math.random()*(max-min) + min;
}


function return3MaxValues(){
    let arr = [];  
    let maxMultiple = 1;
    for (let i=0; i<10; i++){
    arr.push(getRandomNumber(0, 100))
    }

    for (let j=0; j<3; j++ ){
    let arrMax = Math.max(...arr);
    maxMultiple *= arrMax;
    arr = arr.filter((k) => k !== arrMax);
    }
    return maxMultiple;
    }
  

console.log(return3MaxValues());


// 2. Реализовать класс калькулятор, с минимум следующими методами: сложение, вычитание, умножение, деление. 
// При желании можете добавить еще какие-то методы на выбор (эта задача нам пригодится впоследствии)

class Calculator {
    constructor(public value1:number, public value2:number){
        this.value1 = value1;
        this.value2 =  value2;
    }

    sum() {
        return this.value1 + this.value2;
    }

    subtract() {
        return this.value1 - this.value2;
    }

    multiply() {
        return this.value1 * this.value2;
    }

    divide() {
        return this.value1/this.value2;
    }

    exponentiate() {
        return Math.pow(this.value1, this.value2);
    }

    takeReminder() {
        return this.value1%this.value2;
    }

}

const input1 = new Calculator(10, 4);
console.log(input1.sum());
console.log(input1.subtract());
console.log(input1.multiply());
console.log(input1.divide());
console.log(input1.exponentiate());
console.log(input1.takeReminder());


// 3. Создайте функцию для подсчета стоимости товаров в корзине. 
// На входе функция принимает массив объектов со свойстами name, price, quantity

interface cartItems {
     name: string,
     price: number,
     quantity: number
    }

function getTotalCost (allItems: cartItems[]) {
    let totalCost = 0;
    for (let i=0; i < allItems.length; i++){
        let cost = allItems[i].price * allItems[i].quantity;
        totalCost += cost;
    } 
    return totalCost;
}
const cartItems1: cartItems[] = [
    {name: "Apple",
     price: 2.43,
     quantity: 2
    },
    {name: "Banana",
     price: 1.87,
     quantity: 1.5,
    },
     {name: "Onion",
     price: 1.58,
     quantity: 2.4,
    }
]

console.log(getTotalCost(cartItems1));


// 4. Создайте функцию, которая будет принимать в себя массив значений и возвращать только те,
//  в которых заданное (второй параметр, по умолчанию - 4) количество букв

function getDefiniteWords (arr: string[], length: number = 4){
    let filteredArr = arr.filter(function(item){
        return item.length === length;
    })

    return filteredArr;
}

console.log(getDefiniteWords(['Apple', 'Banana', 'Lime'], 5));
