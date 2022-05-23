import WithProperty from "../../util/WithProperty";

/*
 * Drink
 */

type ColdDrink = "ORANGE_JUICE";

type HotDrink = "TEA" | "COFFEE" | "CHOCOLATE";

export type Drink = HotDrink | ColdDrink;

/*
 * Order
 */

export type Order<D extends Drink> = {
  drink: D;
};

/*
 * Heat
 */

type Cold = "COLD";

type Hot = "HOT" | "EXTRA_HOT";

export type Heat = Cold | Hot;

type WithHeatProperty<T, H extends Heat> = WithProperty<T, "heat", H>;

type WithHeatAccordingToDrink<D extends Drink, O extends Order<D>> = D extends ColdDrink
  ? WithHeatProperty<O, "COLD">
  : WithHeatProperty<O, "HOT" | "EXTRA_HOT">;

/*
 * Sugar
 */

export type NumberOfSugars = 0 | 1 | 2;

type WithSugarProperty<T, S extends NumberOfSugars> = WithProperty<T, "numberOfSugars", S>;

export type NoSugarDrinkOrder<D extends Drink, O extends Order<D>> = WithSugarProperty<O, 0>;

export type SugarDrinkOrder<D extends Drink, O extends Order<D>> = WithSugarProperty<O, 1 | 2>;

type WithSugar<D extends Drink, O extends Order<D>> = NoSugarDrinkOrder<D, O> | SugarDrinkOrder<D, O>;

export type HasSugarProperty = {
  numberOfSugars: NumberOfSugars;
};

/*
 * Stick
 */

export type Stick = "WITH_STICK" | "NO_STICK";

type WithStickProperty<T, S extends Stick> = WithProperty<T, "stick", S>;

type WithStickAccordingToSugar<D extends Drink, O extends Order<D> & HasSugarProperty> = O extends NoSugarDrinkOrder<
  D,
  O
>
  ? WithStickProperty<O, "NO_STICK">
  : WithStickProperty<O, "WITH_STICK">;

/*
 * DrinkOrder (input) / EnhancedDrinkOrder (output)
 */

export type DrinkOrder<D extends Drink> = WithSugar<D, WithHeatAccordingToDrink<D, Order<D>>>;

export type EnhancedDrinkOrder<D extends Drink> = WithStickAccordingToSugar<D, DrinkOrder<D>>;
