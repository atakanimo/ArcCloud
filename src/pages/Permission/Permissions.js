import React, {useEffect, useState} from 'react';
import CheckBox from '../../components/Checkbox/Checkbox';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import Mock from '../../Mock/permissions_mock.json';
import {Box} from '@mui/material';

const columns = ['formName', 'va', 'ea', 'vm', 'em', 'vo', 'eo', 'vu', 'eu', 'vq', 'eq', 'v1', 'e1', 'e2', 'v3', 'e3', 'v4', 'e4', 'v5', 'e5'];

const Permissions = () => {
  const [data, setData] = useState(Mock);
  const [screenSize] = GetDynamicDimensions();
  const {dynamicHeight, dynamicWidth} = screenSize;
  const [ force, setForce ] = useState(false) // TO FORCE THE RENDER AFTER USER PRESSED ON A CHECKBOX

  const container = {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: dynamicHeight - dynamicHeight / 6,
    overflow: 'scroll',
    padding: 0
  };
  const mainDiv = {
    display: 'flex',
    marginLeft: 5,
    marginRight: 5
  };
  const headerDiv = index => ({
    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#BFBFBF',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 40,
    minWidth: 250
  });
  const permDiv = {
    display: 'flex'
  };
  const columnsArray = (index = 0) => ({
    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#BFBFBF',
    width: 70,
    borderWidth: 1,
    height: 40,
    borderStyle: 'solid',
    textAlign: 'center',
  });

  const handleChange = (title, objIdx) => {
    const checkboxValue = data[objIdx][title];
    data[objIdx][title] = checkboxValue === 0 ? 1 : 0;
    setData(data);
    setForce(p => !p)
    return;
  }
  
  return (
    <Box sx={container}>
      <div style={mainDiv}>
        <div style={headerDiv(1)}>{'ControlId'}</div>
        <div style={permDiv}>
          {columns.map(item =>
            item == 'formName' ? <div style={{...columnsArray(1), minWidth: 120}}>{item}</div> : <div style={columnsArray(1)}>{item}</div>,
          )}
        </div>
      </div>
      {data.length > 0 && data.map((a, index) => {
        return (
          <div style={mainDiv}>
            <div style={headerDiv(index)}>{a.controlId}</div>
            <div style={permDiv}>
              {columns.map(item => (
                <>
                  {item == 'formName' ? (
                    <div style={{...columnsArray(index), minWidth: 120}}>{a[item]}</div>
                  ) : (
                    <div style={columnsArray(index)}>
                      <CheckBox onChange={() => handleChange(item, index)} checked={a[item] == 1 ? true : a[item] == 9 ? true : false} disabled={a[item] == 9 ? true : false} />
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        );
      })}
    </Box>
  );
};

export default Permissions;
