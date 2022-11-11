import React from 'react';
import GetDynamicDimensions from '../helper/GetDynamicDimensions';
import Button from '@mui/material/Button';

export default function ButtonComponent({mT, mL, height, minWidth, label, width, onClick, mR}) {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  const styles = {
    button: {
      minWidth: minWidth ? minWidth : 150,
      marginRight: mR ? mR : 0,
      width: width ? dynamicWidth / width : dynamicWidth / 6.5,
      height: height ? height : 40,
      marginTop: mT ? mT : 5,
      marginLeft: mL ? mL : 0,
    },
  };
  return (
    <Button onClick={onClick} style={styles.button} variant="contained">
      <div style={{fontSize: 17}}>{label}</div>
    </Button>
  );
}
