# Memory game

This project represents a browser version of so-called _"Memory game"_. The goal is to match symbols on cards with minimal number of moves and in minimal time. 

### Gaming process

* The player flips one card over to reveal its underlying symbol.
* The player then turns over a second card, trying to find the corresponding card with the same symbol.
* If the cards match, both cards stay flipped over.
* If the cards do not match, both cards are flipped face down.
* The game ends once all cards have been correctly matched.

### How to play

Just open `index.html` file in your browser. Make sure Javascript is also enabled

### Known issues

* Clicking somewhere inbetween the cards counts as flipping a card
* Interaction with cards during animation or in case of wrong guess, before cards are flipped face is not restricted now and may cause bugs.