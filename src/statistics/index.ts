import { Success, success } from "../util/Maybe";

type Drink = "TEA" | "COFFEE" | "CHOCOLATE" | "ORANGE_JUICE";

type Currency = "EUR_CENTS";

type Money = {
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

type DrinkStatistics = Record<Drink, number>;

type Turnover = Money;

export type Statistics = {
  drinks: DrinkStatistics;
  turnover: Turnover;
};

export const INITIAL_STATISTICS: Statistics = {
  drinks: {
    TEA: 0,
    COFFEE: 0,
    CHOCOLATE: 0,
    ORANGE_JUICE: 0,
  },
  turnover: {
    value: 0,
    currency: "EUR_CENTS",
  },
};

const drinkStatisticsReducer =
  (drink: Drink) =>
  (state: DrinkStatistics): DrinkStatistics => {
    return {
      ...state,
      [drink]: state[drink] + 1,
    };
  };

const turnoverReducer =
  (prices: Prices) =>
  (drink: Drink) =>
  (state: Turnover): Turnover => {
    return {
      ...state,
      value: state.value + prices[drink].value,
    };
  };

export const updateStatistics =
  (prices: Prices) =>
  (statistics: Statistics) =>
  (drink: Drink): Success<Statistics> => {
    return success({
      drinks: drinkStatisticsReducer(drink)(statistics.drinks),
      turnover: turnoverReducer(prices)(drink)(statistics.turnover),
    });
  };

let state: Statistics = INITIAL_STATISTICS;

const readyToUseUpdateStatistics = (drink: Drink): void => {
  state = updateStatistics(PRICES)(state)(drink).result;
};

export default readyToUseUpdateStatistics;
