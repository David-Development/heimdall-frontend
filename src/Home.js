import React, { Component } from 'react';
import './Home.css';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CustomCard from './CustomCard';

//import VideoCam from './images/ic_videocam_black_48px.svg'
import PhotoCameraIcon from './images/ic_photo_camera_black_48px.svg'
import SettingsIcon from './images/ic_settings_black_48px.svg'

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};


class Home extends Component {
  render() {
    return (
      <div id="home">
        <CustomCard className="CustomCard"
                    image_url={PhotoCameraIcon}
                    image_title ="Contemplative Reptile"
                    headline="Live View"
                    content="Der Live View ermöglicht die Anzeige der Personen, die von dem Gesichtserkennungssystem erkannt wurden"
                    link_url="/detection"
                    link_title="LiveView" />

        <CustomCard className="CustomCard"
                    image_url={SettingsIcon}
                    image_title ="Contemplative Reptile"
                    headline="Management"
                    content="Die Management Funktion ermöglicht das erneute Training des Gesichtserkennungssystems. Außerdem können dort die Bilder der bekannten Personen eingesehen werden."
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
