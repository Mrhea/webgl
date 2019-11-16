/**
 * Event handlers and functions to visualize and manage HUD
 * 
 * @author Matthew Rhea
 * 
 * TODO: Make HUD dependent on HUD.height and HUD.width so it matches
 * any screen program is ran on
 */

/**
 * Initialize HUD event handlers
 */
function initHUDHandlers() {

}

function draw2DHUD() {
  ctx.clearRect(0, 0, HUD.width, HUD.height)
  drawDefault();
  drawMap();

}

function drawDefault() {
  ctx.beginPath();
  ctx.moveTo(120,10); ctx.lineTo(200,150); ctx.lineTo(40, 150);
  ctx.closePath();
  ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
  ctx.stroke();
  ctx.shadowBlur = 20;
  ctx.shadowColor = "yellow";

  // Draw white letters
  ctx.font = '18px "Times New Roman"';
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.fillText('HUD: Head Up Display', 40, 180);
}

/**
 * Draws a map in top right corner of scene
 * 
 * Update player icon (yellow dot) when moving
 */
function drawMap() {
  ctx.beginPath();
  // Move to right corner of scene
  // ctx.moveTo(HUD.width - (HUD.width - 150), HUD.height + (HUD.height - 25));
  ctx.moveTo(1500, 10);
  ctx.lineTo(1300, 10); ctx.lineTo(1300, 150); ctx.lineTo(1500, 150);
  // Draw square map
  // ctx.lineTo(HUD.width - (HUD.width - 150), HUD.height + (HUD.height - 100));
  // ctx.lineTo(HUD.width - (HUD.width - 100), HUD.height + (HUD.height - 50))
  ctx.closePath();
  ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
  ctx.stroke();
  ctx.shadowBlur = 20;
  ctx.shadowColor = "yellow";

}

/**
 * Updates player position on map
 */
function updateMap() {

}

/**
 * Draws menu bar with various elements
 */
function drawMenuBar() {

}

/**
 * Draws character portrait in bottom right of scene
 */
function drawCharacterPortrait() {
  ctx.beginPath();
  // Move to left bottom corner of scene
  ctx.moveTo()
}

/**
 * Imports a HUD image
 */
function importPortrait() {

}
