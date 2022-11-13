import React, {useState} from 'react';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import PermissionService from '../../Business/PermissionService';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alertify from '../../components/Alertify';
import Switch from '../../components/Checkbox-Switch/Switch';

export const INPUT_MIN_CHAR_LENGTH = '5';
export const INPUT_MAX_CHAR_LENGTH = '100';

const getLabels = isNew => {
  let controlIdLabel = 'Control ID';
  let formNameLabel = 'Form Name';
  let descriptionLabel = 'Description';

  if (isNew) {
    controlIdLabel = 'CREATE ' + controlIdLabel;
    formNameLabel = 'CREATE ' + formNameLabel;
    descriptionLabel = 'CREATE ' + descriptionLabel;
  } else {
    controlIdLabel = 'EDIT ' + controlIdLabel;
    formNameLabel = 'EDIT ' + formNameLabel;
    descriptionLabel = 'EDIT ' + descriptionLabel;
  }
  return {controlIdLabel, formNameLabel, descriptionLabel};
};

const SettingsModal = ({itemToEdit, modalInfo, setData, setIsModified, roles}) => {
  const [screenSize] = GetDynamicDimensions();
  const {dynamicHeight, dynamicWidth} = screenSize;
  const {item, itemIdx} = itemToEdit;

  const {isNew, setModal} = modalInfo;

  const checkBoxValues = {
    va: 0,
    ea: 0,
    vm: 0,
    em: 0,
    vo: 0,
    eo: 0,
    vu: 0,
    eu: 0,
    vq: 0,
    eq: 0,
    v1: 0,
    e1: 0,
    e2: 0,
    v3: 0,
    e3: 0,
    v4: 0,
    e4: 0,
    v5: 0,
    e5: 0,
  };

  // editing
  const [controlId, setControlId] = useState((item && item.controlId) || '');
  const [formName, setFormName] = useState((item && item.formName) || '');
  const [description, setDescription] = useState((item && item.description) || '');

  const handleCancel = () => setModal(false);

  const handleCreate = async () => {
    // show an alert when creation is failed
    const {data, success} = await PermissionService.CreateEntry(formName, controlId, description, checkBoxValues);
    if (!success) return Alertify.ErrorNotifications('Could not create entry!');

    setData(p => [...p, data]);
    setModal({trigger: false, isNew: false});
    Alertify.SuccessNotifications('Entry created!');
    setIsModified(true);
    return;
  };

  const handleSave = async () => {
    const updatedItem = PermissionService.ConstructEntryObject(formName, controlId, description, item);
    setData(p => {
      p[itemIdx] = updatedItem;
      return p;
    });
    setModal({trigger: false, isNew: false});
    setIsModified(true);
    Alertify.SuccessNotifications('Changes made. Be sure to save!');
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
      maxHeight: dynamicHeight * 0.85,
      overflowY: 'scroll',
    },
    modalContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: dynamicWidth * 0.5,
      maxWidth: 450,
      // heigth: 700,
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
      borderWidth: 0,
    },
    switchAreaStyle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: 150,
      marginTop: 10,
      marginLeft: 30,
      minHeight: 30,
      marginRight: 10,
    },
    switchStyle: {
      width: 110,
      height: 25,
      marginRight: 10,
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
              <InputWithHeader
                value={controlId}
                onChange={e => setControlId(e.target.value)}
                screenSize={screenSize}
                label={labels.controlIdLabel}
              />
              <InputWithHeader
                value={formName}
                onChange={e => setFormName(e.target.value)}
                screenSize={screenSize}
                label={labels.formNameLabel}
              />
              <InputWithHeader
                value={description}
                onChange={e => setDescription(e.target.value)}
                screenSize={screenSize}
                label={labels.descriptionLabel}
              />
              {
                isNew && <div style={{display: 'flex', flexWrap: 'wrap'}}>
                  {roles &&
                    roles.map((role, index) => (
                      <React.Fragment key={index}>
                        <Switch
                          header={role}
                          setValue={() => (checkBoxValues[role] = checkBoxValues[role] === 0 ? 1 : 0)}
                          switchAreaStyle={styles.switchAreaStyle}
                          switchStyle={styles.switchStyle}
                        />
                      </React.Fragment>
                    ))}
                </div>
              }
            </>
            <div style={styles.btnsContainer}>
              <button onClick={() => (isNew ? handleCreate() : handleSave())} style={styles.buttons}>
                {isNew ? 'Create' : 'Save'}
              </button>
              <button onClick={() => handleCancel()} style={styles.buttons}>
                Cancel
              </button>
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
