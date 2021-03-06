import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 345,
    margin: 16
  },
  media: {
    height: 250,
    backgroundSize: 'contain',
  },
};

/*
Parameters:
  image_url
  image_title
  headline
  content
  link_url
  link_title

*/

class CustomCard extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={this.props.className}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={this.props.image_url}
            title={this.props.image_title} />
          <CardContent>
            <Typography type="headline" component="h2">
              {this.props.headline}
            </Typography>
            <Typography component="p">
              {this.props.content}
            </Typography>
          </CardContent>
          <CardActions>
            <Button dense color="primary" onClick={() => window.location = this.props.link_url }>{this.props.link_title}</Button>
            {
              (this.props.link_2_title && 
                (<Button dense color="primary" onClick={this.props.link_2_click}>{this.props.link_2_title}</Button>)
              )
            }
            
          </CardActions>
        </Card>
      </div>
    )
  }
}

CustomCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomCard);
