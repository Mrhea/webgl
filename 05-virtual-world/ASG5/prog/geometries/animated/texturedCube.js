/**
 * A cube with a single textured applied in multiple different ways. A subclass
 * of TiltedCube.
 *
 * @author Matthew Rhea
 * @this {MultiTextureCube}
 */
class MultiTextureCube extends TiltedCube {
  /**
   * Constructor for MultiTextureCube
   *
   * @constructor
   * @param {String} texturePath The filepath/URL of the image used as a texture
   */
  constructor(texturePath, size, centerX, centerY) {
    setCubeColor == false; 
    super(size, centerX, centerY);
    this.generateUVCoordinates();
    this.texturePath = texturePath;
    
    this.shader = textureShader;
    // mode = 'Texture';

    // var texturePath = 'external/textures/flcl.jpg';
    create2DTexture(this, this.texturePath,
      gl.LINEAR, gl.LINEAR, gl.REPEAT, gl.REPEAT, null);
    // Recomendations: Might want to call generateUVCoordinates here.
  }

  /**
   * Generates the texture coordinates of CheckerCube.
   *
   * @private
   */
  generateUVCoordinates() {
    // Whole Texture
    this.vertices[0].uv = [0.0, 1.0];
    this.vertices[1].uv = [1.0, 1.0];
    this.vertices[2].uv = [0.0, 0.0];
    this.vertices[3].uv = [1.0, 1.0];
    this.vertices[4].uv = [1.0, 0.0];
    this.vertices[5].uv = [0.0, 0.0];

    // Top Half of Texture
    this.vertices[6].uv = [0.0, 1.0];
    this.vertices[7].uv = [1.0, 1.0];
    this.vertices[8].uv = [0.0, 0.5];
    this.vertices[9].uv = [1.0, 1.0];
    this.vertices[10].uv = [1.0, 0.5];
    this.vertices[11].uv = [0.0, 0.5];

    // Bottom Half of Texture
    this.vertices[12].uv = [0.0, 0.5];
    this.vertices[13].uv = [1.0, 0.5];
    this.vertices[14].uv = [0.0, 0.0];
    this.vertices[15].uv = [1.0, 0.5];
    this.vertices[16].uv = [1.0, 0.0];
    this.vertices[17].uv = [0.0, 0.0];

    // Texture Twice
    this.vertices[18].uv = [0.0, 1.0];
    this.vertices[19].uv = [2.0, 1.0];
    this.vertices[20].uv = [0.0, 0.0];
    this.vertices[21].uv = [2.0, 1.0];
    this.vertices[22].uv = [2.0, 0.0];
    this.vertices[23].uv = [0.0, 0.0];

    // 3x3 Grid of Texture
    this.vertices[24].uv = [0.0, 3.0];
    this.vertices[25].uv = [3.0, 3.0];
    this.vertices[26].uv = [0.0, 0.0];
    this.vertices[27].uv = [3.0, 3.0];
    this.vertices[28].uv = [3.0, 0.0];
    this.vertices[29].uv = [0.0, 0.0];

    // Another bottom half of texture
    this.vertices[30].uv = [0.0, 0.5];
    this.vertices[31].uv = [1.0, 0.5];
    this.vertices[32].uv = [0.0, 0.0];
    this.vertices[33].uv = [1.0, 0.5];
    this.vertices[34].uv = [1.0, 0.0];
    this.vertices[35].uv = [0.0, 0.0];

    // Recomendations: Remember uv coordinates are defined from 0.0 to 1.0.
  }

  /**
   * Renders MultiTextureCube.
   */
  render() {
    useShader(gl, this.shader);
    let verts = this.convertVec3ToFloat32();
    sendAttributeBufferToGLSL(verts, 3, 'a_Position');
    let uv = this.unpackUVCoordinates();
    sendAttributeBufferToGLSL(uv, 2, 'a_TexCoord');
    send2DTextureToGLSL(this.texture, 0, 'u_Sampler');
    sendUniformMatToGLSL(this.modelMatrix.elements, 'u_ModelMatrix');
    tellGLSLToDrawCurrentBuffer(verts.length/3);

    // Recomendations: This will be the first time render will need to be
    // overloaded. Why? Because this is a textured geometry, not a geometry
    // which relies on a color value. 
  }

}
