import React from 'react';
import {
    // MeshBasicMaterial,
    MeshLambertMaterial,
    Mesh,
    SphereBufferGeometry,
} from "three";
import AbstractObject from "../../abstract/AbstractObject";

class Sphere extends AbstractObject {

    componentDidMount() {
        const {
            // default
            scene,
            enableShadows,
            // custom
            radius = 1,
            widthSegments = 8,
            heightSegments = 6,
            phiStart = 0, // todo: need to be degrees
            phiLength = Math.PI * 2, // todo: need to be degrees
            thetaStart = 0, // todo: need to be degrees
            thetaLength = Math.PI, // todo: need to be degrees
            color = '#ffffff',
            position = [0, 0, 0],
            rotation = [0, 0, 0],
        } = this.props;
        this.initComponent();
        const geometry = new SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart,
             phiLength, thetaStart, thetaLength);
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

export default Sphere;
