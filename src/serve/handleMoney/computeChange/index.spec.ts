import computeChange, { Money, PRICES, Prices } from ".";
import { DrinkOrder } from "../../enhanceDrinkOrder";

describe("Test of computeChange()", function () {
  test("It should compute money - price (Tea)", function () {
    // GIVEN
    const prices: Prices = {
      ...PRICES,
      TEA: {
        value: 40,
        currency: "EUR_CENTS",
      },
    };
    const order: DrinkOrder<"TEA"> = {
      drink: "TEA",
      heat: "HOT",
      numberOfSugars: 0,
    };
    const money: Money = {
      value: 100,
      currency: "EUR_CENTS",
    };

    // WHEN
    const actual = computeChange(prices)(order)(money);

    // THEN
    const expected: Money = {
      value: 60,
      currency: "EUR_CENTS",
    };
    expect(actual).toEqual(expected);
  });

  test("It should compute money - price (Coffee)", function () {
    // GIVEN
    const prices: Prices = {
      ...PRICES,
      COFFEE: {
        value: 60,
        currency: "EUR_CENTS",
      },
    };
    const order: DrinkOrder<"COFFEE"> = {
      drink: "COFFEE",
      heat: "HOT",
      numberOfSugars: 0,
    };
    const money: Money = {
      value: 100,
      currency: "EUR_CENTS",
    };

    // WHEN
    const actual = computeChange(prices)(order)(money);

    // THEN
    const expected: Money = {
      value: 40,
      currency: "EUR_CENTS",
    };
    expect(actual).toEqual(expected);
  });

  test("It should compute money - price (Chocolate)", function () {
    // GIVEN
    const prices: Prices = {
      ...PRICES,
      CHOCOLATE: {
        value: 50,
        currency: "EUR_CENTS",
      },
    };
    const order: DrinkOrder<"CHOCOLATE"> = {
      drink: "CHOCOLATE",
      heat: "HOT",
      numberOfSugars: 0,
    };
    const money: Money = {
      value: 100,
      currency: "EUR_CENTS",
    };

    // WHEN
    const actual = computeChange(prices)(order)(money);

    // THEN
    const expected: Money = {
      value: 50,
      currency: "EUR_CENTS",
    };
    expect(actual).toEqual(expected);
  });

  test("It should compute money - price (Orange juice)", function () {
    // GIVEN
    const prices: Prices = {
      ...PRICES,
      ORANGE_JUICE: {
        value: 60,
        currency: "EUR_CENTS",
      },
    };
    const order: DrinkOrder<"ORANGE_JUICE"> = {
      drink: "ORANGE_JUICE",
      heat: "COLD",
      numberOfSugars: 0,
    };
    const money: Money = {
      value: 100,
      currency: "EUR_CENTS",
    };

    // WHEN
    const actual = computeChange(prices)(order)(money);

    // THEN
    const expected: Money = {
      value: 40,
      currency: "EUR_CENTS",
    };
    expect(actual).toEqual(expected);
  });
});
