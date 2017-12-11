import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './LiveView.css';
import WSAvcPlayer from './h264/wsavc/WSAvcPlayer'

class LiveView extends Component {

  constructor(props) {
    super(props);


    // Create a client instance
    this.client = new window.Paho.MQTT.Client(window.location.hostname, Number(8083), `heimdall-frontend-${Math.random()}`);

    // set callback handlers
    this.client.onConnectionLost = this.onMQTTConnectionLost;
    this.client.onMessageArrived = this.onMQTTMessageArrived;

    // connect the client
    this.client.connect({onSuccess:this.onMQTTConnect});

    /*
    var uri = `ws://${window.location.hostname}:5002`;
    this.wsavc = new WSAvcPlayer("webgl");
    this.wsavc.connect(uri, {
      onopen: () => {
        this.wsavc.playStream();
      },
      onclose: () => {
        console.log("WebSocket closed");
      }
    });
    */

    this.state = { 
      identifiedName: "Test Person"
    };
  }

  componentDidMount() {
    this.canvas = ReactDOM.findDOMNode(this.refs.canvas_live_stream);
    console.log("Refs:", this.refs);
    //this.wsavc.connectCanvas(this.canvas);

    let ctx = this.canvas.getContext("2d");
    this.image = new Image();
    this.image.onload = () => {
      //ctx.drawImage(this.image, 0, 0);
      this.drawImageProp(ctx, this.image, 0, 0, this.canvas.width, this.canvas.height);
    };
  }

  componentWillUnmount() {
    //this.wsavc.disconnect();
  }

  

  // called when the client connects
  onMQTTConnect = () => {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    //this.client.subscribe("World");
    this.client.subscribe("#");
    
    //this.client.subscribe("$SYS/#");

  
  }

  // called when the client loses its connection
  onMQTTConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log(`onConnectionLost: ${responseObject.errorMessage}`);
    }
  }

  // called when a message arrives
  onMQTTMessageArrived = (message) => {

    if(message.destinationName === "camera") {
      // Ignore for now..
    } else if(message.destinationName === "recognitions/image") {
      this.image.src = `data:image/jpg;base64,${message.payloadString}`;
      //this.captureMQTT();
    } else if(message.destinationName === "recognitions/person") {
      let recResult = JSON.parse(message.payloadString);
      console.log(recResult);

      let name = "Unkown Person";
      if(recResult.predictions.length > 0) {
        name = recResult.predictions[0].highest;
      }
      this.setState({ identifiedName: name });
    } else {
      console.log(`onMessageArrived
        Destination-Name: ${message.destinationName}
        Duplicate: ${message.duplicate}
        payloadBytes: ${message.payloadBytes}
        payloadString: ${message.payloadString}
        retained: ${message.retained}
        qos: ${message.qos}`);
    }
      
      
  }

  captureMQTT = () => {
    let message = new window.Paho.MQTT.Message(`ON`);
    message.destinationName = "trigger";
    message.qos = 0;
    message.retained = false;
    this.client.send(message);
  }

  render() {
    return (
      <div className="LiveView">
        <button onClick={this.captureMQTT}>Next image</button>
        <p id="identified_person_name">{this.state.identifiedName}</p>
        <canvas id="canvas_live_stream" ref="canvas_live_stream"></canvas>
      </div>
    )
  }





  /**
   * https://stackoverflow.com/a/21961894
   * 
   * By Ken Fyrstenberg Nilsen
   *
   * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
   *
   * If image and context are only arguments rectangle will equal canvas
  */
  drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
  
      if (arguments.length === 2) {
          x = y = 0;
          w = ctx.canvas.width;
          h = ctx.canvas.height;
      }
  
      // default offset is center
      offsetX = typeof offsetX === "number" ? offsetX : 0.5;
      offsetY = typeof offsetY === "number" ? offsetY : 0.5;
  
      // keep bounds [0.0, 1.0]
      if (offsetX < 0) offsetX = 0;
      if (offsetY < 0) offsetY = 0;
      if (offsetX > 1) offsetX = 1;
      if (offsetY > 1) offsetY = 1;
  
      var iw = img.width,
          ih = img.height,
          r = Math.min(w / iw, h / ih),
          nw = iw * r,   // new prop. width
          nh = ih * r,   // new prop. height
          cx, cy, cw, ch, ar = 1;
  
      // decide which gap to fill    
      if (nw < w) ar = w / nw;                             
      if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
      nw *= ar;
      nh *= ar;
  
      // calc source rectangle
      cw = iw / (nw / w);
      ch = ih / (nh / h);
  
      cx = (iw - cw) * offsetX;
      cy = (ih - ch) * offsetY;
  
      // make sure source rectangle is valid
      if (cx < 0) cx = 0;
      if (cy < 0) cy = 0;
      if (cw > iw) cw = iw;
      if (ch > ih) ch = ih;
  
      // fill image in dest. rectangle
      ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
  }
}

export default LiveView;
