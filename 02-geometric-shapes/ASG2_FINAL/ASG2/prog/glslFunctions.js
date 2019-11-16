/**
* Sends data to an attribute variable using a buffer.
*
* @private
* @param {Float32Array} data Data being sent to attribute variable
* @param {Number} dataCount The amount of data to pass per vertex
* @param {String} attribName The name of the attribute variable
*/
function sendAttributeBufferToGLSL(data, dataCount, attribName) {
 // Create attribute buffer
 var attribBuffer = gl.createBuffer();

 // Bind data to buffer
 gl.bindBuffer(gl.ARRAY_BUFFER, attribBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
 
 // Enable buffer for use
 gl.vertexAttribPointer(attribName, 2, gl.FLOAT, false, 0, 0);
 gl.enableVertexAttribArray(attribName);

}

/**
* Draws the current buffer loaded. Buffer was loaded by sendAttributeBufferToGLSL.
*
* @param {Integer} pointCount The amount of vertices being drawn from the buffer.
*/
function tellGLSLToDrawCurrentBuffer(pointCount) {
 gl.drawArrays(gl.TRIANGLE_FAN, 0, pointCount);

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
 gl.uniform4f(uniformName, val[0], val[1], val[2], val[3]);
}
