type Cold = "COLD";

type Hot = "HOT" | "EXTRA_HOT";

export type Heat = Cold | Hot;

type ColdDrink = "ORANGE_JUICE";

type HotDrink = "TEA" | "COFFEE" | "CHOCOLATE";

export type Drink = HotDrink | ColdDrink;

export type NumberOfSugars = 0 | 1 | 2;

type ColdDrinkWithHeat = {
  drink: ColdDrink;
  heat: Cold;
};

type HotDrinkWithHeat = {
  drink: HotDrink;
  heat: Hot;
};

type DrinkWithHeat = ColdDrinkWithHeat | HotDrinkWithHeat;

type NoSugarDrinkOrder = DrinkWithHeat & {
  numberOfSugars: 0;
};

type SugarDrinkOrder = DrinkWithHeat & {
  numberOfSugars: 1 | 2;
};

export type DrinkOrder = NoSugarDrinkOrder | SugarDrinkOrder;

const hasNoSugar = (order: DrinkOrder): order is NoSugarDrinkOrder => {
  return order.numberOfSugars === 0;
};

const hasSugar = (order: DrinkOrder): order is SugarDrinkOrder => {
  return order.numberOfSugars > 0;
};

export type Stick = "WITH_STICK" | "NO_STICK";

type Enhanced<Order extends DrinkOrder, S extends Stick> = Order & { stick: S };

type EnhancedNoSugarDrinkOrder = Enhanced<NoSugarDrinkOrder, "NO_STICK">;

type EnhancedSugarDrinkOrder = Enhanced<SugarDrinkOrder, "WITH_STICK">;

export type EnhancedDrinkOrder = EnhancedNoSugarDrinkOrder | EnhancedSugarDrinkOrder;

const enhanceDrinkOrder = (order: DrinkOrder): EnhancedDrinkOrder => {
  if (hasSugar(order)) {
    return {
      ...order,
      stick: "WITH_STICK",
    };
  }
  if (hasNoSugar(order)) {
    return {
      ...order,
      stick: "NO_STICK",
    };
  }
};

export default enhanceDrinkOrder;
