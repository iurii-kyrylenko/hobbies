import { Component, OnInit, ViewChild } from '@angular/core';
const THREE = require('three/build/three');

@Component({
    template: `
        <div #sceneContainer></div>
    `
})
export class HomeComponent implements OnInit {

    scene: any;
    camera: any;
    renderer: any;
    thorus: any;
    @ViewChild('sceneContainer') sceneContainer: any;

    ngOnInit() {

        const width = 300;
        const height = 300;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(width, height);

        const thorusGeometry = new THREE.TorusGeometry(2.6, 1, 16, 48);
        const thorusMaterial = new THREE.MeshBasicMaterial({color: 0x909090, wireframe: true});
        this.thorus = new THREE.Mesh(thorusGeometry, thorusMaterial);
        this.scene.add(this.thorus);

        this.camera.position.z = 10;
        this.camera.lookAt(this.scene.position);

        this.sceneContainer.nativeElement
            .appendChild(this.renderer.domElement);

        this.animate();
    }

    render() {
        this.thorus.rotation.x += 0.0041;
        this.thorus.rotation.y += 0.0042;
        this.thorus.rotation.z += 0.0043;
        this.renderer.render(this.scene, this.camera);
    }

    animate() {
        const inner = () => this.animate();
        requestAnimationFrame(inner);
        this.render();
    }
}
