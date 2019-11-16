/**
 * Specifies a triangle which fluctuates in size (grows and shrinks).
 *
 * @author Matthew Rhea
 * @this {FluctuatingTriangle}
 */
class FluctuatingTriangle extends Triangle {
  /**
   * Constructor for FluctuatingTriangle.
   *
   * @constructor
   * @param {Number} size The size of the triangle drawn
   * @param {Number} centerX The center x-position of the triangle
   * @param {Number} centerY The center y-position of the triangle
   */
  constructor(size, centerX, centerY) {
    super(size, centerX, centerY);

    this.scaleMatrix = new Matrix4();
    this.revertMatrix = new Matrix4();
    this.scale = 1.0;
    this.changeScale = 1.0;
    this.g_last = Date.now();
    this.centerX = centerX;
    this.centerY = centerY;
    }

  /**
   * Updates the animation for FluctuatingTriangle. Grows and shrinks the
   * triangle in size.
   */
  updateAnimation() {
    var cur = Date.now();
    var elapsed = cur - this.g_last;
    this.g_last = cur;

    var new_scale = this.scale + (this.changeScale*elapsed)/500.0;

    if (new_scale < 0.5) {
      this.scale = 0.5 + (0.5 - new_scale);
      this.changeScale *= -1;
    } else if (new_scale > 1.5) {
      this.scale = 1.5 - (new_scale - 1.5);
      this.changeScale *= -1;
    } else {
      this.scale = new_scale;
    }

    this.scaleMatrix.setScale(this.scale, this.scale, 1.0);
    this.revertMatrix.setTranslate(this.centerX, this.centerY, -1,0);
    this.modelMatrix = this.revertMatrix.multiply(this.scaleMatrix);
  }
}

