// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { ACL } from ".";
import { EnhancedDrinkOrder } from "../domain";
expect.extend(matchers);

describe("Test of ACL()", function () {
  test("Tea", function () {
    // GIVEN
    const order: EnhancedDrinkOrder = {
      drink: "TEA",
      numberOfSugars: 0,
      stick: "WITHOUT_STICK",
    };

    // WHEN
    const actual = ACL(order);

    // THEN
    const expected: string = "T::";
    expect(actual).toEqual(expected);
  });

  test("Coffee", function () {
    // GIVEN
    const order: EnhancedDrinkOrder = {
      drink: "COFFEE",
      numberOfSugars: 0,
      stick: "WITHOUT_STICK",
    };

    // WHEN
    const actual = ACL(order);

    // THEN
    const expected: string = "C::";
    expect(actual).toEqual(expected);
  });

  test("Chocolate", function () {
    // GIVEN
    const order: EnhancedDrinkOrder = {
      drink: "CHOCOLATE",
      numberOfSugars: 0,
      stick: "WITHOUT_STICK",
    };

    // WHEN
    const actual = ACL(order);

    // THEN
    const expected: string = "H::";
    expect(actual).toEqual(expected);
  });

  test("With one sugar (and stick)", function () {
    // GIVEN
    const order: EnhancedDrinkOrder = {
      drink: "TEA",
      numberOfSugars: 1,
      stick: "WITH_STICK",
    };

    // WHEN
    const actual = ACL(order);

    // THEN
    const expected: string = "T:1:0";
    expect(actual).toEqual(expected);
  });

  test("With two sugars (and stick)", function () {
    // GIVEN
    const order: EnhancedDrinkOrder = {
      drink: "TEA",
      numberOfSugars: 2,
      stick: "WITH_STICK",
    };

    // WHEN
    const actual = ACL(order);

    // THEN
    const expected: string = "T:2:0";
    expect(actual).toEqual(expected);
  });
});
