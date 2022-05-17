// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { DrinkOrder, EnhancedDrinkOrder, enhanceDrinkOrder } from ".";
expect.extend(matchers);

describe("Test of enhanceDrinkOrder()", function () {
  test("It should forward the drink order with no stick when there is no sugar", function () {
    // GIVEN
    const order: DrinkOrder = {
      drink: "TEA",
      numberOfSugars: 0,
    };

    // WHEN
    const actual = enhanceDrinkOrder(order);

    // THEN
    const expected: EnhancedDrinkOrder = {
      drink: "TEA",
      numberOfSugars: 0,
      stick: "WITHOUT_STICK",
    };
    expect(actual).toEqual(expected);
  });

  test("It should forward the drink order with a stick when there is one sugar or more", function () {
    // GIVEN
    const order: DrinkOrder = {
      drink: "TEA",
      numberOfSugars: 1,
    };

    // WHEN
    const actual = enhanceDrinkOrder(order);

    // THEN
    const expected: EnhancedDrinkOrder = {
      drink: "TEA",
      numberOfSugars: 1,
      stick: "WITH_STICK",
    };
    expect(actual).toEqual(expected);
  });

  test("It should forward the drink order with a stick when there is one sugar or more", function () {
    // GIVEN
    const order: DrinkOrder = {
      drink: "TEA",
      numberOfSugars: 2,
    };

    // WHEN
    const actual = enhanceDrinkOrder(order);

    // THEN
    const expected: EnhancedDrinkOrder = {
      drink: "TEA",
      numberOfSugars: 2,
      stick: "WITH_STICK",
    };
    expect(actual).toEqual(expected);
  });
});
