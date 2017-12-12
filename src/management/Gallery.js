import React from 'react';

import './Gallery.css'

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
    HTTPClient.fetchPersons()
      .then(persons => {
        this.setState({ persons: persons });
      });
  }

  state = {
    activeStep: 0,
    persons: {},
    currentPerson: {},
    currentImages: []
  }

  handleClickPerson = (key) => {
    console.log(this.state.persons[key]);

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

  render() {
    const { classes } = this.props;

    return (
      <div id="gallery_wrapper">
        <div id="gallery_list">
          <List>
            {
              Object.keys(this.state.persons).map(function(key) {
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
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {
              this.state.currentImages.map(image => 
                (<GridListTile key={image.id} cols={1}>
                  <img src={image.path} alt="" />
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
