import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class ClassificationInfoDialog extends React.Component {

  state = {
    open: true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };
  
  render() {
    return (
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
            <DialogTitle className="trainingDialogTitle">{this.props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {this.props.contentText}
                </DialogContentText>
                {this.props.content}
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleRequestClose} color="primary" autoFocus>
                    Verstanden
                </Button>
            </DialogActions>
        </Dialog>
    )
  }
}

export default ClassificationInfoDialog