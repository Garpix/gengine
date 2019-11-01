import {OrbitControls as ThreeOrbitControls} from "three/examples/jsm/controls/OrbitControls";
import React from 'react';
import AbstractObject from "../../abstract/AbstractObject";

class OrbitControls extends AbstractObject {

    componentDidMount() {
        const {
            camera,
            // custom
            minDistance = 3,
            maxDistance = 20,
        } = this.props;
        this.initComponent();
        this.obj = new ThreeOrbitControls(camera);

        this.obj.rotateSpeed = 0.3;
        this.obj.zoomSpeed = 0.9;

        this.obj.minDistance = minDistance;
        this.obj.maxDistance = maxDistance;
        //
        // this.obj.minPolarAngle = 0; // radians
        // this.obj.maxPolarAngle = Math.PI / 2; // radians
        //
        // this.obj.enableDamping = true;
        // this.obj.dampingFactor = 0.05;

        // renderCalls.push(function () {
        //     controls.update();
        // });
        // return controls;
        setTimeout(() => {
            this.readyComponent();
        }, 1);
    }
}

export default OrbitControls;
