import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const loader3 = new GLTFLoader();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight ,
    0.1,
    1000
);
camera.lookAt(0,0,0);
camera.position.set(50, 0, 200);
scene.add(camera);

const alight = new THREE.AmbientLight(0xffffff, 0.001);
scene.add(alight);

const pointLightContainer = new THREE.Object3D();
scene.add(pointLightContainer);

const pointLight = new THREE.SpotLight(0xd4af37, 10000, 200, Math.PI * 0.25);
pointLight.position.set(0, 0, -230);
scene.add(pointLight);
pointLightContainer.add(pointLight);

loader3.load("/assets/cupid/scene.gltf", function(gltf){
console.log(gltf);
const cupid = gltf.scene;
cupid.position.set(-30, -70, -5);
scene.add(cupid);

}, function(xhr){
  console.log((xhr.loaded/xhr.total * 100) + "% loaded");
}, function(error){
console.log("an error occured: " +error);
});

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha:true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('#third-canvas').appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement); 


function action(){
  // controls.update();
  pointLightContainer.rotation.y += Math.sin(0.01);
  renderer.render(scene, camera);
  requestAnimationFrame(action);
}
window.onresize = function(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
action();