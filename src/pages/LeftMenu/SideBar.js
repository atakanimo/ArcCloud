import {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import './sidebar.scss';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdvancoLogo from '../../assets/advanco-logo-positive.svg';
import AdvancoLogoWhite from '../../assets/ADV_Logo_White.png';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const routes = [
  {
    header: 'ARC',
    Nav: [
      {
        display: 'My Company',
        icon: <i className="bx bx-home"></i>,
        to: '/myCompany', //my company is our main page
        section: 'myCompany', //my company is our main page
      },
      {
        display: 'Permissions',
        icon: <i className="bx bx-user"></i>,
        to: '/permission',
        section: 'permission',
      },
      {
        display: 'Printers',
        icon: <i className="bx bx-user"></i>,
        to: '/printers',
        section: 'printers',
      },
      {
        display: 'SN Management',
        to: '/SNManagement',
        section: 'SNManagement',
      },
    ],
  },
  {
    header: 'LESs Edge',
    Nav: [
      {
        display: 'Admin Configuration',
        icon: <i className="bx bx-calendar"></i>,
        to: '/tracelinkConfiguration',
        section: 'tracelinkConfiguration',
      },
      {
        display: 'Device Configuration',
        icon: <i className="bx bx-star"></i>,
        to: '/screenConfiguration',
        section: 'screenConfiguration',
      },
      {
        display: 'Logs',
        inlineNav: [
          {
            display: 'API Request Logs',
            to: '/apiRequestLogs',
            section: 'apiRequestLogs',
          },
          {
            display: 'Navigation Logs',
            to: '/navigationLogs',
            section: 'navigationLogs',
          },
          {
            display: 'Interaction Logs',
            to: '/interactionLogs',
            section: 'interactionLogs',
          },
          // {
          //   display: 'User Authentication Logs',
          //   to: '/userAuthLogs',
          //   section: 'userAuthLogs',
          // },
          // {
          //   display: 'Network Logs',
          //   to: '/networkLogs',
          //   section: 'networkLogs',
          // },
        ],
      },
    ],
  },
];

const Sidebar = () => {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  const [activeIndex, setActiveIndex] = useState(0);
  const sidebarRef = useRef();

  const location = useLocation();

  useEffect(() => {
    const curPath = window.location.pathname.split('/')[1];
    setActiveIndex(curPath);
  }, [location]);

  const styles = {
    iconArea: {
      flex: 1,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    icons: {
      fontSize: '40px',
      margin: '15px',
      color: 'white',
    },
  };
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={AdvancoLogoWhite} />
      </div>
      <div ref={sidebarRef} className="sidebar__menu">
        {routes.map((item, index) => {
          return (
            <Accordion key={index} style={{boxShadow: 'none'}} className="accordion" defaultExpanded={item.header == 'ARC' ? true : false}>
              <AccordionSummary expandIcon={<ExpandMoreIcon style={{color: 'white'}} />}>
                <Typography className="accordionHeader">{item.header}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                {item.Nav.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.display == 'Logs' ? (
                      <Accordion key={index} style={{boxShadow: 'none'}} className="accordion" defaultExpanded={false}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon style={{color: 'white'}} />}>
                          <div
                            style={{marginLeft: '32px', padding: 0}}
                            className={`sidebar__menu__item ${activeIndex === item.section ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__text">{item.display}</div>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          {item.inlineNav.map((item, index) => (
                            <Link to={item.to} key={index} style={{textDecoration: 'none'}}>
                              <div className={`sidebar__menu__item ${activeIndex === item.section ? 'active' : ''}`}>
                                <div className="sidebar__menu__item__icon">{item.icon}</div>
                                <div className="sidebar__menu__item__text">{item.display}</div>
                              </div>
                            </Link>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    ) : (
                      <Link to={item.to} key={index} style={{textDecoration: 'none'}}>
                        <div className={`sidebar__menu__item ${activeIndex === item.section ? 'active' : ''}`}>
                          <div className="sidebar__menu__item__icon">{item.icon}</div>
                          <div className="sidebar__menu__item__text">{item.display}</div>
                        </div>
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
      <div style={styles.iconArea}>
        <HomeIcon color="white" style={styles.icons} onClick={() => window.open('https://www.advanco.com/tr/')} />
        <MailIcon color="white" style={styles.icons} />
        <LinkedInIcon color="white" style={styles.icons} onClick={() => window.open('https://www.linkedin.com/company/advanco-sa/mycompany/')} />
      </div>
    </div>
  );
};

export default Sidebar;
