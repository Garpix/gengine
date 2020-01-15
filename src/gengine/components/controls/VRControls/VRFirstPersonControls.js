
import AbstractObject from "../../abstract/AbstractObject";
import DeviceOrientationControls from './DeviceOrientationControls'

class VRFirstPersonControls extends AbstractObject {
    
    setOrientationControls = (e) => {
      if (!e.alpha) {
        return;
      }
      this.obj.update();
    }

    componentDidMount() {
        const {
            canvasDomElement,
            camera,
            // custom
            minDistance = 3,
            maxDistance = 20,
        } = this.props;
        this.initComponent();

        this.obj = new DeviceOrientationControls(camera, true);
        this.obj.connect();

        window.addEventListener('deviceorientation', this.setOrientationControls, true);

        // this.obj.minDistance = minDistance;
        // this.obj.maxDistance = maxDistance;
        //
        // this.obj.minPolarAngle = 0; // radians
        // this.obj.maxPolarAngle = Math.PI / 2; // radians
        //
        // this.obj.enableDamping = true;
        // this.obj.dampingFactor = 0.05;

        // renderCalls.push(function () {
        //     controls.update();
        // });
        // return controls;
        // setTimeout(() => {
        //     this.readyComponent();
        // }, 1);
    }

    componentWillUnmount() {
      window.removeEventListener('deviceorientation', this.setOrientationControls, true);
    }
}

export default VRFirstPersonControls;
