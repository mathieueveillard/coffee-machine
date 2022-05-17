// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import enhanceDrinkOrder, { DrinkOrder, EnhancedDrinkOrder } from ".";
import { Success } from "../../util/Maybe";
expect.extend(matchers);

describe("Test of enhanceDrinkOrder()", function () {
  test("It should forward the drink order with no stick when there is no sugar (Tea)", function () {
    // GIVEN
    const order: DrinkOrder = {
      drink: "TEA",
      heat: "HOT",
      numberOfSugars: 0,
    };

    // WHEN
    const actual = enhanceDrinkOrder(order);

    // THEN
    const expected: EnhancedDrinkOrder = {
      drink: "TEA",
      heat: "HOT",
      numberOfSugars: 0,
      stick: "NO_STICK",
    };
    expect((actual as Success<EnhancedDrinkOrder>).result).toEqual(expected);
  });

  test("It should forward the drink order with no stick when there is no sugar (Coffee)", function () {
    // GIVEN
    const order: DrinkOrder = {
      drink: "COFFEE",
      heat: "HOT",
      numberOfSugars: 0,
    };

    // WHEN
    const actual = enhanceDrinkOrder(order);

    // THEN
    const expected: EnhancedDrinkOrder = {
      drink: "COFFEE",
      heat: "HOT",
      numberOfSugars: 0,
      stick: "NO_STICK",
    };
    expect((actual as Success<EnhancedDrinkOrder>).result).toEqual(expected);
  });

  test("It should forward the drink order with no stick when there is no sugar (Chocolate)", function () {
    // GIVEN
    const order: DrinkOrder = {
      drink: "CHOCOLATE",
      heat: "HOT",
      numberOfSugars: 0,
    };

    // WHEN
    const actual = enhanceDrinkOrder(order);

    // THEN
    const expected: EnhancedDrinkOrder = {
      drink: "CHOCOLATE",
      heat: "HOT",
      numberOfSugars: 0,
      stick: "NO_STICK",
    };
    expect((actual as Success<EnhancedDrinkOrder>).result).toEqual(expected);
  });

  test("It should forward the drink order with no stick when there is no sugar (Orange juice)", function () {
    // GIVEN
    const order: DrinkOrder = {
      drink: "ORANGE_JUICE",
      heat: "COLD",
      numberOfSugars: 0,
    };

    // WHEN
    const actual = enhanceDrinkOrder(order);

    // THEN
    const expected: EnhancedDrinkOrder = {
      drink: "ORANGE_JUICE",
      heat: "COLD",
      numberOfSugars: 0,
      stick: "NO_STICK",
    };
    expect((actual as Success<EnhancedDrinkOrder>).result).toEqual(expected);
  });

  test("It should forward the drink order with a stick when there is one sugar or more", function () {
    // GIVEN
    const order: DrinkOrder = {
      drink: "TEA",
      heat: "HOT",
      numberOfSugars: 1,
    };

    // WHEN
    const actual = enhanceDrinkOrder(order);

    // THEN
    const expected: EnhancedDrinkOrder = {
      drink: "TEA",
      heat: "HOT",
      numberOfSugars: 1,
      stick: "WITH_STICK",
    };
    expect((actual as Success<EnhancedDrinkOrder>).result).toEqual(expected);
  });

  test("It should forward the drink order with a stick when there is one sugar or more", function () {
    // GIVEN
    const order: DrinkOrder = {
      drink: "TEA",
      heat: "HOT",
      numberOfSugars: 2,
    };

    // WHEN
    const actual = enhanceDrinkOrder(order);

    // THEN
    const expected: EnhancedDrinkOrder = {
      drink: "TEA",
      heat: "HOT",
      numberOfSugars: 2,
      stick: "WITH_STICK",
    };
    expect((actual as Success<EnhancedDrinkOrder>).result).toEqual(expected);
  });
});
