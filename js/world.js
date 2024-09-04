import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

export function createWorld(scene) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    for (let x = -10; x < 10; x++) {
        for (let z = -10; z < 10; z++) {
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x, 0, z);
            scene.add(cube);
        }
    }
}
