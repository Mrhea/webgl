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
    this.gameGeometries = [];
    // gl.clearColor(u_FogColor[0], u_FogColor[1], u_FogColor[2], 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    /**
     * Camera-Scene Setup
     */
    this.camera = null;
    this.light = null;
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

  addGameGeometry(geometry) {
    this.gameGeometries.push(geometry);
  }

  /**
   * Clears all the geometry within the scene.
   */
  clearGeometry() {
    this.geometries = [];
    this.gameGeometries = [];
    this.render()

    // Recommendations: It would be best to call this.render() at the end of
    // this call.
  }

  /**
   * Updates the animation for each geometry in geometries.
   */
  updateAnimation() {
    this.light.updateAnimation();
    for (let i = 0; i < this.geometries.length; i++) {
      this.geometries[i].updateAnimation();
    }
    for (let i = 0; i < this.gameGeometries.length; i++) {
      this.gameGeometries[i].updateAnimation();
    }
  }

  /**
   * Renders all the Geometry within the scene.
   */
  render() {
    // Resize canvas to client browser dimensions
    resize();
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Update light render
    this.light.updateLight();

    // Update fog values
    sendFogToGLSL();

    // Clear buffer bit(s) and render geometries
    // Dynamically changes alpha blending depending on distance to geometry
    if (fogDist[0] > 300) {
      gl.clearColor(fogColor[0], fogColor[1], fogColor[2], 0.6);
    } else if (fogDist[0] > 100 && fogDist[0] > 200) {
      gl.clearColor(fogColor[0], fogColor[1], fogColor[2], 0.8);
    } else if (fogDist[0] < 100) {
      gl.clearColor(fogColor[0], fogColor[1], fogColor[2], 1.0);
    }
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 

    for (let i = 0; i < this.geometries.length; i++) {
      this.geometries[i].render();
    }
    for (let i = 0; i < this.gameGeometries.length; i++) {
      this.gameGeometries[i].render();
    }

    // Recommendations: No calls to any of your GLSL functions should be made
    // here. Your Geometry objects in this.geometries should render themselves
    // through their own .render() methods.
  }
}
