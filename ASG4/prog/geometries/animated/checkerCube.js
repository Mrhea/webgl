/**
 * A tilted cube that has a checkerboard texture applied to it. A subclass of
 * TiltedCube.
 *
 * @author Matthew Rhea 
 * @this {CheckerCube}
 */
class CheckerCube extends TiltedCube {
  /**
   * Constructor for CheckerCube
   *
   * @constructor
   * @returns {CheckerCube}
   */
  constructor(size, centerX, centerY) {
    setCubeColor == false; 
    super(size, centerX, centerY);

    this.shader = textureShader;
    // mode = 'Texture';

    this.generateUVCoordinates();

    var texturePath = 'external/textures/checkerboard.png';
    create2DTexture(this, texturePath, 
                    gl.LINEAR, gl.LINEAR, gl.REPEAT, gl.REPEAT, null);
            // Recomendations: Might want to call generateUVCoordinates here.
  }

  /**
   * Generates the texture coordinates of CheckerCube.
   *
   * @private
   */
  generateUVCoordinates() {
    for (let i = 0; i < 36; i += 6) {
      this.vertices[i].uv = [0.0, 1.0];
      this.vertices[i+1].uv = [1.0, 1.0];
      this.vertices[i+2].uv = [0.0, 0.0];
      this.vertices[i+3].uv = [1.0, 1.0];
      this.vertices[i+4].uv = [1.0, 0.0];
      this.vertices[i+5].uv = [0.0, 0.0];
    }

    // Recomendations: Remember uv coordinates are defined from 0.0 to 1.0.
  }

  /**
   * Renders CheckerCube.
   */
  render() {
    useShader(gl, this.shader);
    var verts = this.convertVec3ToFloat32();
    sendAttributeBufferToGLSL(verts, 3, 'a_Position');
    var uvCoordinates = this.unpackUVCoordinates();
    sendAttributeBufferToGLSL(uvCoordinates, 2, 'a_TexCoord');
    send2DTextureToGLSL(this.texture, 0, 'u_Sampler');
    sendUniformMatToGLSL(this.modelMatrix.elements, 'u_ModelMatrix');
    tellGLSLToDrawCurrentBuffer(verts.length/3);

    // Recomendations: This will be the first time render will need to be
    // overloaded. Why? Because this is a textured geometry, not a geometry
    // which relies on a color value.
  }
}
