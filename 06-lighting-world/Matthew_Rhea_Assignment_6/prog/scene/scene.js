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

    /*
     * Light variables for rendered scene 
     */
    this.lightRotateMatrix = new Matrix4();
    this.NormalMatrix = new Matrix4();
    this.lightColor = new Vector3();
    this.lightMatrix = new Matrix4();

    this.lightPosition = new Vector3();
    this.lightPosition.elements = [0, 1, 0];

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
    resize();
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Calculate Normal Matrix for this frame
    this.NormalMatrix.setInverseOf(scene.ViewMatrix);
    this.NormalMatrix.transpose();
    sendUniformMatToGLSL(this.NormalMatrix.elements, 'u_NormalMatrix');

    // Calculate rotating light, send to GLSL
    this.lightRotateMatrix.setRotate(5,1,0,0);
    this.lightDirection = this.lightRotateMatrix.multiplyVector3(this.lightPosition);
    sendUniformVec4ToGLSL(this.lightPosition.elements, 'u_LightPosition');

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
