import handleMoney from ".";
import { getResult, getError } from "../../util/Maybe";
import { DrinkOrder } from "../enhanceDrinkOrder";
import { Money, PRICES, Prices } from "./computeChange";

describe("Test of handleMoney", function () {
  test("It should forward the drink order if there is enough money", function () {
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
    const change: Money = {
      value: 100,
      currency: "EUR_CENTS",
    };

    // WHEN
    const actual = handleMoney(prices)(change)(order);

    // THEN
    expect(getResult(actual)).toEqual(order);
  });

  test("It should return an error if there is not enough money", function () {
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
    const change: Money = {
      value: 20,
      currency: "EUR_CENTS",
    };

    // WHEN
    const actual = handleMoney(prices)(change)(order);

    // THEN
    const expected: string = "Please insert 20 EUR_CENTS more";
    expect(getError(actual)).toEqual(expected);
  });

  test("Edge case", function () {
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
    const change: Money = {
      value: 40,
      currency: "EUR_CENTS",
    };

    // WHEN
    const actual = handleMoney(prices)(change)(order);

    // THEN
    expect(getResult(actual)).toEqual(order);
  });
});
