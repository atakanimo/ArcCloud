import React from 'react';
import SpinnerBootstrap from 'react-bootstrap/Spinner';
import GetDynamicDimensions from '../helper/GetDynamicDimensions';

export default function Spinner() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;
  const styles = {
    spinnerArea: {
      flex: 1,
      display: 'flex',
      height: dynamicHeight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    spinnerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: dynamicWidth * 0.08,
      height: dynamicHeight * 0.1,
      backgroundColor: 'gray',
      borderRadius: 10,
    },
    spinner: {
      width: 50,
      height: 50,
      color: 'white',
      fontSize: 24,
    },
  };
  return (
    <div style={styles.spinnerArea}>
      <div style={styles.spinnerContainer}>
        <SpinnerBootstrap style={styles.spinner} animation="border" variant="dark" />
      </div>
    </div>
  );
}
