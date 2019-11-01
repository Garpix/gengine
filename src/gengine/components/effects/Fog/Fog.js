import React from 'react';
import {
    Fog as ThreeFog,
} from "three";
import AbstractObject from "../../abstract/AbstractObject";

class Fog extends AbstractObject {

    componentDidMount() {
        const {
            // default
            scene,
            // custom
            color = '#ffffff',
            near = 10,
            far = 100,
        } = this.props;
        this.initComponent();

        this.obj = new ThreeFog(color, near, far);
        scene.fog = this.obj;

        setTimeout(() => {
            this.readyComponent();
        }, 1);
    }
}

export default Fog;