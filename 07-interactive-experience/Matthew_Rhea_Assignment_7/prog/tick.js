/**
 * Responsible for animating the Scene.
 */
function tick() {
  scene.updateAnimation();
  scene.render();
  checkLevel(); // If all geometry on screen is deleted, continue to next level
  requestAnimationFrame(tick);
}
