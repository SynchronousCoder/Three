import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// Import lil-gui (assuming using module system)
import * as lil from 'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight, // Corrected aspect ratio
    0.1,
    100
);

// // Creating a single triangle with BufferGeometry
// const geometry = new THREE.BufferGeometry();
// const vertices = new Float32Array([
//     // Vertices of a cube (8 unique corners)
//     0, 0, 0,
//     1, 0, 0,
//     1, 1, 0,
//     0, 1, 0,
//     0, 0, 1,
//     1, 0, 1,
//     1, 1, 1,
//     0, 1, 1,
// ]);
// geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
// const material = new THREE.MeshBasicMaterial({ color: "red", side: THREE.DoubleSide });

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: "green"})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

camera.position.z = 4;

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // for smoother controls

// Optionally add window resize handler for user experience
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});



// Add lil-gui panel for material and mesh settings

const gui = new lil.GUI();

// Mesh position controls
const meshFolder = gui.addFolder('Mesh');
meshFolder.add(mesh.position, 'x', -5, 5, 0.01).name('Position X');
meshFolder.add(mesh.position, 'y', -5, 5, 0.01).name('Position Y');
meshFolder.add(mesh.position, 'z', -5, 5, 0.01).name('Position Z');
meshFolder.add(mesh.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
meshFolder.add(mesh.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
meshFolder.add(mesh.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');
meshFolder.add(mesh.scale, 'x', 0.1, 3, 0.01).name('Scale X');
meshFolder.add(mesh.scale, 'y', 0.1, 3, 0.01).name('Scale Y');
meshFolder.add(mesh.scale, 'z', 0.1, 3, 0.01).name('Scale Z');
meshFolder.open();

// Material settings controls
const matFolder = gui.addFolder('Material');
matFolder.addColor(material, 'color').name('Color').onChange(() => material.needsUpdate = true);

if ('wireframe' in material) {
    matFolder.add(material, 'wireframe').name('Wireframe').onChange(() => material.needsUpdate = true);
}
if ('opacity' in material) {
    matFolder.add(material, 'opacity', 0, 1, 0.01).name('Opacity')
        .onChange(() => { material.transparent = material.opacity < 1; material.needsUpdate = true; });
}
matFolder.open();



function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();