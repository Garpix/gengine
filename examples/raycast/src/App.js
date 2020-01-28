import React from 'react';
import {
    Canvas,
    PerspectiveCamera,
    OrbitControls,
    Box,
    AmbientLight,
    DirectionalLight,
    Sphere,
    // Grid,
    Raycast,
} from '@garpix/gengine';
import './App.css';

class App extends React.Component {

    state = {
        color: '#999999',
        scale: [1, 1, 1],
    };

    handleClick = (component) => {
        console.log('Clicked!', component);
        const randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);}); // https://stackoverflow.com/a/5092872
        const scale = [1 + Math.random() * 3, 1 + Math.random() * 3, 1 + Math.random() * 3];
        this.setState({
            color: randomColor,
            scale: scale,
        })
    };

    render() {
        return (
            <Canvas fullscreen={true}>
                <PerspectiveCamera position={[0, 1, -5]}>
                    <OrbitControls />
                    <Raycast />
                </PerspectiveCamera>
                <Box color={this.state.color} onClick={this.handleClick} scale={this.state.scale} position={[1, 2, 0]} rotation={[25, 70, 45]} />
                <Box scale={[5, 0.1, 15]} color={'#ff0000'} position={[0, 0, -0.6]} />
                <Sphere widthSegments={16} heightSegments={16} position={[1, 0, 2]} />
                {/*<Grid color={'#dadada'} colorCenterLine={'#00ff00'} size={120} divisions={120} />*/}
                <AmbientLight intensity={0.3} />
                <DirectionalLight intensity={0.7} />
            </Canvas>
        );
    }
}

export default App;
