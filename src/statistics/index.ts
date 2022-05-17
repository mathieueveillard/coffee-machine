import { Money, Prices } from "../domain/handleMoney/computeChange";
import { Drink, DrinkOrder, EnhancedDrinkOrder } from "../domain/enhanceDrinkOrder";
import { Dependencies } from "../domain/handleShortages";
import { isSuccess, Maybe } from "../util/Maybe";

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

type ServeDrinkFunction = (
  dependencies: Dependencies
) => (prices: Prices) => (order: DrinkOrder) => (money: Money) => Promise<Maybe<EnhancedDrinkOrder>>;

const withStatistics =
  (state: Statistics) =>
  (fn: ServeDrinkFunction): ServeDrinkFunction => {
    return (dependencies) => (prices) => (order) => async (money) => {
      const result = await fn(dependencies)(prices)(order)(money);
      if (isSuccess(result)) {
        const { drink } = order;
        state.drinks = drinkStatisticsReducer(state.drinks)(drink);
        state.earnings = earningsStatisticsReducer(prices)(state.earnings)(drink);
        return result;
      }
      return result;
    };
  };

export default withStatistics;
