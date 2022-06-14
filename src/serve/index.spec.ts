import { Money, Prices, PRICES } from "./handleMoney/computeChange";
import { DrinkOrder, EnhancedDrinkOrder } from "./enhanceDrinkOrder";
import { Dependencies } from "./handleShortages";
import { getError } from "../util/Maybe";
import { serveDrink } from ".";

describe("Test of serveDrink()", function () {
  test("It should handle shortages as well", async function () {
    // GIVEN
    const dependencies: Dependencies = {
      canServe: jest.fn().mockResolvedValueOnce(false),
      askForRefill: jest.fn(),
    };
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
      value: 1,
      currency: "EUR_CENTS",
    };

    // WHEN
    const actual = await serveDrink(dependencies)(prices)(order)(change);

    // THEN
    const expected: EnhancedDrinkOrder<"TEA"> = {
      drink: "TEA",
      heat: "HOT",
      numberOfSugars: 0,
      stick: "NO_STICK",
    };
    expect(getError(actual)).toEqual("This drink in not available anymore, sorry.");
  });
});
