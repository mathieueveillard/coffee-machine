import serveDrink from "./serve";
import updateStatistics from "./statistics";
import { Drink, DrinkOrder, EnhancedDrinkOrder } from "./serve/enhanceDrinkOrder";
import { Money } from "./serve/handleMoney/computeChange";
import { Maybe, success } from "./util/Maybe";

const serveDrinkAndUpdateStatistics =
  <D extends Drink>(order: DrinkOrder<D>) =>
  async (money: Money): Promise<Maybe<EnhancedDrinkOrder<D>>> => {
    return (await serveDrink(order)(money)).bind((order) => {
      updateStatistics(order.drink);
      return success(order);
    });
  };

export default serveDrinkAndUpdateStatistics;
