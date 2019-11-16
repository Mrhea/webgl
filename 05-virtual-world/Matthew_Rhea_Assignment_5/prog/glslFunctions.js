// GLSL globals for performance optimization
var uniformLocations = {}; // A 2-D associative array containing the locations of uniforms
var attributeLocations = {}; // A 2-D associative array containing the locations of attributes 
var attributeBuffer; 
/************************************************ */


/**
 * Sends a WebGL 2D texture object (created by load2DTexture) and sends it to
 * the shaders.
 *
 * @param val The WebGL 2D texture object being passed
 * @param {Number} textureUnit The texture unit (0 - 7) where the texture will reside
 * @param {String} uniformName The name of the uniform variable where the texture's
 * textureUnit location (0 - 7) will reside
 */
function send2DTextureToGLSL(val, textureUnit, uniformName) {
  var glTextureUnit = determineGLTextureUnit(textureUnit);
  let uniformVar = gl.getUniformLocation(gl.program, uniformName);
  if (!uniformVar) {
    console.log('Failed to get uniform location');
    return; 
  }
  gl.activeTexture(glTextureUnit);
  gl.bindTexture(gl.TEXTURE_2D, val);
  gl.uniform1i(uniformVar, textureUnit);

  // Recomendations: Within this funciton, you should:
  //    1. Gather your uniform location
  //    2. Determine the texture unit you will be using (gl.TEXTURE"N")
  //    3. Activate your texture unit using gl.activeTexture
  //    4. Bind your texture using gl.bindTexture
  //    5. Send the texture unit (textureUnit not the one you found) to your
  //       uniform location.
}

/**
 * 
 * @param {Number} textureUnit The texture unit (0 - 7) where the texture will reside
 */
function determineGLTextureUnit(textureUnit) {
  switch(textureUnit) {
    case (0):
      return gl.TEXTURE0;
    case (1):
      return gl.TEXTURE1;
    case (2):
      return gl.TEXTURE2;
    case (3):
      return gl.TEXTURE3;
    case (4):
      return gl.TEXTURE4;
    case (5):
      return gl.TEXTURE5;
    case (6):
      return gl.TEXTURE6;
    case (7):
      return gl.TEXTURE7;
  }
}

/**
 * Creates a WebGl 2D texture object.
 *
 * @param imgPath A file path/data url containing the location of the texture image
 * @param magParam texParameteri for gl.TEXTURE_MAG_FILTER. Can be gl.NEAREST,
 * gl.LINEAR, etc.
 * @param minParam texParameteri for gl.TEXTURE_MIN_FILTER. Can be gl.NEAREST,
 * gl.LINEAR, etc.
 * @param wrapSParam texParameteri for gl.TEXTURE_WRAP_S. Can be gl.REPEAT,
 * gl.MIRRORED_REPEAT, or gl.CLAMP_TO_EDGE.
 * @param wrapTParam texParameteri for gl.TEXTURE_WRAP_S. Can be gl.REPEAT,
 * gl.MIRRORED_REPEAT, or gl.CLAMP_TO_EDGE.
 * @param callback A callback function which executes with the completed texture
 * object passed as a parameter.
 */
function create2DTexture(geo, imgPath, magParam, minParam, wrapSParam, wrapTParam, callback) {
  var texImg = new Image();
  var texture = gl.createTexture();
  texImg.onload = function() {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magParam);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minParam);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapSParam);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapTParam);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texImg);

    geo.texture = texture;
  }
  texImg.src = imgPath;

  // Recomendations: This function should see you creating an Image object,
  // setting that image object's ".onload" to an anonymous function containing
  // the rest of your code, and setting that image object's ".src" to imgPath.
  //
  // Within the anonymous function:
  //  1. create a texture object by saving the result of gl.createTexture()
  //  2. Flip your image's y-axis and bind your texture object to gl.TEXTURE_2D
  //  3. Using multiple calls to gl.texParameteri, pass magParam, minParam,
  //     wrapSParam, and wrapTParam.
  //  4. Set the texture's image to the loaded image using gl.texImage2D
  //  5. Pass your completed texture object to your callback function
  //
  // NOTE: This function should not return anything.
}

/**
 * Sends data to a uniform variable expecting a matrix value.
 *
 * @private
 * @param {Array} val Value being sent to uniform variable
 * @param {String} uniformName Name of the uniform variable recieving data
 */
function sendUniformMatToGLSL(val, uniformName) {
  // console.log(typeof(val));
  // console.log(val);
  // if (uniformName == 'u_ModelMatrix') {
  //   console.log('MODEL: ' + val);
  // }
  if (uniformName == 'u_ViewMatrix') {
    // console.log('VIEW: ' + val);
  }
  if (uniformName == 'u_ProjMatrix' || uniformName == 'u_ViewMatrix') {
    // console.log('Current uniform: ' + uniformName);
  }
  let u_Matrix = gl.getUniformLocation(gl.program, uniformName);
  if (!u_Matrix) {
    console.log('Failed to get storage location of u_ModelMatrix');
    return;
  }

  gl.uniformMatrix4fv(u_Matrix, false, val);
  
  // Recomendations: This is going to be very similar to sending a float/vec.
}

/**
* Sends data to an attribute variable using a buffer.
*
* @private
* @param {Float32Array} data Data being sent to attribute variable
* @param {Number} dataCount The amount of data to pass per vertex
* @param {String} attribName The name of the attribute variable
*/
function sendAttributeBufferToGLSL(data, dataCount, attribName) {
  // console.log('current attribute: ' + attribName);
  // Create attribute buffer
  var attribBuffer = gl.createBuffer();
  if (!attribBuffer) {
    console.log('Failed to create buffer');
    return -1;
  }
  // Get the storage location of a_Position variable
  attribVar = gl.getAttribLocation(gl.program, attribName);
  if (attribVar < 0) {
    console.log('Failed to get the storage location of attribVar');
    return -1; 
  }

  // Bind data to buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, attribBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  // Enable buffer for use
  gl.vertexAttribPointer(attribVar, dataCount, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(attribVar);

}

/**
* Sends a float value to the specified uniform variable within GLSL shaders.
* Prints an error message if unsuccessful.
*
* @param {float} val The float value being passed to uniform variable
* @param {String} uniformName The name of the uniform variable
*/
function sendUniformFloatToGLSL(val, uniformName) {
  gl.uniform1f(uniformName, val);
}

/**
* Sends an JavaSript array (vector) to the specified uniform variable within
* GLSL shaders. Array can be of length 2-4.
*
* @param {Array} val Array (vector) being passed to uniform variable
* @param {String} uniformName The name of the uniform variable
*/
function sendUniformVec4ToGLSL(val, uniformName) {
  // Get the storage location of u_FragColor
  // console.log('value: ' + val);
  let uniformVar = gl.getUniformLocation(gl.program, uniformName);
  // console.log('uniform: ' + uniformVar);
  if (!uniformVar) {
      console.log('Failed to get storage location of uniform vec4');
      return;
  }
  gl.uniform4f(uniformVar, val[0], val[1], val[2], val[3]);
}



/*****************************************************************************
 * 
 *           PERFORMANCE OPTIMIZING CODE (CURRENTLY INTEGRATING)
 * 
 ****************************************************************************/

/**
 * Initalizes both attribute buffer and index buffer as global variables.
 *
 * @param gl The WebGL rendering context of the Canvas
 */
function initAttributeBuffer(gl) {
  attributeBuffer = gl.createBuffer();
  if (!attributeBuffer) {
    console.log("Failed to create buffers!");
    return;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, attributeBuffer);
}

/**
 * Saves the uniform and attribute locations of a given shading program.
 * Saved uniforms and attributes will be stored in
 * uniformLocations/attributeLocations and will follow this format for being
 * accessed: uniform/attributeLocations[shaderName][uniform/attributeName]
 *
 * @param gl The WebGL rendering context of the Canvas
 * @param {String} shaderName The name assigned to the shading program (used to access 2-D associative arrays)
 * @param shadingProgram A WebGL shading program
 * @param {Array} uniformList An array of strings containing the names of uniform locations
 * you'd like to save
 * @param {Array} attributeList An array of strings containing the names of attribute locations
 * you'd like to save.
 */
function saveShaderLocations(gl, shaderName, shaderProgram, uniformList, attributeList) {
  uniformLocations[shaderName] = {};
  for (var i = 0; i < uniformList.length; i++) {
    uniformLocations[shaderName][uniformList[i]] = gl.getUniformLocation(shaderProgram, uniformList[i]);
    if (!uniformLocations[shaderName][uniformList[i]]) {
      console.log('Failed to get storage location of uniform vec4');
      return;
  }  }

  attributeLocations[shaderName] = {};
  for(var j = 0; j < attributeList.length; j++) {
    attributeLocations[shaderName][attributeList[j]] = gl.getAttribLocation(shaderProgram, attributeList[j]);
    if (attributeLocations[shaderName][attributeList[j] < 0]) {
      console.log('Failed to get storage location of attribute');
      return -1;
    }
  }
}

/**
 * Interleaves multiple arrays of data into one array. Also returns the indices
 * correspnding to the interleaved array.
 *
 * @param {Array} dataArrays An array containing the arrays that need to be interleaved
 * @param {Array} dataCounts An array containing the amount of data passed per vertex
 * within each array that needs to be interleaved. The data counts in this array
 * need to be in the same order as the arrays in dataArrays.
 */
function interleaveDataArrays(dataArrays, dataCounts) {
  var interleavedData = [];
  var indices = [];

  var dataAppearances = {};
  var currentNewIndex = 0;
  // console.log('datacount: ' + dataCounts);

  var informationCount = dataArrays[0].length / dataCounts[0];
  for (var i = 0; i < informationCount; i++) {
    var vertexData = [];
    for (var j = 0; j < dataArrays.length; j++) {
      var dataFromDataArray = dataArrays[j].slice(i * dataCounts[j], (i + 1) * dataCounts[j]);
      vertexData = vertexData.concat(dataFromDataArray);
    }

    interleavedData = interleavedData.concat(vertexData);
  }

  return [new Float32Array(interleavedData)];
}

/**
 * Interleaves an array of vertex objects into a single array. Also produces
 * the indices for this array and an array of data counts for each vertex
 * parameter. Assumes conflicting data such as color and uv coordinates are
 * not defined simultaneously in a vertex object.
 *
 * @param {Array} vertices An array of vertex objects
 */
function interleaveVertices(vertices) {
  var vertexProperties = [];
  var dataArrays = [];
  var dataCounts = [];
  var usingVec3_4 = [];

  // console.log(vertices);

  // Determine number of dataArrays and if a vector is being used
  var propertyIndex = 0;
  for (property in vertices[0]) {
    if (vertices[0].hasOwnProperty(property)) {
      if (vertices[0][property] == null) {
        continue;
      }

      if (vertices[0][property] instanceof Array) {
        dataArrays[propertyIndex]= vertices[0][property];
        usingVec3_4[propertyIndex] = false;
        dataCounts[propertyIndex] = vertices[0][property].length;
      }
      else {
        dataArrays[propertyIndex] = Array.from(vertices[0][property].elements);
        usingVec3_4[propertyIndex] = true;
        dataCounts[propertyIndex] = vertices[0][property].elements.length;
      }

      vertexProperties[propertyIndex] = property;
      propertyIndex++;
    }
  }

  for (var i = 1; i < vertices.length; i++) {
    for (var j = 0; j < vertexProperties.length; j++) {
      if (usingVec3_4[j]) {
        dataArrays[j] = dataArrays[j].concat(Array.from(vertices[i][vertexProperties[j]].elements));
      }
      else {
        dataArrays[j] = dataArrays[j].concat(vertices[i][vertexProperties[j]]);
      }
    }
  }

  var answer = interleaveDataArrays(dataArrays, dataCounts);
  answer.push(dataCounts);

  return answer;
}

/**
 * Sends an array of interleaved vertex information the shader.
 *
 * @param {Float32Array} data Data being sent to attribute variable
 * @param {Number} dataCount The amount of data to pass per vertex
 * @param {String} attribName The name of the attribute variable
 */
function sendAttributeDataToGLSL(data, shaderName, dataCounts, attribNames) {
  var FSIZE = data.BYTES_PER_ELEMENT;

  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  var dataEnd = 0;
  for (var j = 0; j < dataCounts.length; j++) {
    dataEnd += dataCounts[j];
  }
  dataEnd *= FSIZE;

  // console.log('CURR DATA COUNT: ' + dataCounts);

  var currentDataStart = 0;
  for (var i = 0; i < attribNames.length; i++) {

    var attribute = attributeLocations[shaderName][attribNames[i]];
    gl.vertexAttribPointer(attribute, dataCounts[i], gl.FLOAT, false, dataEnd, currentDataStart);
    gl.enableVertexAttribArray(attribute);

    currentDataStart += FSIZE * dataCounts[i];
  }
}

/**
* Draws the current buffer loaded. Buffer was loaded by sendAttributeBufferToGLSL.
*
* @param {Integer} pointCount The amount of vertices being drawn from the buffer.
*/
function tellGLSLToDrawCurrentBuffer(pointCount) {
  // console.log('In draw arrays');
  gl.drawArrays(gl.TRIANGLES, 0, pointCount);
  // console.log('after draw arrays');
}
