import React from 'react';
import {
    Canvas,
    PerspectiveCamera,
    OrbitControls,
    Box,
    AmbientLight,
    DirectionalLight,
    Sphere,
} from './gengine';
import './App.css';

class App extends React.Component {

    render() {
        return (
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-md-6'}>...</div>
                    <div className={'col-md-6'} style={{height: '400px'}}>
                        <Canvas>
                            <PerspectiveCamera position={[0, 5, 1]}>
                                <OrbitControls />
                            </PerspectiveCamera>
                            <Box position={[1, 2, 0]} rotation={[25, 70, 45]} />
                            <Box scale={[5, 10, 0.1]} color={'#ff0000'} position={[0, 0, -0.6]} />
                            <Sphere widthSegments={16} heightSegments={16} />
                            <AmbientLight intensity={0.3} />
                            <DirectionalLight intensity={0.7} />
                        </Canvas>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
