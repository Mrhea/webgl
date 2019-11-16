/**
 * Specifies a standard cube
 * 
 * @author Matthew Rhea
 * @this {newTiltedCube}
 */

 class newTiltedCube extends Geometry {
  /**
  * Constructor for Cube with no animations
  * 
  * @constructor
  * @return {Cube} Geometric object created
  */
  constructor(size, centerX, centerY, centerZ, height) {
    super();
    this.size = size;
    this.centerX = centerX; 
    this.centerY = centerY;
    this.centerZ = centerZ;
    this.height = height;

    this.generateCubeVertices();
    this.generateUVCoordinates();  
    this.generateNormals();

    // Set up this cube's normal matrix
    this.normalMatrix.setInverseOf(this.modelMatrix);
    this.normalMatrix.transpose();

    /*****************************************
     * 
     * PERFORMANCE UPDATE IN PROGRESS
     * 
     *****************************************/
    var interleavedData = interleaveVertices(this.vertices);
    var interleavedFloatArray = interleavedData[0];
    var dataCounts = interleavedData[1];

    this.dataArray = interleavedFloatArray;
    this.dataCounts = dataCounts;
    this.dataCounts[1] = 0; 
    /*****************************************/

    // Animation variables
    this.changeAngle = 20.0;
    this.angle = 0;
    this.g_last = Date.now();
    this.angleStep = 135.0;
    this.changeMatrix = new Matrix4();
    this.changeMatrix.setRotate(this.changeAngle, 0, 0, 1);

    // Create texture instead of color map in later ASG
    this.scale = new Matrix4();
    this.scale.setScale(1, this.height, 1);

    this.originMatrix = new Matrix4();
    this.originMatrix.setTranslate(this.centerX, this.centerY, this.centerZ);
    

    this.rotateMatrix = new Matrix4();
    this.modelMatrix = this.originMatrix.multiply(this.scale);


  } 

  /**
   * Generates the vertices of Cube
   *
   * @private
   * @param {Number} size The size of the cube.
   */
  generateCubeVertices(size) {
    let cubeVert = new Vertex();
    let cubeVectorList = [];
  
    let frontTopLeft  = new Vector3([-1.0, 1.0, 1.0]);
    let frontTopRight = new Vector3([1.0, 1.0, 1.0]);
    let frontBotRight = new Vector3([1.0, -1.0, 1.0]);
    let frontBotLeft  = new Vector3([-1.0, -1.0, 1.0]);
    
    let backTopLeft   = new Vector3([-1.0, 1.0, -1.0]);
    let backTopRight  = new Vector3([1.0, 1.0, -1.0]);
    let backBotRight  = new Vector3([1.0, -1.0, -1.0]);
    let backBotLeft   = new Vector3([-1.0, -1.0, -1.0]);
  
    cubeVectorList.push(frontTopLeft, frontTopRight, frontBotLeft, frontTopRight,
      frontBotRight, frontBotLeft, backTopLeft, backTopRight, frontTopLeft,
      backTopRight, frontTopRight, frontTopLeft, backTopLeft, backTopRight,
      backBotLeft, backTopRight, backBotRight, backBotLeft,
      backBotLeft, backBotRight, frontBotLeft, backBotRight, frontBotRight,
      frontBotLeft, frontTopRight, backTopRight, frontBotRight, backTopRight,
      backBotRight, frontBotRight, backTopLeft, frontTopLeft, backBotLeft,
      frontTopLeft, frontBotLeft, backBotLeft);
  
    for (let i = 0; i < cubeVectorList.length; i++) {
      cubeVert = new Vertex();
      cubeVert.points = cubeVectorList[i];
      this.vertices.push(cubeVert);
    }


    this.scale = new Matrix4();
    this.scale.setScale(size, size, size);

    this.modelMatrix = this.modelMatrix.multiply(this.scale);
        
    // Recommendations: Might want to generate your cube vertices so that their
    // x-y-z values are combinations of 1.0 and -1.0. Allows you to scale the
    // the cube to your liking better in the future.
  }

  /**
   * Generates the texture coordinates of cube
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
   * Generate normals coordinates of cube 
   * 
   * @private 
   */
  generateNormals() {
    this.vertices[0].normal.elements = [0.0,  0.0,  1.0];
    this.vertices[1].normal.elements = [0.0,  0.0,  1.0];
    this.vertices[2].normal.elements = [0.0,  0.0,  1.0];
    this.vertices[3].normal.elements = [0.0,  0.0,  1.0];

    this.vertices[8].normal.elements = [0.0,  1.0,  0.0];
    this.vertices[9].normal.elements = [0.0,  1.0,  0.0];
    this.vertices[10].normal.elements = [0.0,  1.0,  0.0];
    this.vertices[11].normal.elements = [0.0,  1.0,  0.0];

    this.vertices[16].normal.elements = [1.0,  0.0,  0.0];
    this.vertices[17].normal.elements = [1.0,  0.0,  0.0];
    this.vertices[18].normal.elements = [1.0,  0.0,  0.0];
    this.vertices[19].normal.elements = [1.0,  0.0,  0.0];

    this.vertices[4].normal.elements = [0.0,  0.0, -1.0];
    this.vertices[5].normal.elements = [0.0,  0.0, -1.0];
    this.vertices[6].normal.elements = [0.0,  0.0, -1.0];
    this.vertices[7].normal.elements = [0.0,  0.0, -1.0];

    this.vertices[12].normal.elements = [0.0, -1.0,  0.0];
    this.vertices[13].normal.elements = [0.0, -1.0,  0.0];
    this.vertices[14].normal.elements = [0.0, -1.0,  0.0];
    this.vertices[15].normal.elements = [0.0, -1.0,  0.0];

    this.vertices[20].normal.elements = [-1.0,  0.0,  0.0];
    this.vertices[21].normal.elements = [-1.0,  0.0,  0.0];
    this.vertices[22].normal.elements = [-1.0,  0.0,  0.0];
    this.vertices[23].normal.elements = [-1.0,  0.0,  0.0];
  }

  /**
   * Updates the animation of the TiltedCube. Should make it rotate.
   */
  updateAnimation() {
    this.now = Date.now();
    this.elapsed = this.now - this.g_last;
    this.g_last = this.now;


    this.changeAngle = this.angle + (30 * this.elapsed) / 1000.0;
    this.changeAngle %= 360;
    this.angle = this.changeAngle;

    this.rotateMatrix.setRotate(this.angle, 0, 1, 0);
    this.changeMatrix.setRotate(this.changeAngle, 0, 0, 1);

    this.modelMatrix = this.originMatrix.multiply(this.rotateMatrix.multiply(this.changeMatrix.multiply(this.scale)));
  }


    /**
   * Override geometry render for Tilted Cube to support texture 
   * rendering
   */
  render() {
    // Switch to the proper shading program
    useShader(gl, this.shader); 

    // Send the color and modelMatrix of the Cube being rendered
    sendUniformMatToGLSL(this.modelMatrix.elements, 'u_ModelMatrix');

    // Send normal matrix of cube 
    sendUniformMatToGLSL(this.normalMatrix.elements, 'u_NormalMatrix');

    sendAttributeDataToGLSL(this.dataArray, 'Game', this.dataCounts, ['a_Position', 'a_Color', 'a_Normal'])
    tellGLSLToDrawCurrentBuffer(this.vertices.length);
  }

}