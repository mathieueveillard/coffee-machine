import { Drink, DrinkOrder, EnhancedDrinkOrder, NumberOfSugars, Stick } from "../domain";

const drinkMapping: Record<Drink, string> = {
  TEA: "T",
  COFFEE: "C",
  CHOCOLATE: "H",
};

const sugarMapping: Record<NumberOfSugars, string> = {
  0: "",
  1: "1",
  2: "2",
};

const stickMapping: Record<Stick, string> = {
  WITHOUT_STICK: "",
  WITH_STICK: "0",
};

export const ACL = ({ drink, numberOfSugars, stick }: EnhancedDrinkOrder): string => {
  return `${drinkMapping[drink]}:${sugarMapping[numberOfSugars]}:${stickMapping[stick]}`;
};
