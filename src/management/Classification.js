import React, { Component } from 'react';

import './Classification.css'

import PlusCircleOutline from '../images/plus-circle-outline.svg'

import ClassificationAddNewPersonDialog from './ClassificationAddNewPersonDialog'

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import Divider from 'material-ui/Divider';

import ClassificationInfoDialog from '../dialogs/ClassificationInfoDialog';
import HTTPClient from '../HTTPClient'

const styles = {
};


class Classification extends Component {

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const { match: { params } } = this.props;

    Promise.all([HTTPClient.fetchEvent(parseInt(params.eventid, 10)), HTTPClient.fetchPersons()])
      .then(res => {
        this.setState({
          persons: res[1],
          event  : res[0]
        });

        if(this.state.event.images !== undefined) {
          let aStep = 0;
          if(params.imageid) {
            console.log("Query!!");
            aStep = this.state.event.images.findIndex((el) => el.id === +params.imageid);
          }
          
          this.setState({ 
            imageCount: Object.keys(this.state.event.images).length,
            activeStep: aStep
          });
        }
    
        console.log(this.state);
      });
  }

  checkImageCount() {
    this.setState({
      shouldHide: this.state.images.length > 0
    });
  }

  state = {
    activeStep: 0,
    persons: { },
    event: { },
    imageCount: 0
  }

  updateUrl() {
    let imageid = this.state.event.images[this.state.activeStep].id;
    this.props.history.push(`/management/classification/${this.state.event.id}/${imageid}`)
  }

  handleNext = () => {
    if(this.state.activeStep < (this.state.imageCount-1)) {
      this.setState({
        activeStep: this.state.activeStep + 1,
      });
    }
    this.updateUrl();
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
    this.updateUrl();
  };

  handleClickPerson = (key) => {
    let person = this.state.persons[key];
    //console.log("Person:", person);

    let activeImage = this.state.event.images[this.state.activeStep];

    if(activeImage.detected.length === 0) {
      activeImage.detected[0] = { id: 0 };
    } 
    
    // Get current detection
    let detection = activeImage.detected[0];
    detection.id = person.id; // update the person id
    activeImage.user_id = person.id;
    
    this.setState(this.state);

    // Update the person of the first image. If we detected more than one person we don't allow the update process!
    HTTPClient.updateClassification(activeImage.user_id, activeImage.id)
      .then(r => {
        console.log(r);
        this.loadData();
      })
      .catch(alert);
  }

  openNewPersonDialog = () => {
    this.ctl.open();
  };

  storeNewPerson(name) {
    console.log("storeNewPerson", name);
    
    HTTPClient.createNewPerson(name)
      .then(res => {
        HTTPClient.fetchPersons()
        .then(persons => {
          this.setState({ persons: persons });
        })
      })
      .catch(alert);

    this.ctl.close();
  }

  extractUserCode(username) {
    username = username.trim(); // Trim username first
    let result = username;
    if(username.length > 0) {
      let indexWhitespace = username.lastIndexOf(" ");
      result = username.substr(0, 1);
      if(indexWhitespace > 0) {
        result += username.substr(indexWhitespace+1, 1);
      }
    }
    return result;
  }

  getAvatar(person) {
    return person.avatar 
        ? HTTPClient.getApiEndpoint(`/api/${person.avatar}`)
        : undefined;
  }

  render() {
    const { classes, theme } = this.props;
    
    
    let classification_image = "";
    let classifiedUser = -1; // Handle case, that multiple persons are in the view! --> Do not show those pictures for classification!
    let confirmedUser = -1;

    if(this.state.event.images !== undefined) {
      let image = this.state.event.images[this.state.activeStep];
      classification_image = <img key={image.id} src={HTTPClient.getApiEndpoint(`/api/${image.url}`)} alt="" />;
      
      if(image.detected.length > 0) {
        classifiedUser = image.detected[0].id;
      }
      confirmedUser = image.user_id;
      console.log("Classified:", classifiedUser, "Confirmed:", confirmedUser);
    }

    return (
      <div>
        <ClassificationInfoDialog title="Wichtiger Hinweis" content={
          <div>
              Bitte bewerten Sie nur Bilder in denen das Gesicht klar und deutlich zu sehen ist. Ignorieren Sie einfach alle übrigen Bilder.
              <br/>
              <br/>
              Erklärung der verwendeten Farben:
              <ul>
                <li>Blau = Prognose des Systems</li>
                <li>Grün = Durch Nutzer bestätigt</li>
              </ul>
          </div>
        } />
        <h3 id="classification_title">Wie heißt diese Person?</h3>
        <div id="classification_wrapper" className={this.props.shouldHide ? 'hidden' : ''}>
          <div id="classification_list">
            <ClassificationAddNewPersonDialog provideController={ctl => this.ctl = ctl} storeNewPerson={(name) => this.storeNewPerson(name)} />
            <List>
              <ListItem button onClick={this.openNewPersonDialog} disabled={this.state.activeStep >= this.state.imageCount}>
                <Avatar>
                  <img id="classification_list_add_circle" src={PlusCircleOutline} alt="" />
                </Avatar>
                <ListItemText primary="Neue Person" secondary="" />
              </ListItem>
              <Divider />
              {
                Object.keys(this.state.persons).map(function(key) {
                  let person = this.state.persons[key];
                  if(person.name !== 'new' && person.name !== 'unknown') {
                    return (
                      <ListItem className={(classifiedUser === person.id ? "active " : "") + (confirmedUser === person.id ? "confirmed" : "")} button key={key} onClick={() => this.handleClickPerson(key)} disabled={this.state.activeStep >= this.state.imageCount}>
                        <Avatar
                          alt={this.extractUserCode(person.name)}
                          src={this.getAvatar(person)}
                          className="bigAvatar">
                          {person.avatar ? "" : person.name.substr(0,1)}
                        </Avatar>
                        <ListItemText primary={person.name} />
                      </ListItem>
                    );
                  }
                }.bind(this))
              }
            </List>
          </div>
          <div id="classification_content">
            <MobileStepper
              type="progress"
              steps={this.state.imageCount}
              position="static"
              activeStep={this.state.activeStep}
              className={classes.root}
              nextButton={
                <Button dense onClick={this.handleNext} disabled={this.state.activeStep >= (this.state.imageCount-1)}>
                  Nächstes
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button dense onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Vorheriges
                </Button>
              } 
              />

              <div id="classification_image">
                {classification_image}
              </div>
          </div>
        </div>
      </div>
    )
  }
}

Classification.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Classification);
