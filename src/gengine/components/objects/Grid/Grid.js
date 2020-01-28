import React from 'react';
import {
    GridHelper,
} from "three";
import AbstractObject from "../../abstract/AbstractObject";

class Grid extends AbstractObject {

    componentDidMount() {
        const {
            // default
            scene,
            // custom
            size = 10,
            divisions = 10,
            colorCenterLine = '#ffffff',
            color = '#ffffff',
            position = [0, 0, 0],
            rotation = [0, 0, 0],
        } = this.props;
        this.initComponent();
        this.obj = new GridHelper(size, divisions, colorCenterLine, color);
        this.setPosition(position);
        this.setRotation(rotation);
        this.obj.name = this.name;
        this.uuid = this.obj.uuid;
        scene.add(this.obj);
        this.onPropsUpdate({}, this.props);
        setTimeout(() => {
            this.readyComponent();
        }, 1);
    }

    // render() {
    //     const {color} = this.props;
    //     this.setColor(color);
    //     return null;
    // }
}

export default Grid;
