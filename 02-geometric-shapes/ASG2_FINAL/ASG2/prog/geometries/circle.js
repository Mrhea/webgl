/**
 * Specifies a Circle. A subclass of Geometry.
 *
 * @author Matthew Rhea
 * @this {Circle}
 */
class Circle extends Geometry {
  /**
   * Constructor for Circle.
   *
   * @constructor
   * @param {Number} radius The radius of the circle being constructed
   * @param {Integer} segments The number of segments composing the circle
   * @param {Number} centerX The central x-position of the circle
   * @param {Number} centerY The central y-position of the circle
   */
  constructor(radius, segments, centerX, centerY) {
    super();
    this.vertices = [centerX, centerY];
    this.vertices = this.vertices.concat(this.generateCircleVertices(
      radius/250, segments, centerX, centerY));

    // Recommendations: Remember that Circle is a subclass of Geometry.
    // "super" keyword can come in handy when minimizing code reuse.
  }

  /**
   * Generates the vertices of the Circle.
   *
   * @private
   * @param {Number} radius The radius of the circle being constructed
   * @param {Integer} segments The number of segments composing the circle
   * @param {Number} centerX The central x-position of the circle
   * @param {Number} centerY The central y-position of the circle
   */
  generateCircleVertices(radius, segments, centerX, centerY) {
    var circleVerts = [];

    for (let i = 0; i <= segments; i++) {
      let angle = 2*Math.PI * i/segments;
      circleVerts.push(centerX + radius * Math.cos(angle));
      circleVerts.push(centerY + radius * Math.sin(angle));
    }

    return circleVerts;

    // Recommendations: Might want to call this within your Circle constructor.
    // Keeps your code clean :)
  }
}
