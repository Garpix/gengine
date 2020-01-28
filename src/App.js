import React from 'react';
import {
    Canvas,
    PerspectiveCamera,
    OrbitControls,
    Box,
    AmbientLight,
    DirectionalLight,
    Sphere,
    Grid,
} from './gengine';
import './App.css';

class App extends React.Component {

    render() {
        return (
            <Canvas fullscreen={true}>
                <PerspectiveCamera position={[0, 1, -5]}>
                    <OrbitControls />
                </PerspectiveCamera>
                <Box position={[1, 2, 0]} rotation={[25, 70, 45]} />
                <Box scale={[5, 0.1, 15]} color={'#ff0000'} position={[0, 0, -0.6]} />
                <Sphere widthSegments={16} heightSegments={16} position={[1, 0, 2]} />
                <Grid color={'#dadada'} colorCenterLine={'#00ff00'} size={120} divisions={120} />
                <AmbientLight intensity={0.3} />
                <DirectionalLight intensity={0.7} />
            </Canvas>
        );
    }
}

export default App;
