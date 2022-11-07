import React, {useState} from 'react';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export const INPUT_MIN_CHAR_LENGTH = 5;
export const INPUT_MAX_CHAR_LENGTH = 100;

const emptyItem = {
  "plantId": "",
  "formName": "",
  "controlId": "",
  "description": "",
  "va": 0,
  "ea": 0,
  "vm": 0,
  "em": 0,
  "vo": 0,
  "eo": 0,
  "vu": 0,
  "eu": 0,
  "vq": 0,
  "eq": 0,
  "v1": 0,
  "e1": 0,
  "v2": 0,
  "e2": 0,
  "v3": 0,
  "e3": 0,
  "v4": 0,
  "e4": 0,
  "v5": 0,
  "e5": 0,
  "header": 0,
  "dasboard": null,
  "isDisplayOnList": 0,
  "caption": "",
  "iconCode": "",
  "styleCode": "",
  "id": 0,
  "creatorUser": "",
  "createDate": "",
  "creatorApp": null,
  "creatorAppVersion": null,
  "updaterUser": "",
  "updateDate": "",
  "updaterApp": "",
  "updaterAppVersion": ""
};

const ConstructItemObject = (newItem, newItemId) => {
  // fill the other necessary fields to operate, in the future
  newItem.id = newItemId;
  newItem.createDate = `${new Date().toISOString()}`;
  newItem.creatorUser = 'ADMIN' // this should be username in the future
  return newItem;
}

const SettingsModal = ({ itemToEdit, setters, isNew, newItemId }) => {
  const [screenSize] = GetDynamicDimensions();
  const {dynamicHeight, dynamicWidth} = screenSize;
  const { SetParentState, setter } = setters;
  const { item, itemIdx } = itemToEdit;

  // editing
  const [controlId, setControlId] = useState(!isNew && item.controlId);
  const [formName, setFormName] = useState(!isNew && item.formName);
  const [description, setDescription] = useState(!isNew && item.description);
  // creating
  const [newItem, setNewItem] = useState(isNew ? emptyItem : null);

  const handleCancel = () => SetParentState('triggerModal', false);

  const handleCreate = () => {
    const newObj = ConstructItemObject(newItem, newItemId);

    setter(p => {
      const newItemIdx = p['allItems'].length;
      p['allItems'][newItemIdx] = newObj;
      return p;
    })
    SetParentState('isNew', false);
    SetParentState('triggerModal', false);
    return;
  };

  const handleSave = () => {
    item.formName = formName;
    item.controlId = controlId;
    item.description = description;

    setter(p => {
      delete p['allItems'][itemIdx];
      p['allItems'][itemIdx] = item;
      return p;
    });

    SetParentState('triggerModal', false);
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
  return (
    <div>
      <Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={styles.box}>
          <div style={styles.modalContainer}>

            { !isNew ? (
              <>
                <InputWithHeader value={controlId} onChange={e => setControlId(e.target.value)} screenSize={screenSize} label={'EDIT Control ID'} />
                <InputWithHeader value={formName} onChange={e => setFormName(e.target.value)} screenSize={screenSize} label={'EDIT Form Name'} />
                <InputWithHeader value={description} onChange={e => setDescription(e.target.value)} screenSize={screenSize} label={'EDIT Description'}/>
              </>
            ) : (
              <>
                <InputWithHeader value={newItem.controlId} onChange={e => setNewItem(p => ({ ...p, controlId: e.target.value }) )} screenSize={screenSize} label={'CREATE a Control ID'} />
                <InputWithHeader value={newItem.formName} onChange={e => setNewItem(p => ({ ...p, formName: e.target.value }) )} screenSize={screenSize} label={'CREATE a Form Name'} />
                <InputWithHeader value={newItem.description} onChange={e => setNewItem(p => ({ ...p, description: e.target.value }) )} screenSize={screenSize} label={'CREATE a Description'}/>
              </>
            ) }

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
        minlength={String(INPUT_MIN_CHAR_LENGTH)}
        maxlength={String(INPUT_MAX_CHAR_LENGTH)}
        style={styles.input}
      />
    </div>
  );
};
