import React from 'react';
import GetDynamicDimensions from '../helper/GetDynamicDimensions';
import {LoadingButton} from '@mui/lab';

export default function ButtonComponent({loading, mT, mL, height, minWidth, label, width, onClick, mR, type}) {
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
    <LoadingButton loading={loading} type={type} onClick={onClick} style={styles.button} variant="contained">
      <div style={{fontSize: 17}}>{label}</div>
    </LoadingButton>
  );
}
