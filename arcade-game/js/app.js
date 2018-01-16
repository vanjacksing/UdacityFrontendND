// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Position of an enemy
    this.position = {
        x: -100,
        y: getRandomInt(1,4) * 83 - 20
    }
    // Set speed to random value is interval
    this.speed = getRandomInt(200, 400);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.position.x += Math.floor(dt * this.speed);
    if (this.position.x > 606) {
        this.position.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
};

// Object coordinated represent top left corner of a sprite.
// Collision tracking could be better done with center coordinated of each frame
Enemy.prototype.getCenterCoord = function () {
    return {xCenter: this.position.x + 50, yCenter: this.position.y + 85}
}

// Random integer between in (min, max) interval
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Sprite for a player
    this.sprite = 'images/char-boy.png';
    // Position of the player
    this.position = {
        x: 101 * 2,
        y: 83 * 5 - 20
    }
}

Player.prototype.update = function(dt) {
    
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
}

Player.prototype.handleInput = function(action) {
    let newPos;
    // Depending on user action check that new coords are not off the canvas and then update them
    switch (action) {
        case 'left':
            newPos = this.position.x - 101;
            if (newPos >= 0) {
                this.position.x = newPos;
            } 
            break;
        case 'right':
            newPos = this.position.x + 101;
            if (newPos < 505) {
              this.position.x = newPos;
            } 
            break;
        case 'down':
            newPos = this.position.y + 83;
            if (newPos <= 400) {
              this.position.y = newPos;
            } 
            break;
        case 'up':
            newPos = this.position.y - 83;
            if (newPos >= -20) {
              this.position.y = newPos;
            } 
            break;
        default:
            break;
    }
}

Player.prototype.getCenterCoord = function() {
  return { xCenter: this.position.x + 50, yCenter: this.position.y + 85 };
};

// Generating enemies with random intervals
// Event generation formula from here: http://preshing.com/20111007/how-to-generate-random-timings-for-a-poisson-process/

var EnemyGenerator = function () {
    // Lambda is the mean time between 2 enemies in poisson distribution
    this.lambda = 1;
    this.now = Date.now();
    this.updateNextTime = function () {
        return -Math.log(1 - Math.random()) / (1 / this.lambda);
    }
    this.nextTime = this.updateNextTime();
}

// This function is calles in main() of game Engine, creating new Enemies if needed
EnemyGenerator.prototype.updateState = function () {
    if ((Date.now() - this.now)/1000 > this.nextTime) {
        this.nextTime = this.updateNextTime();
        this.now = Date.now();
        allEnemies.push(new Enemy());
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var enemyGenerator = new EnemyGenerator();
var allEnemies = [];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
