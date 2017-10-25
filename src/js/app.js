import * as Resources from './resources';
import { ctx } from './engine';
import EnemyBug from '../images/enemy-bug.png';


//Create variables for number of enemies, highest score achieved by 
//the playerand HTML elements where game information will be displayed
const gameInfo = document.createElement('h2'),
score = document.createElement('span');
let highestScore,
numberOfEnemies = 3;
gameInfo.appendChild(score);
gameInfo.setAttribute('font-family', 'sans-serif');

/**
* @description This is a base class for specialized game entities(Enemy and Player)
* @constructor
* @param {number} x - The initial x position of the game entity
* @param {number} y - The initial y position of the game entity
* @param {string} sprite - The url of the entity's sprite image
*/

class Entity{
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }

  //Required method to draw entities on the game screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //helper method to generate random ints in a range
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// Enemies our player must avoid
class Enemy extends Entity {
  constructor(x, sprite) {
    super(x, null, sprite);
    this.y = this.randomizeY();
    this.dx = super.randomInt(100, 500);
  }
  
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //it seems each time we do this update we must re-initilize speeds 
    //and initial positions at boundaries
    //first of all check boundaries and reset starting x position
    if (this.x + this.dx * dt >= 505) {
        this.x = 0;
        //randomly re-initiliaze y and and dx
        this.y = this.randomizeY();
        this.dx = super.randomInt(100, 500);
        return;
    }
    this.x += this.dx * dt;
    this.detectCollisions();
  }

  randomizeY() {
    //positions array defines options for initial y positions
    //these positions were gotten empirically to match the player's steps
    var positions = [72, 155, 238];                     
    return positions[super.randomInt(0, positions.length - 1)];
  }

  detectCollisions() {
    // console.log(player.x, player.y, this.x, this.y);
    //Collision detection conditions
    //1. test to check that the current enemy bug and the player are on the same row(y level)
    //2. test to ensure the player cannot drive through a bug above him till it passes
    //3. test to check left-to-right side collision from enemy bug to player
    if ((this.y === player.y) && (player.x >= this.x - 40) && (player.x - this.x < 70)) {
        --player.lives;
        if (player.score >= 5) {
            player.score -= 5;
        }
        player.updatePlayerInfo(score);
        player.reset();
    }
  }   
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Entity {
  constructor(x, y, sprite, score, lives) {
    super(x, y, sprite);
    //player specific properties
    this.score = score;
    //Get highScore from browser localStorage if available
    this.highScore = (highestScore = localStorage.getItem('highestScore')) ? Number(highestScore) : 0;
    this.lives = lives;
  }

  update() {
    //do something here
    //can't seem to think of what to really do here since 
    //we respond with events to keypresses...think more
    //now I have an idea, here is where we check if the player has hit
    //the water
    if (this.y <= 70) {
        this.score += 10;
        this.updatePlayerInfo(score);
        this.reset();
    }
  }

  reset() {
    this.y = 404; //back to beginning on same column
  }

  handleInput(dir) {
    //check if current position is enough to allow movement
    //use step numbers from game engine for rows and columns rendering
    //the little discrepancy in boundary checking and update step 
    //for left and up movements is due to empirical observations 
    //and mathematical calculations
    if (dir === 'left' && this.x - 99 >= 0) {
        this.x -= 101;    
    }
    else if (dir === 'right' && this.x + 101 <= 405) {
        this.x += 101;
    }
    else if (dir === 'up' && this.y - 70 >= 0) {
        this.y -= 83;
    }
    else if (dir === 'down' && this.y + 83 <= 405) {
        this.y += 83;   
    }
  }

  updatePlayerInfo(playerInfo) {
    //set the text content of the passed in HTMLElement
    playerInfo.textContent = 'Score: ' + this.score + ' Lives: ' + this.lives + ' High Score: ' + this.highScore; 
  }    
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];

while (numberOfEnemies--) {
    allEnemies.push(new Enemy(0, EnemyBug));
}

const player = new Player(202, 404, '', 0, 5);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.body.appendChild(gameInfo);
player.updatePlayerInfo(score);

export {gameInfo, player, allEnemies};