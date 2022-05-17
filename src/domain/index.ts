import { Maybe } from "../util/Maybe";
import { Money, Prices } from "./handleMoney/computeChange";
import enhanceDrinkOrder, { DrinkOrder, EnhancedDrinkOrder } from "./enhanceDrinkOrder";
import handleShortages, { Dependencies } from "./handleShortages";
import handleMoney from "./handleMoney";

const serveDrink =
  (dependencies: Dependencies) =>
  (prices: Prices) =>
  (order: DrinkOrder) =>
  async (money: Money): Promise<Maybe<EnhancedDrinkOrder>> => {
    return (await handleShortages(dependencies)(order)) //
      .bind(handleMoney(prices)(money))
      .bind(enhanceDrinkOrder);
  };

export default serveDrink;
