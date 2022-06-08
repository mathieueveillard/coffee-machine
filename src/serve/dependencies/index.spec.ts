// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import ACL from ".";
import { error, success } from "../../util/Maybe";
import { EnhancedDrinkOrder } from "../enhanceDrinkOrder";
expect.extend(matchers);

describe("Test of ACL()", function () {
  test("Tea", function () {
    // GIVEN
    const order: EnhancedDrinkOrder<"TEA"> = {
      drink: "TEA",
      heat: "HOT",
      numberOfSugars: 0,
      stick: "NO_STICK",
    };

    // WHEN
    const actual = ACL(success(order));

    // THEN
    const expected: string = "T::";
    expect(actual).toEqual(expected);
  });

  test("Coffee", function () {
    // GIVEN
    const order: EnhancedDrinkOrder<"COFFEE"> = {
      drink: "COFFEE",
      heat: "HOT",
      numberOfSugars: 0,
      stick: "NO_STICK",
    };

    // WHEN
    const actual = ACL(success(order));

    // THEN
    const expected: string = "C::";
    expect(actual).toEqual(expected);
  });

  test("Chocolate", function () {
    // GIVEN
    const order: EnhancedDrinkOrder<"CHOCOLATE"> = {
      drink: "CHOCOLATE",
      heat: "HOT",
      numberOfSugars: 0,
      stick: "NO_STICK",
    };

    // WHEN
    const actual = ACL(success(order));

    // THEN
    const expected: string = "H::";
    expect(actual).toEqual(expected);
  });

  test("Orange juice", function () {
    // GIVEN
    const order: EnhancedDrinkOrder<"ORANGE_JUICE"> = {
      drink: "ORANGE_JUICE",
      heat: "COLD",
      numberOfSugars: 0,
      stick: "NO_STICK",
    };

    // WHEN
    const actual = ACL(success(order));

    // THEN
    const expected: string = "O::";
    expect(actual).toEqual(expected);
  });

  test("With one sugar (and stick)", function () {
    // GIVEN
    const order: EnhancedDrinkOrder<"TEA"> = {
      drink: "TEA",
      heat: "HOT",
      numberOfSugars: 1,
      stick: "WITH_STICK",
    };

    // WHEN
    const actual = ACL(success(order));

    // THEN
    const expected: string = "T:1:0";
    expect(actual).toEqual(expected);
  });

  test("With two sugars (and stick)", function () {
    // GIVEN
    const order: EnhancedDrinkOrder<"TEA"> = {
      drink: "TEA",
      heat: "HOT",
      numberOfSugars: 2,
      stick: "WITH_STICK",
    };

    // WHEN
    const actual = ACL(success(order));

    // THEN
    const expected: string = "T:2:0";
    expect(actual).toEqual(expected);
  });

  test("It should forward any error message", function () {
    // GIVEN
    // WHEN
    const actual = ACL(error("Not enough money"));

    // THEN
    const expected: string = "M:Not enough money";
    expect(actual).toEqual(expected);
  });

  test("Extra hot tea", function () {
    // GIVEN
    const order: EnhancedDrinkOrder<"TEA"> = {
      drink: "TEA",
      heat: "EXTRA_HOT",
      numberOfSugars: 0,
      stick: "NO_STICK",
    };

    // WHEN
    const actual = ACL(success(order));

    // THEN
    const expected: string = "Th::";
    expect(actual).toEqual(expected);
  });
});
