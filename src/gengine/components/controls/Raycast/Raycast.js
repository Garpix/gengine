import React from 'react';
import AbstractObject from "../../abstract/AbstractObject";
import {Raycaster} from 'three';
import {SCENE_NAME} from '../../../constants';

class Raycast extends AbstractObject {

    constructor() {
        super();
        this.raycaster = null;
        this.mouse = {
            x: 0,
            y: 0
        };
        this.raycastedObject = null;
        // anti drag
        this.minDeltaDragging = 1;
        this.mouseDowned = false;
        this.dragging = false;
        this.oldMouseX = 0;
        this.oldMouseY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
    }

    componentDidMount() {
        const {renderer, canvasDomElement} = this.props;
        this.raycaster = new Raycaster();
        canvasDomElement.addEventListener('mousedown', this.mouseDown, false);
        canvasDomElement.addEventListener('mouseup', this.mouseUp, false);
        canvasDomElement.addEventListener('mousemove', this.mouseMove, false);
        // canvasDomElement.addEventListener('mousemove', this.raycastMouseMove, false);
    }

    mouseMove = (e) => {
        if (this.mouseDowned && !this.dragging) {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            if (
                (Math.abs(this.mouseX - this.oldMouseX) > this.minDeltaDragging) ||
                (Math.abs(this.mouseY - this.oldMouseY) > this.minDeltaDragging)
            ) {
                this.dragging = true;
            }
        }
    };

    mouseDown = (e) => {
        this.mouseDowned = true;
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.oldMouseX = this.mouseX;
        this.oldMouseY = this.mouseY;
    }

    mouseUp = (e) => {
        if (!this.dragging) {
            this.raycastClick(e);
        }
        this.mouseDowned = false;
        this.dragging = false;
    };

    raycastMouseMove = (e) => {
        const {getComponentByUuid} = this.props;
        const obj = this.raycast(e);
        if (this.raycastedObject && (!obj || (this.raycastedObject.uuid !== obj.uuid))) {
            const component = getComponentByUuid(this.raycastedObject.uuid);
            if (component && component.onBlur) {
                component.onBlur(component);
            }
        }
        if (obj && obj.uuid) {
            this.raycastedObject = obj;
            const component = getComponentByUuid(obj.uuid);
            if (component && component.onHover) {
                component.onHover(component);
            }
        }
    };

    raycastClick = (e) => {
        const {getComponentByUuid} = this.props;
        const obj = this.raycast(e);
        if (obj && obj.uuid) {
            const component = getComponentByUuid(obj.uuid);
            if (component && component.onClick) {
                component.onClick(component);
            }
        }
    };

    getTopLevelObject = (obj) => {
        if (obj.name === SCENE_NAME || !obj.object.parent) {
            return obj;
        }
        let parentObj = obj.object;
        while (parentObj.parent.name !== SCENE_NAME) {
            parentObj = parentObj.parent;
        }
        return parentObj;
    };

    raycast = (e) => {
        const {camera, renderer, scene} = this.props;
        this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
        this.raycaster.setFromCamera( this.mouse, camera );
        let intersects = this.raycaster.intersectObjects( scene.children, true );
        for ( var i = 0; i < intersects.length; i++ ) {
            const obj = this.getTopLevelObject(intersects[i]);
            return obj;
        }
        this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, camera );
        intersects = this.raycaster.intersectObjects( scene.children );
        for ( var i = 0; i < intersects.length; i++ ) {
            // console.log( intersects[ i ] );
            const obj = this.getTopLevelObject(intersects[i]);
            return obj;
        }

    }
}

export default Raycast;
