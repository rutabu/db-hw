import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { calculateValue } from './functions';

const CreditDialog = ({ fetchedData, onCloseHandler }) => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setOpen(false);
    onCloseHandler();
  };

  const {
    person: { name, lastName },
    affordability: { min, max },
  } = fetchedData;
  const calculatedValued = calculateValue(fetchedData);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Fetched data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Client: ${name} ${lastName}`}
            <br />
            {`Affordability range: ${min} - ${max}`}
            <br />
            {`Calculated value: ${calculatedValued}`}
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
};

CreditDialog.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  fetchedData: PropTypes.object.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
};

export default CreditDialog;
