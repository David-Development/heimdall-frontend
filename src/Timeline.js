import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './Timeline.css';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import blue from 'material-ui/colors/blue';

import HTTPClient from './HTTPClient'

const styles = theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

class Timeline extends Component {

  componentDidMount() {
      Promise.all([HTTPClient.fetchPersons(), HTTPClient.fetchEvents(), HTTPClient.checkIfClassifierExists()])
        .then(values => { 
          // Remove all items where no classifications exist (but only if classifier exists)
          if(values[2]) {
            values[1] = values[1].filter(el => {
              let res = el.images.map(img => img.detected);
              res = [].concat.apply([], res);
              //console.log(res);
              return res.length > 0;
            });
          }
            
          this.setState({
            persons: values[0],
            events : values[1],
            error: undefined
          });
        })
        .catch(error => {
          this.setState({ error: error.toString() + " - Bitte informiere den Systemadministrator über diesen Fehler." });
        });
  }

  clicker(eventid) {
    this.props.history.push(`/management/classification/${eventid}`)
  }

  formatNumber(n){
    return n > 9 ? "" + n: "0" + n;
  }

  state = {
    events: undefined,
    error: undefined
  }

  getEvents() {
    const { classes } = this.props;

    if(this.state.error !== undefined) {
      return null;
    } else if(this.state.events === undefined) {
      return <CircularProgress className={classes.progress} style={{ color: blue[500] }} thickness={5} />
    } else if(this.state.events.length === 0) {
      return <p>Keine Aufnahmen verfügbar</p>
    } else {
      return (
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
              
              let monthNames = ["Jan.", "Feb.", "Mär.", "Apr.", "Mai", "Jun.", "Jul.", "Aug.", "Sept.", "Okt.", "Nov.", "Dez."];

              let eventDate = new Date(Date.parse(event.date));
              let eventTime = new Date(`1970-01-01T${event.time}Z`);

              return (
                <li key={"event_" + event.id} 
                    className="event"
                    data-date={`${eventDate.getDate()} ${monthNames[eventDate.getMonth()]}`} 
                    data-time={`${this.formatNumber(eventTime.getHours())}:${this.formatNumber(eventTime.getMinutes())}`} 
                    onClick={() => this.clicker(event.id)}>
                  <h3>{names.join(", ")}</h3>
                  <div className="preview_flexbox">
                  
                  {
                    //event.images.map(image => {
                    event.images.slice(0, 5).map(image => { // Only show first x elements
                      //console.log(image);
                      return (<img key={"image_" + image.id} className="event_img" src={HTTPClient.getApiEndpoint(`/api/resized-${image.url}/134x100`)} alt="" />) // 200x150
                    })
                  }

                  </div>
                </li>
              )
            })
          }
        </ul>
      );
    }
  }

  render() {
    return (
      <div className="main-container">
        <section id="timeline" className="timeline-outer">
          <div className="container" id="content">
            <div className="row">
              <div className="col s12 m12 l12">
              <p>{this.state.error}</p>
              
              {
                this.getEvents()
              }
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}


Timeline.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(Timeline));
