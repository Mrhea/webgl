/**
 * Function called when the webpage loads.
 * 
 * @author Matthew Rhea
 */

var gl;
var shaderProgram;
var canvas;
var scene;
var a_Position;
var u_FragColor;
var u_PointSize;
var u_ModelMatrix;

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
  shaderProgram = createShader(gl, ASSIGN4_VSHADER, ASSIGN4_FSHADER);
  if (!shaderProgram) {
    console.log('Failed to initialize shaders');
    return;
  }
  useShader(gl, shaderProgram);

  // u_PointSize = gl.getUniformLocation(gl.program, 'u_PointSize');

  scene = new Scene();

  initEventHandlers(canvas);
  clearCanvas();

  // Default size: 100
  // let cubeSize = 100;
  // generateDefaultCube(cubeSize);

  tick();
}
