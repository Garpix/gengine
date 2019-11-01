import React from 'react';
import AbstractObject from "../../abstract/AbstractObject";
import {Math as ThreeMath} from 'three';

class DraggableFirstPersonControls extends AbstractObject {

    constructor() {
        super();
        this.sensitivity = 100;
        this.mouseX = 0;
        this.mouseY = 0;
        this.oldMouseX = 0;
        this.oldMouseY = 0;
        this.dragging = false;
        this.invertX = false;
        this.invertY = false;
        this.minRotationY = -Math.PI / 2;
        this.maxRotationY = Math.PI / 2;
    }

    componentDidMount() {
        const {
            camera,
            //
            invertX = this.invertX,
            invertY = this.invertY,
            sensitivity = this.sensitivity,
        } = this.props;
        this.initComponent();

        this.scale = 1;
        this.mouseX = 0;
        this.mouseY = 0;
        this.invertX = invertX;
        this.invertY = invertY;
        this.sensitivity = sensitivity;

        camera.rotation.order = "YXZ"; // this is not the default

        document.addEventListener( "mousemove", this.mouseMove, false );
        document.addEventListener( "mousedown", this.mouseDown, false );
        document.addEventListener( "mouseup", this.mouseUp, false );

        setTimeout(() => {
            this.readyComponent();
        }, 1);
    }
    
    mouseDown = (e) => {
        this.dragging = true;
        this.oldMouseX = e.clientX;
        this.oldMouseY = e.clientY;
    };

    mouseUp = (e) => {
        this.dragging = false;
    };

    mouseMove = (e) => {

        const {camera, renderer} = this.props;

        if (this.dragging) {

            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            let diffX = (this.oldMouseX - this.mouseX) / renderer.domElement.clientWidth;
            if (this.invertX) {
                diffX = -diffX;
            }
            let diffY = (this.oldMouseY - this.mouseY) / renderer.domElement.clientHeight;
            if (this.invertY) {
                diffY = -diffY;
            }

            diffX = diffX * this.sensitivity;
            diffY = diffY * this.sensitivity;

            camera.rotation.y += ThreeMath.degToRad(diffX);
            const newRotationY = camera.rotation.x + ThreeMath.degToRad(diffY);
            if (newRotationY < this.minRotationY) {
                camera.rotation.x = this.minRotationY;
            } else if (newRotationY > this.maxRotationY) {
                camera.rotation.x = this.maxRotationY;
            } else {
                camera.rotation.x = newRotationY;
            }
            camera.rotation.z = 0;

            this.oldMouseX = this.mouseX;
            this.oldMouseY = this.mouseY;
        }
        
    }
}

export default DraggableFirstPersonControls;
