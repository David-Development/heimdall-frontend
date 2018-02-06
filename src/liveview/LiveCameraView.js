import React from 'react';
import { subscribe } from 'mqtt-react';
import CameraView from './CameraView';

class LiveCameraView extends CameraView {
  render() {
    return (
      <div className="LiveView">
        <button onClick={this.captureMQTT}>Next image</button>
        <img id="img_live_stream" src={this.state.currentImage} alt="" />
      </div>
    )
  }
}

export default subscribe({
  //topic: 'camera',
  topic: 'liveview',
  dispatch: window.MqttDispatcher.dispatch
})(LiveCameraView);

/*
// this.client.subscribe("#");
// this.client.subscribe("recognitions/#");
// this.client.subscribe("$SYS/#");
*/
