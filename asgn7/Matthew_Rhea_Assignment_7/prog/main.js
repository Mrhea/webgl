/**
 * Function called when the webpage loads.
 * 
 * @author Matthew Rhea
 */


// Globals because I'm gross 
var gl;
var ctx;
var canvas;
var scene;
var a_Position;
var a_Color;
var u_PointSize;
var u_ModelMatrix;
var u_Clicked; // Shader boolean
var u_texClicked;
var u_colorClicked;
var colorShader;
var textureShader;
var shaderMode;
var HUD;

function main() {
  // Retrive <canvas> element
  canvas = document.getElementById('webgl');

  // Retrieve <canvas> HUD element
  HUD = document.getElementById('hud');

  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to retrieve rendering context for WebGL canvas');
    return;
}

  // Get the rendering context for 2DCG
  ctx = HUD.getContext('2d');
  if (!ctx) {
    console.log('Failed to get HUD rendering context');
    return;
  }

  // Render HUD
  // resizeHUDCanvas();
  // draw2DHUD();


  /************************************
   * 
   * Optimization update
   * It's slightly better?
   * Working on rendering only whats within camera view
   ************************************/
  // Create shaders
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

  gameShader = createShader(gl, vertGameShader, fragGameShader);
  if (!gameShader) {
    console.log('Failed to create gameShader.');
  }

  // Define which uniforms/attributes you'd like to save
  var texturedUniforms = ['u_Sampler', 'u_ModelMatrix', 'u_ViewMatrix', 'u_ProjMatrix',
      'u_texClicked'];
  var texturedAttributes = ['a_TexCoord', 'a_Position'];
  
  var coloredUniforms = ['u_ModelMatrix', 'u_ViewMatrix', 'u_ProjMatrix',
     'u_NormalMatrix', 'u_LightColor', 'u_LightPosition', 'u_AmbientLight'];
  var coloredAttributes = ['a_Position', 'a_Color', 'a_Normal'];

  var gameUniforms = ['u_ModelMatrix', 'u_ViewMatrix', 'u_ProjMatrix', 'u_Clicked',
     'u_NormalMatrix', 'u_LightColor', 'u_LightPosition', 'u_AmbientLight'];
  var gameAttributes = ['a_Position', 'a_Color', 'a_Normal'];

     // Save those uniform/attribute locations (for multiple shaders)
  saveShaderLocations(gl, 'Textured', textureShader, texturedUniforms, texturedAttributes);
  saveShaderLocations(gl, 'Colored', colorShader, coloredUniforms, coloredAttributes);
  saveShaderLocations(gl, 'Game', gameShader, gameUniforms, gameAttributes);

  /*************************************************/

  useShader(gl, colorShader);


  // Enable alpha blending
  gl.enable(gl.BLEND);
  // Set blending function
  gl.blendFunc(gl.DST_ALPHA, gl.ONE_MINUS_DST_ALPHA);
  // Clear depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  
  scene = new Scene();
  scene.camera = new Camera();
  scene.light = new Light();

  // Render Fog
  createFog();
  // Set clear color and enable hidden surface removal
  gl.clearColor(fogColor[0], fogColor[1], fogColor[2], 0.8); 

  u_Clicked = gl.getUniformLocation(gl.program, 'u_Clicked');
  u_texClicked = gl.getUniformLocation(gl.program, 'u_texClicked');
  // u_colorClicked = gl.getUniformLocation(gl.program, 'u_colorClicked');
  
  /**
   * Enter world generation
   */
  // generateWorld(); // Function call from worldGeneration.js

  // Enter game startup 
  startup(); 
  
  initEventHandlers();
  initCameraHandlers();
  tick();


}
