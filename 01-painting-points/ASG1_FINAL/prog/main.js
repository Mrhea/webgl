/**
 * Function called when the webpage loads.
 */

let gl

// Point object declaration
function Point(position, color, size) {
  this.position = position;
  this.color = color;
  this.size = size;
}

let g_pointObjs = [];  // Point object array
let g_colors = []; // Point color array (initialized to color white)

function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    gl = getWebGLContext(canvas);
    if (!gl)
    {
        console.log('Failed to retrive rendering context for WebGL');
        return;
    }
    
    // Initialize shaders
    if (!initShaders(gl, ASSIGN1_VSHADER, ASSIGN1_FSHADER))
    {
        console.log("Failed to initialize shaders");
        return;
    }

    // Get the storage location of a_Position variable
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0)
    {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    // Get storage location of u_FragColor
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor)
    {
        console.log('Failed to get storage location of u_FragColor');
        return;
    }

    // Get storage location of u_PointSize
    u_PointSize = gl.getUniformLocation(gl.program, 'u_PointSize');
    if (!u_PointSize)
    {
        console.log('Failed to get storage location of u_PointSize');
        return;
    }

    // Initialize event handelers
    initEventHandelers(canvas);

    // Initliaze the clear color to black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    render();
}
