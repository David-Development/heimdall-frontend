import React from 'react';

import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

class DeleteDialog extends React.Component {

  state = {
    open: false,
    title: "",
    content: "",
    id: ""
  };

  componentDidMount() {
    // https://github.com/reactjs/react-redux/pull/270#issuecomment-175217424
    
    this.props.provideController({
      open: () => this.openDialog(),
      close: () => this.closeDialog(),
      setTitle: (title) => this.setState({title: title}),
      setContent: (content) => this.setState({content: content}),
      setId: (id) => this.setState({id: id})
    });
  }

  componentWillUnmount() {
    this.props.provideController(null);
  }

  openDialog = () => {
    this.setState({open: true})
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
          <DialogTitle>{this.state.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.delete(this.state.id)} color="primary">
              Löschen
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


DeleteDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(DeleteDialog);
