import React from "react";
import {
  Canvas,
  PerspectiveCamera,
  OrbitControls,
  Box,
  AmbientLight,
  DirectionalLight,
} from "@garpix/gengine";
import {
  MeshBasicMaterial,
} from 'three';
import "./App.css";

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      materials: {
        'wireframe': {
          'tile.009': new MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true,
          }),
        },
      },
      selectedMaterial: 'wireframe',
    };
  }

  render() {
    return (
        <div>
          <Canvas fullscreen={true}>
            <PerspectiveCamera
                position={[0, 1, 5]}
            >
              <OrbitControls />
            </PerspectiveCamera>
            <Box
                materials={this.state.materials}
                selectedMaterial={this.state.selectedMaterial}
            />
            <AmbientLight intensity={0.3} />
            <DirectionalLight intensity={0.7} />
          </Canvas>
        </div>
    );
  }
}

export default App;
