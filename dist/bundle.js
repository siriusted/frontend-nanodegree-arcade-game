/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctx = undefined;

var _resources = __webpack_require__(1);

var Resources = _interopRequireWildcard(_resources);

var _app = __webpack_require__(3);

var _charBoy = __webpack_require__(4);

var _charBoy2 = _interopRequireDefault(_charBoy);

var _charPinkGirl = __webpack_require__(5);

var _charPinkGirl2 = _interopRequireDefault(_charPinkGirl);

var _charHornGirl = __webpack_require__(6);

var _charHornGirl2 = _interopRequireDefault(_charHornGirl);

var _charCatGirl = __webpack_require__(7);

var _charCatGirl2 = _interopRequireDefault(_charCatGirl);

var _charPrincessGirl = __webpack_require__(8);

var _charPrincessGirl2 = _interopRequireDefault(_charPrincessGirl);

var _stoneBlock = __webpack_require__(9);

var _stoneBlock2 = _interopRequireDefault(_stoneBlock);

var _waterBlock = __webpack_require__(10);

var _waterBlock2 = _interopRequireDefault(_waterBlock);

var _grassBlock = __webpack_require__(11);

var _grassBlock2 = _interopRequireDefault(_grassBlock);

var _enemyBug = __webpack_require__(2);

var _enemyBug2 = _interopRequireDefault(_enemyBug);

__webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* Predefine the variables we'll be using within this scope,
  * create the canvas element, grab the 2D context for that canvas
  * set the canvas elements height/width and add it to the DOM.
  */
var doc = document,
    win = window,
    canvas = doc.createElement('canvas');

var gameId = void 0,
    intervalId = void 0,
    lastTime = void 0;

var ctx = exports.ctx = canvas.getContext('2d');
canvas.width = 505;
canvas.height = 606;
doc.body.appendChild(canvas);

//apply centering
doc.body.classList.add('centered');

//This function serves to create the GameTimer 
function createGameTimer() {
  var timer = document.createElement('span');
  timer.id = 'timer';
  timer.style = 'margin-left : 50px; border: 4px solid #ccc';
  var timerSeconds = document.createElement('span');
  var timerMinutes = document.createElement('span');
  timerSeconds.id = 'seconds';
  timerMinutes.id = 'minutes';
  timer.innerHTML += 'Timer ';
  timer.appendChild(timerMinutes);
  timer.innerHTML += ' : ';
  timer.appendChild(timerSeconds);
  _app.gameInfo.appendChild(timer);
}

//This function is the timer at work
function timeGame() {
  var seconds = doc.querySelector('#seconds');
  var minutes = doc.querySelector('#minutes');
  var timeLeft = void 0,
      minsLeft = void 0,
      secsLeft = void 0,
      timeLimit = Date.now() + 1000 * 60 * 2; //Two minutes in mSecs
  updateTime();
  intervalId = setInterval(updateTime, 1000);
  function updateTime() {
    timeLeft = timeLimit - Date.now();
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
  ctx.fillText("FINAL Score: " + _app.player.score + " points", canvas.width / 2, 105);
  ctx.strokeText("FINAL Score: " + _app.player.score + " points", canvas.width / 2, 105);
  if (_app.player.score && _app.player.score > _app.player.highScore) {
    _app.player.highScore = _app.player.score;
    ctx.fillText('CONGRATULATIONS! NEW HIGH SCORE!', canvas.width / 2, 130);
    ctx.strokeText('CONGRATULATIONS! NEW HIGH SCORE!', canvas.width / 2, 130);
  }
  ctx.fillText("Click REFRESH for a new game", canvas.width / 2, 155);
  ctx.strokeText("Click REFRESH for a new game", canvas.width / 2, 155);
  win.cancelAnimationFrame(gameId);
  win.localStorage.setItem('highestScore', _app.player.highScore);
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

var Engine = function Engine() {

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
    var now = Date.now(),
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
    if (!_app.player.lives) {
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
    _app.allEnemies.forEach(function (enemy) {
      enemy.update(dt);
    });

    _app.player.update();
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
    var rowImages = [_waterBlock2.default, // Top row is water
    // Row 1 of 3 of stone
    // Row 2 of 3 of stone
    _stoneBlock2.default, _stoneBlock2.default, _stoneBlock2.default, // Row 3 of 3 of stone
    // Row 1 of 2 of grass
    _grassBlock2.default // Row 2 of 2 of grass
    , _grassBlock2.default],
        numRows = 6,
        numCols = 5;
    var row = void 0,
        col = void 0;

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
    _app.allEnemies.forEach(function (enemy) {
      enemy.render();
    });

    _app.player.render();
  }

  /* This function is called in the reset function. It displays a menu for player
    * sprite choice. It calls handlePlayerChoice as the eventhandler after a preferred
    * player is clicked on
    */

  function displayMenu() {
    //The idea here is to display a menu just to seee how that works
    var playerImages = [_charBoy2.default,
    //Add other sprites
    _charPrincessGirl2.default, _charPinkGirl2.default, _charCatGirl2.default, _charHornGirl2.default];

    ctx.font = "30pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.fillText("CLICK ON YOUR PLAYER", canvas.width / 2, 60);
    ctx.strokeText("CLICK ON YOUR PLAYER", canvas.width / 2, 60);

    for (var i = 0; i < playerImages.length; ++i) {
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
    var boundary = canvas.getBoundingClientRect();
    _app.player.sprite = choosePlayer(e.x - boundary.left, e.y - boundary.top);
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
    if (118 <= x && x <= 180 && 100 <= y && y <= 210) {
      //correct this, this is not boy
      return _charPrincessGirl2.default;
    } else if (218 <= x && x <= 280 && 100 <= y && y <= 210) {
      return _charPinkGirl2.default;
    } else if (318 <= x && x <= 380 && 100 <= y && y <= 210) {
      return _charCatGirl2.default;
    } else if (418 <= x && x <= 480 && 100 <= y && y <= 210) {
      return _charHornGirl2.default;
    } else {
      return _charBoy2.default;
    }
  }

  /* Go ahead and load all of the images we know we're going to need to
    * draw our game level. Then set init as the callback method, so that when
    * all of these images are properly loaded our game will start.
    */
  Resources.load([_stoneBlock2.default, _waterBlock2.default, _grassBlock2.default, _enemyBug2.default, _charBoy2.default, _charPrincessGirl2.default, _charPinkGirl2.default, _charCatGirl2.default, _charHornGirl2.default]);
  Resources.onReady(init);
};

Engine();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.load = load;
exports.get = get;
exports.isReady = isReady;
exports.onReady = onReady;
/* Resources.js
* This is simply an image loading utility. It eases the process of loading
* image files so that they can be used within your game. It also includes
* a simple "caching" layer so it will reuse cached images if you attempt
* to load the same image multiple times.
*/

var resourceCache = {};
var loading = [];
var readyCallbacks = [];

/* This is the publicly accessible image loading function. It accepts
    * an array of strings pointing to image files or a string for a single
    * image. It will then call our private image loading function accordingly.
    */
function load(urlOrArr) {
    if (urlOrArr instanceof Array) {
        /* If the developer passed in an array of images
            * loop through each value and call our image
            * loader on that image file
            */
        urlOrArr.forEach(function (url) {
            _load(url);
        });
    } else {
        /* The developer did not pass an array to this function,
            * assume the value is a string and call our image loader
            * directly.
            */
        _load(urlOrArr);
    }
}

/* This is our private image loader function, it is
    * called by the public image loader function.
    */
function _load(url) {
    if (resourceCache[url]) {
        /* If this URL has been previously loaded it will exist within
            * our resourceCache array. Just return that image rather
            * re-loading the image.
            */
        return resourceCache[url];
    } else {
        /* This URL has not been previously loaded and is not present
            * within our cache; we'll need to load this image.
            */
        var img = new Image();
        img.onload = function () {
            /* Once our image has properly loaded, add it to our cache
                * so that we can simply return this image if the developer
                * attempts to load this file in the future.
                */
            resourceCache[url] = img;

            /* Once the image is actually loaded and properly cached,
                * call all of the onReady() callbacks we have defined.
                */
            if (isReady()) {
                readyCallbacks.forEach(function (func) {
                    func();
                });
            }
        };

        /* Set the initial cache value to false, this will change when
            * the image's onload event handler is called. Finally, point
            * the image's src attribute to the passed in URL.
            */
        resourceCache[url] = false;
        img.src = url;
    }
}

/* This is used by developers to grab references to images they know
    * have been previously loaded. If an image is cached, this functions
    * the same as calling load() on that URL.
    */
function get(url) {
    return resourceCache[url];
}

/* This function determines if all of the images that have been requested
    * for loading have in fact been properly loaded.
    */
function isReady() {
    var ready = true;
    for (var k in resourceCache) {
        if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
            ready = false;
        }
    }
    return ready;
}

/* This function will add a function to the callback stack that is called
    * when all requested images are properly loaded.
    */
function onReady(func) {
    readyCallbacks.push(func);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "283420ee86352d378021a6c07e15bcc2.png";

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allEnemies = exports.player = exports.gameInfo = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _resources = __webpack_require__(1);

var Resources = _interopRequireWildcard(_resources);

var _engine = __webpack_require__(0);

var _enemyBug = __webpack_require__(2);

var _enemyBug2 = _interopRequireDefault(_enemyBug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Create variables for number of enemies, highest score achieved by 
//the playerand HTML elements where game information will be displayed
var gameInfo = document.createElement('h2'),
    score = document.createElement('span');
var highestScore = void 0,
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

var Entity = function () {
  function Entity(x, y, sprite) {
    _classCallCheck(this, Entity);

    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }

  //Required method to draw entities on the game screen


  _createClass(Entity, [{
    key: 'render',
    value: function render() {
      _engine.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //helper method to generate random ints in a range

  }, {
    key: 'randomInt',
    value: function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }]);

  return Entity;
}();

// Enemies our player must avoid


var Enemy = function (_Entity) {
  _inherits(Enemy, _Entity);

  function Enemy(x, sprite) {
    _classCallCheck(this, Enemy);

    var _this = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, x, null, sprite));

    _this.y = _this.randomizeY();
    _this.dx = _get(Enemy.prototype.__proto__ || Object.getPrototypeOf(Enemy.prototype), 'randomInt', _this).call(_this, 100, 500);
    return _this;
  }

  _createClass(Enemy, [{
    key: 'update',
    value: function update(dt) {
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
        this.dx = _get(Enemy.prototype.__proto__ || Object.getPrototypeOf(Enemy.prototype), 'randomInt', this).call(this, 100, 500);
        return;
      }
      this.x += this.dx * dt;
      this.detectCollisions();
    }
  }, {
    key: 'randomizeY',
    value: function randomizeY() {
      //positions array defines options for initial y positions
      //these positions were gotten empirically to match the player's steps
      var positions = [72, 155, 238];
      return positions[_get(Enemy.prototype.__proto__ || Object.getPrototypeOf(Enemy.prototype), 'randomInt', this).call(this, 0, positions.length - 1)];
    }
  }, {
    key: 'detectCollisions',
    value: function detectCollisions() {
      // console.log(player.x, player.y, this.x, this.y);
      //Collision detection conditions
      //1. test to check that the current enemy bug and the player are on the same row(y level)
      //2. test to ensure the player cannot drive through a bug above him till it passes
      //3. test to check left-to-right side collision from enemy bug to player
      if (this.y === player.y && player.x >= this.x - 40 && player.x - this.x < 70) {
        --player.lives;
        if (player.score >= 5) {
          player.score -= 5;
        }
        player.updatePlayerInfo(score);
        player.reset();
      }
    }
  }]);

  return Enemy;
}(Entity);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function (_Entity2) {
  _inherits(Player, _Entity2);

  function Player(x, y, sprite, score, lives) {
    _classCallCheck(this, Player);

    //player specific properties
    var _this2 = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, x, y, sprite));

    _this2.score = score;
    //Get highScore from browser localStorage if available
    _this2.highScore = (highestScore = localStorage.getItem('highestScore')) ? Number(highestScore) : 0;
    _this2.lives = lives;
    return _this2;
  }

  _createClass(Player, [{
    key: 'update',
    value: function update() {
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
  }, {
    key: 'reset',
    value: function reset() {
      this.y = 404; //back to beginning on same column
    }
  }, {
    key: 'handleInput',
    value: function handleInput(dir) {
      //check if current position is enough to allow movement
      //use step numbers from game engine for rows and columns rendering
      //the little discrepancy in boundary checking and update step 
      //for left and up movements is due to empirical observations 
      //and mathematical calculations
      if (dir === 'left' && this.x - 99 >= 0) {
        this.x -= 101;
      } else if (dir === 'right' && this.x + 101 <= 405) {
        this.x += 101;
      } else if (dir === 'up' && this.y - 70 >= 0) {
        this.y -= 83;
      } else if (dir === 'down' && this.y + 83 <= 405) {
        this.y += 83;
      }
    }
  }, {
    key: 'updatePlayerInfo',
    value: function updatePlayerInfo(playerInfo) {
      //set the text content of the passed in HTMLElement
      playerInfo.textContent = 'Score: ' + this.score + ' Lives: ' + this.lives + ' High Score: ' + this.highScore;
    }
  }]);

  return Player;
}(Entity);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var allEnemies = [];

while (numberOfEnemies--) {
  allEnemies.push(new Enemy(0, _enemyBug2.default));
}

var player = new Player(202, 404, '', 0, 5);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

document.body.appendChild(gameInfo);
player.updatePlayerInfo(score);

exports.gameInfo = gameInfo;
exports.player = player;
exports.allEnemies = allEnemies;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "82158983161d9a86b175381eb6e902b0.png";

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d2755cd79486d16c28ce97935010f756.png";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d920b32664af63119ff8a70cc16f566c.png";

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "224002304bbb879c2fffdb0273160d84.png";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "811b5951b43e11fbc341be5cf50fcfdc.png";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3c38eab3a94315c290652f7d9d3ffb39.png";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f5f9f3f6df2434337e1602e1e8e7c4f1.png";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0d0339e2bb668fd835995a134f3427c8.png";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)(undefined);
// imports


// module
exports.push([module.i, "body {\n    text-align: center;\n}\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(16);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);