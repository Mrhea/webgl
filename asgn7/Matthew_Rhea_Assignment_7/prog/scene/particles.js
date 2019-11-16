/**
 * Particle renderer 
 * 
 * @author Matthew Rhea  
 */


// Particle object
function Particle() {
  this.velocity = new Array(3);
  this.position = new Array(3);
  this.angle = 0;
  this.scale = 0;
  this.alpha = 0;
  this.wait = 0;
}

function createParticles() {
  var particle = new Array(500);
  for (var i = 0; i < particle.length; ++i) {
    particle[i] = new particle();
    initParticles(particle[i], true);
  }
}

function initParticles(p, wait) {

}

function updateParticle(p) {
  for (var i = 0; i < p.length; ++i) {
    // Wait for creation
    if (p[i].wait > 0) {
      p[i].wait--;
      continue;
    }
    // Update a vertex coordinate
    p[i].position[0] += p[i].velocity[0];
    p[i].position[1] += p[i].velocity[1];
    p[i].position[2] += p[i].velocity[2];

    // Decreate Y translation
    p[i].velocity[1] -= 0.003;
    // Fading out
    p[i].alpha -= 0.05;

    if (p[i].alpha <= 0) {
      initParticle(p[i], false);
    }
  }
}

function drawParticle(gl, p, perspectiveMatrixShaderLocation, modelMatrixShaderLocation, textureSamplerShaderLocation, alphaShaderLocation) {
  
  gl.bindBuffer(gl.ARRAY_BUFFER, g_quadVertexPositionBuffer);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  gl.bindBuffer(gl.ARRAY_BUFFER, g_quadVertexTexCoordBuffer);
  var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_TexCoord);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, TEXTURE);
  gl.uniform1i(textureSamplerShaderLocation, 0);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, IMAGE);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_quadVertexIndexBuffer);

  for (var i = 0; i < p.length; ++i) {
    if (p[i].wait <= 0) {
      g_modelMatrix.setTranslate(p[i].position[0], p[i].position[1], p[i].position[2]);
      // Rotate arounf z-axis to show the front face
      g_modelMatrix.rotate(p[i].angle, 0, 0, 1);
      var scale = 0.5 * p[i].scale;
      g_modelMatrix.scale(scale, scale, scale);

      gl.uniformMatrix4fv(modelMatrixShaderLocation, false, g_modelMatrix.elements);
      gl.uniform1f(alphaShaderLocation, p[i].alpha);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0);
    }
  }
}