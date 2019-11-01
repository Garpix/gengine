import React from 'react';
import {
    // MeshBasicMaterial,
    MeshLambertMaterial,
    Mesh,
    BoxBufferGeometry,
} from "three";
import AbstractObject from "../../abstract/AbstractObject";

class Box extends AbstractObject {

    componentDidMount() {
        const {
            // default
            scene,
            enableShadows,
            // custom
            scale = [1, 1, 1],
            color = '#ffffff',
            position = [0, 0, 0],
            rotation = [0, 0, 0],
        } = this.props;
        this.initComponent();
        const geometry = new BoxBufferGeometry(...scale);
        this.material = new MeshLambertMaterial({ color: color });
        // const material = new MeshBasicMaterial( { color: color } );
        this.setColor(color);
        this.obj = new Mesh( geometry, this.material );
        this.setPosition(position);
        this.setRotation(rotation);
        this.obj.name = this.name;
        this.obj.castShadow = enableShadows;
        this.obj.receiveShadow = enableShadows;
        this.uuid = this.obj.uuid;
        scene.add(this.obj);
        setTimeout(() => {
            this.readyComponent();
        }, 1);
    }

    render() {
        const {color} = this.props;
        this.setColor(color);
        return null;
    }
}

export default Box;