/**
 * Specifies the camera object
 * 
 * @author Matthew Rhea
 * @this {Camera}
 */

class Camera {
  /**
   * Constructor for camera
   * 
   * @constructor
   */
  constructor() {
    // Initial camera position and setup
    this.Eye = new Vector3([11.0, 1.0, 30.0]);
    this.Center = new Vector3([11.0, 1.0, -1.0]);
    this.Up = new Vector3([0.0, 1.0, 0.0]); 
    this.Side = new Vector3([1.0, 0.0, 0.0]);

    // Default Near and Far values
    this.Near = 1;
    this.Far = 10000;

    // Default field of view
    this.FoV = 30;

    // Aspect Ratio
    this.Aspect = canvas.width/canvas.height;
    // console.log('ASPECT: ' + this.aspect);

    // Boolean for changing between ortho and perspective views
    this.ortho = false;

    // Set initial client view
    this.setInitialView();

    // Update camera positioning and perspective
    this.toCameraUpdateAndShaders();
    this.updateProjection();
  }

  /**
   * Updates the camera position 
   */
  updateCamera() {
    var updatedCenter = addVectors(this.Center, this.Up); // Updated view direction 

    scene.ViewMatrix.setLookAt(
      this.Eye.elements[0], this.Eye.elements[1], this.Eye.elements[2],
      updatedCenter.elements[0], updatedCenter.elements[1], updatedCenter.elements[2],
      this.Up.elements[0], this.Up.elements[1], this.Up.elements[2]);
  }

  /**
   * Updates shaders
   */
  updateShaders() {
    // console.log('u_ViewMatrix: ' + scene.ViewMatrix.elements);
    // console.log("In camera class update shaders");
    sendUniformMatToGLSL(scene.ViewMatrix.elements, 'u_ViewMatrix');
    sendUniformMatToGLSL(scene.ProjMatrix.elements, 'u_ProjMatrix');
  }

  toCameraUpdateAndShaders() {
    this.updateCamera();
    this.updateShaders();
    // console.log(this);
  }

  /**
   * Sets orthogonal or perspective views
   */
  updateProjection() {
    // console.log('in update proj');
    // console.log(this.ortho);
    if(this.ortho) {
      // console.log('setting orthogonal view');
      scene.ProjMatrix.setOrtho(-10.0, 10.0, -10.0, 10.0, this.Near, this.Far);
      sendUniformMatToGLSL(scene.ProjMatrix.elements, 'u_ProjMatrix');
    } else {
      // console.log('In setperspective');
      scene.ProjMatrix.setPerspective(this.FoV, this.Aspect, this.Near, this.Far);
      sendUniformMatToGLSL(scene.ProjMatrix.elements, 'u_ProjMatrix');
    }
    // console.log(scene);
    // this.toCameraUpdateAndShaders();
  }

  /**
   * Initialize starting client view 
   */
  setInitialView() {
    // console.log('IN SET INITIAL CAMERA VIEW');
    var angle = 60; 
    var rotateMatrix = new Matrix4().setRotate(angle, 0, 1, 0);
    this.Center = rotateMatrix.multiplyVector3(this.Center);
    this.Side = crossProduct(this.Center, this.Up);
    this.Side = normalize(this.Side);

    scene.ViewMatrix.setLookAt(this.Eye[0], this.Eye[1], this.Eye[2],
      this.Center[0], this.Center[1], this.Center[2],
      this.Up[0], this.Up[1], this.Up[0]);

    scene.ProjMatrix.setPerspective(this.FoV, this.Aspect, this.Near, this.Far);
    return; 
  }
}
