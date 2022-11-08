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

export default function BasicModal({open, setOpen, selectedData, header}) {
  const headers = Object.keys(selectedData);
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          {header !== undefined &&
            header.map((item, index) => {
              return (
                <Typography key={index} id="modal-modal-description" sx={{mt: 2}}>
                  {item}: {selectedData[item]}
                </Typography>
              );
            })}
        </Box>
      </Modal>
    </div>
  );
}
