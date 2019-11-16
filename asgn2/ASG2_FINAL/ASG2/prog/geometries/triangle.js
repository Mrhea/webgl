/**
 * Specifies a Triangle. A subclass of Geometry.
 *
 * @author Matthew Rhea
 * @this {Triangle}
 */
class Triangle extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Number} size The size of the triangle drawn
   * @param {Number} centerX The center x-position of the triangle
   * @param {Number} centerY The center y-position of the triangle
   */
  constructor(size, centerX, centerY) {
    super();
    this.vertices = this.generateTriangleVertices(size/250, centerX, centerY);
  }

  /**
   * Generates the vertices of the Triangle.
   *
   * @private
   * @param {Number} size The size of the triangle drawn
   * @param {Number} centerX The center x-position of the triangle
   * @param {Number} centerY The center y-position of the triangle
   */
  generateTriangleVertices(size, centerX, centerY) {
    var triangleVerts = [];

    for (let i = 0; i < 3; i++) {
      let angle = 2*Math.PI * (i-0.25)/3;
      triangleVerts.push(centerX + size * Math.cos(angle));
      triangleVerts.push(centerY + size * Math.sin(angle));
    }

    return triangleVerts;
  }
}
