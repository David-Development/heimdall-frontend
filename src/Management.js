import React from 'react';

import CustomCard from './CustomCard';
import ClassificationLogo from './images/account-edit.svg';
import './Management.css'

import HTTPClient from './HTTPClient'
/*

<CustomCard image_url={ClassificationLogo}
                    image_title ="Contemplative Reptile"
                    headline="Klassifizierung"
                    content="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                    link_url="/management/classification"
                    link_title="Klassifizierung" />

<CustomCard image_url="https://qph.ec.quoracdn.net/main-qimg-6d3acd1629dc8e8db26b6c066087e39e-c"
                    image_title ="Contemplative Reptile"
                    headline="Verifizierung"
                    content="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                    link_url="/management/verification"
                    link_title="Verifizierung" />

*/

class Management extends React.Component {

  startTraining = () => {
    HTTPClient.startTraining()
    .then(console.log)
    .catch(console.log);
  }

  render() {
    return (
      <div id="management">
        <CustomCard image_url={ClassificationLogo}
                    image_title ="Contemplative Reptile"
                    headline="Gallerie"
                    content="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                    link_url="/management/gallery"
                    link_title="Gallerie" />

        

        <CustomCard image_url="https://qph.ec.quoracdn.net/main-qimg-6d3acd1629dc8e8db26b6c066087e39e-c"
                    image_title ="Contemplative Reptile"
                    headline="Training"
                    content="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                    link_url="/management/training"
                    link_title="Statistiken"
                    link_2_click={this.startTraining}
                    link_2_title="Training starten" />
      </div>
    );
  }
}

export default Management;
