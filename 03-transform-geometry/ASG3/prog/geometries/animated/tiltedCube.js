/**
 * Specifies a tilted cube which rotates.
 *
 * @author Matthew Rhea
 * @this {TiltedCube}
 */
class TiltedCube extends Geometry {
  /**
   * Constructor for TiltedCube.
   *
   * @constructor
   * @returns {TiltedCube} Geometric object created
   */
  constructor(size, centerX, centerY) {
    super();

    // Set up vertices
    this.generateCubeVertices(size);

    this.centerX = centerX;
    this.centerY = centerY;


    this.changeAngle = 20.0;
    this.angle = 0;
    this.g_last = Date.now();
    this.angleStep = 135.0;

    this.scale = new Matrix4();
    this.scale.setScale(size/250, size/250, size/250);

    this.originMatrix = new Matrix4();
    this.originMatrix.setTranslate(centerX, centerY, 0);

    this.changeMatrix = new Matrix4();
    this.changeMatrix.setRotate(this.changeAngle, 0, 0, 1);

    this.rotateMatrix = new Matrix4();
    this.modelMatrix = this.originMatrix.multiply(this.scale.multiply(this.changeMatrix));

    // Recommendations: Might want to tilt your cube at 30 degrees relative to
    // the z-axis here. Pretty good tilt that lets us see that it's a cube.
  }

  /**
   * Generates the vertices of TiltedCube. Just a regular cube.
   *
   * @private
   * @param {Number} size The size of the tilted cube.
   */
  generateCubeVertices(size) {
    let cubeVert = new Vertex();
    let cubeVectorList = [];
  
    let frontTopLeft  = new Vector3([-1.0, 1.0, 1.0]);
    let frontTopRight = new Vector3([1.0, 1.0, 1.0]);
    let frontBotRight = new Vector3([1.0, -1.0, 1.0]);
    let frontBotLeft  = new Vector3([-1.0, -1.0, 1.0]);
    
    let backTopLeft   = new Vector3([-1.0, 1.0, -1.0]);
    let backTopRight  = new Vector3([1.0, 1.0, -1.0]);
    let backBotRight  = new Vector3([1.0, -1.0, -1.0]);
    let backBotLeft   = new Vector3([-1.0, -1.0, -1.0]);
  
    cubeVectorList.push(frontTopLeft, frontTopRight, frontBotLeft, frontTopRight,
      frontBotRight, frontBotLeft, backTopLeft, backTopRight, frontTopLeft,
      backTopRight, frontTopRight, frontTopLeft, backTopLeft, backTopRight,
      backBotLeft, backTopRight, backBotRight, backBotLeft,
      backBotLeft, backBotRight, frontBotLeft, backBotRight, frontBotRight,
      frontBotLeft, frontTopRight, backTopRight, frontBotRight, backTopRight,
      backBotRight, frontBotRight, backTopLeft, frontTopLeft, backBotLeft,
      frontTopLeft, frontBotLeft, backBotLeft);
  
    for (let i = 0; i < cubeVectorList.length; i++) {
      cubeVert = new Vertex();
      cubeVert.points = cubeVectorList[i];
      this.vertices.push(cubeVert);
    }
        
    // Recommendations: Might want to generate your cube vertices so that their
    // x-y-z values are combinations of 1.0 and -1.0. Allows you to scale the
    // the cube to your liking better in the future.
  }

  /**
   * Updates the animation of the TiltedCube. Should make it rotate.
   */
  updateAnimation() {
    this.now = Date.now();
    this.elapsed = this.now - this.g_last;
    this.g_last = this.now;


    this.changeAngle = this.angle + (30 * this.elapsed) / 1000.0;
    this.changeAngle %= 360;
    this.angle = this.changeAngle;

    this.rotateMatrix.setRotate(this.angle, 0, 1, 0);
    this.originMatrix.setTranslate(this.centerX, this.centerY, 0);
    this.changeMatrix.setRotate(this.changeAngle, 0, 0, 1);

    this.modelMatrix = this.originMatrix.multiply(this.rotateMatrix.multiply(this.changeMatrix.multiply(this.scale)));

    // Recommendations: While your cube will only need to be at the origin, I'd
    // recommend coding it so it spins in place when placed anywhere on your
    // canvas. Why? Because you might need to have more than one spinning cube
    // in different positions on a future assignment ;)
    //
    // Keep in mind that no rendering should be done here. updateAnimation()'s
    // purpose is to update the geometry's modelMatrix and any other variables
    // related to animation. It should be the case that after I call
    // updateAnimation() I should be able to call render() elsewhere and have my
    // geometry complete a frame of animation.
  }
}
