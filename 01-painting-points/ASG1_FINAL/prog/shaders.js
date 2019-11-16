// Basic Vertex Shader that receives position and size for each vertex (point).
var ASSIGN1_VSHADER =
'attribute vec4 a_Position;\n' +
'uniform float u_PointSize;\n' +
'void main() {\n' +
'   gl_Position = a_Position;\n' +
'   gl_PointSize = u_PointSize;\n' +
'}\n';

// Basic Fragment Shader that receives a single one color (point).
var ASSIGN1_FSHADER =
'precision mediump float;\n' +
'uniform vec4 u_FragColor;\n' +
'void main() {\n' +
'   gl_FragColor = u_FragColor;\n' +
'}\n';

