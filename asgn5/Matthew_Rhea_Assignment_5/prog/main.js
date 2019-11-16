/**
 * Function called when the webpage loads.
 * 
 * @author Matthew Rhea
 */

var gl;
var canvas;
var scene;
var a_Position;
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

  /************************************
   * 
   * Optimization update, implementation in progress
   * 
   ************************************/
  // // Create shaders
  textureShader = createShader(gl, textureVertShader, textureFragShader);
  if (!textureShader) {
    console.log('Failed to create textureShader.');
    return;
  }

  colorShader = createShader(gl, colorVertShader, colorFragShader);
  if (!colorShader) {
    console.log('Failed to create colorShader.');
    return;
  }

  // Define which uniforms/attributes you'd like to save
  var texturedUniforms = ['u_Sampler', 'u_ModelMatrix', 'u_ViewMatrix', 'u_ProjMatrix'];
  var texturedAttributes = ['a_TexCoord', 'a_Position'];
  var coloredUniforms = ['u_ModelMatrix', 'u_ViewMatrix', 'u_ProjMatrix'];
  var coloredAttributes = ['a_Position', 'a_Color'];
  // Save those uniform/attribute locations (for multiple shaders)
  saveShaderLocations(gl, 'Textured', textureShader, texturedUniforms, texturedAttributes);
  saveShaderLocations(gl, 'Colored', colorShader, coloredUniforms, coloredAttributes);


  // Initialize shaders
  // colorShader = createShader(gl, colorVertShader, colorFragShader);
  // if (!colorShader) {
  //   console.log('Failed to create colorShader.');
  //   return;
  // }
  // textureShader = createShader(gl, textureVertShader, textureFragShader);
  // if (!textureShader) {
  //   console.log('Failed to create textureShader.');
  //   return;
  // }

  useShader(gl, colorShader);
  
  scene = new Scene();
  scene.camera = new Camera();

  /**
   * Enter world generation
   */
  generateWorld(); // Function call from worldGeneration.js

  initCameraHandlers();
  tick();


}
