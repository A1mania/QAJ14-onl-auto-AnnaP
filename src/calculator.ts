export class Calculator {
  // constructor(public value1:number, public value2:number){
  //     this.value1 = value1;
  //     this.value2 =  value2;
  // }

  sum(...args: Array<number>) {
    return args.reduce((acc, num) => acc + num, 0);
  }

  subtract(value1: number, value2: number) {
    return value1 - value2;
  }

  multiply(...args: Array<number>) {
    return args.reduce((acc, num) => acc * num, 1);
  }

  divide(value1: number, value2: number) {
    return value1 / value2;
  }

  exponentiate(value1: number, value2: number) {
    return Math.pow(value1, value2);
  }

  takeReminder(value1: number, value2: number) {
    return value1 % value2;
  }
}

const input1 = new Calculator();
console.log(input1.sum(1, NaN, 2));
console.log(input1.subtract(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER));
console.log(input1.multiply(2, 1, 3));
console.log(input1.divide(2, 1));
console.log(input1.exponentiate(2, 1));
console.log(input1.takeReminder(2, 1));
