import React, {useState} from 'react';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import PermissionService from '../../Business/PermissionService';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export const INPUT_MIN_CHAR_LENGTH = '5';
export const INPUT_MAX_CHAR_LENGTH = '100';

const getLabels = (isNew) => {
  let controlIdLabel = 'Control ID';
  let formNameLabel = 'Form Name';
  let descriptionLabel = 'Description';

  if(isNew) {
    controlIdLabel = 'CREATE ' + controlIdLabel;
    formNameLabel = 'CREATE ' + formNameLabel;
    descriptionLabel = 'CREATE ' + descriptionLabel;
  } else {
    controlIdLabel = 'EDIT ' + controlIdLabel;
    formNameLabel = 'EDIT ' + formNameLabel;
    descriptionLabel = 'EDIT ' + descriptionLabel;
  }
  return { controlIdLabel, formNameLabel, descriptionLabel };
}

const SettingsModal = ({ itemToEdit, modalInfo, setData, setIsModified }) => {
  const [screenSize] = GetDynamicDimensions();
  const {dynamicHeight, dynamicWidth} = screenSize;
  const { item, itemIdx } = itemToEdit;

  const { isNew, setModal } = modalInfo;

  // editing
  const [controlId, setControlId] = useState(item && item.controlId || '');
  const [formName, setFormName] = useState(item && item.formName || '');
  const [description, setDescription] = useState(item && item.description || '');

  const handleCancel = () => setModal(false);

  const handleCreate = async () => {
    // show an alert when creation is failed
    const { data, success } = await PermissionService.CreateEntry(formName, controlId, description)
    if(success) {
      setData(p => [...p, data]);
      setModal({ trigger: false, isNew: false });
    }
    setIsModified(true);
    return;
  };

  const handleSave = async () => {
    const updatedItem = PermissionService.ConstructEntryObject(formName, controlId, description, item)
    setData(p => {
      p[itemIdx] = updatedItem;
      return p;
    })
    setModal({ trigger: false, isNew: false });
    setIsModified(true);
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

  if (!isNew && !item) return null;
  const labels = getLabels(isNew);
  return (
    <div>
      <Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={styles.box}>
          <div style={styles.modalContainer}>
              <>
                <InputWithHeader value={controlId} onChange={e => setControlId(e.target.value)} screenSize={screenSize} label={labels.controlIdLabel} />
                <InputWithHeader value={formName} onChange={e => setFormName(e.target.value)} screenSize={screenSize} label={labels.formNameLabel} />
                <InputWithHeader value={description} onChange={e => setDescription(e.target.value)} screenSize={screenSize} label={labels.descriptionLabel}/>
              </>
            <div style={styles.btnsContainer}>
              <div onClick={() => isNew ? handleCreate() : handleSave()} style={styles.buttons}>
                {isNew ? 'Create' : 'Save'}
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
        required={isRequired ? true : false}
        minLength={INPUT_MIN_CHAR_LENGTH}
        maxLength={INPUT_MAX_CHAR_LENGTH}
        style={styles.input}
      />
    </div>
  );
};
