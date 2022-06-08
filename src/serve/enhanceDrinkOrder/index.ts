import { Success, success } from "../../util/Maybe";
import {
  Drink,
  DrinkOrder,
  EnhancedDrinkOrder,
  HasSugarProperty,
  NoSugarDrinkOrder,
  Order,
  SugarDrinkOrder,
} from "./types";
export * from "./types";

const hasNoSugar = <D extends Drink, O extends Order<D> & HasSugarProperty>(
  order: O
): order is NoSugarDrinkOrder<D, O> => {
  return order.numberOfSugars === 0;
};

const hasSugar = <D extends Drink, O extends Order<D> & HasSugarProperty>(order: O): order is SugarDrinkOrder<D, O> => {
  return order.numberOfSugars > 0;
};

const enhanceDrinkOrder = <D extends Drink>(order: DrinkOrder<D>): Success<EnhancedDrinkOrder<D>> => {
  if (hasSugar(order)) {
    return success({
      ...order,
      stick: "WITH_STICK",
    } as EnhancedDrinkOrder<D>);
  }
  if (hasNoSugar(order)) {
    return success({
      ...order,
      stick: "NO_STICK",
    } as EnhancedDrinkOrder<D>);
  }
};

export default enhanceDrinkOrder;
