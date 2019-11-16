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
  



    // var squareVerts = [];
    // var z_coor = 0.0;     // Set to 0.0 for 2D rendering

    // var v_1 = new Vertex();  var v_2 = new Vertex();  
    // var v_3 = new Vertex();  var v_4 = new Vertex();
    // var v_5 = new Vertex();  var v_6 = new Vertex();

    // // Calculate coordinates and map to gl.TRIANGLES in canvas (500 -> 1.0)
    // var x_1 = (centerX - (1/2)*size);  var y_1 = (centerY + (1/2)*size);
    // var x_2 = (centerX + (1/2)*size);  var y_2 = (centerY + (1/2)*size);
    // var x_3 = (centerX - (1/2)*size);  var y_3 = (centerY - (1/2)*size);
    // var x_4 = (centerX + (1/2)*size);  var y_4 = (centerY - (1/2)*size);
    
    // v_1.points.push(x_1, y_1, z_coor);   v_2.points.push(x_2, y_2, z_coor);
    // v_3.points.push(x_3, y_3, z_coor);   v_4.points.push(x_4, y_4, z_coor);

    // var newItems = [v_1, v_3, v_4, v_1, v_3, v_2];
    
    // squareVerts.push(...newItems);

    // return squareVerts;

  }
}
