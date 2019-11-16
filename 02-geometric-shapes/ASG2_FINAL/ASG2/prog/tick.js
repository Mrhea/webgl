/**
 * Responsible for animating the Scene.
 */
function tick() {
  // If time permits: Implement frame counter and time how long to render shape
  scene.updateAnimation();
  scene.render();
  requestAnimationFrame(tick);
}
