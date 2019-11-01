import React from 'react';
import {DirectionalLight as ThreeDirectionalLight, CameraHelper} from "three";
import AbstractObject from "../../abstract/AbstractObject";

class DirectionalLight extends AbstractObject {

    constructor() {
        super();
        this.cameraHelper = null;
    }

    componentDidMount() {
        const {
            // default
            scene,
            enableShadows,
            debug,
            // custom
            color = '#ffffff',
            intensity = 1,
            position = [1, 1, 1],
        } = this.props;
        this.initComponent();
        // add
        this.obj = new ThreeDirectionalLight(color);
        this.obj.intensity = intensity;
        this.obj.position.set(...position);
        this.obj.castShadow = enableShadows;
        // this.obj.shadow.radius = 1;

        // this.obj.shadowCameraVisible = true;
        // this.obj.shadowCameraNear = 250;
        // this.obj.shadowCameraFar = 600;
        // this.obj.bias = 0.01;
        this.obj.shadowCameraLeft = -200;
        this.obj.shadowCameraRight = 200;
        this.obj.shadowCameraTop = 200;
        this.obj.shadowCameraBottom = -200;

        this.obj.shadow.mapSize.width = 4096;
        this.obj.shadow.mapSize.height = 4096;
        // this.obj.shadow.mapSize.width = 2048;
        // this.obj.shadow.mapSize.height = 2048;

        this.cameraHelper = new CameraHelper(this.obj.shadow.camera);
        this.cameraHelper.near = 250;
        this.cameraHelper.far = 600;
        if (debug) {
            scene.add(this.cameraHelper);
        }

        // this.obj.shadow.camera.near = 1;
        // this.obj.shadow.camera.far = 10;

        // this.obj.shadowCameraLeft = -3000;
        // this.obj.shadowCameraRight = 3000;
        // this.obj.shadowCameraTop = 3500;
        // this.obj.shadowCameraBottom = -3000;
        scene.add(this.obj);
        setTimeout(() => {
            this.readyComponent();
        }, 1);
    }
}

export default DirectionalLight;