import * as React from 'react';
import TextField from '@mui/material/TextField';
import GetDynamicDimensions from '../helper/GetDynamicDimensions';

export default function TextInput({label, type, width, header, mTop}) {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  return (
    <>
      {header ? <h4 style={{marginTop: 10}}>{header}</h4> : null}
      <TextField
        onChange={null}
        sx={{width: dynamicWidth / width, marginTop: mTop ? mTop : 0, marginRight: 2, fontSize: 16}}
        type={type}
        required
        label={label}
      />
    </>
  );
}
