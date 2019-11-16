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
    this.modelMatrix = new Matrix4(); // Model matrix applied to geometric object
    this.shader = null; // shading program you will be using to shade this geometry
    this.texture = null; // Texture to be applied to this geomertry
  }

  convertVec3ToFloat32() {
    let verts = [];
    let len = this.vertices.length;

    for (let i = 0; i < len; i++) {
      verts = verts.concat(this.vertices[i].convertVecToArr());
    }

    return new Float32Array(verts);
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render() {
    /**
     * Example render sequence:
     * 
     * this.shader = useShader();
     * sendUniformMatToGLSL()
     * sendUniformVec4ToGLSL
     * sendAttributeBufferToGLSL
     * Get pointcount
     * tell GLSL to draw 
     * 
     */
    var rgba = this.color;

    sendUniformVec4ToGLSL(rgba, 'u_FragColor');
    sendUniformMatToGLSL(this.modelMatrix.elements, 'u_ModelMatrix');
    sendAttributeBufferToGLSL(this.convertVec3ToFloat32(), 3, 'a_Position');
    tellGLSLToDrawCurrentBuffer(this.vertices.length);
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
