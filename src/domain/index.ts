import { error, Maybe, success } from "../util/Maybe";
import computeChange, { Money, Prices } from "./computeChange";
import enhanceDrinkOrder, { DrinkOrder, EnhancedDrinkOrder } from "./enhanceDrinkOrder";

const buildNotEnoughMoneyErrorMessage = (change: Money): string => {
  return `Please insert ${-change.value} ${change.currency} more`;
};

const serveDrink =
  (prices: Prices) =>
  (order: DrinkOrder) =>
  (money: Money): Maybe<EnhancedDrinkOrder> => {
    const change = computeChange(prices)(order)(money);
    if (change.value >= 0) {
      return success(enhanceDrinkOrder(order));
    }
    return error(buildNotEnoughMoneyErrorMessage(change));
  };

export default serveDrink;
