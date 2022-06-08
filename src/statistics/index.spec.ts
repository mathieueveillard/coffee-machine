import { INITIAL_STATISTICS, PRICES, Prices, Statistics, updateStatistics } from ".";

describe("Test of updateStatistics()", function () {
  test("Initial values", async function () {
    // GIVEN
    const statistics = INITIAL_STATISTICS;
    const prices: Prices = {
      ...PRICES,
      TEA: {
        value: 0.4,
        currency: "EUR",
      },
    };

    // WHEN
    const actual = updateStatistics(prices)(statistics)("TEA");

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
    expect(actual.result).toEqual(expected);
  });
});
