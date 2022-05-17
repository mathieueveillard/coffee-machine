import serveDrink from ".";
import { Error } from "../util/Maybe";
import { Money, Prices, PRICES } from "./handleMoney/computeChange";
import { DrinkOrder, EnhancedDrinkOrder } from "./enhanceDrinkOrder";
import { Dependencies } from "./handleShortages";

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
    const actual = await serveDrink(dependencies)(prices)(order)(change);

    // THEN
    const expected: EnhancedDrinkOrder = {
      drink: "TEA",
      heat: "HOT",
      numberOfSugars: 0,
      stick: "NO_STICK",
    };
    expect((actual as Error<EnhancedDrinkOrder>).error).toEqual("This drink in not available anymore, sorry.");
  });
});
