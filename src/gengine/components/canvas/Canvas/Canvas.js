import React from 'react';
import {
    Scene,
    WebGLRenderer,
    Clock,
} from "three";
import StereoEffect from './StereoEffect'
// import {initialize} from '../../../actions';
// import {connect} from "react-redux";
import {SCENE_NAME} from '../../../constants';

class Canvas extends React.Component {

    // Принимает следующее
    // onReady() - коллбек, когда все внешние данные загружены и можно рендерить сцену.

    constructor() {
        super();
        this.requestId = null;
        this.canvasWidth = null;
        this.canvasHeight = null;
        this.scene = null;
        this.renderer = null;
        this.renderCalls = [];
        this.refCanvas = React.createRef();
        this.canvasDomElement = null;
        this.components = []; // {name: 'example', obj: threejsObj, ready: false, onClick: null, onHover: null}
        this.clock = null;
        this.debug = false;
        this.enableVR = false; //activate VR mode
        //
        this.state = {
            ready: false,
        }
    }

    // componentWillUnmount() {
    //     // drop all.
    // }

    // При монтировании компонента начинаем инициализировать сцену
    componentDidMount() {
        const {
            fullscreen = false,
            enableShadows = false,
            enableVR = false,
            debug = false,
            gammaFactor = 1,
        } = this.props;
        // initialize();
        this.debug = debug;
        this.canvasDomElement = this.refCanvas.current;
        this.canvasHeight = this.canvasDomElement.clientHeight;
        this.canvasWidth = this.canvasDomElement.clientWidth;
        this.enableShadows = enableShadows;
        this.scene = new Scene();
        this.scene.name = SCENE_NAME;
        this.renderer = new WebGLRenderer({
            canvas: this.canvasDomElement,
            powerPreference: "high-performance",
            antialias: true,
            alpha: true,
        });
        this.renderer.gammaOutput = true;
        this.renderer.gammaFactor = gammaFactor;
        this.renderer.autoClearColor = false;
        // this.renderer = new WebGLRenderer();
        // this.renderer.setSize(this.canvasWidth, this.canvasHeight);
        this.renderer.shadowMap.enabled = this.enableShadows;
        this.renderer.shadowCameraNear = 3;
        this.renderer.shadowCameraFar = 1000;
        this.renderer.shadowCameraFov = 50;
        this.enableVR = enableVR,
        this.renderer.vr.enabled = enableVR
        this.effect = new StereoEffect(this.renderer)
 
        this.getVRDisplay((display) => {
            this.renderer.vr.setDevice(display);
        });
        //
        this.resize();
        window.addEventListener("resize", this.resize);
        // document.body.appendChild(this.renderer.domElement);
        // this.ref
        this.setState({
            ready: true,
        });
        this.clock = new Clock;
        this.animate();
        // setInterval(() => {
        //     console.log( 'TRIANGLES', this.renderer.info.render.triangles );
        //     }, 3000
        // )
    }
    
    getVRDisplay = ( onDisplay ) => {
      if ( 'getVRDisplays' in navigator ) {
        navigator.getVRDisplays()
          .then(( displays ) => {
            onDisplay( displays[ 0 ] );
          });
      }
    }

    resize = () => {
        const {
            fullscreen = false,
        } = this.props;
        if (fullscreen) {
            this.canvasHeight = window.innerHeight;
            this.canvasWidth = window.innerWidth;
        } else {
            this.canvasHeight = this.canvasDomElement.clientHeight;
            this.canvasWidth = this.canvasDomElement.clientWidth;
        }

        if (this.enableVR) {
          this.effect.setSize(this.canvasWidth, this.canvasHeight);
        } else {
          this.renderer.setSize(this.canvasWidth, this.canvasHeight);
        }
    };

    addRenderCall = (renderCall) => {
        this.renderCalls.push(renderCall);
    };

    // Основная функция отрисовки - берет все вызовы рендера в куче и рендерит их. работает только когда сцена готова
    animate = () => {
        this.requestId = this.renderer.setAnimationLoop(this.animate);
        const deltaSeconds = this.clock.getDelta();
        this.renderCalls.forEach((callback)=>{callback(deltaSeconds)});
    };

    getComponentByName = (name) => {
        return this.components.filter((component, index) => {
            return component.name === name;
        })[0];
    };

    getComponentByUuid = (uuid) => {
        return this.components.filter((component, index) => {
            return component.uuid === uuid;
        })[0];
    };

    onLoadingProgress = () => {
        const {onLoadingProgress} = this.props;
        const componentsCount = this.components.length;
        const readyComponentsCount = this.components.filter((component) => {return component.ready}).length;
        const progress = Math.round((readyComponentsCount * 100) / componentsCount);
        if (onLoadingProgress) {
            onLoadingProgress(progress);
        }
    };

    onComponentInit = ({
        name,
        obj,
        uuid,
        onClick = null,
        onHover = null,
        onBlur = null,
        instance,
    }) => {
        // console.log('onComponentInit', name);
        this.components.push({
            name,
            uuid,
            obj,
            ready: false,
            onClick,
            onHover,
            onBlur,
            instance,
        });
        this.onLoadingProgress();
    };

    // Когда какой-то компонент загружен, то вызывается это событие
    onComponentReady = ({
        name,
        obj,
        uuid,
        instance,
    }) => {
        // console.log('onComponentReady', name);
        const component = this.getComponentByName(name);
        component.ready = true;
        component.obj = obj;
        component.uuid = uuid;
        component.instance = instance;
        this.onLoadingProgress();
    };

    render() {
        const {ready} = this.state;
        // если сцена еще не проинициализирована, то нельзя рендерить детей
        const childrenWithProps = ready ? React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
                scene: this.scene,
                renderer: this.renderer,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
                addRenderCall: this.addRenderCall,
                canvasDomElement: this.canvasDomElement,
                onComponentInit: this.onComponentInit,
                onComponentReady: this.onComponentReady,
                getComponentByName: this.getComponentByName,
                getComponentByUuid: this.getComponentByUuid,
                enableShadows: this.enableShadows,
                debug: this.debug,
                enableVR: this.enableVR,
                effect: this.effect
            })
        }) : null;

        return (
            <canvas ref={this.refCanvas}>
                {childrenWithProps}
            </canvas>
        );
    }
}

export default Canvas;
