import handleShortages, { Dependencies } from ".";
import { DrinkOrder } from "../enhanceDrinkOrder";
import { Success, Error } from "../../util/Maybe";

describe("Test of handleShortages()", function () {
  test("It should forward the order if it can be served", async function () {
    // GIVEN
    const dependencies: Dependencies = {
      canServe: jest.fn().mockResolvedValueOnce(true),
      askForRefill: jest.fn(),
    };
    const order: DrinkOrder = {
      drink: "TEA",
      heat: "HOT",
      numberOfSugars: 0,
    };

    // WHEN
    const actual = await handleShortages(dependencies)(order);

    // THEN
    expect((actual as Success<DrinkOrder>).result).toEqual(order);
  });

  test("It should send an email and return an error otherwise", async function () {
    // GIVEN
    const dependencies: Dependencies = {
      canServe: jest.fn().mockResolvedValueOnce(false),
      askForRefill: jest.fn(),
    };
    const order: DrinkOrder = {
      drink: "TEA",
      heat: "HOT",
      numberOfSugars: 0,
    };

    // WHEN
    const actual = await handleShortages(dependencies)(order);

    // THEN
    expect((actual as Error<DrinkOrder>).error).toEqual("This drink in not available anymore, sorry.");
    expect(dependencies.askForRefill).toHaveBeenCalledWith("TEA");
  });
});
