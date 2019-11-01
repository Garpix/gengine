import React from 'react';
import {
    TextureLoader,
    LinearFilter,
    ShaderLib,
    ShaderMaterial,
    BackSide,
    BoxBufferGeometry,
    Mesh,
} from "three";
import AbstractObject from "../../abstract/AbstractObject";

// Вставлять только внутрь камеры!!!
class Sky extends AbstractObject {

    componentDidMount() {
        const {
            // default
            scene,
            addRenderCall,
            camera,
            // enableShadows,
            // custom
            // scale = [1, 1, 1],
            // color = '#ffffff',
            // position = [0, 0, 0],
            // rotation = [0, 0, 0],
            url = null,
        } = this.props;
        this.initComponent();

        if (!camera) {
            throw new Error('Вложите этот компонент в камеру!');
        }

        const loader = new TextureLoader();
        const texture = loader.load(
            url,
        );
        texture.magFilter = LinearFilter;
        texture.minFilter = LinearFilter;

        const shader = ShaderLib.equirect;
        const material = new ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: BackSide,
        });
        material.uniforms.tEquirect.value = texture;
        const plane = new BoxBufferGeometry(1000, 1000, 1000);
        this.obj = new Mesh(plane, material);
        scene.add(this.obj);

        addRenderCall(() => {
            this.obj.position.copy(camera.position);
        });

        setTimeout(() => {
            this.readyComponent();
        }, 1);
    }
}

export default Sky;