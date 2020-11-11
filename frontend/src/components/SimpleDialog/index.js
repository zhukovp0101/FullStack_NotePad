import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function SimpleDialog(props) { 
  const handleYes = () => {
    props.onClose();
    props.onYes();
  };

  const handleNo = () => {
    props.onClose();
    props.onNo();
  }

  return (
      <Dialog
        open={props.open}
        onClose={handleNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleYes} color="primary">
            Yes
          </Button>
          <Button onClick={handleNo} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
  );
}