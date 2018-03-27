import React from 'react';

import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

class ClassificationAddNewPersonDialog extends React.Component {

  state = {
    open: false,
  };
  

  componentDidMount() {
    // https://github.com/reactjs/react-redux/pull/270#issuecomment-175217424
    
    this.props.provideController({
      open: () => this.openDialog(),
      close: () => this.closeDialog()
    });
  }

  componentWillUnmount() {
    this.props.provideController(null);
  }

  openDialog = () => {
    this.setState({open: true})
  }

  _handleTextFieldChange(event) {
      this.setState({
          newPersonName: event.target.value
      });
  }

  closeDialog = () => {
    this.setState({open: false})
  }

  render() {
    const { fullScreen } = this.props;
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}>
          <DialogTitle>Neue Person anlegen</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Gebe bitte einen Namen für die neue Person ein.
            </DialogContentText>

            <TextField
              onChange={(e) => this._handleTextFieldChange(e)}
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.storeNewPerson(this.state.newPersonName)} color="primary">
              Speichern
            </Button>
            <Button onClick={this.closeDialog} color="primary" autoFocus>
              Abbrechen
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


ClassificationAddNewPersonDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ClassificationAddNewPersonDialog);
