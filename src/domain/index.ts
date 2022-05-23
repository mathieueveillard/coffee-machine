import { Maybe } from "../util/Maybe";
import { Money, Prices } from "./handleMoney/computeChange";
import enhanceDrinkOrder, { Drink, DrinkOrder, EnhancedDrinkOrder } from "./enhanceDrinkOrder";
import handleShortages, { Dependencies } from "./handleShortages";
import handleMoney from "./handleMoney";

const serveDrink =
  (dependencies: Dependencies) =>
  (prices: Prices) =>
  <D extends Drink>(order: DrinkOrder<D>) =>
  async (money: Money): Promise<Maybe<EnhancedDrinkOrder<D>>> => {
    return (await handleShortages(dependencies)(order)) //
      .bind(handleMoney(prices)(money))
      .bind(enhanceDrinkOrder);
  };

export default serveDrink;
