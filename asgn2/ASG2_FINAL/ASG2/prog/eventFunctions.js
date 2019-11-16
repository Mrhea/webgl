
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
      let triangle = new Triangle(size, centerX, centerY);
      triangle.color = setGeometryColor();
      scene.addGeometry(triangle);
      break;
    case 'square':
      let square = new Square(size, centerX, centerY);
      square.color = setGeometryColor();
      scene.addGeometry(square);
      break;
    case'circle':
      let circle = new Circle(size, segments, centerX, centerY);
      circle.color = setGeometryColor();
      scene.addGeometry(circle);
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
  s_colors.push(rColor/255.0);
  s_colors.push(gColor/255.0);
  s_colors.push(bColor/255.0);
  
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

/**
 * Function to load .obj file using library function
 * Creates a new LoadedOBJ
 */
function loadOBJFile() {
  console.log('This will load a .obj file later!');
  return; 
}