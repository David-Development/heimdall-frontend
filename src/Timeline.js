import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import './Timeline.css';

import HTTPClient from './HTTPClient'

class LiveView extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
      Promise.all([HTTPClient.fetchPersons(), HTTPClient.fetchEvents()])
        .then(values => { 
          this.state.persons  = values[0];
          this.state.events = values[1];
          this.setState(this.state);
        });
  }

  clicker(eventid) {
    this.props.history.push(`/management/classification/${eventid}`)
  }

  state = {
    events: []
  }

  render() {
    return (
      <div className="main-container">
        <section id="timeline" className="timeline-outer">
          <div className="container" id="content">
            <div className="row">
              <div className="col s12 m12 l12">
                <ul className="timeline">

                {
                  this.state.events.map(event => {
                    //console.log(event);

                    // Get all names that have been detected
                    let personIds = [];
                    event.images.forEach(img => {
                      img.detected.forEach(person => {
                        personIds = personIds.concat(person.id);
                      });
                    });

                    // Map personIds to the actual names
                    let names = personIds.map(personId => this.state.persons.find(u => u.id === personId).name);
                    names = names.filter((v, i, a) => a.indexOf(v) === i); // Remove duplicate names
                    names.sort(); // Sort names
                    

                    return (
                      <li key={"event_" + event.id} className="event" data-date={event.date} data-time={event.time} onClick={() => this.clicker(event.id)}>
                        <h3>{names.join(", ")}</h3>
                        <div className="preview_flexbox">
                        
                        {
                          event.images.map(image => {
                            //console.log(image);
                            return (<img key={"image_" + image.id} className="event_img" src={image.url} />)
                          })
                        }

                        </div>
                      </li>
                    )
                  })
                }
                  
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default withRouter(LiveView);
