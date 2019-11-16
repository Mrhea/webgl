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
    this.generateCircleVertices(radius/250, segments);
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
  generateCircleVertices(radius, segments) {
    // var circleVertices = [];
    var increment = 360/segments;
    var angle = 0.0;

    var centerVert = new Vertex();
    var circleVert = new Vertex();

    centerVert.points = new Vector3([0.0, 0.0, 0.0, 1.0]);

    while (angle <= 360.0) {
      this.vertices.push(centerVert);

      circleVert = new Vertex();
      circleVert.points = new Vector3([radius*Math.cos(angle*Math.PI/180.0),
        radius*Math.sin(angle*Math.PI/180.0), 0,0, 1.0]);

      this.vertices.push(circleVert);

      angle += increment;

      circleVert = new Vertex();
      circleVert.points = new Vector3([radius*Math.cos(angle*Math.PI/180.0),
        radius*Math.sin(angle*Math.PI/180.0), 0.0, 1.0]);

      this.vertices.push(circleVert);
    }

    

    // for (let i = 0; i <= segments; i++) {
    //   // let angle = 2*Math.PI * i/segments;
    //   let circleVertOBJs = new Vertex();
      
    //   circleVertOBJs.points.push(centerX + radius * Math.cos(angle));
    //   circleVertOBJs.points.push(centerY + radius * Math.sin(angle));
    //   circleVertOBJs.points.push(0.0);
    //   circleVertices.push(circleVertOBJs);
    // }
  }
}
