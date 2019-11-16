/**
 * Specifies a circle which moves randomly.
 *
 * @author Matthew Rhea
 * @this {RandomCircle}
 */
class RandomCircle extends Circle {
  /**
   * Constructor for RandomCircle.
   *
   * @constructor
   * @param {Number} radius The radius of the random circle being constructed
   * @param {Integer} segements The number of segments composing the circle
   * @param {Number} centerX The x-position of the circle being constructed
   * @param {Number} centerY The y-position of the circle being constructed
   * @returns {RandomCircle} RandomCircle object created
   */
  constructor(radius, segments, centerX, centerY) {
    super(radius, segments, centerX, centerY);
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius; 

    // Bound
    this.bound = 1 - this.radius;

    this.modelMatrix.setTranslate(this.centerX, this.centerY, 0);

    this.change = 0.25
    this.g_last = Date.now();

    this.randAngle = Math.random() * 360;
    this.randDirection = [Math.sin(this.randAngle),
                            Math.cos(this.randAngle)];
    console.log('vec: ' + this.randDirection);
  }

  /**
   * Updates random circle's animation. Changes modelMatrix into a translation
   * matrix translating into a random direction.
   */
  updateAnimation() {
    var now = Date.now();
    var elapsed = now - this.g_last;
    this.g_last = now;

    var Y = this.randDirection[1]*this.change*elapsed/1000.0;
    var X = this.randDirection[0]*this.change*elapsed/1000.0;

    this.centerX += X;
    this.centerY += Y;

    // Check bounds and change direction if on boundary of canvas
    if (this.centerX > this.bound) {
      this.centerX = this.bound;
      let angle = Math.random()*180+90;
      this.randDirection = [Math.sin(angle), Math.cos(angle)];
    }
    if (this.centerX < (-1*this.bound)) {
      this.centerX = (-1*this.bound);
      let angle = Math.random()*180+270;
      this.randDirection = [Math.sin(angle), Math.cos(angle)];
    }
    if (this.centerY > this.bound) {
      this.centerY = this.bound;
      let angle = Math.random()*180;
      this.randDirection = [Math.sin(angle), Math.cos(angle)];
    }
    if (this.centerY < (-1*this.bound)) {
      this.centerY = (-1*this.bound);
      let angle = Math.random()*180+180;
      this.randDirection = [Math.sin(angle), Math.cos(angle)];
    }

    // Update modelMatrix
    this.modelMatrix.setTranslate(this.centerX, this.centerY, 0.0);  
  }
}
