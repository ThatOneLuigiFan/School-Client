import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

export class Player {
    constructor(scene, camera) {
        this.camera = camera;
        this.camera.position.y = 2;
        this.scene = scene;
        this.moveSpeed = 0.1;

        document.addEventListener('keydown', (e) => this.onKeyDown(e));
    }

    onKeyDown(event) {
        switch (event.code) {
            case 'KeyW':
                this.camera.position.z -= this.moveSpeed;
                break;
            case 'KeyS':
                this.camera.position.z += this.moveSpeed;
                break;
            case 'KeyA':
                this.camera.position.x -= this.moveSpeed;
                break;
            case 'KeyD':
                this.camera.position.x += this.moveSpeed;
                break;
        }
    }

    update() {
        // Update player logic (e.g., jumping, interaction)
    }
}
