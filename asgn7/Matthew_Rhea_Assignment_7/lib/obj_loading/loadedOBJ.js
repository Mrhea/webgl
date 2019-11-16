/**
 * Specifies the geometry contained within an OBJ file. A subclass of Geometry.
 * NOTE: The geometry is transformed to display correctly using its modelMatrix.
 *
 * @author Alfredo Rivero
 * @this {LoadedOBJ}
 */
class LoadedOBJ extends Geometry {
  /**
   * Constructor for LoadedOBJ
   *
   * @constructor
   * @param {String} objStr An OBJ file in string form
   * @returns {LoadedOBJ} Constructed LoadedOBJ
   */
  constructor(objStr, texStr, xPos, yPos, zPos) {
    super();

    this.xPos = xPos;
    this.yPos = yPos;
    this.zPos = zPos;
    // Construct the Mesh object containg the OBJ file's information
    var objMesh = new OBJ.Mesh(objStr);

    // Construct the necessary amount of vertex objects within this.vertices
    for (var i = 0; i < objMesh.indices.length; i++) {
      this.vertices[i] = new Vertex();
    }


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
    /*****************************************/

    // Add the vertex points, normals, and uv coordinates in OBJ
    var transAndScaleVal = this.addVertexPoints(objMesh.indices, objMesh.vertices);
    this.addVertexNormals(objMesh.indices, objMesh.vertexNormals);
    this.addVertexTextureCoordinates(objMesh.indices, objMesh.textures);

    // Modify loadedOBJ's modelMatrix to present OBJ correctly
    this.moveOBJToCenterOfScreen(transAndScaleVal[0]);
    this.scaleOBJToFitOnScreen(transAndScaleVal[1]);

    this.textureLocation = texStr;

    if (this.textureLocation != null) {
      this.shader = textureShader;
      create2DTexture(this, this.textureLocation, gl.LINEAR, gl.LINEAR,
        gl.REPEAT, gl.REPEAT, null);
    } else {
      this.determineColor();
      this.shader = colorShader;
    }
    // for (let i = 0; i < this.vertices.length; i++) {
      // this.vertices[i].color = [128,0,128,1];
    // }
    // this.rotationSpeed = -1 * Math.random();
    this.rotationSpeed = 1;
    // console.log('LoadedOBJ animation speed: ' + this.rotationSpeed);
    this.copyModelMatrix = this.modelMatrix;
  }

  /**
   * Adds the point information to the vertices of LoadedOBJ. Also keeps
   * track of the largest x-y-z coordinate absolute value and the center of
   * the LoadedOBJ. Does so for displaying geometry correctly. Uses indices to
   * put points in the correct order.
   *
   * @private
   * @param {Array} indices The indices of the loadedOBJ
   * @param {Array} points The points being added
   * @returns {Array} centerPoint at index 0, necessary scale at index 1
   */
  addVertexPoints(indices, points) {
    var vertexHasNotBeenEncountered = new Array(points.length / 3);
    vertexHasNotBeenEncountered.fill(true);

    var largestCoordinateValue = 1.0;
    var centerPoint = [0.0, 0.0, 0.0];

    for (var i = 0; i < indices.length; i++) {
      var index = indices[i];
      var xyz = [points[index * 3], points[index * 3 + 1], points[index * 3 + 2]];

      if (vertexHasNotBeenEncountered[index]) {
        // Compare xyz to largestCoordinateValue
        for (var j = 0; j < 3; j++) {
          if (Math.abs(xyz[j]) > largestCoordinateValue) {
            largestCoordinateValue = Math.abs(xyz[j]);
          }
        }

        // Continue computing the centerPoint of LoadedOBJ
        centerPoint[0] += xyz[0];
        centerPoint[1] += xyz[1];
        centerPoint[2] += xyz[2];

        vertexHasNotBeenEncountered[index] = false;
      }

      this.vertices[i].points = new Vector3(xyz);
    }

    centerPoint[0] /= -(points.length / 3);
    centerPoint[1] /= -(points.length / 3);
    centerPoint[2] /= -(points.length / 3);

    return [centerPoint, 1 / largestCoordinateValue];
  }

  /**
   * Adds the normals information to LoadedOBJ's vertices. Uses indices to
   * add normals in the correct order.
   *
   * @private
   * @param {Array} indices The indices of the loadedOBJ
   * @param {Array} normals The normals being added
   */
  addVertexNormals(indices, normals) {
    // If normals information is invalid, set all normals to just null
    if (this.isInvalidParameter(normals)) {
      for (var i = 0; i < indices.length; i++) {
        this.vertices[i].normal = null;
      }
    }
    else {
      for (var i = 0; i < indices.length; i++) {
        var index = indices[i];
        var xyz = [normals[index * 3], normals[index * 3 + 1], normals[index * 3 + 2]];

        this.vertices[i].normal = new Vector3(xyz);
      }
    }
  }

  /**
   * Adds the texture information to LoadedOBJ's vertices. Uses indices to
   * add texture coordinates in the correct order.
   *
   * @private
   * @param {Array} indices The indices of the loadedOBJ's vertices
   * @param {Array} textures The textures being added
   */
  addVertexTextureCoordinates(indices, textures) {
    // If textures information is invalid, set vertex.uv to null for all vertices.
    if (this.isInvalidParameter(textures)) {
      for (var i = 0; i < indices.length; i++) {
        this.vertices[i].uv = null;
      }
    }
    else {
      for (var i = 0; i < indices.length; i++) {
        var index = indices[i];
        var uv = [textures[index * 2], textures[index * 2 + 1]];

        this.vertices[i].uv = uv;
      }
    }
  }

  /**
   * Determines if a parameter (points, normals, textures) is invalid.
   *
   * @private
   */
  isInvalidParameter(parameter) {
    if (parameter == null) {
      return true;
    }
    if (parameter == []) {
      return true;
    }
    if (isNaN(parameter[0])) {  // Can be array of just NaN
      return true;
    }

    return false;
  }

  /**
   * Modifes the LoadedOBJ's modelMatrix to move the LoadedOBJ to the
   * center of the canvas.
   *
   * @private
   * @param {Array} transValue An array containing translation value for x, y, z
   * axis (indices: 0, 1, 2)
   */
  moveOBJToCenterOfScreen(transValue) {
    this.modelMatrix.setTranslate(transValue[0], transValue[1], transValue[2]);
  }

  /**
   * Modifies the LoadedOBJ's modelMatrix to scale the LoadedOBJ to fit
   * within the canvas. Assumes moveOBJToCenterOfScreen() has been called
   * beforehand and modelMatrix is defined.
   *
   * @private
   * @param {Number} scaleValue Amount LoadedOBJ will be scaled by
   */
  scaleOBJToFitOnScreen(scaleValue) {
    var scaleMatrix = new Matrix4();
    scaleMatrix.setScale(scaleValue, scaleValue, scaleValue);
    this.modelMatrix = scaleMatrix.multiply(this.modelMatrix);
  }

  /**
   * Converts loadedOBJ vertices to Float32Array
   */
  convertVertToFloat32() {
    let verts = new Float32Array(this.vertices.length*3);
    for (let i = 0; i < verts.length; i+=3) {
      let currVert = this.vertices[i/3];
      for (let j = 0; j < 3; j++) {
        verts[i+j] = currVert.points.elements[j];
      }
    }
    return verts;
  }

  /**
   * Basic animation for LoadedOBJ
   */
  updateAnimation() {
    this.modelMatrix = this.copyModelMatrix;
    var rotateXAxis = new Matrix4();
    var rotateYAxis = new Matrix4();
    var rotateZAxis = new Matrix4();

    rotateXAxis.setRotate(this.rotationSpeed, 1, 0, 0);
    rotateYAxis.setRotate(this.rotationSpeed, 0, 1, 0);
    rotateZAxis.setRotate(this.rotationSpeed, 0, 0, 1);

    var translateMatrix = new Matrix4();
    translateMatrix.setTranslate(this.xPos, this.yPos, this.zPos);

    // this.modelMatrix = rotateXAxis.multiply(this.modelMatrix);
    // this.modelMatrix = rotateYAxis.multiply(this.modelMatrix);
    // this.modelMatrix = rotateZAxis.multiply(this.modelMatrix);
    this.modelMatrix.rotate(5, 0, 1, 0)
    this.modelMatrix = translateMatrix.multiply(this.modelMatrix);
  }

  // /**
  //  * New update animation
  //  */
  // updateAnimation() {
  //   this.modelMatrix = this.copyModelMatrix;
  //   var speed = 1; // Variable to control the speed at which objects move

  //   var translateMatrix = new Matrix4();

  //   // Translate to starting position
  //   translateMatrix.setTranslate(this.xPos, this.yPos, this.zPos);
  //   this.modelMatrix = translateMatrix.multiply(this.modelMatrix);
    
  //   for (i = 0; i < 4; i++) {
  //     translateMatrix.setTranslate(speed, 0, 0);
  //     this.modelMatrix = translateMatrix.multiply(this.modelMatrix);
  //   }
  // }

  /**
   * Renders object in scene. Identical to tilted cube render
   * in which you change render method depending on shader 
   */
  render() {
    useShader(gl, this.shader);
    if (this.shader == textureShader) {
      let uv = this.unpackUVCoordinates();
      let verts = this.convertVertToFloat32();
      sendAttributeBufferToGLSL(uv, 2, 'a_TexCoord');
      send2DTextureToGLSL(this.texture, 0, 'u_Sampler');
      sendUniformMatToGLSL(scene.ProjMatrix.elements, 'u_ProjMatrix');
      sendUniformMatToGLSL(scene.ViewMatrix.elements, 'u_ViewMatrix');
      sendUniformMatToGLSL(this.modelMatrix.elements, 'u_ModelMatrix');
      sendAttributeBufferToGLSL(verts, 3, 'a_Position', 2);
      tellGLSLToDrawCurrentBuffer(verts.length/3);  
    } else if (this.shader == colorShader) {
      var rgba = getColorVertices(this);
      sendAttributeBufferToGLSL(rgba, 4, 'a_Color', 1);
      sendUniformMatToGLSL(this.modelMatrix.elements, 'u_ModelMatrix');
      sendAttributeBufferToGLSL(this.convertVertToFloat32(), 3, 'a_Position', 2);
      tellGLSLToDrawCurrentBuffer(this.vertices.length);  
    }
  }
}


