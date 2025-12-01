import { Calculator } from "../src/calculator";

describe("Test calulator", () => {
  describe("check add", () => {
    let calculator: Calculator;
    beforeAll(() => (calculator = new Calculator()));

    test("empty input", () => {
      const sum = calculator.sum();

      expect(sum).toEqual(0);
    });

    test("one value", () => {
      const sum = calculator.sum(2);

      expect(sum).toEqual(2);
    });

    test("several different values", () => {
      const sum = calculator.sum(-5, 0, 10, -3, 2);

      expect(sum).toEqual(4);
    });

    test("max, min values", () => {
      const sum = calculator.sum(
        Number.MAX_SAFE_INTEGER,
        -Number.MAX_SAFE_INTEGER,
        1,
      );

      expect(sum).toEqual(1);
    });

    test("process positive infinity", () => {
      const sum = calculator.sum(Number.POSITIVE_INFINITY, 10);

      expect(sum).toEqual(Number.POSITIVE_INFINITY);
    });

    test("process negative infinity", () => {
      const sum = calculator.sum(Number.NEGATIVE_INFINITY, -10);

      expect(sum).toEqual(Number.NEGATIVE_INFINITY);
    });

    test("several float values", () => {
      const sum = calculator.sum(0.1, 0.2);

      expect(sum).toEqual(0.3);
    });

    test("several different values", () => {
      const values: number[] = [];
      for (let i = 1; i <= 10000; i++) {
        values.push(i);
      }
      const sum = calculator.sum(...values);

      expect(sum).toEqual((10000 * 10001) / 2);
    });

    test("check NaN icluded", () => {
      const sum = calculator.sum(1, NaN, 2);

      expect(sum).toBeNaN();
    });

    test("check undefined icluded", () => {
      const sum = calculator.sum(undefined as any, 1);

      expect(sum).toBeNaN();
    });
  });
  describe("check subtract", () => {
    let calculator: Calculator;
    beforeAll(() => (calculator = new Calculator()));
    test("positive values-positive result", () => {
      const subtract = calculator.subtract(10, 2);

      expect(subtract).toEqual(8);
    });

    test("negative values-negative result", () => {
      const subtract = calculator.subtract(2, 10);

      expect(subtract).toEqual(-8);
    });

    test("include negative value1", () => {
      const subtract = calculator.subtract(-5, 10);

      expect(subtract).toEqual(-15);
    });

    test("include negative value2", () => {
      const subtract = calculator.subtract(10, -5);

      expect(subtract).toEqual(15);
    });

    test("2 zero values", () => {
      const subtract = calculator.subtract(0, 0);

      expect(subtract).toEqual(0);
    });

    test("zero value2", () => {
      const subtract = calculator.subtract(2, 0);

      expect(subtract).toEqual(2);
    });

    test("zero value1", () => {
      const subtract = calculator.subtract(0, 2);

      expect(subtract).toEqual(-2);
    });

    test("2 equal values", () => {
      const subtract = calculator.subtract(1234, 1234);

      expect(subtract).toEqual(0);
    });

    it("process max value", () => {
      const subtract = calculator.subtract(Number.MAX_SAFE_INTEGER, 1);

      expect(subtract).toEqual(Number.MAX_SAFE_INTEGER - 1);
    });

    test("process min value", () => {
      const subtract = calculator.subtract(Number.MIN_SAFE_INTEGER, -1);

      expect(subtract).toEqual(Number.MIN_SAFE_INTEGER + 1);
    });

    test("process decimal values", () => {
      const subtract = calculator.subtract(0.3, 0.1);

      expect(subtract).toEqual(0.2);
    });

    test("check NaN1 icluded", () => {
      const subtract = calculator.subtract(NaN, 2);

      expect(subtract).toBeNaN();
    });

    test("check NaN2 icluded", () => {
      const subtract = calculator.subtract(2, NaN);

      expect(subtract).toBeNaN();
    });

    test("undefined value included", () => {
      const subtract = calculator.subtract(undefined as any, 1);

      expect(subtract).toBeNaN();
    });
  });
});

// const a = 4;
// const b = 5;

// describe("Test calulator", () => {
//     let calculator: Calculator
//         beforeAll(() =>
//         calculator = new Calculator()
// )

//     test('add two integers',() => {
//         const sum = calculator.sum(1, 2)
//         expect(sum).toEqual(3)
//     })

//     test('error with fraction values',() => {
//         const sum = calculator.sum(0.1,0.2)
//         expect(sum).toEqual(0.3)
//     })

// })

//     it('a is higher then b',() => {

//         expect(a).to.equal(b)
//     })
// })

// describe("Compare variable2", () => {

//     it('a is higher then b',() => {

//         expect(a).to.be.lessThan(b)
//     })
// })
// describe("Compare variable3", () => {

//     it.only('a is higher then b',() => {

//         expect(a, "a is more than").to.be.lessThanOrEqual(b)
//     })
// })
