import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertComponent({text, variant, show, setShow}) {
  // variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  const handlerClose = () => setShow(false);
  return (
    <Alert show={show} variant={variant} onClose={() => handlerClose()} dismissible>
      {text}
    </Alert>
  );
}

export default AlertComponent;
