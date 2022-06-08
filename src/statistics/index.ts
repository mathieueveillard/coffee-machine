import { Success, success } from "../util/Maybe";

type Drink = "TEA" | "COFFEE" | "CHOCOLATE" | "ORANGE_JUICE";

type Currency = "EUR";

type Money = {
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

type DrinkStatistics = Record<Drink, number>;

type EarningsStatistics = Money;

export type Statistics = {
  drinks: DrinkStatistics;
  earnings: EarningsStatistics;
};

export const INITIAL_STATISTICS: Statistics = {
  drinks: {
    TEA: 0,
    COFFEE: 0,
    CHOCOLATE: 0,
    ORANGE_JUICE: 0,
  },
  earnings: {
    value: 0,
    currency: "EUR",
  },
};

const drinkStatisticsReducer =
  (state: DrinkStatistics) =>
  (drink: Drink): DrinkStatistics => {
    return {
      ...state,
      [drink]: state[drink] + 1,
    };
  };

const earningsStatisticsReducer =
  (prices: Prices) =>
  (state: EarningsStatistics) =>
  (drink: Drink): EarningsStatistics => {
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
      drinks: drinkStatisticsReducer(statistics.drinks)(drink),
      earnings: earningsStatisticsReducer(prices)(statistics.earnings)(drink),
    });
  };

let state: Statistics = INITIAL_STATISTICS;

const readyToUseUpdateStatistics = (drink: Drink): void => {
  state = updateStatistics(PRICES)(state)(drink).result;
};

export default readyToUseUpdateStatistics;
