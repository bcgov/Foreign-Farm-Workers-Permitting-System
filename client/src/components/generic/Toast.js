import React from 'react';
import ReactDOM from 'react-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { useToast } from '../../hooks';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Toast = () => {
  const { closeToast, state: { isOpen, status, message } } = useToast();
  return (ReactDOM.createPortal(
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={closeToast}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={closeToast}
        severity={status}
      >
        {message}
      </Alert>
    </Snackbar>, document.body,
  ));
};

export { Toast };
