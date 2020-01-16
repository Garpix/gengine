import React from 'react';
import {
    // MeshBasicMaterial,
    MeshLambertMaterial,
    Mesh,
    CylinderBufferGeometry,
} from "three";
import AbstractObject from "../../abstract/AbstractObject";

/**
 * Примитивный объект - Цилиндр.
 */
class Cylinder extends AbstractObject {
    componentDidMount() {
        const {
            // default
            scene,
            enableShadows,
            // custom
            // scale = [1, 1, 1],
            radiusTop = 1,
            radiusBottom = 1,
            height = 1,
            radialSegments = 32,
            color = '#ffffff',
            position = [0, 0, 0],
            rotation = [0, 0, 0],
        } = this.props;
        this.initComponent();
        const geometry = new CylinderBufferGeometry(
            radiusTop,
            radiusBottom,
            height,
            radialSegments
        );
        // const geometry = new CylinderBufferGeometry(
        //     1,1,1, 32
        // );
        const material = new MeshLambertMaterial( { color: color } );
        this.setColor(color);
        this.obj = new Mesh( geometry, material );
        this.setPosition(position);
        this.setRotation(rotation);
        this.obj.castShadow = enableShadows;
        this.obj.receiveShadow = enableShadows;
        scene.add(this.obj);
        this.onPropsUpdate({}, this.props);
        this.uuid = this.obj.uuid;
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

export default Cylinder;
