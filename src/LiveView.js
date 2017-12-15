import React, { Component } from 'react';
import './LiveView.css';
//import WSAvcPlayer from './h264/wsavc/WSAvcPlayer'
import { subscribe } from 'mqtt-react';
import HTTPClient from './HTTPClient'

class LiveView extends Component {

  state = { 
    currentImage: undefined
  };

  /*
  // called when a message arrives
  onMQTTMessageArrived = (message) => {
    
    if(message.destinationName === "recognitions/image") {
      console.log("Load image");
      //this.image.src = `data:image/jpg;base64,${message.payloadString}`;
      this.setState({ currentImage: `data:image/jpg;base64,${message.payloadString}` });
    } 
  }
  */

  extractPrediction(data) {
    let prediction = data.pop();
    if(prediction && prediction.predictions) {
      return prediction.predictions.map(p => p.highest).join(', ');
    }
    return "-";
  }

  captureMQTT = () => {
    const { mqtt } = this.props;
    mqtt.publish('trigger', 'ON');
  }

  // <button onClick={this.captureMQTT}>Next image</button>
  // <canvas id="canvas_live_stream" ref="canvas_live_stream"></canvas>
  // <img id="img_live_stream" src={this.state.currentImage} />
  render() {
    return (
      <div className="LiveView">
        <p id="identified_person_name">{this.extractPrediction(this.props.data)}</p>

        <img id="img_live_stream" alt="Live Stream" src={HTTPClient.getApiEndpoint('video_feed')} />
      </div>
    )
  }
}

export default subscribe({
  topic: 'recognitions/#'
})(LiveView);

/*
// this.client.subscribe("#");
// this.client.subscribe("recognitions/#");
// this.client.subscribe("$SYS/#");
*/
