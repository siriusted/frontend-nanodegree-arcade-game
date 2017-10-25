import * as Resources from './resources';
import {gameInfo, player, allEnemies} from './app';
import Boy from '../images/char-boy.png';
import PinkGirl from '../images/char-pink-girl.png';
import HornGirl from '../images/char-horn-girl.png';
import CatGirl from '../images/char-cat-girl.png';
import PrincessGirl from '../images/char-princess-girl.png';
import StoneBlock from '../images/stone-block.png';
import WaterBlock from '../images/water-block.png';
import GrassBlock from '../images/grass-block.png';
import EnemyBug from '../images/enemy-bug.png';
import '../css/style.css';

/* Predefine the variables we'll be using within this scope,
  * create the canvas element, grab the 2D context for that canvas
  * set the canvas elements height/width and add it to the DOM.
  */
const doc = document,
win = window,
canvas = doc.createElement('canvas');

let gameId,
intervalId,
lastTime;

export const ctx = canvas.getContext('2d');
canvas.width = 505;
canvas.height = 606;
doc.body.appendChild(canvas);

//apply centering
doc.body.classList.add('centered');

//This function serves to create the GameTimer 
function createGameTimer() {
  const timer = document.createElement('span');
  timer.id = 'timer';
  timer.style = 'margin-left : 50px; border: 4px solid #ccc';
  const timerSeconds = document.createElement('span');
  const timerMinutes = document.createElement('span');
  timerSeconds.id = 'seconds';
  timerMinutes.id = 'minutes';
  timer.innerHTML += 'Timer ';
  timer.appendChild(timerMinutes);
  timer.innerHTML += ' : ';
  timer.appendChild(timerSeconds);
  gameInfo.appendChild(timer);
}    

//This function is the timer at work
function timeGame() {
  const seconds = doc.querySelector('#seconds');
  const minutes = doc.querySelector('#minutes');
  let timeLeft, minsLeft, secsLeft,
  timeLimit = Date.now() + 1000 * 60 * 2; //Two minutes in mSecs
  updateTime();
  intervalId = setInterval(updateTime, 1000);
  function updateTime() {
      timeLeft = timeLimit - Date.now() ;
      minsLeft = Math.floor(timeLeft / 1000 / 60);
      secsLeft = Math.floor(timeLeft / 1000 % 60);
      seconds.textContent = ('0' + (secsLeft >= 0 ? secsLeft : 0)).slice(-2);
      minutes.textContent = ('0' + (minsLeft >= 0 ? minsLeft : 0)).slice(-2); 
      if (timeLeft <= 0) {
          clearInterval(intervalId);
          endGame();
      }
  }

}


/* This function serves to end the game and display the final score
*/
function endGame() {
  ctx.font = '20pt Impact';
  ctx.fillText("GAME OVER", canvas.width / 2, 80);
  ctx.strokeText("GAME OVER", canvas.width / 2, 80);
  ctx.font = '18pt Impact';
  ctx.fillText("FINAL Score: " + player.score + " points", canvas.width / 2, 105);
  ctx.strokeText("FINAL Score: " + player.score + " points", canvas.width / 2, 105); 
  if (player.score && player.score > player.highScore) {
      player.highScore = player.score;
      ctx.fillText('CONGRATULATIONS! NEW HIGH SCORE!', canvas.width / 2, 130);
      ctx.strokeText('CONGRATULATIONS! NEW HIGH SCORE!', canvas.width / 2, 130);
  }
  ctx.fillText("Click REFRESH for a new game", canvas.width / 2, 155);
  ctx.strokeText("Click REFRESH for a new game", canvas.width / 2, 155);
  win.cancelAnimationFrame(gameId);
  win.localStorage.setItem('highestScore', player.highScore);
}

createGameTimer();

/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

const Engine = () => {
    
  /* This function serves as the kickoff point for the game loop itself
    * and handles properly calling the update and render methods.
    */
  function main() {
    /* Get our time delta information which is required if your game
      * requires smooth animation. Because everyone's computer processes
      * instructions at different speeds we need a constant value that
      * would be the same for everyone (regardless of how fast their
      * computer is) - hurray time!
      */
    let now = Date.now(),
        dt = (now - lastTime) / 1000.0;

    

    /* Call our update/render functions, pass along the time delta to
      * our update function since it may be used for smooth animation.
      */
    
    update(dt);
    render();

    /* Set our lastTime variable which is used to determine the time delta
      * for the next time this function is called.
      */
    lastTime = now;

    /* Use the browser's requestAnimationFrame function to call this
      * function again as soon as the browser is able to draw another frame.
      */
    gameId = win.requestAnimationFrame(main);
    //Check if player has run out of lives and end game if so
    if(!player.lives) {
        clearInterval(intervalId);
        endGame();
    }
  }

  /* This function does some initial setup that should only occur once,
    * particularly setting the lastTime variable that is required for the
    * game loop.
    */
  function init() {
    reset();
    lastTime = Date.now();
  }

  /* This function is called by main (our game loop) and itself calls all
    * of the functions which may need to update entity's data. Based on how
    * you implement your collision detection (when two entities occupy the
    * same space, for instance when your character should die), you may find
    * the need to add an additional function call here. For now, we've left
    * it commented out - you may or may not want to implement this
    * functionality this way (you could just implement collision detection
    * on the entities themselves within your app.js file).
    */
  function update(dt) {
    updateEntities(dt);
  }

  /* This is called by the update function and loops through all of the
    * objects within your allEnemies array as defined in app.js and calls
    * their update() methods. It will then call the update function for your
    * player object. These update methods should focus purely on updating
    * the data/properties related to the object. Do your drawing in your
    * render methods.
    */
  function updateEntities(dt) {
    allEnemies.forEach(function(enemy) {
        enemy.update(dt);
    });
    
    player.update();
  }

  /* This function initially draws the "game level", it will then call
    * the renderEntities function. Remember, this function is called every
    * game tick (or loop of the game engine) because that's how games work -
    * they are flipbooks creating the illusion of animation but in reality
    * they are just drawing the entire screen over and over.
    */
  function render() {
    /* This array holds the relative URL to the image used
      * for that particular row of the game level.
      */
    const rowImages = [
            WaterBlock,   // Top row is water
            StoneBlock,   // Row 1 of 3 of stone
            StoneBlock,   // Row 2 of 3 of stone
            StoneBlock,   // Row 3 of 3 of stone
            GrassBlock,   // Row 1 of 2 of grass
            GrassBlock    // Row 2 of 2 of grass
        ],
        numRows = 6,
        numCols = 5;
    let row, col;

    /* Loop through the number of rows and columns we've defined above
      * and, using the rowImages array, draw the correct image for that
      * portion of the "grid"
      */
    for (row = 0; row < numRows; row++) {
        for (col = 0; col < numCols; col++) {
            /* The drawImage function of the canvas' context element
              * requires 3 parameters: the image to draw, the x coordinate
              * to start drawing and the y coordinate to start drawing.
              * We're using our Resources helpers to refer to our images
              * so that we get the benefits of caching these images, since
              * we're using them over and over.
              */
            ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
        }
    }

    renderEntities();
  }

  /* This function is called by the render function and is called on each game
    * tick. Its purpose is to then call the render functions you have defined
    * on your enemy and player entities within app.js
    */
  function renderEntities() {
    /* Loop through all of the objects within the allEnemies array and call
      * the render function you have defined.
      */
    allEnemies.forEach(function(enemy) {
        enemy.render();
    });

    player.render();
  }

  /* This function is called in the reset function. It displays a menu for player
    * sprite choice. It calls handlePlayerChoice as the eventhandler after a preferred
    * player is clicked on
    */

  function displayMenu() {
    //The idea here is to display a menu just to seee how that works
    const playerImages = [
        Boy,
        PrincessGirl,
        PinkGirl,
        CatGirl,
        HornGirl   
    ];

    ctx.font = "30pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.fillText("CLICK ON YOUR PLAYER", canvas.width / 2, 60);
    ctx.strokeText("CLICK ON YOUR PLAYER", canvas.width / 2, 60);
    
    for (let i = 0; i < playerImages.length; ++i) {
        ctx.drawImage(Resources.get(playerImages[i]), i * 101, 50);
    } 

    canvas.addEventListener('click', handlePlayerChoice);

  }

  /* This function is the handler function for the display menu 
    * I'm making use of Element.getBoundingClientRect()'s returned
    * object properties left and top to ensure consistency in measured
    * distances across varying viewport sizes. This function also serves 
    * as the kick off point for starting the game after handling player choice.
    * Also clear the menu from canvas and try removing event listener
    */
  function handlePlayerChoice(e) {
      let boundary = canvas.getBoundingClientRect();
      player.sprite = choosePlayer(e.x - boundary.left, e.y - boundary.top);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //remove canvas eventListener for handling player choice
      canvas.removeEventListener('click', handlePlayerChoice);
      beginGame();
  }

  function beginGame() {
    timeGame();
    main();
  }

  /* This function does nothing but it could have been a good place to
    * handle game reset states - maybe a new game menu or a game over screen
    * those sorts of things. It's only called once by the init() method.
    */
  function reset() {
    // now it calls displayMenu
    displayMenu();
  }


  /* This is the actual function which sets the appropriate player sprite
    * chosen by the user.
    */
  function choosePlayer(x, y) {
    //boundary values for setting appropriate sprites were gotten from testing
    //these are realtive sizes whic remain consitent across varying viewports
    if (118 <= x && x <= 180 && 100 <= y && y <= 210) { //correct this, this is not boy
        return PrincessGirl;
    }
    else if (218 <= x && x <= 280 && 100 <= y && y <= 210) {
        return PinkGirl;
    }
    else if (318 <= x && x <= 380 && 100 <= y && y <= 210) {
        return  CatGirl;
    }
    else if (418 <= x && x <= 480 && 100 <= y && y <= 210) {
        return  HornGirl;
    }
    else {
        return Boy;
    }
  }

  /* Go ahead and load all of the images we know we're going to need to
    * draw our game level. Then set init as the callback method, so that when
    * all of these images are properly loaded our game will start.
    */
  Resources.load([
      StoneBlock,
      WaterBlock,
      GrassBlock,
      EnemyBug,
      Boy,
      //Add other sprites
      PrincessGirl,
      PinkGirl,
      CatGirl,
      HornGirl
  ]);
  Resources.onReady(init);
  
};

Engine();