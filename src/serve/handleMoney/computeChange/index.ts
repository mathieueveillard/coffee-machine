import { Drink, DrinkOrder } from "../../enhanceDrinkOrder";

type Currency = "EUR";

export type Money = {
  value: number;
  currency: Currency;
};

export type Prices = Record<Drink, Money>;

export const PRICES: Prices = {
  TEA: {
    value: 0.4,
    currency: "EUR",
  },
  COFFEE: {
    value: 0.6,
    currency: "EUR",
  },
  CHOCOLATE: {
    value: 0.5,
    currency: "EUR",
  },
  ORANGE_JUICE: {
    value: 0.6,
    currency: "EUR",
  },
};

const computeChange =
  (prices: Prices) =>
  <D extends Drink>({ drink }: DrinkOrder<D>) =>
  (money: Money): Money => {
    const change = money.value - prices[drink].value;
    return {
      value: change,
      currency: "EUR",
    };
  };

export default computeChange;
