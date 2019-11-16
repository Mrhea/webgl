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

    // Use default shader initially
    this.shader = colorShader // shading program you will be using to shade this geometry
    this.texture = null; // Texture to be applied to this geomertry
  }

  convertVec3ToFloat32() {
    let verts = [];
    let len = this.vertices.length;

    for (let i = 0; i < len; i++) {
      verts = verts.concat(this.vertices[i].convertPointVecToArr());
    }

    return new Float32Array(verts);
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render() {
    var rgba = getColorVertices(this);
    // console.log(this.modelMatrix);
    useShader(gl, this.shader);
    sendAttributeBufferToGLSL(rgba, 4, 'a_Color', 1);
    sendUniformMatToGLSL(this.modelMatrix.elements, 'u_ModelMatrix');
    sendAttributeBufferToGLSL(this.convertVec3ToFloat32(), 3, 'a_Position', 2);
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

  /**
   * Changes shader type before rendering based on which type of
   * geometry is next ot be rendered
   */
  // determineShader() {
  //   switch(shaderMode) {  // Global from main.js
  //     // case 'Solid':
  //     //   return useShader(gl, solidShader);
  //     case 'Default':
  //       return useShader(gl, colorShader);
  //     case 'Texture':
  //       return useShader(gl, textureShader);
  //   }
  // }

  determineColor() {
    // console.log('COLOR MODE: ' + mode);
    if (mode == 'Rainbow') {
      for (let i = 0; i < this.vertices.length; i++) {
        this.vertices[i].color = [Math.random(), Math.random(), Math.random(), 1.0];
      }
    } else if (mode == 'Color') {
      for (let i = 0; i < this.vertices.length; i++) {
        this.vertices[i].color = setGeometryColor();
        // console.log('VERTEX COLOR: ' + this.vertices[i].color);
      }
    }
  }

  unpackUVCoordinates() {
    let uv = new Float32Array(this.vertices.length*2);
    let vert;
    for (let i = 0; i < uv.length; i+=2) {
      vert = this.vertices[i/2];
      for (let j = 0; j < 2; j++) {
        uv[i+j] = vert.uv[j];
      }
    }
    return uv;
  }
}
