# Iteration 3

The machine has been upgraded and the drink maker is now able to make orange juice and to deliver extra hot drinks. You have to update your code to send the correct messages to the drink maker so that users can have orange juices or extra hot drinks

Let us see if your implementation is flexible enough to welcome those changes with not too much hassle.

## Use cases

- I want to be able to buy a orange juice for 0.6 Euro
- I want to be able to have my coffee, chocolate or tea extra hot

## Implementation details

Here are the new protocol commands added to the new firmware of the drink maker:

```
"O::" (Drink maker will make one orange juice)
```

```
"Ch::" (Drink maker will make an extra hot coffee with no sugar)
```

```
"Hh:1:0" (Drink maker will make an extra hot chocolate with one sugar and a stick)
```

```
"Th:2:0" (The drink maker will make an extra hot tea with two sugar and a stick)
```

## Next

[Iteration 4](./Iteration4.md)
