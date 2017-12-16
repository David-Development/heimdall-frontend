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
        background: '#e57373', // Material COlor Red #300
    }),
});

class DialogNoClassifierTrained extends React.Component {

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.root} elevation={4}>
                <Typography type="headline" component="h3">
                    Hinweis
                </Typography>
                <Typography component="p">
                    Das System wurde bisher noch nicht trainiert. Bitte nehmen Sie Bilder von mindestens zwei Personen auf.
                </Typography>
            </Paper>
      </div>
    )
  }
}

DialogNoClassifierTrained.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(DialogNoClassifierTrained);
