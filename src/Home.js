import React, { Component } from 'react';
import './Home.css';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CustomCard from './CustomCard';


const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};


class Home extends Component {

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
      <div id="home">
        <CustomCard image_url="https://qph.ec.quoracdn.net/main-qimg-6d3acd1629dc8e8db26b6c066087e39e-c"
                    image_title ="Contemplative Reptile"
                    headline="Live View"
                    content="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                    link_url="/live"
                    link_title="LiveView" />

        <CustomCard image_url="https://qph.ec.quoracdn.net/main-qimg-6d3acd1629dc8e8db26b6c066087e39e-c"
                    image_title ="Contemplative Reptile"
                    headline="Management"
                    content="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                    link_url="/management"
                    link_title="Management" />
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
