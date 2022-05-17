import withStatistics, { INITIAL_STATISTICS, Statistics } from ".";
import serveDrink from "../domain";
import { Money, Prices, PRICES } from "../domain/computeChange";
import { DrinkOrder } from "../domain/enhanceDrinkOrder";

describe("Test of withStatistics()", function () {
  test("Initial values", function () {
    // GIVEN
    const statistics = INITIAL_STATISTICS;
    withStatistics(statistics)(serveDrink);

    // WHEN
    // THEN
    expect(statistics).toEqual(INITIAL_STATISTICS);
  });

  test("Initial values", function () {
    // GIVEN
    const statistics = INITIAL_STATISTICS;
    const serveAndCollectStatistics = withStatistics(statistics)(serveDrink);
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
    const actual = serveAndCollectStatistics(prices)(order)(money);

    // THEN
    const expected: Statistics = {
      drinks: {
        TEA: 1,
        COFFEE: 0,
        CHOCOLATE: 0,
        ORANGE_JUICE: 0,
      },
      earnings: {
        value: 0.4,
        currency: "EUR",
      },
    };
    expect(actual.type).toEqual("SUCCESS");
    expect(statistics).toEqual(expected);
  });

  test("Initial values", function () {
    // GIVEN
    const statistics = INITIAL_STATISTICS;
    const serveAndCollectStatistics = withStatistics(statistics)(serveDrink);
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
      value: 0.2,
      currency: "EUR",
    };

    // WHEN
    const actual = serveAndCollectStatistics(prices)(order)(money);

    // THEN
    expect(actual.type).toEqual("ERROR");
    expect(statistics).toEqual(INITIAL_STATISTICS);
  });
});
