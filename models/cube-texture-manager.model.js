class CustomCubeTexture {
  /**
   *
   * @param {Three.MeshBasicMaterial} front
   * @param {Three.MeshBasicMaterial} back
   * @param {Three.MeshBasicMaterial} top
   * @param {Three.MeshBasicMaterial} bottom
   * @param {Three.MeshBasicMaterial} left
   * @param {Three.MeshBasicMaterial} right
   */
  constructor(front, back, top, bottom, left, right) {
    this.right = right;
    this.left = left;
    this.top = top;
    this.bottom = bottom;
    this.front = front;
    this.back = back;
  }

  setRight() {}

  toMaterial() {
    return [this.right, this.left, this.top, this.bottom, this.front, this.back];
  }
}

export { CustomCubeTexture };
