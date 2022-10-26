import {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import './sidebar.scss';

const sidebarNavItems = [
  {
    display: 'My Company',
    icon: <i className="bx bx-home"></i>,
    to: '/home',
    section: 'home',
  },
  {
    display: 'Device Configuration',
    icon: <i className="bx bx-star"></i>,
    to: '/screenConfiguration',
    section: 'screenConfiguration',
  },
  {
    display: 'Admin Configuration',
    icon: <i className="bx bx-calendar"></i>,
    to: '/tracelinkConfiguration',
    section: 'tracelinkConfiguration',
  },
  {
    display: 'Device Settings',
    icon: <i className="bx bx-calendar"></i>,
    to: '/deviceSettings',
    section: 'deviceSettings',
  },
  {
    display: 'Logs',
    icon: <i className="bx bx-user"></i>,
    to: '/logs',
    section: 'logs',
  },
  {
    display: 'Login',
    icon: <i className="bx bx-user"></i>,
    to: '/login',
    section: 'login',
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const curPath = window.location.pathname.split('/')[1];
    const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div className="sidebar">
      <div className="sidebar__logo">Edge Cloud</div>
      <div ref={sidebarRef} className="sidebar__menu">
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`,
          }}></div>
        {sidebarNavItems.map((item, index) => (
          <Link to={item.to} key={index} style={{textDecoration: 'none'}}>
            <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
            {item.display == 'Device Settings' ? (
              <div
              // style={{display: 'flex', flex:1, backgroundColor: 'red'}}
              >
                <hr class="dotted"></hr>{' '}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
