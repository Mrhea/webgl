
/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 */
function initEventHandelers(canvas) {
  // Boolean to track mouse pressed
  var mouse_drag;
  var SIZE = 0;
  window.rColor = 255.0;
  window.gColor = 255.0;
  window.bColor = 255.0;

  // Initialize event listeners for color sliders to change variables
  document.getElementById('redSlider').addEventListener('input', 
    function() {window.rColor = this.value; });
  document.getElementById('blueSlider').addEventListener('input', 
    function() {window.bColor = this.value; });
  document.getElementById('greenSlider').addEventListener('input', 
    function() {window.gColor = this.value; });

  // Initialize event listeners for color sliders to send value to GLSL 
  document.getElementById('greenSlider').addEventListener('input', 
   function() {changePointColor(rColor, gColor, bColor); });
  document.getElementById('blueSlider').addEventListener('input', 
    function() {changePointColor(rColor, gColor, this.value); });
  document.getElementById('redSlider').addEventListener('input', 
    function() {changePointColor(this.value, gColor, bColor); });
  
  // Initialize event listeners for point size slider
  document.getElementById('pointSize').addEventListener('input',
    function() {changePointSize(this.value); });
  var sizeSlide = document.getElementById('pointSize');
  sizeSlide.addEventListener("input", function() {
    SIZE = sizeSlide.value;
  })

  // Register function (event handeler) to be called on mouse press
  canvas.onmousemove = function(ev) {
    if (mouse_drag == true) {
      click(ev, canvas, SIZE); } };
  canvas.onmousedown = function(ev) { 
    mouse_drag = true;
    click(ev, canvas, SIZE); };
  canvas.onmouseup = function(ev) {
    mouse_drag = false;
    click(ev, canvas, SIZE); };

}

/**
 * Function called upon mouse click or mouse drag. Computes position of cursor,
 * pushes cursor position as GLSL coordinates, and draws.
 *
 * @param {Object} ev The event object containing the mouse's canvas position
 * @param {Object} canvas The canvas element
 */
function click(ev, canvas, SIZE) {
  // Create new instance of point object
  var p_point = new Point();

  // Get current size value

  // Add XYZ vertices to g_points
  // ... and whatever else
  var x = ev.clientX;
  var y = ev.clientY;
  g_colors.push([rColor/255.0, gColor/255.0,
    bColor/255.0, 1.0]);

  // Get the position of <canvas> in client area
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
  y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);

  p_point.position = [x,y];
  p_point.size = SIZE;
  p_point.color = g_colors;

  // Store the coordinates to g_points array
  g_pointObjs.push(p_point);
  render();
}

/**
 * Renders the scene on the HTML canvas.
 */
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT); // Clear screen to black

  len = g_pointObjs.length;

  for (let i = 0; i < len; i++)
  {
    var xy = g_pointObjs[i].position;
    var rgba = g_colors[i];
    var size = g_pointObjs[i].size;
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniform1f(u_PointSize, size);

    gl.drawArrays(gl.POINTS, 1, 1);
  }
}

/**
 * Clears the HTML canvas.
 */
function clearCanvas() {
  g_pointObjs = []
  render();
}

/**
 * Changes the size of the points drawn on HTML canvas.
 *
 * @param {float} size Real value representing the size of the point.
 */
function changePointSize(size) {
  sendUniformFloatToGLSL(size, u_PointSize);
  render();
}

/**
 * Changes the color of the points drawn on HTML canvas.
 *
 * @param {float} color Color value from 0.0 to 1.0.
 */
function changePointColor(rColor, gColor, bColor) {
  sendUniformVec4ToGLSL(g_colors, u_FragColor);
  render();
}
