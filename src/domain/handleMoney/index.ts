import { Maybe, success, error } from "../../util/Maybe";
import { DrinkOrder } from "../enhanceDrinkOrder";
import computeChange, { Prices, Money } from "./computeChange";

const buildNotEnoughMoneyErrorMessage = (change: Money): string => {
  return `Please insert ${-change.value} ${change.currency} more`;
};

const handleMoney =
  (prices: Prices) =>
  (money: Money) =>
  (order: DrinkOrder): Maybe<DrinkOrder> => {
    const change = computeChange(prices)(order)(money);
    if (change.value >= 0) {
      return success(order);
    }
    return error(buildNotEnoughMoneyErrorMessage(change));
  };

export default handleMoney;
