import React, {useState} from 'react';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const INPUT_MIN_CHAR_LENGTH = 5;
const INPUT_MAX_CHAR_LENGTH = 100;

const SettingsModal = ({itemToEdit, setters, open, setOpen, selectedData}) => {
  const [screenSize] = GetDynamicDimensions();
  const {dynamicHeight, dynamicWidth} = screenSize;

  const [controlId, setControlId] = useState(itemToEdit.controlId);
  const [formName, setFormName] = useState(itemToEdit.formName);
  const [description, setDescription] = useState(itemToEdit.description);

  const handleCancel = () => setters.setTriggerModal(false);
  const handleSave = () => {
    itemToEdit.formName = formName;
    itemToEdit.controlId = controlId;
    itemToEdit.description = description;
    setters.setData(p => [...p, itemToEdit]);
    setters.setTriggerModal(false);
    return;
  };

  const styles = {
    box: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'auto',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 2,
    },
    modalContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: dynamicWidth * 0.5,
      maxWidth: 450,
    },

    btnsContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 10,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    buttons: {
      padding: 8,
      fontSize: 20,
      fontWeight: '600',
      color: 'black',
      marginRight: 10,
      backgroundColor: 'white',
      borderRadius: 5,
    },
  };
  if (!itemToEdit) return null;
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={styles.box}>
          <div style={styles.modalContainer}>
            <InputWithHeader value={controlId} onChange={e => setControlId(e.target.value)} screenSize={screenSize} label={'EDIT Control ID'} />
            <InputWithHeader value={formName} onChange={e => setFormName(e.target.value)} screenSize={screenSize} label={'EDIT Form Name'} />
            <InputWithHeader
              value={description}
              onChange={e => setDescription(e.target.value)}
              screenSize={screenSize}
              label={'EDIT Description'}
            />
            <div style={styles.btnsContainer}>
              <div onClick={() => handleSave()} style={styles.buttons}>
                Save
              </div>
              <div onClick={() => handleCancel()} style={styles.buttons}>
                Cancel
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default SettingsModal;

const InputWithHeader = ({value, label, screenSize, onChange, isRequired = true}) => {
  const {dynamicHeight, dynamicWidth} = screenSize;
  const styles = {
    container: {marginTop: 10, marginBottom: 10, flex: 1, flexDirection: 'column', display: 'flex', alignItems: 'center'},
    headerText: {
      display: 'flex',
      justifyContent: 'center',
      fontSize: 20,
      fontWeight: '600',
      color: 'black',
      marginBottom: 5,
    },
    input: {
      width: dynamicWidth * 0.45,
      maxWidth: 400,
      height: dynamicHeight * 0.045,
      borderRadius: 5,
      backgroundColor: '#dee2e6',
    },
  };
  return (
    <div style={styles.container}>
      <div style={styles.headerText}>{label}</div>
      <input
        value={value}
        onChange={onChange}
        required={isRequired == true ? true : false}
        minlength={String(INPUT_MIN_CHAR_LENGTH)}
        maxlength={String(INPUT_MAX_CHAR_LENGTH)}
        style={styles.input}
      />
    </div>
  );
};
