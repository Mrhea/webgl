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
    this.vertices = this.generateSquareVertices(size/250, centerX, centerY);

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
    var squareVerts = [];

    var v_1 = new Vertex();  var v_2 = new Vertex();  
    var v_3 = new Vertex();  var v_4 = new Vertex();

    // Calculate coordinates and map to gl.TRIANGLES in canvas (500 -> 1.0)
    var x_1 = (centerX - (1/2)*size);  var y_1 = (centerY + (1/2)*size);
    var x_2 = (centerX + (1/2)*size);  var y_2 = (centerY + (1/2)*size);
    var x_3 = (centerX - (1/2)*size);  var y_3 = (centerY - (1/2)*size);
    var x_4 = (centerX + (1/2)*size);  var y_4 = (centerY - (1/2)*size);

    squareVerts.push(x_1, y_1, x_2, y_2, x_4, y_4, x_3, y_3,);
    
    return squareVerts;

    // Recommendations: Might want to call this within your Square constructor.
    // Keeps your code clean :)
  }
}
