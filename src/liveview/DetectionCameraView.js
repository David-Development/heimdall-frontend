import React from 'react';
import { subscribe } from 'mqtt-react';
import HTTPClient from '../HTTPClient'
import CameraView from './CameraView';

class DetectionCameraView extends CameraView {

  // <button onClick={this.captureMQTT}>Next image</button> 
  render() {
    return (
      <div className="LiveView">
        <p id="identified_person_name">{this.state.currentPerson}</p>
        <img id="img_live_stream" alt="Live Stream" src={HTTPClient.getApiEndpoint('video_feed')} />
      </div>
    )
  }

}

export default subscribe({
  topic: 'recognitions/person',
  dispatch: window.MqttDispatcher.dispatch
})(DetectionCameraView);

/*
// this.client.subscribe("#");
// this.client.subscribe("recognitions/#");
// this.client.subscribe("$SYS/#");
*/
