/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 * 
 * @author Matthew Rhea
 */

var mode = 'Color';  // By default, toggles between Rainbow 
var textureLocation = null;
var setCubeColor;

function initEventHandlers() {
  var mouseDrag;
  var SIZE = 25;
  window.rColor = 255.0;
  window.gColor = 255.0;
  window.bColor = 255.0;
  window.segments = 3;   // 1 be default (triangle)

  // Register function (event handeler) to be called on mouse press
  canvas.onmousemove = function(ev) {
    if (mouseDrag == true) {
      click(ev, canvas, SIZE); } };
  canvas.onmousedown = function(ev) { 
    mouseDrag = true;
    click(ev, canvas, SIZE); };
  canvas.onmouseup = function(ev) {
    mouseDrag = false;
    click(ev, canvas, SIZE); };
}

/**
 * Function called upon mouse click or mouse drag. Computes position of cursor,
 * pushes cursor position as GLSL coordinates, and draws.
 *
 * @param {Object} ev The event object containing the mouse's canvas position
 */
function click(ev, canvas, SIZE) {
  var xy = computeMousePosition(ev, canvas);

  var centerX = xy[0];
  var centerY = xy[1];

  // createShape(SIZE, centerX, centerY);

  var hit = check(centerX, centerY);
  console.log(hit);
  updateScore(hit);
  alert("Current score: " + score);
  console.log('RETURNED CHECK VALUE: ' + hit);
}

/**
 * Function called to find center X and center Y coordinates of mouse
 * position upon click()
 * @param {*} ev 
 * @param {*} canvas 
 */
function computeMousePosition(ev, canvas) {
  var x = ev.clientX, y = ev.clientY;

  // Get the position of <canvas> in client area
  var rect = ev.target.getBoundingClientRect();

  // Check x,y bounds for a rectangle object
  if (rect.left <= x ** x < rect.right && rect.top <= y && y < rect.bottom) {
    console.log('IN COMPUTE MOUSE CHECK BOUNDS');
    // x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
    x = (x - rect.left);
    // y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);
    y = (rect.bottom - y); 
    return points = [x, y];
  }

  // return points = [x, y];  
}

/**
 * Based on shapeType value, creates a new shape
 * 
 * @param size Size of shape to be rendered
 * @param centerX x coordinate of mouse position 
 * @param centerY y coordinate of mouse position
 */
function createShape(size, centerX, centerY) {
  switch(shapeType) {
    case 'triangle':
      let triangle = new FluctuatingTriangle(size, centerX, centerY);
      // triangle.color = setGeometryColor();
      scene.addGeometry(triangle);
      break;
    case 'square':
      let square = new SpinningSquare(size, centerX, centerY);
      // square.color = setGeometryColor();
      scene.addGeometry(square);
      break;
    case 'circle':
      let circle = new RandomCircle(size, segments, centerX, centerY);
      // circle.color = setGeometryColor();
      scene.addGeometry(circle);
      break;
    case 'cube':
      setCubeColor = true;
      let cube = new TiltedCube(size, centerX, centerY);
      // cube.color = setGeometryColor();
      scene.addGeometry(cube);
      break;
    default:
      console.log("Uhhmm, nothing happened!");
      return;
  }
  gl.clear(gl.COLOR_BUFFER_BIT);
  scene.render();
}

/**
 * Sets the color parameter of input shape
 * 
 * @param {object} shape
 */
function setGeometryColor() {
  // console.log('IN SET GEOMETRY COLOR()')
  s_colors = [];
  s_colors.push(rColor/255.0);  // Red
  s_colors.push(gColor/255.0);  // Green
  s_colors.push(bColor/255.0);  // Blue
  s_colors.push(1.0);           // Alpha 
  // console.log('SETGEOCOLOR() S_COLOR: ' + s_colors);
  return s_colors;
}

/**
 * toggles rainbow or solid color coloring mode
 * 
 */
function changeColorType() {
  var textForHTML;
  if (mode == 'Color') {
    mode = 'Rainbow';
    textForHTML = 'Rainbow';
  } else {
    mode = 'Color'
    textForHTML = 'Solid Color';
  }
  // console.log('CURRENT MODE: ' + mode);
  // console.log('TEXTFORHTML: ' + textForHTML);
  sendTextToHTML(textForHTML, 'color_mode');
}

/**
 * Clears the HTML canvas.
 */
function clearCanvas() {
  scene.clearGeometry();
  // gl.clearColor(0,0,0,1);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

/**
 * shapeType possible values:
 * 
 * 'triangle' (default)
 * 'square'
 * 'circle'
 */
let shapeType = 'triangle';
function chooseTriangle() {
  shapeType = 'triangle';
}
function chooseSquare() {
  shapeType = 'square';
}
function chooseCircle() {
  shapeType = 'circle';
}
function chooseCube() {
  shapeType = 'cube';
}
function chooseCheckerCube() {
  shapeType = 'checkerCube'
}
/**
 * Function to load .obj file using library function
 * Creates a new LoadedOBJ converted to a string
 * 
 */
function loadOBJFile(OBJLocation, TEXLocation, xPos, yPos, zPos) {
  let OBJ;
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", OBJLocation, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
    OBJ = new LoadedOBJ(result, TEXLocation, xPos, yPos, zPos);
    scene.addGeometry(OBJ); 
  }
}

/**
 * Loads a texture file 
 */
function loadTextureFile() {
  var imageReader = new FileReader();
  var texture = document.getElementById('textureFileToLoad').files[0];
  console.log(texture);

  imageReader.readAsDataURL(texture);
  imageReader.onload = function() {
    if (imageReader.result) {
      textureLocation = imageReader.result;
    } else {
      console.log('Texture file not loaded');
    }
  }
}



/**
 * Converts (read: unpacks) array of objects into individual numerical 
 * elements
 * 
 * Returns an array of numbers specifying coordinates of vertices 
 * 
 * @param {object} vertices 
 * @return {array} unpackedVertices
 */
function unpackVertexObjects(vertices) {
  var unpackedVertices = [];
  for (let i = 0; i < vertices.length; i++) {
    unpackedVertices.push(vertices[i].points[0],
                          vertices[i].points[1],
                          vertices[i].points[2]);
  }
  // console.log('data: ' + unpackedVertices);
  return unpackedVertices;
}

function getColorVertices(geo) {
  // console.log('in color vertices, geo: ' + geo.vertices[0].color);
  var colorVerts = new Float32Array(geo.vertices.length*4);
  var currVert;
  for (let i = 0; i < colorVerts.length; i+=4) {
    currVert = geo.vertices[i/4];
    // console.log('CURRENT VERT: ' + currVert);
    for (let j = 0; j < 4; j++) {
      colorVerts[i+j] = currVert.color[j];
      // console.log('CURRENT VERT COLOR: ' + currVert.color[j]);
    }
  }
  // console.log('colorverts: ' + colorVerts);
  return colorVerts;
}

/**
 * Allows for resizing of canvas element when browser size changes
 * 
 */
function resize() {
  // Lookup size the browser is displaying the canvas
  var displayWidth = window.innerWidth;
  var displayHeight = window.innerHeight;
  // console.log('Display Width: ' + displayWidth + ' ' + 'Display Height: ' + displayHeight);

  // Check if canvas is not same size
  if (canvas.width != displayWidth || canvas.height != displayHeight) {
    // Make canvas same size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }

}

/**
 * Resize HUD to fit client browser size
 */
function resizeHUDCanvas() {
  // Lookup size the browser is displaying the canvas
  var displayWidth = window.innerWidth;
  var displayHeight = window.innerHeight;

    // Check if HUD is not same size
    if (HUD.width != displayWidth || HUD.height != displayHeight) {
      // Make HUD same size
      HUD.width = displayWidth;
      HUD.height = displayHeight;
    } 
}

/**
 * @param {Number} x Mouse cursor center X coordinate
 * @param {Number} y Mouse cursor center Y coordinate
 *  
 * Checks whether user has clicked on a specific geometry in the scene
 * 
 * Change color of geometry and if current pixel is that color, user has clicked and
 * pass true to shader. Re-draw as original color afterwards. This is
 * done within the same function such that the user does not see the transition
 * between the colors. 
 */
function check(x, y) {
  console.log('x: ' + x + ' ' + 'y: ' + y);
  var picked = false;
  var texPicked = false; 
  var bools = []; // Array to store booleans

  // Send info to shaders an re-render
  gl.uniform1i(u_Clicked, 1); 
  gl.uniform1i(u_texClicked, 1);
  // gl.uniform1i(u_colorClicked, 1);

  tick(); // Enter new frame
  var pixels = new Uint8Array(4);
  gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  console.log('PIXEL COLOR AT 0: ' + pixels[0]);

  if (pixels[0] >= 70 && pixels[0] < 255) { // The mouse is on cube if in the range of fog colors
    console.log('You clicked a cube!');
    alert('You clicked a cube!')
    picked = true;
    deleteGameGeometry();
  } else {
    alert('You did NOT click a cube!');
    picked = false; 
  }
  
  if (pixels[1] == 255) {
    alert('You clicked an object!');
    texPicked = true;
  } else {
    alert('You did NOT click an object');
    texPicked = false;
  }

  gl.uniform1i(u_Clicked, 0); // Pass false to u_Clicked (rewrite cube)
  gl.uniform1i(u_texClicked, 0);
  // gl.uniform1i(u_colorClicked, 0);

  // Draw the cube with original color
  // scene.render();
  tick(); // Enter new frame

  bools = [picked, texPicked];
  return bools;
}


