/**
 * Specifies a WebGL scene.
 *
 * @author Matthew Rhea
 * @this {Scene}
 */
class Scene {
  /**
   * Constructor for Scene.
   *
   * @constructor
   */
  constructor() {
    this.geometries = []; // Geometries being drawn on canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
  }

  /**
   * Adds the given geometry to the the scene.
   *
   * @param {Geometry} geometry Geometry being added to scene
   */
  addGeometry(geometry) {
    this.geometries.push(geometry);
  }

  /**
   * Clears all the geometry within the scene.
   */
  clearGeometry() {
    this.geometries = [];
    this.render()

  }

  /**
   * Updates the animation for each geometry in geometries.
   */
  updateAnimation() {
    for (let i = 0; i < this.geometries.length; i++) {
      this.geometries[i].updateAnimation();
    }
  }

  /**
   * Renders all the Geometry within the scene.
   */
  render() {
    gl.clear(gl.COLOR_BUFFER_BIT); // Clear screen to black
    for (let i = 0; i < this.geometries.length; i++) {
      this.geometries[i].render();
    }
  }
}
