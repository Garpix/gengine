import React from 'react';
import {
    Canvas,
    PerspectiveCamera,
    OrbitControls,
    Box,
    AmbientLight,
    DirectionalLight,
    Sphere,
    Screenshot,
} from '@garpix/gengine';
import './App.css';

class App extends React.Component {

    handleScreenshot = (e) => {
        const data = this.takeScreenshot();
        window.open(data, "Final");
    };

    handleScreenshotDownload = (e) => {
        const data = this.takeScreenshot();
        this.download(data, "screenshot.jpg");
    };

    // util for download screenshot
    download = (dataurl, filename) => {
        var a = document.createElement("a");
        a.href = dataurl;
        a.setAttribute("download", filename);
        a.click();
    };

    takeScreenshot = () => {console.log('Please override takeScreenshot method!')};

    render() {
        return (
            <div>
                <button onClick={this.handleScreenshot}>Take screenshot</button>
                <button onClick={this.handleScreenshotDownload}>Take and download screenshot</button>
                <Canvas fullscreen={true}>
                    <PerspectiveCamera position={[0, 1, 5]}>
                        <OrbitControls />
                        <Screenshot takeScreenshot={(screenshotFunction) => {this.takeScreenshot = screenshotFunction}} />
                    </PerspectiveCamera>
                    <Box position={[1, 2, 0]} rotation={[25, 70, 45]} />
                    <Box scale={[5, 0.1, 5]} color={'#ff0000'} position={[0, -0.6, 0]} />
                    <Sphere widthSegments={16} heightSegments={16} />
                    <AmbientLight intensity={0.3} />
                    <DirectionalLight intensity={0.7} />
                </Canvas>
            </div>
        );
    }
}

export default App;
