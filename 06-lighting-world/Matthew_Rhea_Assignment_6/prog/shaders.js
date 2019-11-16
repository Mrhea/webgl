// Basic Vertex Shader that receives position and size for each vertex (point).

/****************************
 * VARYING COLOR SHADERS
 ****************************/
var colorVertShader = 
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_ViewMatrix;\n' +
  'uniform mat4 u_ProjMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' + 
  // 'uniform vec3 u_LightPosition;\n' + 
  // 'uniform vec3 u_AmbientLight;\n' +

  'varying vec4 v_Color;\n' +
  'varying vec3 v_Normal;\n' +   
  'varying vec3 v_Position;\n' + 
  // 'varying vec3 v_Lighting;\n' +
  // 'varying float v_Diffuse;\n' + 

  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'attribute vec4 a_Normal;\n' + 
  'void main() {\n' + 
  ' gl_Position =  u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n' +
  ' v_Position = vec3(u_ModelMatrix * a_Position);\n' +
  ' v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  ' v_Color = a_Color;\n' + 
  '}\n';

var colorFragShader =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform vec3 u_LightPosition;\n' + // Position of light source
  'uniform vec3 u_LightColor;\n' +    // Light Color
  'uniform vec3 u_AmbientLight;\n' +   // Ambient light color

  'varying vec4 v_Color;\n' +
  'varying vec3 v_Position;\n' +
  'varying vec3 v_Normal;\n' +

  'void main() {\n' +
    // Normalize the noram because it is interpolated and not 1.0 in length'
  ' vec3 normal = normalize(v_Normal);\n' +
    // Calculate the light direction and make its length 1\n'
  ' vec3 lightDirection = normalize(u_LightPosition - v_Position);\n' +
    // The dot product of light direction and orientation of a surface
  ' float nDotL = max(dot(lightDirection, normal), 0.0);\n' +
    // Calculate final color from diffuse reflection and ambient reflection
  ' vec3 diffuse = u_LightColor * v_Color.rgb * nDotL;\n' +
  ' vec3 ambient = u_AmbientLight * v_Color.rgb;\n' +
  ' gl_FragColor = vec4(diffuse + ambient, v_Color.a);\n' +
  '}\n';

/****************************
 * TEXTURE SHADERS
 ****************************/
var textureVertShader =
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_ViewMatrix;\n' +
  'uniform mat4 u_ProjMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' + 
  'uniform vec4 u_LightPosition;\n' +
  'uniform vec3 u_AmbientLight;\n' +
  // 'uniform vec3 u_DiffuseLight;\n' + 

  'varying vec2 v_TexCoord;\n' +
  // 'varying vec3 v_Lighting;\n' + 
  // 'varying vec3 v_Normal;\n' + 

  'attribute vec4 a_Position;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'void main() {\n' +
  ' gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n' +
  ' v_TexCoord = a_TexCoord;\n' +
  '}\n';

var textureFragShader =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' + 
  '#endif\n' +
  'uniform sampler2D u_Sampler;\n' +

  'varying vec2 v_TexCoord;\n' +
  'varying vec3 v_Lighting;\n' +
  'varying vec3 v_Normal;\n' + 
  'void main() {\n' +
  ' gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
  '}\n';


/****************************
 * NORMAL SHADER
 ****************************/
// var normalVertShader = 
//   '';

// var normalFragShader = 
//   '';
