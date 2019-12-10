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
import {
  MeshStandardMaterial,
  TextureLoader,
} from 'three';
import "./App.css";

class App extends React.Component {

  state = {
    materials: {}
  };

  getTexture = (textureUrl) => {
      let textureLoader = new TextureLoader();
      let texture = textureLoader.load(textureUrl);
      texture.flipY = false;
      return texture;
  };

  setTextureRed = () => {
    console.log('Texture changed to red');
    this.setState({
      materials: {
        'tile.009': new MeshStandardMaterial({
          map: this.getTexture('/static/textures/tile.009_baseColor.png'),
          normalMap: this.getTexture('/static/textures/tile.009_normal.png'),
          // color: 0xff0000,
          name: 'tile.009',
        }),
      },
    })
  };

  setTextureBlue = () => {
    console.log('Texture changed to blue');
    this.setState({
      materials: {
        'tile.009': new MeshStandardMaterial({
          map: this.getTexture('/static/textures/tile.009_baseColor_replaced.png'),
          normalMap: this.getTexture('/static/textures/tile.009_normal.png'),
          // color: 0xffffff,
          name: 'tile.009',
        }),
      },
    })
  };

  render() {
    return (
      <div>
        <button onClick={this.setTextureBlue}>Replace texture (blue)</button>
        <button onClick={this.setTextureRed}>Replace texture (red)</button>
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
            materials={this.state.materials}
          />
          <AmbientLight intensity={1} />
          <DirectionalLight intensity={3} rotation={[0,40,0]}/>
        </Canvas>
      </div>
    );
  }
}

export default App;
