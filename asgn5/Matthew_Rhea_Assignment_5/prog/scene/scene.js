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
    gl.clearColor(0.5, 0.5, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    /**
     * Camera-Scene Setup
     */
    this.camera = null;
    this.ViewMatrix = new Matrix4();
    this.ProjMatrix = new Matrix4();

    // Recommendations: Setting the canvas's clear color and clearing the canvas
    // here is a good idea.
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

    // Recommendations: It would be best to call this.render() at the end of
    // this call.
  }

  /**
   * Updates the animation for each geometry in geometries.
   */
  updateAnimation() {
    for (let i = 0; i < this.geometries.length; i++) {
      this.geometries[i].updateAnimation();
    }
    // Recomendations: No rendering should be done here. Your Geometry objects
    // in this.geometries should update their animations themselves through
    // their own .updateAnimation() methods.
  }

  /**
   * Renders all the Geometry within the scene.
   */
  render() {
    // Resize canvas to client browser dimensions
    // console.log(scene);
    // console.log(scene.camera);
    resize();
    gl.viewport(0, 0, canvas.width, canvas.height);
    // Clear buffer bit(s) and render geometries
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear screen to black
    for (let i = 0; i < this.geometries.length; i++) {
      this.geometries[i].render();
    }


    // Recommendations: No calls to any of your GLSL functions should be made
    // here. Your Geometry objects in this.geometries should render themselves
    // through their own .render() methods.
  }
}
