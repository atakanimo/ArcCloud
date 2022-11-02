import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({open, setOpen, selectedData}) {
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{mt: 2}}>
            Username: {selectedData.Username}
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2}}>
            RequestXML: {selectedData.RequestXML}
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2}}>
            ResponseXML: {selectedData.ResponseXML}
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2}}>
            Client Message: {selectedData.ClientMessage}
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2}}>
            Module Name: {selectedData.ModuleName}
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2}}>
            Request Date: {selectedData.RequestDate}
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2}}>
            Network Error: {selectedData.Error}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
