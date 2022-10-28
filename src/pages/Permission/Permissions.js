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

  const container = {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: dynamicHeight - dynamicHeight / 6,
    overflow: 'scroll',
    padding: 0,
  };
  const mainDiv = {
    display: 'flex',
  };
  const headerDiv = {backgroundColor: 'yellow', borderWidth: 1, borderStyle: 'solid', height: 40, minWidth: 250};
  const permDiv = {display: 'flex'};
  const columnsArray = {
    backgroundColor: 'green',
    width: 70,
    borderWidth: 1,
    height: 40,
    borderStyle: 'solid',
    textAlign: 'center',
  };

  return (
    <Box sx={container}>
      <div style={mainDiv}>
        <div style={headerDiv}>{'ControlId'}</div>
        <div style={permDiv}>
          {columns.map(item =>
            item == 'formName' ? <div style={{...columnsArray, minWidth: 120}}>{item}</div> : <div style={columnsArray}>{item}</div>,
          )}
        </div>
      </div>
      {data.map(a => {
        return (
          <div style={mainDiv}>
            <div style={headerDiv}>{a.controlId}</div>
            <div style={permDiv}>
              {columns.map(item => (
                <>
                  {item == 'formName' ? (
                    <div style={{...columnsArray, minWidth: 120}}>{a[item]}</div>
                  ) : (
                    <div style={columnsArray}>
                      <CheckBox checked={a[item] == 1 ? true : a[item] == 9 ? true : false} disabled={a[item] == 9 ? true : false} />
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
