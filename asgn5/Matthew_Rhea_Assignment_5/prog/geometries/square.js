/**
 * Specifies a Square. A subclass of Geometry.
 *
 * @author Matthew Rhea
 * @this {Square}
 */
class Square extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   */
  constructor(size, centerX, centerY) {
    super();
    this.generateSquareVertices(size/250, centerX, centerY);
    this.determineColor();

    // Recommendations: Remember that Square is a subclass of Geometry.
    // "super" keyword can come in handy when minimizing code reuse.
  }

  /**
   * Generates the vertices of the square.
   *
   * @private
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   */
  generateSquareVertices(size, centerX, centerY) {
    let squareVert = new Vertex();
    squareVert.points = new Vector3([-1, 1, 0, 1]);
    this.vertices.push(squareVert);
	
    squareVert = new Vertex();
    squareVert.points = new Vector3([1,  1, 0, 1]);
    this.vertices.push(squareVert);
    
    squareVert = new Vertex();
    squareVert.points = new Vector3([-1, -1, 0, 1]);
    this.vertices.push(squareVert);
    
    squareVert = new Vertex();
    squareVert.points = new Vector3([1,  1, 0, 1]);
    this.vertices.push(squareVert);
    
    squareVert = new Vertex();
    squareVert.points = new Vector3([1, -1, 0, 1]);
    this.vertices.push(squareVert);
      
    squareVert = new Vertex();
    squareVert.points = new Vector3([-1, -1, 0, 1]);
    this.vertices.push(squareVert);
  }
}
