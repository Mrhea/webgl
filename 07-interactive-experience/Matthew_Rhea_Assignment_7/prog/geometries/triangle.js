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
    this.generateTriangleVertices(size/250, centerX, centerY);
    this.determineColor();
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
    let triVert = new Vertex();
    triVert.points = new Vector3([size * Math.cos(Math.PI / 2), 
      size * Math.sin(Math.PI / 2), 0.0, 1.0]);
    this.vertices.push(triVert);
    
    triVert = new Vertex();
    triVert.points = new Vector3([size * Math.cos(Math.PI / -6),
      size * Math.sin(Math.PI / -6), 0.0, 1.0]);
    this.vertices.push(triVert);
    
    triVert = new Vertex();
    triVert.points  = new Vector3([size * Math.cos(5 * Math.PI / -6),
      size * Math.sin(5 * Math.PI / -6), 0.0, 1.0]);
    this.vertices.push(triVert);
  }
}
