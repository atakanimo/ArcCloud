import * as React from 'react';
import TextField from '@mui/material/TextField';
import GetDynamicDimensions from '../helper/GetDynamicDimensions';
import Text from './Text/Text';
export default function TextInput({label, type, width, header, mR, fullWidth, value, onChange}) {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  const styles = {
    container: {
      marginBottom: 15,
      marginRight: mR ? mR : 10,
    },
    input: {
      width: dynamicWidth / width,
      minWidth: 150,
    },
  };
  return (
    <div style={styles.container}>
      {header ? <Text mT={10} width={'auto'} height={'auto'} label={header} /> : null}
      <TextField
        // sx={{font}}
        fullWidth={(fullWidth = true ? fullWidth : false)}
        onChange={onChange}
        style={styles.input}
        type={type}
        required
        label={label}
        value={value}
      />
    </div>
  );
}
