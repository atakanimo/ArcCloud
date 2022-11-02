import React, {useEffect, useState} from 'react';
import CheckBox from '../../components/Checkbox/Checkbox';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import Mock from '../../Mock/permissions_mock.json';
import {Box} from '@mui/material';

import PaginationContainer from '../../components/PaginationContainer';
import SettingsModal from './SettingsModal';

const columns = ['formName', 'va', 'ea', 'vm', 'em', 'vo', 'eo', 'vu', 'eu', 'vq', 'eq', 'v1', 'e1', 'e2', 'v3', 'e3', 'v4', 'e4', 'v5', 'e5'];

const ADD_COLUMN_TEXT = 'Add New Column';
const EDIT_COLUMN_TEXT = 'Edit A Column';

const Styles = (width, height) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: height * 0.92,
    overflow: 'scroll',
    padding: 0,
  },
  mainDiv: {
    display: 'flex',
  },
  titles: (index, isElected) => ({
    backgroundColor: isElected ? 'red' : index % 2 === 0 ? '#FFFFFF' : '#BFBFBF',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 40,
    minWidth: 250,
  }),
  permDiv: {
    display: 'flex',
  },
  columnsArray: (index = 0, isElected) => ({
    backgroundColor: isElected ? 'red' : index % 2 === 0 ? '#FFFFFF' : '#BFBFBF',
    width: 70,
    borderWidth: 1,
    height: 40,
    borderStyle: 'solid',
    textAlign: 'center',
  }),
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: height * 0.1,
    alignItems: 'center',
  },
  addText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.1,
    height: 40,
    fontSize: 14,
    fontWeight: '600',
    borderRadius: 5,
    backgroundColor: 'purple',
    color: 'white',
    marginLeft: 10,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  editText: isRowSelected => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.1,
    height: 40,
    fontSize: 14,
    fontWeight: '600',
    borderRadius: 5,
    backgroundColor: 'purple',
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
    opacity: !isRowSelected && 0.7,
  }),
});

const Permissions = () => {
  const [screenSize] = GetDynamicDimensions();
  const {dynamicHeight, dynamicWidth} = screenSize;
  const {container, mainDiv, titles, permDiv, columnsArray, header, addText, editText} = Styles(dynamicWidth, dynamicHeight);

  const [force, setForce] = useState(false); // TO FORCE THE RENDER AFTER USER PRESSED ON A CHECKBOX
  const [selectedRowIdx, setSelectedRowIdx] = useState(null);
  const [triggerModal, setTriggerModal] = useState(false);

  const Grid = props => {
    const [data, setData] = useState(props.items || []);

    useEffect(() => {
      setForce(p => !p);
    }, [props.items]);

    const handleChange = (title, objIdx) => {
      const checkboxValue = data[objIdx][title];
      data[objIdx][title] = checkboxValue === 0 ? 1 : 0;
      setData(data);
      setForce(p => !p);
      return;
    };

    const handleCreateEvent = event => {};

    return (
      <>
        {triggerModal && <SettingsModal setters={{setTriggerModal, setData}} open={true} itemToEdit={data[selectedRowIdx] || null} />}
        <Box sx={[container, {opacity: triggerModal ? 0.3 : 1}]}>
          <div style={header}>
            <div onClick={e => handleCreateEvent(e)} style={addText}>
              {ADD_COLUMN_TEXT}
            </div>
            <div onClick={() => setTriggerModal(true)} style={editText(Boolean(selectedRowIdx))}>
              {EDIT_COLUMN_TEXT}
            </div>
          </div>
          <div style={mainDiv}>
            <div style={titles(1)}>{'ControlId'}</div>
            <div style={permDiv}>
              {columns.map((item, index) =>
                item == 'formName' ? <div style={{...columnsArray(1), minWidth: 120}}>{item}</div> : <div style={columnsArray(1)}>{item}</div>,
              )}
            </div>
          </div>
          {data.length > 0 &&
            data.map((permissionObj, index) => {
              return (
                <div style={mainDiv}>
                  <div onClick={e => setSelectedRowIdx(index)} style={titles(index, selectedRowIdx === index)}>
                    {permissionObj.controlId}
                  </div>
                  <div style={permDiv}>
                    {columns.map((item, idx) => (
                      <>
                        {item == 'formName' ? (
                          <div style={{...columnsArray(index, selectedRowIdx === index), minWidth: 120}}>{permissionObj[item]}</div>
                        ) : (
                          <div style={columnsArray(index, selectedRowIdx === index)}>
                            <CheckBox
                              onChange={() => handleChange(item, index)}
                              checked={permissionObj[item] == 1 ? true : permissionObj[item] == 9 ? true : false}
                              disabled={permissionObj[item] == 9 ? true : false}
                            />
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              );
            })}
        </Box>
      </>
    );
  };

  return <PaginationContainer itemArray={Mock} ChildComponent={Grid} />;
};

export default Permissions;
