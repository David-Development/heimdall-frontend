import React from 'react';

import './Gallery.css'

import DeleteDialog from './DeleteDialog'
import Button from 'material-ui/Button';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';

// import Logan from '../images/logan.jpg'
// import TheRock from '../images/therock.jpg'
// import TheRock2 from '../images/therock2.jpg'

import HTTPClient from '../HTTPClient'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  subheader: {
    width: '100%',
  },
});

class Gallery extends React.Component {

  componentDidMount() {
    this.reloadData();
  }

  reloadData(callback) {
    console.log("Reload data");
    HTTPClient.fetchPersons()
      .then(persons => {
        this.setState({ persons: persons });

        if(callback) {
          callback();
        }
      })
      .catch(error => alert(error));
  }

  state = {
    persons: {},
    currentPerson: {},
    currentImages: []
  }

  handleClickPerson = (key) => {
    console.log(key, " - ", this.state.persons[key]);

    HTTPClient.fetchPersonImages(this.state.persons[key].id)
      .then(gallery => {
        //console.log(gallery);
        this.setState({ 
            currentPerson: this.state.persons[key],
            currentImages: gallery.images
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ 
          currentPerson: this.state.persons[key],
          currentImages: []
        });
      });
  }

  openDeletePersonDialog = (person) => {
    console.log(person);
    this.dialogDeletePerson.setTitle(`Person entfernen`);
    this.dialogDeletePerson.setContent(`Möchten Sie die Person "${person.name}" wirklich löschen?\nIhre Daten bleiben erhalten.`);
    this.dialogDeletePerson.open();
  };

  deletePerson() {
    console.log("deletePerson", this.state.currentPerson);

    HTTPClient.deletePerson(this.state.currentPerson.id)
      .then(() => this.reloadData())
      .catch(error => {
        alert(error);
      });
    
    this.dialogDeletePerson.close();
  }

  openDeleteImageDialog = (imageid) => {
    this.dialogDeleteImage.setTitle(`Bild entfernen`);
    this.dialogDeleteImage.setContent(`Möchten Sie das Bild wirklich löschen?`);
    this.dialogDeleteImage.setId(imageid);
    this.dialogDeleteImage.open();
  }

  deleteImage(imageid) {
    console.log("deleteimage", imageid);
    
    let unkownGallery = this.state.persons.find((e) => e.name === 'unknown');

    // Update the person of the first image. If we detected more than one person we don't allow the update process!
    HTTPClient.updateClassification(unkownGallery.id, imageid)
      .then(r => this.reloadData(() => {
        let idx = this.state.persons.findIndex((e) => e.id === this.state.currentPerson.id);
        this.handleClickPerson(idx);
      }))
      .catch(alert);

    this.dialogDeleteImage.close();
  }

  isPersonSelected() {
    return !(Object.keys(this.state.currentPerson).length === 0 && this.state.currentPerson.constructor === Object);
  }

  render() {
    const { classes } = this.props;

    return (
      <div id="gallery_wrapper">
        <div id="gallery_list">

          <DeleteDialog provideController={ctl => this.dialogDeletePerson = ctl} delete={(id) => this.deletePerson()}  />
          <DeleteDialog provideController={ctl => this.dialogDeleteImage = ctl}  delete={(imageid) => this.deleteImage(imageid)}  />
          
          <List>
            {
              Object.keys(this.state.persons).filter(key => {
                let name = this.state.persons[key].name;
                if(name === 'new' || name === 'unknown') {
                  return false;
                }
                return true;
              }).map(function(key) {
                let person = this.state.persons[key];
                return (
                  <ListItem button key={key} onClick={() => this.handleClickPerson(key)}>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                    <ListItemText primary={person.name} secondary={person.images + " Bilder"} />
                  </ListItem>
                )
              }.bind(this))
            }
          </List>
        </div>
        <div id="gallery_content" className={classes.root}>
        
          { this.isPersonSelected() && 
            <Button className="btn_delete_person" dense color="primary" onClick={() => this.openDeletePersonDialog(this.state.currentPerson)}>Person Löschen</Button>
          }
          
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {
              this.state.currentImages.map(image => 
                (<GridListTile key={image.id} cols={1} onClick={() => this.openDeleteImageDialog(image.id)}>
                  <img key={image.id} src={HTTPClient.getApiEndpoint(`/api/${image.path}`)} alt="" />
                </GridListTile>)
              )
            }
          </GridList>
        </div>
      </div>
    )
  }
}

Gallery.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Gallery);
