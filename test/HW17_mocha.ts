// import assert from "assert"

// const a = 5;
// const b = 5;

// describe("Test name", () => {

//     it('a is higher then b',() => {
//         assert.equal(a, b, "A is not equal b")
//     })
// })

import { expect } from "chai";
import { Calculator } from "../src/calculator";

describe("Test calulator", () => {
  describe("check add", () => {
    let calculator: Calculator;
    before(() => (calculator = new Calculator()));
    it("empty input", () => {
      const sum = calculator.sum();

      expect(sum).to.be.equal(0, "Incorrect empty input check");
    });

    it("one value", () => {
      const sum = calculator.sum(2);

      expect(sum).to.be.equal(2, "Incorrect one value sum");
    });

    it("several different values", () => {
      const sum = calculator.sum(-5, 0, 10, -3, 2);

      expect(sum).to.be.equal(4, "Incorrect several different values sum");
    });

    it("max, min values", () => {
      const sum = calculator.sum(
        Number.MAX_SAFE_INTEGER,
        -Number.MAX_SAFE_INTEGER,
        1,
      );

      expect(sum).to.be.equal(1, "Incorrect max, min values sum");
    });

    it("process positive infinity", () => {
      const sum = calculator.sum(Number.POSITIVE_INFINITY, 10);

      expect(sum).to.be.equal(
        Number.POSITIVE_INFINITY,
        "Incorrect process positive infinity sum",
      );
    });

    it("process negative infinity", () => {
      const sum = calculator.sum(Number.NEGATIVE_INFINITY, -10);

      expect(sum).to.be.equal(
        Number.NEGATIVE_INFINITY,
        "Incorrect process negative infinity sum",
      );
    });

    it("several float values", () => {
      const sum = calculator.sum(0.1, 0.2);

      expect(sum).to.be.equal(0.3, "Incorrect several float values sum");
    });

    it("several different values", () => {
      const values: number[] = [];
      for (let i = 1; i <= 10000; i++) {
        values.push(i);
      }
      const sum = calculator.sum(...values);

      expect(sum).to.be.equal(
        (10000 * 10001) / 2,
        "Incorrect several different values sum",
      );
    });

    it("check NaN icluded", () => {
      const sum = calculator.sum(1, NaN, 2);

      expect(sum, "Incorrect NaN processing").to.be.NaN;
    });

    it("check undefined icluded", () => {
      const sum = calculator.sum(undefined as any, 1);

      expect(sum, "Incorrect undefined processing").to.be.NaN;
    });
  });
  describe("check subtract", () => {
    let calculator: Calculator;
    before(() => (calculator = new Calculator()));
    it("positive values-positive result", () => {
      const subtract = calculator.subtract(10, 2);

      expect(subtract).to.be.equal(
        8,
        "Incorrect positive values - positive result subtract",
      );
    });

    it("negative values-negative result", () => {
      const subtract = calculator.subtract(2, 10);

      expect(subtract).to.be.equal(
        -8,
        "Incorrect negative values-negative result subtract",
      );
    });

    it("include negative value1", () => {
      const subtract = calculator.subtract(-5, 10);

      expect(subtract).to.be.equal(
        -15,
        "Incorrect include negative value1 subtract",
      );
    });

    it("include negative value2", () => {
      const subtract = calculator.subtract(10, -5);

      expect(subtract).to.be.equal(
        15,
        "Incorrect include negative value2 subtract",
      );
    });

    it("2 zero values", () => {
      const subtract = calculator.subtract(0, 0);

      expect(subtract).to.be.equal(0, "Incorrect 2 zero values subtract");
    });

    it("zero value2", () => {
      const subtract = calculator.subtract(2, 0);

      expect(subtract).to.be.equal(2, "Incorrect zero value2 subtract");
    });

    it("zero value1", () => {
      const subtract = calculator.subtract(0, 2);

      expect(subtract).to.be.equal(-2, "Incorrect zero value1 subtract");
    });

    it("2 equal values", () => {
      const subtract = calculator.subtract(1234, 1234);

      expect(subtract).to.be.equal(0, "Incorrect 2 equal values subtract");
    });

    it("process max value", () => {
      const subtract = calculator.subtract(Number.MAX_SAFE_INTEGER, 1);

      expect(subtract).to.be.equal(
        Number.MAX_SAFE_INTEGER - 1,
        "Incorrect process max value subtract",
      );
    });

    it("process min value", () => {
      const subtract = calculator.subtract(Number.MIN_SAFE_INTEGER, -1);

      expect(subtract).to.be.equal(
        Number.MIN_SAFE_INTEGER + 1,
        "Incorrect process min value subtract",
      );
    });

    it("process decimal values", () => {
      const subtract = calculator.subtract(0.3, 0.1);

      expect(subtract).to.be.equal(
        0.2,
        "Incorrect process decimal values subtract",
      );
    });

    it("check NaN1 icluded", () => {
      const subtract = calculator.subtract(NaN, 2);

      expect(subtract, "Incorrect NaN1 processing").to.be.NaN;
    });

    it("check NaN2 icluded", () => {
      const subtract = calculator.subtract(2, NaN);

      expect(subtract, "Incorrect NaN2 processing").to.be.NaN;
    });

    it("undefined value included", () => {
      const subtract = calculator.subtract(undefined as any, 1);

      expect(subtract, "Incorrect undefined processing").to.be.NaN;
    });
  });
});

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
