import { Maybe, success, error } from "../../util/Maybe";
import { Drink, DrinkOrder } from "../enhanceDrinkOrder";
import computeChange, { Prices, Money } from "./computeChange";

const buildNotEnoughMoneyErrorMessage = (change: Money): string => {
  return `Please insert ${-change.value} ${change.currency} more`;
};

const handleMoney =
  (prices: Prices) =>
  (money: Money) =>
  <D extends Drink>(order: DrinkOrder<D>): Maybe<DrinkOrder<D>> => {
    const change = computeChange(prices)(order)(money);
    if (change.value >= 0) {
      return success(order);
    }
    return error(buildNotEnoughMoneyErrorMessage(change));
  };

export default handleMoney;
