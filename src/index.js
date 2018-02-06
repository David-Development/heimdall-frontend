import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Connector } from 'mqtt-react';
import registerServiceWorker from './registerServiceWorker';

//var mqttUrl = `ws://${window.location.hostname}:8083/mqtt`; // EMQ
var mqttUrl = `ws://${window.location.hostname}:8083`;

ReactDOM.render(
        (
            <Connector mqttProps={mqttUrl}>
                <App />
            </Connector>
        ), document.getElementById('root'));
registerServiceWorker();
