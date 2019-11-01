import React from 'react';
import {AmbientLight as ThreeAmbientLight} from "three";
import AbstractObject from "../../abstract/AbstractObject";

class AmbientLight extends AbstractObject {

    componentDidMount() {
        const {
            // default
            scene,
            // custom
            color = 0xFFFFFF,
            intensity = 1,
        } = this.props;
        // add
        this.initComponent();
        this.obj = new ThreeAmbientLight(color);
        this.obj.intensity = intensity;
        scene.add(this.obj);
        setTimeout(() => {
            this.readyComponent();
        }, 1);
    }
}

export default AmbientLight;