import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './LiveView.css';
import WSAvcPlayer from './h264/wsavc/WSAvcPlayer'
import Button from 'material-ui/Button'
import FlipMove from 'react-flip-move';

import ArrowUp from './images/arrow-up.svg'
import Logan from './images/logan.jpg'

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

  addRecognition() {
    let recognition_img_url = Logan //"https://n6-img-fp.akamaized.net/free-icon/up-arrow_318-74795.jpg?size=338c&ext=jpg";

    //create a unike key for each new recognition item
    var timestamp = (new Date()).getTime();
    // update the state object
    this.state['face-' + timestamp ] = recognition_img_url;

    let keys = Object.keys(this.state);
    let keyCount = keys.length;
    
    for(let i = 0; i < keyCount - 12; i++) {
      delete this.state[keys[i]];
      //console.log("Deleting key:", keys[i]);
    }

    this.setState(this.state); // Update ui
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
        <div id="container_recognition_results">
          <div id="container_recognition_controls">
            <img width="100" src={ArrowUp} onClick={() => this.addRecognition()} />
          </div>
          
          <FlipMove id="recognition_list" duration={150} enterAnimation="accordionHorizontal" leaveAnimation="accordionHorizontal">
            {
              Object.keys(this.state).reverse().map(function(key) {
                return <img key={key} width="100" src={this.state[key]} />
              }.bind(this))
            }
          </FlipMove>
        </div>
        <canvas id="canvas_live_stream" ref="canvas_live_stream"></canvas>
      </div>
    )
  }
}

export default LiveView;
