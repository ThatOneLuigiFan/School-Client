import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

export class Player {
    constructor(scene, camera) {
        this.camera = camera;
        this.scene = scene;
        this.moveSpeed = 0.1;
        this.lookSpeed = 0.002;
        this.velocity = new THREE.Vector3();

        this.initMouseLook();
        this.initKeyControls();
        this.initBlockInteractions();
    }

    initMouseLook() {
        document.body.requestPointerLock = document.body.requestPointerLock ||
                                           document.body.mozRequestPointerLock;

        document.addEventListener('click', () => {
            document.body.requestPointerLock();
        });

        document.addEventListener('mousemove', (event) => {
            if (document.pointerLockElement === document.body) {
                this.camera.rotation.y -= event.movementX * this.lookSpeed;
                this.camera.rotation.x -= event.movementY * this.lookSpeed;
                this.camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.camera.rotation.x));
            }
        });
    }

    initKeyControls() {
        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'KeyW':
                    this.velocity.z = -this.moveSpeed;
                    break;
                case 'KeyS':
                    this.velocity.z = this.moveSpeed;
                    break;
                case 'KeyA':
                    this.velocity.x = -this.moveSpeed;
                    break;
                case 'KeyD':
                    this.velocity.x = this.moveSpeed;
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.code) {
                case 'KeyW':
                case 'KeyS':
                    this.velocity.z = 0;
                    break;
                case 'KeyA':
                case 'KeyD':
                    this.velocity.x = 0;
                    break;
            }
        });
    }

    initBlockInteractions() {
        document.addEventListener('mousedown', (event) => {
            if (event.button === 0) {
                this.breakBlock();
            } else if (event.button === 2) {
                this.placeBlock();
            }
        });
    }

    breakBlock() {
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera({ x: 0, y: 0 }, this.camera);
        const intersects = raycaster.intersectObjects(this.scene.children);
        if (intersects.length > 0) {
            this.scene.remove(intersects[0].object);
        }
    }

    placeBlock() {
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera({ x: 0, y: 0 }, this.camera);
        const intersects = raycaster.intersectObjects(this.scene.children);
        if (intersects.length > 0) {
            const intersect = intersects[0];
            const blockGeometry = new THREE.BoxGeometry();
            const blockMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const block = new THREE.Mesh(blockGeometry, blockMaterial);

            const normalMatrix = new THREE.Matrix3().getNormalMatrix(intersect.object.matrixWorld);
            const normal = intersect.face.normal.clone().applyMatrix3(normalMatrix).normalize();

            block.position.copy(intersect.point).add(normal);
            block.position.divideScalar(1).floor().multiplyScalar(1).addScalar(0.5);

            this.scene.add(block);
        }
    }

    update() {
        this.camera.position.add(this.velocity.clone().applyQuaternion(this.camera.quaternion));
    }
}
