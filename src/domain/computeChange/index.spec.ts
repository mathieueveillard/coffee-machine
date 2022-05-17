import computeChange, { Money, PRICES, Prices } from ".";
import { DrinkOrder } from "../enhanceDrinkOrder";

describe("Test of computeChange()", function () {
  test("It should compute money - price", function () {
    // GIVEN
    const prices: Prices = {
      ...PRICES,
      TEA: {
        value: 0.4,
        currency: "EUR",
      },
    };
    const order: DrinkOrder = {
      drink: "TEA",
      numberOfSugars: 0,
    };
    const money: Money = {
      value: 1,
      currency: "EUR",
    };

    // WHEN
    const actual = computeChange(prices)(order)(money);

    // THEN
    const expected: Money = {
      value: 0.6,
      currency: "EUR",
    };
    expect(actual).toEqual(expected);
  });

  test("It should compute money - price", function () {
    // GIVEN
    const prices: Prices = {
      ...PRICES,
      COFFEE: {
        value: 0.6,
        currency: "EUR",
      },
    };
    const order: DrinkOrder = {
      drink: "COFFEE",
      numberOfSugars: 0,
    };
    const money: Money = {
      value: 1,
      currency: "EUR",
    };

    // WHEN
    const actual = computeChange(prices)(order)(money);

    // THEN
    const expected: Money = {
      value: 0.4,
      currency: "EUR",
    };
    expect(actual).toEqual(expected);
  });

  test("It should compute money - price", function () {
    // GIVEN
    const prices: Prices = {
      ...PRICES,
      CHOCOLATE: {
        value: 0.5,
        currency: "EUR",
      },
    };
    const order: DrinkOrder = {
      drink: "CHOCOLATE",
      numberOfSugars: 0,
    };
    const money: Money = {
      value: 1,
      currency: "EUR",
    };

    // WHEN
    const actual = computeChange(prices)(order)(money);

    // THEN
    const expected: Money = {
      value: 0.5,
      currency: "EUR",
    };
    expect(actual).toEqual(expected);
  });
});
