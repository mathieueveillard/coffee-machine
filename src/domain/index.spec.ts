import serveDrink from ".";
import { Error, Success } from "../util/Maybe";
import { Money, Prices, PRICES } from "./computeChange";
import { DrinkOrder, EnhancedDrinkOrder } from "./enhanceDrinkOrder";

describe("Test of serveDrink()", function () {
  test("It should enhance the drink order if there is enough change", function () {
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
    const change: Money = {
      value: 1,
      currency: "EUR",
    };

    // WHEN
    const actual = serveDrink(prices)(order)(change);

    // THEN
    const expected: EnhancedDrinkOrder = {
      drink: "TEA",
      heat: "HOT",
      numberOfSugars: 0,
      stick: "NO_STICK",
    };
    expect((actual as Success<EnhancedDrinkOrder>).result).toEqual(expected);
  });

  test("It should return an error if there is not enough change", function () {
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
    const change: Money = {
      value: 0.2,
      currency: "EUR",
    };

    // WHEN
    const actual = serveDrink(prices)(order)(change);

    // THEN
    const expected: string = "Please insert 0.2 EUR more";
    expect((actual as Error<EnhancedDrinkOrder>).error).toEqual(expected);
  });

  test("Edge case", function () {
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
    const change: Money = {
      value: 0.4,
      currency: "EUR",
    };

    // WHEN
    const actual = serveDrink(prices)(order)(change);

    // THEN
    const expected: EnhancedDrinkOrder = {
      drink: "TEA",
      heat: "HOT",
      numberOfSugars: 0,
      stick: "NO_STICK",
    };
    expect((actual as Success<EnhancedDrinkOrder>).result).toEqual(expected);
  });
});
