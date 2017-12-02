import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './LiveView.css';
import WSAvcPlayer from './h264/wsavc/WSAvcPlayer'

class LiveView extends Component {

  constructor(props) {
    super(props);

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

    this.state = { };
  }

  componentDidMount() {
    this.canvas = ReactDOM.findDOMNode(this.refs.canvas_live_stream);
    console.log("Refs:", this.refs);
    this.wsavc.connectCanvas(this.canvas);
  }

  componentWillUnmount() {
    this.wsavc.disconnect();
  }

  /*
    <Button type="button" onClick={() => this.wsavc.playStream()}>Start Video</Button>
    <Button type="button" onClick={() => this.wsavc.stopStream()}>Stop Video</Button>
    <Button type="button" onClick={() => this.wsavc.disconnect()}>Disconnect</Button>
  */

  render() {
    return (
      <div className="LiveView">
        
        <p id="identified_person_name">Test Person</p>
        <canvas id="canvas_live_stream" ref="canvas_live_stream"></canvas>
      </div>
    )
  }
}

export default LiveView;
