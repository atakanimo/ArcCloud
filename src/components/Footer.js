import React from 'react';
import GetDynamicDimensions from '../helper/GetDynamicDimensions';
import {GrMail} from 'react-icons/gr';
import {AiFillLinkedin} from 'react-icons/ai';
import {FaHome} from 'react-icons/fa';
import AdvancoLogo from '../assets/advanco-logo-positive.svg';

function Footer() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  const styles = {
    footerArea: {
      flex: 1,
      backgroundColor: '#f9f8fa',
      height: dynamicHeight / 12,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    info: {
      flex: 1,
      fontSize: '12px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoArea: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconArea: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icons: {
      fontSize: '36px',
      margin: '15px',
    },
  };

  return (
    <div style={styles.footerArea}>
      <div style={styles.iconArea}>
        <FaHome style={styles.icons} onClick={() => window.open('https://www.advanco.com/tr/')} />
        <GrMail style={styles.icons} />
        <AiFillLinkedin style={styles.icons} onClick={() => window.open('https://www.linkedin.com/company/advanco-sa/mycompany/')} />
      </div>
      <div style={styles.logoArea}>
        <img src={AdvancoLogo} />
      </div>
      <div style={styles.info}>
        <div style={{textAlign: 'center'}}>
          © 2021 ADVANCO SA. ALL RIGHTS RESERVED. ADVANCO AND THE ADVANCO LOGO ARE TRADEMARKS OF ADVANCO SA.
        </div>
      </div>
    </div>
  );
}

export default Footer;
