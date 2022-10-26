import React from 'react';
import GetDynamicDimensions from '../helper/GetDynamicDimensions';
import {GrMail} from 'react-icons/gr';
import {AiFillLinkedin} from 'react-icons/ai';
import {FaHome} from 'react-icons/fa';

function Footer() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;
  return (
    <div style={{backgroundColor: '#f9f8fa', height: dynamicHeight / 12, display: 'flex', justifyContent: "flex-end", padding: '5px'}}>
      <div style={{width: "50%", display: "flex", justifyContent: "space-around", alignItems: "center"}}>
        <GrMail style={{fontSize: '36px'}} />
        <AiFillLinkedin style={{fontSize: '36px'}} onClick={() => window.open('https://www.linkedin.com/company/advanco-sa/mycompany/')} />
        <FaHome style={{fontSize: '36px'}} onClick={() => window.open('https://www.advanco.com/tr/')} />
      </div>
    </div>
  );
}

export default Footer;
