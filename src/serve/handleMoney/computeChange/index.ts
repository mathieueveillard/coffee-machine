import { Drink, DrinkOrder } from "../../enhanceDrinkOrder";

type Currency = "EUR_CENTS";

export type Money = {
  value: number;
  currency: Currency;
};

export type Prices = Record<Drink, Money>;

export const PRICES: Prices = {
  TEA: {
    value: 40,
    currency: "EUR_CENTS",
  },
  COFFEE: {
    value: 60,
    currency: "EUR_CENTS",
  },
  CHOCOLATE: {
    value: 50,
    currency: "EUR_CENTS",
  },
  ORANGE_JUICE: {
    value: 60,
    currency: "EUR_CENTS",
  },
};

const computeChange =
  (prices: Prices) =>
  <D extends Drink>({ drink }: DrinkOrder<D>) =>
  (money: Money): Money => {
    const change = money.value - prices[drink].value;
    return {
      value: change,
      currency: "EUR_CENTS",
    };
  };

export default computeChange;
