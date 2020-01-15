import React from 'react';
import {uuidv4} from "../../../utils";
import _ from 'lodash';
import {Math} from "three";

class AbstractObject extends React.Component {

    constructor() {
        super();
        this.obj = null;
        this.name = null;
        this.hovered = false;
        this.material = null;
        this.uuid = null;
        this.visible = true;
    }

    componentWillUnmount() {
        const {scene} = this.props;
        if (this.obj) {
            scene.remove(this.obj);
        }
    } 

    setColor = (cssColor='#ffffff') => {
        if (!this.material) return null;
        this.material.color.set(cssColor);
    };

    getPosition = (x=null, y=null, z=null) => {
        if (!this.obj) return null;
        return [
            x !== null ? x : this.obj.position.x,
            y !== null ? y : this.obj.position.y,
            z !== null ? z : this.obj.position.z
        ]
    };

    setPosition = (position) => {
        if (!this.obj || !this.obj.position || !position) return;
        this.obj.position.set(...position);
    };

    setRotation = (rotation) => {
        if (!this.obj || !this.obj.rotation || !rotation) return;
        const degreesRotations = [
            Math.degToRad(rotation[0]),
            Math.degToRad(rotation[1]),
            Math.degToRad(rotation[2]),
        ];
        this.obj.rotation.set(...degreesRotations);
    };

    initComponent = () => {
        const {
            onComponentInit,
            name = null,
            onClick = null, // Обрабатываем клик
            onHover = null, // Выделяем
            onBlur = null, // Заканчиваем выделять
        } = this.props;
        if (name) {
            this.name = name;
        } else {
            this.name = `No name ${uuidv4()}`;
        }
        onComponentInit({
            name: this.name,
            obj: null,
            uuid: null, // доступен, только когда ready
            instance: this,
            onClick: onClick,
            onHover: () => {
                if (this.hovered) return null;
                this.hovered = true;
                if (onHover instanceof Function) {
                    onHover();
                }
            },
            onBlur: () => {
                if (!this.hovered) return null;
                this.hovered = false;
                if (onBlur instanceof Function) {
                    onBlur();
                }
            },
        });
        return this.name;
    };

    readyComponent = () => {
        const {
            onComponentReady,
        } = this.props;
        onComponentReady({
            name: this.name,
            obj: this.obj,
            uuid: this.uuid,
            instance: this,
        });
    };

    onPropsUpdate = (prevProps, nextProps) => {
        const {
            rotation,
            position,
            visible,
            intensity,
        } = prevProps;
        // console.log('nextProps.animation', nextProps.animation);
        if (nextProps.position) {
            if (!position || !_.isEqual(position, nextProps.position)) {
                this.setPosition(nextProps.position);
                return true;
            }
        }
        if (nextProps.rotation) {
            if (!rotation || !_.isEqual(rotation, nextProps.rotation)) {
                this.setRotation(nextProps.rotation);
                return true;
            }
        }
        // console.log('onPropsUpdate');
        if (this.obj) {
            // console.log('VIS');
            if (visible !== nextProps.visible) {
                // console.log('VISIBLE CHANGED TO ', nextProps.visible);
                this.obj.visible = nextProps.visible;
                return true;
            }
        }
        // for light
        if (this.obj) {
            if (intensity !== nextProps.intensity) {
                this.obj.intensity = nextProps.intensity;
                return true;
            }
        }
        return true;
    };

    shouldComponentUpdate(nextProps) {
        return this.onPropsUpdate(this.props, nextProps);
    };

    render() {
        return null;
    };
}

export default AbstractObject;
