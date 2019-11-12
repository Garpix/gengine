import React from "react";
import {
  Canvas,
  PerspectiveCamera,
  OrbitControls,
  GLTF,
  AmbientLight,
  DirectionalLight,
  Sky,
  Raycast
} from "@garpix/gengine";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <Canvas fullscreen={true}>
          <PerspectiveCamera
            minDistance={30}
            maxDistance={200}
            position={[0, 100, 100]}
          >
            <OrbitControls />
            <Raycast />
            <Sky url={"/static/textures/background.jpg"} />
          </PerspectiveCamera>
          <GLTF
            url={"/static/scene.gltf"}
          />
          <AmbientLight intensity={1} />
          <DirectionalLight intensity={3} rotation={[0,40,0]}/>
        </Canvas>
      </div>
    );
  }
}

export default App;
