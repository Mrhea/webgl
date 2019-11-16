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
    this.bound = (1 - ((this.radius)/100));

    // console.log('position: ' + this.centerX + ' ' + this.centerY);

    // Translate to mouse position
    this.modelMatrix.setTranslate(this.centerX, this.centerY, 0);

    this.change = 0.25;
    this.g_last = Date.now();

    this.randAngle = Math.random() * 360;
    this.randDirection = [Math.sin(this.randAngle),
                            Math.cos(this.randAngle)];
  }

  /**
   * Updates random circle's animation. Changes modelMatrix into a translation
   * matrix translating into a random direction.
   * 
   * This isn't working perfectly. Larger sized circles do not move as much
   * and mostly stay "shaking" in the center of the canvas. Good enough for now
   * though. 
   */
  updateAnimation() {
    var now = Date.now();
    var elapsed = now - this.g_last;
    this.g_last = now;

    var deltaY = this.randDirection[1]*this.change*elapsed/500.0;
    var deltaX = this.randDirection[0]*this.change*elapsed/500.0;

    this.centerX += deltaX;
    this.centerY += deltaY;

    // Check bounds and change direction
    if (this.centerX > this.bound) {
      this.centerX = this.bound;
      this.randAngle = Math.random()*180+90;
      this.randDirection = [Math.sin(this.randAngle), Math.cos(this.randAngle)];
    }
    if (this.centerX < (-1*this.bound)) {
      this.centerX = (-1*this.bound);
      this.randAngle = Math.random()*180+270;
      this.randDirection = [Math.sin(this.randAngle), Math.cos(this.randAngle)];
    }
    if (this.centerY > this.bound) {
      this.centerY = this.bound;
      this.randAngle = Math.random()*180;
      this.randDirection = [Math.sin(this.randAngle), Math.cos(this.randAngle)];
    }
    if (this.centerY < (-1*this.bound)) {
      this.centerY = (-1*this.bound);
      this.randAngle = Math.random()*180+180;
      this.randDirection = [Math.sin(this.randAngle), Math.cos(this.randAngle)];
    }

    // Update modelMatrix
    this.modelMatrix.setTranslate(this.centerX, this.centerY, 0.0);  
  }
}
