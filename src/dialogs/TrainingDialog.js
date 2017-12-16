import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { LinearProgress } from 'material-ui/Progress';
import './TrainingDialog.css';

import { subscribe } from 'mqtt-react';

class TrainingDialog extends React.Component {

  state = {
    open: false,
    text: "",
    trainingProgress: 50
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  parseSystemStatus(data) {
    let status = data.pop();
    if(status && status.status) {
      //console.log(status);
      let state = status.status.state;
      let meta = status.status.meta;
      let description = meta.description;
      //let result = `${state} - ${description}`;
      let result = `${description}`;
      if(description === "Training" || description === "Augmenting" || description === "Transforming") {
        //result += ` (${meta.step}/${meta.total_steps})`;
        let progress = meta.step / meta.total_steps * 100;
        console.log(progress);

        this.setState({ 
            open: true,
            text: result,
            trainingProgress: progress
        });
      } else if(state === "FINISHED") {
        result = "";

        this.setState({ 
            open: false,
            text: result,
            trainingProgress: 0
        });
      } 
      //console.log(result);
      return result;
    }
    return "";
  }

  /*
    <DialogContentText>
        {this.parseSystemStatus(this.props.data)} 
        Let Google help apps determine location. This means sending anonymous location data to
        Google, even when no apps are running.
    </DialogContentText>
  */

  /*
   TODO: The Abort button doesn't have any functionallity yet!
  */
  render() {
    this.parseSystemStatus(this.props.data);
    
    return (
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
            <DialogTitle className="trainingDialogTitle">Training läuft...</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {this.state.text}
                </DialogContentText>
                <br/>
                <LinearProgress mode="determinate" color="accent" className="trainingProgress" value={this.state.trainingProgress} />
                
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleRequestClose} color="primary" autoFocus>
                    Abbrechen
                </Button>
            </DialogActions>
        </Dialog>
    )
  }
}

export default subscribe({
    topic: 'heimdall/status/training'
})(TrainingDialog);

  

