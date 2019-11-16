/**
 * Function called when the webpage loads.
 * 
 * @author Matthew Rhea
 */

var gl;
var canvas;
var scene;
var a_Position;
var u_FragColor;

function main() {
  // Retrive <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to retrieve rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, ASSIGN2_VSHADER, ASSIGN2_FSHADER)) {
    console.log('Failed to initialize shaders');
    return;
  }

  // Get the storage location of a_Position variable
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return; 
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
      console.log('Failed to get storage location of u_FragColor');
      return;
  }

  scene = new Scene();

  initEventHandlers(canvas);
  clearCanvas();

  tick();
}
