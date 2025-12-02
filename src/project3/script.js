import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Create a new scene
const scene = new THREE.Scene();

// Set up a perspective camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a box geometry and a basic material, then mesh them together
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);

// Add the mesh to the scene
scene.add(mesh);

// Position the camera so we can see the box
camera.position.z = 5;

// Create the renderer and add it to the DOM
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // For retina displays

// Make the scene responsive
window.addEventListener('resize', () => {
    // Update camera aspect ratio and projection matrix
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer size and pixel ratio
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//FullScreen
window.addEventListener('dblclick', ()=> {
    if(!document.fullscreenElement){
        canvas.requestFullscreen();
    }else{
        document.exitFullscreen();
    }
    
})

// Add OrbitControls to allow camera orbiting
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // adds smoothness to controls

// Animate and render the scene
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}

animate();