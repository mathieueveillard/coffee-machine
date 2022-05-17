import handleMoney from ".";
import { Success, Error } from "../../util/Maybe";
import { DrinkOrder } from "../enhanceDrinkOrder";
import { Money, PRICES, Prices } from "./computeChange";

describe("Test of handleMoney", function () {
  test("It should forward the drink order if there is enough money", function () {
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
    const actual = handleMoney(prices)(change)(order);

    // THEN
    expect((actual as Success<DrinkOrder>).result).toEqual(order);
  });

  test("It should return an error if there is not enough money", function () {
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
    const actual = handleMoney(prices)(change)(order);

    // THEN
    const expected: string = "Please insert 0.2 EUR more";
    expect((actual as Error<DrinkOrder>).error).toEqual(expected);
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
    const actual = handleMoney(prices)(change)(order);

    // THEN
    expect((actual as Success<DrinkOrder>).result).toEqual(order);
  });
});
