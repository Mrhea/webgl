
/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 * 
 * @author Matthew Rhea
 */

function initEventHandlers() {
  var mouseDrag;
  var SIZE = 0;
  window.rColor = 255.0;
  window.gColor = 255.0;
  window.bColor = 255.0;
  window.segments = 1;   // 1 be default (triangle)

  // Initialize event listeners for color sliders to change variables
  document.getElementById('redSlider').addEventListener('input',
    function() {window.rColor = this.value;});
  document.getElementById('blueSlider').addEventListener('input',
    function() {window.bColor = this.value;});
  document.getElementById('greenSlider').addEventListener('input',
    function() {window.gColor = this.value;});

  document.getElementById('segmentCount').addEventListener('input',
    function() {segments = this.value;});

  document.getElementById('shapeSize').addEventListener('input',
    function() {SIZE = this.value;});

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
  // Implement x,y positions on screen by sending text to HTML

  var xy = computeMousePosition(ev, canvas);

  var centerX = xy[0];
  var centerY = xy[1];


  createShape(SIZE, centerX, centerY);
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

  x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
  y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);

  return points = [x, y];  
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
      triangle.color = setGeometryColor();
      scene.addGeometry(triangle);
      break;
    case 'square':
      let square = new SpinningSquare(size, centerX, centerY);
      square.color = setGeometryColor();
      scene.addGeometry(square);
      break;
    case 'circle':
      let circle = new RandomCircle(size, segments, centerX, centerY);
      circle.color = setGeometryColor();
      scene.addGeometry(circle);
      break;
    case 'cube':
      let cube = new TiltedCube(size, centerX, centerY);
      cube.color = setGeometryColor();
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
  s_colors = [];
  // s_colors.push([rColor/255.0, gColor/255.0, bColor/255.0]);
  s_colors.push(rColor/255.0);  // Red
  s_colors.push(gColor/255.0);  // Green
  s_colors.push(bColor/255.0);  // Blue
  s_colors.push(1.0);           // Alpha
  
  return s_colors;
}

/**
 * Clears the HTML canvas.
 */
function clearCanvas() {
  scene.clearGeometry();
  gl.clearColor(0,0,0,1);
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

/**
 * Function to load .obj file using library function
 * Creates a new LoadedOBJ converted to a string
 * 
 */
function loadOBJFile() {
  var fileToLoad = document.getElementById('fileToLoad').files[0];

  console.log(typeof(fileToLoad));

  var fileReader = new FileReader();

  fileReader.onload = function(fileLoadedEvent) {
    var fileText = fileReader.result;
    console.log(fileText);
    createLoadedOBJShape(fileText);
  }

  fileReader.readAsText(fileToLoad, "UTF-8");
}

/**
 * Function to initialize and render object file loaded from
 * local system
 * 
 * @param 
 */
function createLoadedOBJShape(fileText) {
  var loadedOBJFile = new LoadedOBJ(fileText);
  console.log('loadedOBJFile: ' + loadedOBJFile);
  loadedOBJFile.color = setGeometryColor();
  scene.addGeometry(loadedOBJFile);
  scene.render();
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