/****************************
 * VARYING COLOR SHADERS
 ****************************/
var colorVertShader = 
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_ViewMatrix;\n' +
  'uniform mat4 u_ProjMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' +
  // 'uniform bool u_colorClicked;\n' +

  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'attribute vec4 a_Normal;\n' +

  'varying vec4 v_Color;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'varying float v_Dist;\n' +

  'void main() {\n' +
  ' gl_Position =  u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n' +
  ' v_Position = vec3(u_ModelMatrix * a_Position);\n' +
  ' v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  // ' if (u_colorClicked) {\n' + // Draw in red if mouse is pressed
  // '   v_Color = vec4(0.0, 0.0, 0.0, 1.0);\n' +
  // ' } else {\n' +
  '   v_Color = a_Color;\n' + 
  // ' }\n' +
  ' v_Dist = gl_Position.w;\n' +
  '}\n';

var colorFragShader =
  'precision mediump float;\n' +

  'uniform vec3 u_LightColor;\n' +
  'uniform vec3 u_LightPosition;\n' +
  'uniform vec3 u_AmbientLight;\n' +
  'uniform vec3 u_FogColor;\n' + // Color of Fog
  'uniform vec2 u_FogDist;\n' +  // Distance of Fog (starting point, end point)

  'varying vec4 v_Color;\n' + 
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'varying float v_Dist;\n' + 

  'void main() {\n' +
    // Calculation of fog factor (factor becomes smaller as it goes further away from eye point)
  ' float fogFactor = clamp((u_FogDist.y - v_Dist) / (u_FogDist.y - u_FogDist.x), 0.0, 1.0);\n' +
    // Stronger fog as it gets further
  ' vec3 color = mix(u_FogColor, vec3(v_Color), fogFactor);\n' +
    // Normalize the normal because it is interpolated and not 1.0 in length any more
  ' vec3 normal = normalize(v_Normal);\n' +
    // Calculate the light direction and make its length 1.
  ' vec3 lightDirection = normalize(u_LightPosition - v_Position);\n' +
    // The dot product of the light direction and the orientation of a surface (the normal)
  ' float nDotL = max(dot(lightDirection, normal), 0.0);\n' +
  ' vec3 eye = normalize(-v_Position);\n' + 
  ' vec3 reflection = normalize(-reflect(u_LightPosition, v_Normal));\n' +
  ' float rDotE = max(dot(reflection, eye), 0.0);\n' +
    // Calculate the final color from diffuse reflection and ambient reflection
  ' vec3 diffuse = u_LightColor * v_Color.rgb * nDotL;\n' +
  ' vec3 ambient = u_AmbientLight * v_Color.rgb;\n' +
  ' vec3 specular = v_Color.rgb * pow(rDotE, 2.0);\n' +
  ' gl_FragColor = vec4(diffuse + ambient + specular + color, v_Color.a);\n' +
  '}\n';



/****************************
 * TEXTURE SHADERS
 ****************************/
var textureVertShader =
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_ViewMatrix;\n' +
  'uniform mat4 u_ProjMatrix;\n' +

  'attribute vec4 a_Position;\n' +
  'attribute vec2 a_TexCoord;\n' +

  'varying vec2 v_TexCoord;\n' +

  'void main() {\n' +
  ' gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n' +
  ' v_TexCoord = a_TexCoord;\n' +
  '}\n';

var textureFragShader =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' + 
  '#endif\n' +
  'uniform sampler2D u_Sampler;\n' +
  'uniform bool u_texClicked;\n' + // boolean for clicking textured objects
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  ' if (u_texClicked) {\n' + // Draw in red if mouse is pressed
  '   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n' +
  ' } else {\n' +
  '   gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
  ' }\n' +
  '}\n';



/****************************
 * GAME GEOMETRY SHADERS
 ****************************/

var vertGameShader = 
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_ViewMatrix;\n' +
  'uniform mat4 u_ProjMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' +
  'uniform bool u_Clicked;\n' +

  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'attribute vec4 a_Normal;\n' +

  'varying vec4 v_Color;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'varying float v_Dist;\n' +

  'void main() {\n' +
  ' gl_Position =  u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n' +
  ' v_Position = vec3(u_ModelMatrix * a_Position);\n' +
  ' v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  ' if (u_Clicked) {\n' + // Draw in red if mouse is pressed
  '   v_Color = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  ' } else {\n' +
  '   v_Color = a_Color;\n' + 
  ' }\n' +
  ' v_Dist = distance(u_ModelMatrix * a_Position, u_ViewMatrix * a_Position);\n' +
  ' v_Dist = gl_Position.w;\n' +
  '}\n';

var fragGameShader =
  'precision mediump float;\n' +

  'uniform vec3 u_LightColor;\n' +
  'uniform vec3 u_LightPosition;\n' +
  'uniform vec3 u_AmbientLight;\n' +
  'uniform vec3 u_FogColor;\n' + // Color of Fog
  'uniform vec2 u_FogDist;\n' +  // Distance of Fog (starting point, end point)
  // 'uniform bool u_Clicked;\n' +

  'varying vec4 v_Color;\n' + 
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'varying float v_Dist;\n' + 

  'void main() {\n' +
    // Calculation of fog factor (factor becomes smaller as it goes further away from eye point)
  ' float fogFactor = clamp((u_FogDist.y - v_Dist) / (u_FogDist.y - u_FogDist.x), 0.0, 1.0);\n' +
    // Stronger fog as it gets further
  ' vec3 color = mix(u_FogColor, vec3(v_Color), fogFactor);\n' +
    // Normalize the normal because it is interpolated and not 1.0 in length any more
  ' vec3 normal = normalize(v_Normal);\n' +
    // Calculate the light direction and make its length 1.
  ' vec3 lightDirection = normalize(u_LightPosition - v_Position);\n' +
    // The dot product of the light direction and the orientation of a surface (the normal)
  ' float nDotL = max(dot(lightDirection, normal), 0.0);\n' +
  ' vec3 eye = normalize(-v_Position);\n' + 
  ' vec3 reflection = normalize(-reflect(u_LightPosition, v_Normal));\n' +
  ' float rDotE = max(dot(reflection, eye), 0.0);\n' +
    // Calculate the final color from diffuse reflection and ambient reflection
  ' vec3 diffuse = u_LightColor * v_Color.rgb * nDotL;\n' +
  ' vec3 ambient = u_AmbientLight * v_Color.rgb;\n' +
  ' vec3 specular = v_Color.rgb * pow(rDotE, 2.0);\n' +
  ' gl_FragColor = vec4(diffuse + ambient + specular + color, v_Color.a);\n' +
  // ' gl_FragColor = vec4(v_Color.r + v_Color.g + v_Color.b + color, v_Color.a);\n' +
  '}\n';