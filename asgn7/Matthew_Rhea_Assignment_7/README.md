Author: Matthew Rhea
CruzID: mrhea
Assignment 7:  Expressive and Interactive Experience
Link to live version on timeshare: https://people.ucsc.edu/~mrhea/

What's left to fix for final project rubric requirements:
  1. Make check() function properly for LoadedOBJ objects
  2. Fix processe such that only one check() allowed per frame
  3. Make check() only work on geometry in scene's gameGeometries array (already done, just not uploaded for this version)
  4. Make fog a work

Working to implement fog and maze game. In the works.

  1. 'Fog' effects that hide much of the geometry except those immediately surrounding camera
  2. Better camera movement 
  3. Specular lighting
  4. Rotating light
  5. Building a maze game out of the geometry
  6. Updated rendering method such that only geometry within near-far projection of camera is rendered
  7. FINAL: Optimize the rendering to get a usable frame rate!
  
My hope is that with a few camera and shader tricks much of the maze can be not rendered while you walk around the world. This should result in an increase in frame rate. Additionally, the effect will enhance the fog effects applied to the geometry. For example: If you are in an open space, the colors of the geometry closest to you will be their actual color, and the further it goes from the camera eye point it will gradual turn to the fog colors until it is outside of the camera's far plane. Anything past that is not rendered. 
