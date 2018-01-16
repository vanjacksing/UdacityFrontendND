Frogger Game
===============================

This project represents a very basic browser version of a game called _"Frogger"_. The goal is to move the charater to the upper part of the screen without being hit by an enemy.

### Gaming process

* The player can move character with "Up", "Down", "Left" and "Right" arrow keys with discrete moves.
* Enemies are are appearing on the "stone" blocks in the upper part of the screen, moving left to right with random speed
* Enemies appear in random intervals that have poisson distribution with mean time equal to 1 s.
* Each time player reaches top of screen or is hit by an enemy - he is moved to initial position at the bottom of the screen.

### How to play

Just open `index.html` file in your browser. Make sure Javascript is also enabled.
There is also live version on the [web](https://vanjacksing.github.io/UdacityFrontendND/arcade-game/)