import computeChange, { Money, PRICES, Prices } from ".";
import { DrinkOrder } from "../enhanceDrinkOrder";

describe("Test of computeChange()", function () {
  test("It should compute money - price (Tea)", function () {
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
      heat: "HOT",
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

  test("It should compute money - price (Coffee)", function () {
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
      heat: "HOT",
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

  test("It should compute money - price (Chocolate)", function () {
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
      heat: "HOT",
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

  test("It should compute money - price (Orange juice)", function () {
    // GIVEN
    const prices: Prices = {
      ...PRICES,
      ORANGE_JUICE: {
        value: 0.6,
        currency: "EUR",
      },
    };
    const order: DrinkOrder = {
      drink: "ORANGE_JUICE",
      heat: "COLD",
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
});
