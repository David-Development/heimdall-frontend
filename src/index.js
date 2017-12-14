import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Connector } from 'mqtt-react';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
        (
            <Connector mqttProps={`ws://${window.location.hostname}:8083`}>
                <App />
            </Connector>
        ), document.getElementById('root'));
registerServiceWorker();
