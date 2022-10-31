import React from 'react';
import GetDynamicDimensions from '../helper/GetDynamicDimensions';
import Button from '@mui/material/Button';

export default function ButtonComponent({label, width, onClick, mR}) {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  const styles = {
    button: {marginRight: mR ? mR : 0, width: width ? dynamicWidth / width : dynamicWidth / 6.5, height: 40, minWidth: 150},
  };
  return (
    <Button onClick={onClick} style={styles.button} variant="contained">
      <div style={{fontSize: 17}}>{label}</div>
    </Button>
  );
}
