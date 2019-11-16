/**
 * Specifies a geometric object.
 *
 * @author Matthew Rhea
 * @this {Geometry}
 */
class Geometry {
  /**
   * Constructor for Geometry.
   *
   * @constructor
   */
  constructor() {
    this.vertices = []; // Vertex objects. Each vertex has x-y-z.
    this.color = [];  // The color of your geometric object
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render() {
    var rgba = this.color;
    
    // sendUniformVec4ToGLSL(this.color, u_FragColor);
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], 1.0);
    sendAttributeBufferToGLSL(new Float32Array(this.vertices), 3, a_Position);
    tellGLSLToDrawCurrentBuffer(this.vertices.length/2);
  }

  /**
   * Responsible for updating the geometry's modelMatrix for animation.
   * Does nothing for non-animating geometry.
   */
  updateAnimation() {
    return;

    // NOTE: This is just in place so you'll be able to call updateAnimation()
    // on geometry that don't animate. No need to change anything.
  }
}
