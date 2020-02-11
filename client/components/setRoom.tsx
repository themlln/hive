import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {

  const [open, setOpen] = React.useState(false);

   const handleClickOpen = () => {
    setOpen(true);
    // props.createCanvas()
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create Room
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Entering Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Set name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Room URL"
            type="url"
            value='URL HERE FROM CANVAS ID'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
