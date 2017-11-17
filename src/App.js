import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import WSAvcPlayer from './h264/wsavc/index.js'
import Button from 'material-ui/Button'

class App extends Component {

  constructor(props) {
    super(props);

    var uri = `ws://${window.location.hostname}:5002`;
    this.wsavc = new WSAvcPlayer("webgl");
    this.wsavc.connect(uri);
  }

  componentDidMount() {
    var canvas = ReactDOM.findDOMNode(this.refs.canvas_live_stream)
    console.log("Connect to canvas: ", canvas);
    this.wsavc.connectCanvas(canvas);
  }

/*

<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Heimdall</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. Yeees!
        </p>
        <button type="button" onClick={() => this.wsavc.playStream()}>Start Video</button>
        <button type="button" onClick={() => this.wsavc.stopStream()}>Stop Video</button>
        <button type="button" onClick={() => this.wsavc.disconnect()}>Disconnect</button>
        <br/>
        
        <div>
          <p id="identified_person_name">David Luhmer</p>
          <canvas id="canvas_live_stream" ref="canvas_live_stream"></canvas>
        </div>

        <Button raised color="primary">
          Erkennung!
        </Button>
      </div>

      */

  render() {
    return (
      <div className="App">
        <p id="identified_person_name">Test Person</p>
        <canvas id="canvas_live_stream" ref="canvas_live_stream"></canvas>

        <Button type="button" onClick={() => this.wsavc.playStream()}>Start Video</Button>
        <Button type="button" onClick={() => this.wsavc.stopStream()}>Stop Video</Button>
        <Button type="button" onClick={() => this.wsavc.disconnect()}>Disconnect</Button>
      </div>
    )
  }
}

export default App;
