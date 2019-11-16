class Light {
  /**
  * Constructor for Geometry.
  *
  * @constructor
  */
  constructor() {
    this.lightColor = [1.0, 1.0, 1.0]; // White light color
    this.lightPosition = [8.0, 8.0, 0.0];
    this.lightDirection = [0.0, 1.0, 8.0];
    this.ambientLight = [0.2, 0.2, 0.2];

    this.lightRotationVec = new Vector3();
    this.rotateMatrix = new Matrix4();

  }

  updateLight() {
    sendUniformVec4ToGLSL(this.lightColor, 'u_LightColor');
    sendUniformVec4ToGLSL(this.ambientLight, 'u_AmbientLight');
    sendUniformVec4ToGLSL(this.lightPosition, 'u_LightPosition');
  }

  updateAnimation() {
    this.rotateMatrix.setRotate(15,1,0,0);
    this.lightRotationVec = this.rotateMatrix.multiplyVector3(this.lightRotationVec);
    sendUniformVec4ToGLSL(this.lightRotationVec.elements, 'u_LightPosition')
    return;
  }
}