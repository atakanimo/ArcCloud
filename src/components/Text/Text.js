import React from 'react';

export default function Text({tAlign, label, isBold, fontSize, width, height, mT, mB, mR, mL}) {
  const styles = {
    container: {
      textAlign: tAlign ? 'center' : null,
      display: 'flex',
      alignItems: 'center',
      fontWeight: isBold ? 'bold' : null,
      fontSize: fontSize ? fontSize : 17,
      width: width ? width : 90,
      height: height ? height : 55,
      marginTop: mT,
      marginRight: mR,
      marginBottom: mB,
      marginLeft: mL,
      // backgroundColor: 'red',
    },
  };
  return <h4 style={styles.container}>{label}</h4>;
}
