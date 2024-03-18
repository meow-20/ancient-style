import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


//cursor code
// var cursor = document.querySelector('.cursor');
// document.body.addEventListener('mousemove', function(e){
//   cursor.style.left = e.clientX + 'px';
//   cursor.style.top = e.clientY + 'px';
// });



const scene = new THREE.Scene();
const loader = new GLTFLoader();

let mouse = {
	x: 0,
	y: 0
};

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight ,
  0.1,
  1000
);
camera.lookAt(0,0,0);
camera.position.set(0, 0, 50);
scene.add(camera);

const alight = new THREE.AmbientLight(0xffffff, 0.0001);
scene.add(alight);

const pointLight = new THREE.PointLight(0xffffff, 500);
pointLight.decay = 2.5;
scene.add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLightHelper);
document.addEventListener('mousemove', onMouseMove, false);
function onMouseMove(event) {
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
	vector.unproject(camera);
	let dir = vector.sub(camera.position).normalize();
	let distance = -camera.position.z / dir.z;
	let pos = camera.position.clone().add(dir.multiplyScalar(distance));
	pointLight.position.copy(pos);
  pointLight.position.z = 35;
};
scene.add(pointLight);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha:true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('#first-canvas').appendChild(renderer.domElement);

loader.load("/assets/graces/scene.gltf", function(gltf){
  // console.log(gltf);
  const graces = gltf.scene;
  graces.position.set(-35, -110, 35);
  scene.add(graces);
}, function(xhr){
  console.log((xhr.loaded/xhr.total * 100) + "% loaded");
}, function(error){
  console.log("an error occured: " +error);
});

// const controls = new OrbitControls(camera, renderer.domElement);

function action(){
  renderer.render(scene, camera);
  requestAnimationFrame(action);
}
window.onresize = function(e){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
}
action();