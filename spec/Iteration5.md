# Iteration 5

Despite all the efforts to anticipate, shortages still happen (tea, coffee, chocolate, water, milk, sugar…). Your product owner wants you to take advantage of the machine capabilities to inform the user that there is a shortage and to send a email notification to the company so that they can come and refill the machine.

## Use cases

- When I order a drink and it can be delivered because of a shortage, I want to see a message to the coffee machine console that indicates me the shortage and that a notification has been sent.

## Implementation details

You can take advantages of the 2 services implemented by the coffee machine:

```typescript
beverageQuantityChecker(drink: Drink): Promise<boolean>;
```

```typescript
notifyMissingDrink(drink: Drink): Promise<void>;
```

## Congrats!

You're done!
