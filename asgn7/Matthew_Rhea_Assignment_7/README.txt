Author: Matthew Rhea CruzID: mrhea Assignment 7: Expressive and Interactive Experience
Link to live version on timeshare: https://people.ucsc.edu/~mrhea/

------------------------------------------------------
NOTE TO USER:
The camera controls using WASD work perfectly fine and are more or less functional as aspected for moving forwards, backwards, and strafing left and right. Camera rotation, however, may give you trouble depending on how much you have strafed. Moving backwards and forwards does not affect it, but strafing does. Be careful!


Do NOT click on the screen if you are testing the fog and alpha blending effects. The game has bugs and does not function properly. Most notably, a single click is registered as multiple, so the game will create at least 2 or 3 calls to alert() before resuming normal execution. 

------------------------------------------------------

This is a mostly finished version of my final project. I implemented FOG and ALPHA BLENDING effects alongside an almost functional search-and-destroy style game in which you have to navigate the scene in order to find spinning cubes. There are three in each scene, and you must click on each one (this is my implementation of color-based picking) in order to destroy them. Once all three spinning cubes are destroyed, the game will notify you it is loading the next level. 

At this point, the camera and timer will be reset, and the scene re-rendered with a new layout of geometry. You must complete each level before the timer runs out or else you lose the game. If won, you get a nice message congratulating you.

You can visualize my usage of the FOG and ALPHA BLENDING effects by walking towards the geometry with the 'w' key to decrease the amount of fog and the 's' key to move backwards, increasing the amount of fog in the scene.

The idea was that it would make the cubes you want to destroy harder to see in the world. Clearly it is far from perfect, but it is a functional application of the techniques describe in the book applied to a 3D rendered world. 


As for the rubric:

I have a world generated with multiple geometries and you can navigate it.
I have a light source comprised of diffuse and ambient light. 
The user can interact with the world geometry, the spinning cubes, and LoadedOBJ object.
I implemented the atmospheric effect FOG.
I created a 2D game that can seamlessly load several levels for the player to play for my "engaging experience" using computer graphics.


What I changed from the previous project in order to complete this one:

- Wrote fog.js
- Wrote game.js
- Wrote new shaders in shader.js
- Implemented new functions in eventFunctions.js and altered old ones
- Made changes to main.js
- Create a new animated cube class in newTiltedCube.js
- Altered LoadedOBJ.js
- Altered tick.js
- Altered worldGeneration.js
- Fixed MANY bugs in camera.js and cameraEventFunctions.js to make camera more functional (not perfect tho)
- Fixed bugs in glslFunctions.js
- Added music in driver.html
