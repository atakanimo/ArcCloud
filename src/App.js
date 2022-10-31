import './App.css';
import React from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import AdminConfiguration from './pages/AdminConfiguration/AdminConfiguration';
import Log from './pages/Logs/Log';
import Col from 'react-bootstrap/Col';
import Sidebar from './pages/LeftMenu/SideBar';
import DeviceSettings from './pages/DeviceSettings';
import NavbarComponent from './components/Navbar';
import Log2 from './pages/Logs/Log2';
import LoginPage from './pages/LoginPage/LoginPage';
import MyCompany from './pages/MyCompany/MyCompany';
import DeviceConfiguration from './pages/DeviceConfiguration/DeviceConfiguration';
import Footer from './components/Footer';
import Permissions from './pages/Permission/Permissions';

export default function App() {
  const location = useLocation();

  return (
    <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
      <Col xs={4} md={3} lg={2}>
        {location.pathname == '/login' ? null : <Sidebar />}
      </Col>
      <Col xs={8} md={9} lg={10} style={{padding: 0}}>
        <NavbarComponent />
        <Routes>
          <Route index path="/mycompany" element={<MyCompany />} />
          <Route path="screenConfiguration" element={<DeviceConfiguration />} />
          <Route path="tracelinkConfiguration" element={<AdminConfiguration />} />
          <Route path="deviceSettings" element={<DeviceSettings />} />
          <Route path="permission" element={<Permissions />} />
          <Route path="logs" element={<Log />} />
          <Route
            path="*"
            element={
              <main style={{padding: '1rem'}}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
        {/* <Footer /> */}
      </Col>
    </div>
  );
}
