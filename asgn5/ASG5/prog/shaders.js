// Basic Vertex Shader that receives position and size for each vertex (point).

/*******************************
 * ASSIGNMENT 3 SHADERS
 *******************************/
// var ASSIGN3_VSHADER =
//   'uniform mat4 u_ModelMatrix;\n' +
//   'attribute vec4 a_Position;\n' +
//   'void main() {\n' +
//   ' gl_Position =  u_ModelMatrix * a_Position;\n' +
//   '}\n';

// // Basic Fragment Shader that receives a single one color (point).
// var ASSIGN3_FSHADER =
//   'precision mediump float;\n' + 
//   'uniform vec4 u_FragColor;\n' +
//   'void main() {\n' +
//   ' gl_FragColor = u_FragColor;\n' +
//   '}\n';

/****************************
 * VARYING COLOR SHADERS
 ****************************/
var colorVertShader = 
  'uniform mat4 u_ModelMatrix;\n' +
  'attribute vec4 a_Position;\n' +
  'varying vec4 v_Color;\n' +
  'attribute vec4 a_Color;\n' +
  'void main() {\n' +
  ' gl_Position =  u_ModelMatrix * a_Position;\n' +
  ' v_Color = a_Color;\n' +
  '}\n';

var colorFragShader =
// 'precision mediump float;\n' + 
// 'uniform vec4 u_FragColor;\n' +
  'varying mediump vec4 v_Color;\n' + 
  'void main() {\n' +
  ' gl_FragColor = v_Color;\n' +
  '}\n';

/****************************
 * TEXTURE SHADERS
 ****************************/
var textureVertShader =
  'uniform mat4 u_ModelMatrix;\n' +
  'attribute vec4 a_Position;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  ' gl_Position =  u_ModelMatrix * a_Position;\n' +
  ' v_TexCoord = a_TexCoord;\n' +
  '}\n';

var textureFragShader =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' + 
  '#endif\n' +
  'uniform sampler2D u_Sampler;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  ' gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
  '}\n';