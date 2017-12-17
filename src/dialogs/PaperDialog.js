import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    wrapper: theme.mixins.gutters({
        textAlign: 'center',
    }),
    root: theme.mixins.gutters({
        width: '90%',
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        display: 'inline-block',
        //background: '#e57373', // Material Color Red #300
    }),
});

class PaperDialog extends React.Component {

  render() {
    const { classes } = this.props;
    let style = { background: this.props.color };

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.root} style={style} elevation={4}>
                <Typography type="headline" component="h3">
                    {this.props.title}
                </Typography>
                <Typography component="p">
                    {this.props.content}
                </Typography>
            </Paper>
      </div>
    )
  }
}

PaperDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(PaperDialog);
