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

    // var triangleVerts = [];
    // var z_coor = 0.0;
    // var vert_1 = new Vertex();
    // var vert_2 = new Vertex();
    // var vert_3 = new Vertex();

    // vert_1.points = [centerX, centerY - size/2, z_coor];
    // vert_2.points = [centerX - size/2, centerY - size/2, z_coor];
    // vert_3.points = [centerX + size/2, centerY - size/2, z_coor];

    // triangleVerts.push(vert_2, vert_1, vert_3);
    
    // return triangleVerts;
  }
}
