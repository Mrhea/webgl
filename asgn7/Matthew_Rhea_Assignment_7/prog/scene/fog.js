/**
 * Render fog for scene
 * 
 * @author Matthew Rhea
 */

var u_FogColor;
var u_FogDist;
var fogColor;
var fogDist;
function createFog() {
  // Color of Fog
  fogColor = new Float32Array([0.137, 0.231, 0.423]);
  // Distance of fog [where fog starts, where fog completely covers object]
  fogDist = new Float32Array([350, -1]);
  // fogDist = new Float32Array([10, scene.camera.Eye[2]]);
  initFogHandlers();
  sendFogToGLSL();
}

function sendFogToGLSL() {
  u_FogColor = gl.getUniformLocation(gl.program, 'u_FogColor');
  u_FogDist = gl.getUniformLocation(gl.program, 'u_FogDist');
  if (!u_FogColor || !u_FogDist) {
    console.log('Failed to get storage location of fog uniform');
  }

  gl.uniform3fv(u_FogColor, fogColor); // Colors
  gl.uniform2fv(u_FogDist, fogDist);   // Starting point and end point
}

function resetFog() {
  fogDist = ([350, -1]);
}

function initFogHandlers() {
  document.onkeydown = function(ev){ keydown(ev); }
}

function keydown(ev) {
  switch (ev.keyCode) {
    // case 38:
    case 83:
      fogDist[0] += 50;
      // fogDist[2] -= 10;
      // scene.camera.Far += 1;
      break;
    // case 40:
    case 87:
      if (fogDist[0] <= 50) {
        console.log('Fog value cannot be less than 50');
        return; 
      }
      if (fogDist[0] > fogDist[1]) fogDist[0] -= 50;
      // fogDist[2] += 10;
      // scene.camera.Far -= 1;
      break;
    default: return;
  }
}