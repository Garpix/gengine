import React from 'react';
import AbstractObject from "../../abstract/AbstractObject";

class Screenshot extends AbstractObject {
    componentDidMount() {
        const {
            scene,
            takeScreenshot,
        } = this.props;
        this.initComponent();

        this.obj = null;

        takeScreenshot(this.takeScreenshot);

        setTimeout(() => {
            this.readyComponent();
        }, 1);
    }

    takeScreenshot = () => {
        const {scene, camera, renderer} = this.props;
        renderer.render(scene, camera);
        return renderer.domElement.toDataURL("image/png");
    };
}

export default Screenshot;
