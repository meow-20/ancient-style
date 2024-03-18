import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const scene = new THREE.Scene();
const gltfloader = new GLTFLoader();

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

//lights
const alight = new THREE.AmbientLight(0xffffff, 0.001);
scene.add(alight);

const pointLight = new THREE.PointLight(0x8afafa, 3000);
pointLight.decay = 1.8;
pointLight.position.set(-40, 10, -10);
scene.add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLightHelper);
//renderer
const renderer = new THREE.WebGLRenderer({
    alpha:true,
    antialias:true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('#second-canvas').appendChild(renderer.domElement);

// adding girl to the scene
gltfloader.load("/assets/girl/scene.gltf", function(gltf){
    const girl = gltf.scene;
    girl.rotation.y = 1.1;
    girl.position.set(100, -100, -40);
    scene.add(girl);

    // dom manipulation k liye taiyaar!
    var nxt_btn = document.querySelector('.para button');
    var box = document.querySelector('.para');
    var text = document.querySelector('.para p');
    

    //declaring flag
    var flag = true;
    function anim(){
        if(flag){
            tl.play();
            setTimeout(function(){
                text.innerHTML = "Gorgeous Back-Less Dress";
                nxt_btn.innerHTML = "Return";
            }, 700);
            flag = false;
        } else {
            tl.reverse();
            setTimeout(function(){
                text.innerHTML = "Front Pattern of Maxi!";
                nxt_btn.innerHTML = "SEE BACKOF THIS DRESS";
            }, 2000);
            
            flag = true;
        }
    }
        var tl = gsap.timeline({reversed: true, paused: true});
        tl.to(box, {
            left: '60%',
            ease: Power1.easeInOut,
            duration: 1,
        }, 'together')
        tl.to(girl.position, {
            x: -120,
            y: -110,
            duration: 2,
        }, 'together')
        tl.to(girl.rotation, {
            y: -0.5,
            duration: 3,
        }, 'together')
        tl.to(pointLight.position, {
            x: 10,
            y: 30,
            delay: 1,
            duration: 2,
        }, 'together');

    nxt_btn.addEventListener("click", anim);

}, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% loaded");
}, function(error){
    console.log("an error occured: " +error);
});



function action(){
    renderer.render(scene, camera);
    requestAnimationFrame(action);
}
window.onresize = function(e){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
}
action();