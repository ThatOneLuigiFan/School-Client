import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { createWorld } from './world.js';
import { Player } from './player.js';

let scene, camera, renderer, player;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createWorld(scene);
    player = new Player(scene, camera);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    player.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

init();
