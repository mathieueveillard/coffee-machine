import { MappingFunction, success, error, getResult, getError } from ".";

describe("Maybe", function () {
  test("Input OK, Output OK", function () {
    // GIVEN
    interface Fraction {
      numerator: number;
      denominator: number;
    }
    const evaluate: MappingFunction<Fraction, number> = ({ numerator, denominator }) => {
      if (denominator === 0) {
        return error("Division by 0");
      }
      return success(numerator / denominator);
    };

    // WHEN
    const actual = success<Fraction>({ numerator: 1, denominator: 2 }).bind(evaluate);

    // THEN
    expect(actual.type).toEqual("SUCCESS");
    expect(getResult(actual)).toEqual(0.5);
  });

  test("Input OK, Output KO", function () {
    // GIVEN
    interface Fraction {
      numerator: number;
      denominator: number;
    }
    const evaluate: MappingFunction<Fraction, number> = ({ numerator, denominator }) => {
      if (denominator === 0) {
        return error("Division by 0");
      }
      return success(numerator / denominator);
    };

    // WHEN
    const actual = success<Fraction>({ numerator: 1, denominator: 0 }).bind(evaluate);

    // THEN
    expect(actual.type).toEqual("ERROR");
    expect(getError(actual)).toEqual("Division by 0");
  });

  test("Input KO => Output OK", function () {
    // GIVEN
    interface Fraction {
      numerator: number;
      denominator: number;
    }
    const evaluate: MappingFunction<Fraction, number> = ({ numerator, denominator }) => {
      if (denominator === 0) {
        return error("Division by 0");
      }
      return success(numerator / denominator);
    };

    // WHEN
    const actual = error("Error").bind(evaluate);

    // THEN
    expect(actual.type).toEqual("ERROR");
    expect(getError(actual)).toEqual("Error");
  });
});
