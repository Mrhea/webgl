/**
 * A simple game in which the user must click on moving cubes to delete them and 
 * gain points. If the player does not delete all the cubes within a certain
 * time limit, they lose the game.
 * 
 * Each time all cubes are deleted, we load a new map with new cubes until
 * player completes all the levels
 * 
 * If the user does not click on a cube (either an object or elsewhere on the screen), 
 * decrement their score. 
 * 
 * @author Matthew Rhea
 */

var score = 0;
var currLevel = 1;
var timeoutHandle;
var clickableGeometry = 3;
var levelColors;
var levelHeights;
var MAX_SCORE = 20;

/**
 * Game startup function
 * 
 * Generates a world with moving cubes and initiate handlers/timer
 * 
 * After execution, wait until user has either deleted all cubes
 * or timer runs out
 */
function startup() {
  // Store level locations
  var extension = 'external/textures/levels/'
  levelColors = [extension + 'level_1_color.png',
                  extension + 'level_2_color.png',
                  extension + 'level_3_color.png'];
  levelHeights = [extension + 'level_1_height.png',
                  extension + 'level_2_height.png',
                  extension + 'level_3_height.png'];

  // Initiate handlers


  // Load world 
  loadGameGeometry();  // Loads level 1
  startTimer();
}


/**
 * Creates moving geometry in a location based on the current
 * level
 */
function loadGameGeometry() {
  var heightPath, colorPath;
  switch(currLevel) {
    case 1:
      heightPath = levelHeights[0]; colorPath = levelColors[0]
      generateWorld(heightPath, colorPath);
      loadClickableGeometry();
      break;
    case 2: 
      heightPath = levelHeights[1]; colorPath = levelColors[1]
      generateWorld(heightPath, colorPath);
      loadClickableGeometry();
      break;
    case 3:
      heightPath = levelHeights[2]; colorPath= levelColors[2]
      generateWorld(heightPath, colorPath);
      loadClickableGeometry();
      break;
  }
}

/**
 * Loads moving cubes depending on level
 */
function loadClickableGeometry() {
  var cube;
  switch(currLevel) {
    case 1:
      cube = new newTiltedCube(2, 3.0, 1.0, -6.0, 1.0); scene.addGameGeometry(cube);
      cube = new newTiltedCube(2, 12.0, 1.0, -4.0, 1.0); scene.addGameGeometry(cube);
      cube = new newTiltedCube(2, 7.0, 1.0, -13.0, 1.0); scene.addGameGeometry(cube);
      break;
    case 2:
      cube = new newTiltedCube(2, 7.0, 1.0, -9.0, 1.0); scene.addGameGeometry(cube);
      cube = new newTiltedCube(2, 8.0, 1.0, 0, 1.0); scene.addGameGeometry(cube);
      cube = new newTiltedCube(2, 0, 1.0, -10.0, 1.0); scene.addGameGeometry(cube);
      break;
    case 3:
      cube = new newTiltedCube(2, 1.0, 1.0, -2.0, 1.0); scene.addGameGeometry(cube);
      cube = new newTiltedCube(2, 12, 1.0, -9.0, 1.0); scene.addGameGeometry(cube);
      cube = new newTiltedCube(2, 14, 1.0, -15.0, 1.0); scene.addGameGeometry(cube);
      break;
  }
}

/** 
 * Checks whether the user has advanced to the next level
 */
function checkLevel() {
  if (clickableGeometry <= 0) {
    currLevel += 1;
    if (currLevel == 4) { // Player beat all 3 levels
      won();
      return;
    }
    clickableGeometry = 3;
    clearCanvas();
    alert('NEXT LEVEL INCOMING!!!');

    // Reset camera
    scene.camera.setInitialView();
    // Reset fog
    resetFog();
    // Load new level's geometry
    loadGameGeometry();
    // Reset timer for next level
    resetTimer();
  } else {
    return;
  }
}

/**
 * 
 * @param {number} geoNumber Numerical value of which geometry was deleted
 */
function deleteGameGeometry() {
  clickableGeometry -= 1;
  // Do a quick search for the geometry clicked and remove from 
  // next frame
  for (let i = 0; i < scene.gameGeometries.length; i++) {
    scene.gameGeometries.splice(i); // Remove from scene
  }
  alert('You destroyed a cube! You gain 1 point');
}

/**
 * If user deletes a cube, increment score
 * 
 * If user misses the moving cubes, decrement score
 * 
 * @param {array} hit Contains two booleans for checking whether user hit object or cube 
 */
function updateScore(hit) {
  var hitCube = hit[0];
  var hitObject = hit[1];
  if (hitCube) {
    score += 1;
  } else if (score > 0) {    
    score -= 1;
  }
  if (hitObject) {
    score += 2;
  } 
}

/**
 * Initializes level timer
 */
function startTimer() {
  timeoutHandle = setTimeout(checkTimer, 600000);
}

/**
 * Resets the timer for a new level
 */
function resetTimer(timeoutHandle) {
  alert('TIMER RESET');
  clearTimeout(timeoutHandle);
  startTimer();
}

/**
 * Check timer
 */
function checkTimer() { // Checked every frame in  tick.js
  alert("You have run out of time!")
  lost();
}

/**
 * User beat all levels and won the game
 * 
 * Display victory splash screen
 */
function won() {
  alert("Congratulations, you beat the game!")
  checkHighScore();
}

function checkHighScore() {
  if (score == MAX_POINTS) {
    alert("YOU GOT THE HIGHEST SCORE!");
  }
}

/**
 * User lost the game
 * 
 * Display losing splash screen
 */
function lost() {
  alert("You have lost the game");
}