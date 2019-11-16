// Basic Vertex Shader that receives position and size for each vertex (point).
var ASSIGN4_VSHADER =
  'uniform mat4 u_ModelMatrix;\n' +
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  ' gl_Position =  u_ModelMatrix * a_Position;\n' +
  '}\n';

// Basic Fragment Shader that receives a single one color (point).
var ASSIGN4_FSHADER =
  'precision mediump float;\n' + 
  'uniform vec4 u_FragColor;\n' +
  'void main() {\n' +
  ' gl_FragColor = u_FragColor;\n' +
  '}\n';
