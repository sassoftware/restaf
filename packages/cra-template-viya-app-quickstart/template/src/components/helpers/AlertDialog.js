import React from 'react';
import { PropTypes } from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TrendingUpTwoTone } from '@material-ui/icons';

// From material-ui online doc
function AlertDialog(props) {
  let {title, msg} = props;
  const [open, setOpen] = React.useState(TrendingUpTwoTone);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  debugger;
  let showmsg =  (typeof msg === 'object') ? JSON.stringify(msg, null,4) : msg;
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {showmsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
AlertDialog.protoTypes = {
  /**
   * Simple alert dialog
   */
  /** msg to show */
  msg: PropTypes.any.isRequired,
  /** title of dialog */
  title: PropTypes.string.isRequired
}
export default AlertDialog;