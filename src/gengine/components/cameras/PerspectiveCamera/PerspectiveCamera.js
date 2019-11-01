import {PerspectiveCamera as ThreePerspectiveCamera} from 'three';
import React from 'react';
import AbstractObject from "../../abstract/AbstractObject";

class PerspectiveCamera extends AbstractObject {

    constructor() {
        super();
        this.state = {
            ready: false,
        }
    };

    componentDidMount() {
        const {
            // default from parent
            scene, canvasHeight, canvasWidth, renderer, addRenderCall,
            // custom
            position = [0, 0, 0],
            zoom = 1,
        } = this.props;
        this.initComponent();
        this.obj = new ThreePerspectiveCamera( 75, canvasWidth / canvasHeight, 0.1, 1000 );
        this.obj.position.set(...position);
        this.obj.lookAt( scene.position );
        scene.add(this.obj);
        addRenderCall(() => {
            renderer.render(scene, this.obj);
        });
        window.addEventListener("resize", this.resize);
        setTimeout(() => {
            this.readyComponent();
            this.setState({
                ready: true,
            })
        }, 1);
    };

    resize = () => {
        const {
            fullscreen = true,
        } = this.props;
        if (fullscreen) {
            this.obj.aspect = window.innerWidth / window.innerHeight;
            this.obj.updateProjectionMatrix();
        }
    };

    render() {
        const {ready} = this.state;
        if (!ready) return null;
        const childrenWithProps = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
                ...this.props,
                camera: this.obj,
            })
        });

        return (<>{childrenWithProps}</>);
    };

    setZoom = (zoom) => {
        if (!zoom) return;
        this.obj.zoom = zoom;
        this.obj.updateProjectionMatrix();
    };

    shouldComponentUpdate(nextProps) {
        const {
            zoom,
        } = this.props;
        if (nextProps.zoom) {
            if (zoom !== nextProps.zoom) {
                this.setZoom(nextProps.zoom);
            }
        }
        this.onPropsUpdate(this.props, nextProps);
        return true
    };

}

export default PerspectiveCamera;
