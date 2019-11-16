/**
 * Specifies a vertex.
 *
 * @author Matthew Rhea
 * @this {Vertex}
 */
class Vertex {
  constructor() {
    this.points = new Vector3(); // May want to use a vector3 instead
    this.color = [];
    this.uv = [];
    this.normal = new Vector3();
  }

  convertPointVecToArr() {
    var array = [];
    for (let i of this.points.elements) {
      array.push(i);
    }
    return array; 
  }
}
