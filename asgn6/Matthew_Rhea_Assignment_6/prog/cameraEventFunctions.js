/**
 * Initializes event handlers for camera updates
 * 
 * NOTE: Add camera as a parameter to these functions??
 * 
 * @author Matthew Rhea
 */

var keyPressed; // May be used to indicate when to stop camera transformations when no key is pressed

/**
 * Responsibilie for initializing camera and button mapping
 * Handles movement and updating of camera positioning
 */
function initCameraHandlers() {
  // Map keys and update camera depending on event
  window.onkeydown =  function(ev) {
    keyDown(ev);
  };

  window.onresize = function(ev) {
    resize();
  }
  
  // Horizontal camera movement when mouse is moved
  // document.onmousemove = function(ev) {
  //   mouseMove(ev);
  // };

  // Initialize slider handlers
  document.getElementById('fov').onchange = function() { adjustFOV(this.value) };
  document.getElementById('near').onchange = function() { adjustNear(this.value)};
  document.getElementById('far').onchange = function() { adjustFar(this.value) };
}

/**
 * Maps key codes to camera events 
 * 
 * Camera rotation handled by mouse movement
 * FoV handles by GUI Slider
 * 
 * @param {object} ev 
 */
function keyDown(ev) {
  if (ev.keyCode == 78) {  // 'N' key pressed, change to Normal Shading
    setNormalShader();
  } else
  if (ev.keyCode == 87) {  // 'W' key pressed, forward movement
    movementTransform(1);
  } else 
  if (ev.keyCode == 68) { // 'D' key pressed, strafe right
    movementTransform(2);
  } else
  if (ev.keyCode == 83) { // 'S' key press, backward movement
    movementTransform(3);
  } else 
  if (ev.keyCode == 65) { // 'A' key pressed, strafe left
    movementTransform(4);
  } else
  if (ev.keyCode == 74) {  // 'J' key pressed, rotate left
    movementTransform(5);
  } else 
  if (ev.keyCode == 76) {  // 'K' key pressed, rotate right
    movementTransform(6);
  }
  scene.camera.toCameraUpdateAndShaders();
}

/**
 * 
 * @param {number} transformType Numerical value corresponding to type of camera transformation
 */
function movementTransform(transformType) {
  /*
   * Instead of actually calculating the change in mouse position, just multiply by a small
   * value such that the tranformation looks smooth enough for now
   */
  let rotateMatrix = new Matrix4();
  let angle;
  let dT = 0.1;
  // console.log('In movementTransform. Type: ' + transformType);
  switch(transformType) {
    case 1:  // Forward 
      console.log('In case 1');
      // console.log(scene.camera.Center);
      // scene.camera.Eye.elements[0] += scene.camera.Center.elements[0]*dT;  
      // scene.camera.Eye.elements[1] += scene.camera.Center.elements[1]*dT;
      scene.camera.Eye.elements[2] += scene.camera.Center.elements[2]*dT;
      break;
    case 2:  // Strafe right
      scene.camera.Eye.elements[0] += scene.camera.Side.elements[0]*dT;
      // scene.camera.Eye.elements[1] += scene.camera.Side.elements[1]*dT;
      // scene.camera.Eye.elements[2] += scene.camera.Side.elements[2]*dT;
      break;
    case 3:  // Backwards
      // scene.camera.Eye.elements[0] -= scene.camera.Center.elements[0]*dT;
      // scene.camera.Eye.elements[1] -= scene.camera.Center.elements[1]*dT;
      scene.camera.Eye.elements[2] -= scene.camera.Center.elements[2]*dT;
      break;
    case 4:  // Strafe left
      scene.camera.Eye.elements[0] -= scene.camera.Side.elements[0]*dT;
      // scene.camera.Eye.elements[1] -= scene.camera.Side.elements[1]*dT;
      // scene.camera.Eye.elements[2] -= scene.camera.Side.elements[2]*dT;
      break;
    case 5:  // Rotate left
      angle = 0.5;
      rotateMatrix.setRotate(angle, 0, 1, 0);
      scene.camera.Center = rotateMatrix.multiplyVector3(scene.camera.Center);
      scene.camera.Center[0] += angle
      scene.camera.Center[2] += angle
      scene.camera.Side = crossProduct(scene.camera.Center, scene.camera.Up);
      scene.camera.Side = normalize(scene.camera.Side);
      // scene.camera.Center[0] -= dT;
      // scene.camera.Center[1] -= dT;
      break;
    case 6:  // Rotate right
      angle = -0.5;
      rotateMatrix.setRotate(angle, 0, 1, 0);
      scene.camera.Center = rotateMatrix.multiplyVector3(scene.camera.Center);
      scene.camera.Center[0] += angle
      scene.camera.Center[2] += angle
      scene.camera.Side = crossProduct(scene.camera.Center, scene.camera.Up);
      scene.camera.Side = normalize(scene.camera.Side);
      // scene.camera.Center[0] += dT;
      // scene.camera.Center[1] += dT;
      break;
  }
}

/**
 * Upon releasing key down, set camera movement boolean
 * to false (ends camera transformations)
 * 
 * @param {object} ev 
 */
function keyUp(ev) {
  keypressed = false;
}

/**
 * Rotate camera horizontally upon mouse movement
 * 
 * @param {object} ev 
 */
// function mouseMove(ev) {

// }

/**
 * Adjusts camera field of view
 * @param {number} val 
 */
function adjustFOV(val) {
  scene.camera.FoV = parseInt(val);
  console.log(scene.camera.FoV)
  scene.camera.updateProjection();
}

/**
 * Changes camera near value 
 * 
 * @param {number} val 
 */
function adjustNear(val) {
  scene.camera.Near = parseInt(val);
  console.log(scene.camera.Near);
  scene.camera.updateProjection();
}

/**
 * Changes camera far value 
 * 
 * @param {number} val 
 */
function adjustFar(val) {
  scene.camera.Far = parseInt(val);
  console.log(scene.camera.Far)
  scene.camera.updateProjection();
}

/**
 * Changes camera perspective between Projection
 * and orthogonal
 */
function changePerspective() {
  // scene.camera.ortho = true;
  var textForHTML;
  if (scene.camera.ortho == false) {
    scene.camera.ortho = true;
    textForHTML = 'Orthogonal';
  } else {
    scene.camera.ortho = false;
    textForHTML = 'Projection';
  }
  sendTextToHTML(textForHTML, 'projButton')
  scene.camera.updateProjection();
  scene.camera.toCameraUpdateAndShaders();
}

/**
 * Change shader type to Normal Shading
 * Calculate color values of scene to be the normals of the objects
 */
function setNormalShader() {
  if (SHADER_MDOE == false) {
    NORMAL_SHADER_MODE = true;
  } else {
    NORMAL_SHADER_MDOE = false;
  }
}

/**
 * Normalizes a vector 
 * 
 * @param {vector3} v 
 */
function normalize(v) {
  var divisor = 1 / Math.sqrt(v.elements[0]*v.elements[0] + v.elements[1] *
      v.elements[1] + v.elements[2]*v.elements[2]);
  v.elements[0] /= divisor; 
  v.elements[1] /= divisor;
  v.elements[2] /= divisor; 
  return v;
}

/**
 * Returns the cross product of two vectors
 * 
 * @param {vector3} v1 
 * @param {vector3} v2 
 */
function crossProduct(v1, v2) {
  var v3 = new Vector3();
  v3.elements[0] = v1.elements[1]*v2.elements[2] - v1.elements[2]*v2.elements[1];
  v3.elements[1] = v1.elements[2]*v2.elements[0] - v1.elements[0]*v2.elements[2];
  v3.elements[2] = v1.elements[0]*v2.elements[1] - v1.elements[1]*v2.elements[0];
  return v3;
}

/**
 * Adds two vectors
 * 
 * @param {vector3} v1 
 * @param {vector3} v2 
 */
function addVectors(v1, v2) {
  var v3 = new Vector3();
  for (let i = 0; i < 3; i++) {
    v3.elements[i] = v1.elements[i] + v2.elements[i];
  }
  return v3;
}

/**
 * Rotates camera angle 
 * 
 * @param {number} angle 
 */
function rotateCamera(angle) {
  let rotateMatrix = new Matrix4();
  rotateMatrix.setRotate(angle, 0, 1, 0);
  scene.camera.Center = rotateMatrix.multiplyVector3(scene.camera.at);
  scene.camera.Side = crossProduct(scene.camera.at, scene.camera.up);
  scene.camera.Side = normalize(scene.camera.side);
}


