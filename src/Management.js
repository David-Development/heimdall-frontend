import React from 'react';

import CustomCard from './CustomCard';
import './Management.css'

import HTTPClient from './HTTPClient'

//import TimelineLogo from './images/ic_receipt_black_48px.svg'
import TimelineLogo from './images/ic_timeline_black_48px.svg'
import GallerieLogo from './images/ic_contacts_black_48px.svg'
import TrainingLogo from './images/ic_developer_board_black_48px.svg'

class Management extends React.Component {

  startTraining = () => {
    HTTPClient.startTraining()
    .then(console.log)
    .catch(console.log);
  }

  render() {
    return (
      <div id="management">
        <CustomCard className="CustomCard"
                    image_url={TimelineLogo}
                    image_title ="Contemplative Reptile"
                    headline="Zeitleiste"
                    content="In der Zeitleiste können vergangene Ereignise eingesehen werden und neue Personen in das System eingepflegt werden."
                    link_url="/timeline"
                    link_title="Zeitleiste" />

        <CustomCard className="CustomCard"
                    image_url={GallerieLogo}
                    image_title ="Contemplative Reptile"
                    headline="Gallerie"
                    content="In der Gallerie können die derzeit bekannten Gesichter eingesehen werden."
                    link_url="/management/gallery"
                    link_title="Gallerie" />

        <CustomCard className="CustomCard"
                    image_url={TrainingLogo}
                    image_title ="Contemplative Reptile"
                    headline="Training"
                    content="Die Trainingsansicht bietet weitere, tiefgehendere Informationen zu dem Gesichterkennungssystem. Diese Ansicht ist nur für erfahrene Benutzer interessant."
                    link_url="/management/training"
                    link_title="Statistiken"
                    link_2_click={this.startTraining}
                    link_2_title="Training starten" />
      </div>
    );
  }
}

export default Management;
