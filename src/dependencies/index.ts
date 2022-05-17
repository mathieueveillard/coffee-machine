import { Drink, NumberOfSugars, Stick, EnhancedDrinkOrder, Heat } from "../domain/enhanceDrinkOrder";
import { isSuccess, Maybe } from "../util/Maybe";

const drinkMapping: Record<Drink, string> = {
  TEA: "T",
  COFFEE: "C",
  CHOCOLATE: "H",
  ORANGE_JUICE: "O",
};

const heatMapping: Record<Heat, string> = {
  COLD: "",
  HOT: "",
  EXTRA_HOT: "h",
};

const sugarMapping: Record<NumberOfSugars, string> = {
  0: "",
  1: "1",
  2: "2",
};

const stickMapping: Record<Stick, string> = {
  NO_STICK: "",
  WITH_STICK: "0",
};

const messagePrefix = "M";

export const ACL = (order: Maybe<EnhancedDrinkOrder>): string => {
  if (isSuccess(order)) {
    const { drink, heat, numberOfSugars, stick } = order.result;
    return `${drinkMapping[drink]}${heatMapping[heat]}:${sugarMapping[numberOfSugars]}:${stickMapping[stick]}`;
  }
  return `${messagePrefix}:${order.error}`;
};
