/**
 * Generates terrain from loaded texture on a per pixel basis
 * 
 * @author Matthew Rhea
 */


 /**
 * Samples the color of each pixel in an image.
 *
 * @param {Image} image The image whose color data is being sampled
 * @returns {Array} A 1-D array of RGBA values in row-major order
 */
function sampleImageColor(image) {
  var imageCanvas = document.createElement('canvas');

  imageCanvas.height = image.height;
  imageCanvas.width = image.width;
  console.log(canvas);
  var context = imageCanvas.getContext('2d');
  context.drawImage(image, 0, 0);

  var colorData = context.getImageData(0, 0, image.width, image.height).data;

  return colorData;
}

/**
 * Loads image data and returns and Image object
 * for data sampling
 * 
 * @param {string} imageSource A string path to image source file
 * @returns {Image} image
 */
function loadImage(imageSource, imageSize) {
  return new Promise(resolve => {
    var image = new Image(imageSize, imageSize);
    image.onload = () => resolve(sampleImageColor(image))
    image.src = imageSource;
  });
}

/**
 * Uses data from height and color maps to create cubic structures
 */
function buildWorld(height_data, color_data) {
  console.log('In build world');
  var row = 0;
  var column = 16;
  var xPos, zPos;

  for (let i = 0; i < height_data.length; i += 1) {
    if (row == 16) {
      row = 0; 
      column -= 1;
    }
    row++
    xPos = row;
    zPos = column*-1;
    switch (height_data[i]) {
      case 0:
        buildFloor(color_data[i], height_data[i], xPos, zPos);
        break;
      case 1:
        buildWall(color_data[i], height_data[i], xPos, zPos);
        break;
      case 2:
        buildTallWall(color_data[i], height_data[i], xPos, zPos);
        break;
    }
    xPos += 1;
    zPos -= 1;
  }
  console.log('Done building world');
}

/**
 * Creates cube at floor level y-position
 * Add new geometry to scene
 * 
 * 
 */
function buildFloor(color_data, height_data, xPos, zPos) {
  // console.log('COLOR: ' + color_data + ' HEIGHT: ' + height_data);
  var cube = new Cube(2, xPos, -0.5, zPos, height_data);
  for (let i = 0; i < cube.vertices.length; i++) {
    cube.vertices[i].color = color_data;
    // cube.vertices[i].color[3] = .1;
  }
  scene.addGeometry(cube);
}

/**
 * Creates cube at mid-level y-position
 * Add new geometry to scene
 * 
 * 
 */
function buildWall(color_data, height_data, xPos, zPos) {
  // console.log('COLOR: ' + color_data + ' HEIGHT: ' + height_data);
  for (let i = 0; i < 3; i++) {
    let cube = new Cube(2, xPos, i, zPos, height_data/2);
    for (let i = 0; i < cube.vertices.length; i++) {
      cube.vertices[i].color = color_data;
      // cube.vertices[i].color[3] = .1;
    }
    scene.addGeometry(cube);
  }
}

/**
 * Creates cube at high level y-position
 * Add new geometry to scene
 * 
 */
function buildTallWall(color_data, height_data, xPos, zPos) {
  // console.log('COLOR: ' + color_data + ' HEIGHT: ' + height_data);
  for (let i = 0; i < 5; i++) {
    let cube = new Cube(2, xPos, i+0.2, zPos, height_data/3);
    for (let i = 0; i < cube.vertices.length; i++) {
      cube.vertices[i].color = color_data;
      // cube.vertices[i].color[3] = .1;
    }
    scene.addGeometry(cube);
  }
}

/**
 * Generate cube enviroment map from texture images
 */
async function generateWorld(heightPath, colorPath) {
  console.log(scene.camera);
  console.log('In generate world');

  // Add default LoadedOBJ geometry
  // Don't remove LoadedOBJs or else everything breaks \*_*/
  // I haven't bothered to figure out why yet
  var TEXLocation = 'external/textures/cat_diff.jpg';
  var OBJLocation = 'external/OBJ/cat.obj';
  loadOBJFile(OBJLocation, TEXLocation, 13.0, 1.0, -12.0);
  OBJ_POSITION = [5, 0, 0];
  TEXLocation = 'external/textures/TeapotTex.png';
  OBJLocation = 'external/OBJ/teapot.obj';
  loadOBJFile(OBJLocation, TEXLocation, 1.0, 1.0, -12.0);
  // OBJLocation = 'external/OBJ/spyro.obj';
  // loadOBJFile(OBJLocation, null, 8.0, 1.0, 1.0);

  // Image/world size
  var imageSize = 16; // Currently only using 16x16 textures to generate world 

  // Load height and texture maps (returns arrays of data)
  var height_map = await loadImage(heightPath, imageSize), height_data = [];
  var texture_map = await loadImage(colorPath, imageSize), color_data = [];


  // console.log('TEX MAP: ' + texture_map);
  // console.log('HEIGHT MAP: ' + height_map);

  // Loop through terrain mapping data
  var current = 0;
  const square = (imageSize => Math.pow(imageSize, 2));
  var columns = square(imageSize) * 4;
  var index = 0;
  while (current < columns) {
    height_data[index] = Math.round(height_map[current]/255 * 2); // Map values from [0,255] -> [0, 2]
    color_data[index] = [texture_map[current]/255,        // Array of color arrays 
      texture_map[current+1]/255, 
      texture_map[current+2]/255, 
      texture_map[current+3]/255];

    current += 4;
    index += 1;
  }

  // console.log('COLOR DATA: ' + color_data);
  // console.log('HEIGHT DATA: ' + height_data);
  if (height_data.length == color_data.length) {
    console.log('ITS HAPPENING');
  }
  
  // Build the world 
  buildWorld(height_data, color_data);


  // Update camera and shaders in order to view projected 3D world
  scene.camera.toCameraUpdateAndShaders();
}