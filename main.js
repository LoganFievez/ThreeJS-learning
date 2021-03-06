import * as Three from './three/three.module.js';

/**
 * @type {Three.PerspectiveCamera}
 */
let camera;
/**
 * @type {Three.Scene}
 */
let scene;
/**
 * @type {Three.WebGLRenderer}
 */
let renderer;
/**
 * @type {Three.Mesh}
 */
let cube;
const canvas = document.getElementById('container');

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

init();
animate();
renderer.render(scene, camera);

function init() {
  camera = new Three.PerspectiveCamera(70, canvas.clientWidth / canvas.clientHeight, 1, 1000);
  camera.position.z = 400;

  scene = new Three.Scene();

  const loader = new Three.TextureLoader();
  const texture = new CustomCubeTexture(
    new Three.MeshBasicMaterial({ map: loader.load('assets/textures/front.png') }),
    new Three.MeshBasicMaterial({ map: loader.load('assets/textures/back.png') }),
    new Three.MeshBasicMaterial({ map: loader.load('assets/textures/top.png') }),
    new Three.MeshBasicMaterial({ map: loader.load('assets/textures/bottom.png') }),
    new Three.MeshBasicMaterial({ map: loader.load('assets/textures/left.png') }),
    new Three.MeshBasicMaterial({ map: loader.load('assets/textures/right.png') })
  );

  const geometry = new Three.BoxGeometry(200, 200, 200);
  cube = new Three.Mesh(geometry, texture.toMaterial());
  cube.rotation.x = 25 * (Math.PI / 180);
  cube.rotation.y = 45 * (Math.PI / 180);
  cube.addEventListener('click', console.log);
  scene.add(cube);

  renderer = new Three.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  canvas.appendChild(renderer.domElement);

  initMouseMove();
}

function initMouseMove() {
  /**
   * @type {(this: Window, ev: MouseEvent) => any}
   **/
  let mouseMove_listener = (event) => {
    cube.rotation.y += (event.movementX * (Math.PI / 180)) / (window.step_anim || 4);
    cube.rotation.x += (event.movementY * (Math.PI / 180)) / (window.step_anim || 4);
    // console.log(cube.rotation);
    renderer.render(scene, camera);
  };
  canvas.addEventListener('mousedown', () => {
    window.addEventListener('mousemove', mouseMove_listener);
  });
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', mouseMove_listener);
  });
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
