import * as React from 'react';
import TextField from '@mui/material/TextField';
import GetDynamicDimensions from '../helper/GetDynamicDimensions';

export default function TextInput({label, type, width}) {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  return (
    <TextField
      onChange={null}
      sx={{width: dynamicWidth / width, marginTop: 2, marginRight: 2, fontSize: 16}}
      type={type}
      required
      label={label}
    />
  );
}
