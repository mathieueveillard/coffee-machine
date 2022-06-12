# coffee-machine

Inspired by [Simcap](http://simcap.github.io/coffeemachine/index.html).

Let's consider a coffee machine that is made of three main components:

- A user interface
- A logic layer
- The actual drink maker, that mixes ingredients and produces drinks

Your task in this project is to develop the logic layer that translates orders from customers to the drink maker. Your code will use the drink maker protocol to send commands to the drink maker.

There are five iterations. The challenge of this exercise is to write code that will be easily refactored later when additional features will be requested. This is a thin line, as beautifully said by Sandi Metz:

> Don't write code that guesses the future, arrange code so you can adapt to the future when it arrives.

Ready? Let's jump into the [first iteration](./spec/Iteration1.md)!
