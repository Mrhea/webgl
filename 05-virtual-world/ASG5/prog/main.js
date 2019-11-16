/**
 * Function called when the webpage loads.
 * 
 * @author Matthew Rhea
 */

var gl;
var canvas;
var scene;
var a_Position;
// var u_FragColor;
var a_Color;
var u_PointSize;
var u_ModelMatrix;
var colorShader;
var textureShader;
var shaderMode;

function main() {
  // Retrive <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to retrieve rendering context for WebGL');
    return;
  }
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  // Initialize shaders
  colorShader = createShader(gl, colorVertShader, colorFragShader);
  if (!colorShader) {
    console.log('Failed to create colorShader.');
    return;
  }
  textureShader = createShader(gl, textureVertShader, textureFragShader);
  if (!textureShader) {
    console.log('Failed to create textureShader.');
    return;
  }

  scene = new Scene();

  // Display default cubes
  cubeTexPath = 'external/textures/flcl.jpg';
  var textureCube = new MultiTextureCube(cubeTexPath, 50, 0.5, 0);
  var checkCube = new CheckerCube(50, -0.5, 0);
  scene.addGeometry(textureCube);
  scene.addGeometry(checkCube);

  initEventHandlers(canvas);

  tick();
}
