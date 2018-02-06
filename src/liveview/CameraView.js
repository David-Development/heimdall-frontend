import { Component } from 'react';
import './CameraView.css';

window.MqttDispatcher = {
  callback_person: function(person) {},
  callback_image: function(image) {},

  dispatch: function(topic, message, packet) {
    console.log(topic);
    if(topic === "recognitions/person") {
      let currentPerson = "-";
      let prediction = JSON.parse(message.toString());
      if(prediction.predictions) {
        currentPerson = prediction.predictions.map(p => p.highest).join(', ');
      }
      window.MqttDispatcher.callback_person(currentPerson);
    } else if(topic === "camera") {
      let currentImage = `data:image/jpg;base64,${message.toString()}`;
      window.MqttDispatcher.callback_image(currentImage);
    } else if(topic === "liveview") {
      let currentImage = `data:image/jpg;base64,${message.toString()}`;
      window.MqttDispatcher.callback_image(currentImage);
    }
  }
}

class CameraView extends Component {

  constructor(props) {
    super(props);

    window.MqttDispatcher.callback_person = (person) => {
      this.setState({currentPerson: person});
    };

    window.MqttDispatcher.callback_image = (image) => {
      this.setState({currentImage: image});
    };
  }

  state = {
    currentPerson: undefined,
    currentImage: undefined
  }

  captureMQTT = () => {
    const { mqtt } = this.props;
    mqtt.publish('trigger', 'ON');
  }
}

export default CameraView;