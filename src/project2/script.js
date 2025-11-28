import * as THREE from 'three';
import gsap from 'gsap';
console.log(gsap);

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
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

//GSAP
gsap.to(mesh.position, {duration: 1, delay: 1, x: 2})
gsap.to(mesh.position, {duration: 1, delay: 2, x: 0})


//Time
let clock = new THREE.Clock();
// Animate and render the scene
function animate() {
    const elaspedTime = clock.getElapsedTime();
    requestAnimationFrame(animate);

    // Optional: rotate the box for some movement
    // camera.position.y = Math.sin(elaspedTime);
    // camera.position.x = Math.cos(elaspedTime);

    renderer.render(scene, camera);
}

animate();
