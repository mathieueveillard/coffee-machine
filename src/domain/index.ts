export type Drink = "TEA" | "COFFEE" | "CHOCOLATE";

export type NumberOfSugars = 0 | 1 | 2;

export type Stick = "WITH_STICK" | "WITHOUT_STICK";

export type DrinkOrder = {
  drink: Drink;
  numberOfSugars: NumberOfSugars;
};

export type EnhancedDrinkOrder = DrinkOrder & {
  stick: Stick;
};

export const enhanceDrinkOrder = (order: DrinkOrder): EnhancedDrinkOrder => {
  const stick: Stick = order.numberOfSugars > 0 ? "WITH_STICK" : "WITHOUT_STICK";
  return {
    ...order,
    stick,
  };
};
