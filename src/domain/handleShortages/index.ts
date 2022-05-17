import { error, Maybe, success } from "../../util/Maybe";
import { Drink, DrinkOrder } from "../enhanceDrinkOrder";

const SHORTAGE_MESSAGE = "This drink in not available anymore, sorry.";

export type Dependencies = {
  canServe(drink: Drink): Promise<boolean>;
  askForRefill(drink: Drink): Promise<void>;
};

const handleShortages =
  ({ canServe, askForRefill }: Dependencies) =>
  async (order: DrinkOrder): Promise<Maybe<DrinkOrder>> => {
    if (await canServe(order.drink)) {
      return success(order);
    }
    await askForRefill(order.drink);
    return error(SHORTAGE_MESSAGE);
  };

export default handleShortages;
