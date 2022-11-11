import * as React from 'react';
import TextField from '@mui/material/TextField';
import GetDynamicDimensions from '../helper/GetDynamicDimensions';
import Text from './Text/Text';

export default function TextInput({mb, mt, mL, name, minWidth, label, type, width, header, mR, fullWidth, value, onChange, isRequired, containerStyle, inputStyle}) {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  const styles = {
    container: {
      marginBottom: mb ? mb : 0,
      marginRight: mR ? mR : 10,
      marginLeft: mL ? mL : 0,
    },
    input: {
      width: dynamicWidth / width,
      minWidth: minWidth ? minWidth : 150,
      marginTop: mt ? mt : 5,
      backgroundColor: 'white',
    },
  };
  return (
    <div style={containerStyle || styles.container}>
      {header ? <Text mT={15} width={'auto'} height={'auto'} label={header} /> : null}
      <TextField
        name={name}
        size="small"
        fullWidth={(fullWidth = true ? fullWidth : false)}
        onChange={onChange}
        style={inputStyle || styles.input}
        type={type}
        required={isRequired ? true : false}
        label={label}
        value={value}
      />
    </div>
  );
}
