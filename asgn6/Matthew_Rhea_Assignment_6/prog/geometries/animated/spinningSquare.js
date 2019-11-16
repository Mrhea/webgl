/**
 * Specifies a square which spins realtive to its center.
 *
 * @author Matthew Rhea
 * @this {SpinningSquare}
 */
class SpinningSquare extends Square {
  /**
   * Constructor for SpinningSquare.
   *
   * @constructor
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   * @returns {SpinningSquare} SpinningSquare object created
   */
  constructor(size, centerX, centerY) {
    super(size, centerX, centerY);  

    this.centerX = centerX;
    this.centerY = centerY;

    this.modelMatrix.setTranslate(this.centerX, this.centerY, 0);

    // Setup angle for spin rate of square
    this.changeAngle = 180.0;
    this.angle = 0.0;
    this.g_last = Date.now();

    // // setup matrices
    this.rotateMatrix = new Matrix4();
    this.revertMatrix = new Matrix4();
    this.scale = new Matrix4();

    this.scale.setScale(size/250, size/250, 1);

  }

  /**
   * Updates the animation for spinning square. Rotates the square by spinAngle
   * relative to its center.
   */
  updateAnimation() {
    this.revertMatrix.setTranslate(this.centerX, this.centerY, 0);
    this.modelMatrix = this.revertMatrix.multiply(this.scale);
    this.modelMatrix.rotate(5,0,0,1);
    this.current = Date.now();
    this.elapsed = this.current - this.g_last;
    this.g_last = this.current;

    this.angle = (this.angle + (this.changeAngle * this.elapsed) / 2000.0);
    this.angle %= 360;

    this.revertMatrix.setTranslate(this.centerX, this.centerY, 0.0);
    this.rotateMatrix.setRotate(this.angle, 0, 0, 1);

    this.modelMatrix = this.revertMatrix.multiply(this.rotateMatrix.multiply(this.scale));
  }

}
