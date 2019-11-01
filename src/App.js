import React from 'react';
import {
    Canvas,
    PerspectiveCamera,
    OrbitControls,
    Box,
    AmbientLight,
    DirectionalLight,
    Raycast,
} from './gengine';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <Canvas fullscreen={true} gammaFactor={1.0} enableShadows={true}>
                    <PerspectiveCamera position={[0, 1, 5]}>
                        <OrbitControls />
                        <Raycast />
                    </PerspectiveCamera>
                    <Box />
                    <Box position={[0, -0.5, 0]} scale={[10, 0.1, 10]} color={'red'} />
                    <Box position={[1, 1, 1]} />
                    <AmbientLight intensity={0.3} />
                    <DirectionalLight intensity={0.5} position={[-10, 10, 10]} />
                </Canvas>
            </div>
        );
    }
}

export default App;
