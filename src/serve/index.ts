import { Maybe } from "../util/Maybe";
import { Money, PRICES, Prices } from "./handleMoney/computeChange";
import enhanceDrinkOrder, { Drink, DrinkOrder, EnhancedDrinkOrder } from "./enhanceDrinkOrder";
import handleShortages, { Dependencies } from "./handleShortages";
import handleMoney from "./handleMoney";

export const serveDrink =
  (dependencies: Dependencies) =>
  (prices: Prices) =>
  <D extends Drink>(order: DrinkOrder<D>) =>
  async (money: Money): Promise<Maybe<EnhancedDrinkOrder<D>>> => {
    return (await handleShortages(dependencies)(order)) //
      .bind(handleMoney(prices)(money))
      .bind(enhanceDrinkOrder);
  };

const fakeDependencies: Dependencies = {
  canServe: jest.fn().mockResolvedValueOnce(true),
  askForRefill: jest.fn(),
};

const readyToUseServeDrink =
  <D extends Drink>(order: DrinkOrder<D>) =>
  async (money: Money): Promise<Maybe<EnhancedDrinkOrder<D>>> => {
    return serveDrink(fakeDependencies)(PRICES)(order)(money);
  };

export default readyToUseServeDrink;
