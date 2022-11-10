import './App.css';
import React from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import AdminConfiguration from './pages/AdminConfiguration/AdminConfiguration';
import Col from 'react-bootstrap/Col';
import Sidebar from './pages/LeftMenu/SideBar';
import NavbarComponent from './components/Navbar';
import LoginPage from './pages/LoginPage/LoginPage';
import MyCompany from './pages/MyCompany/MyCompany';
import DeviceConfiguration from './pages/DeviceConfiguration/DeviceConfiguration';
// import Footer from './components/Footer';
import Permissions from './pages/Permission/Permissions';
import ApiRequestLog from './pages/Logs/ApiRequestLog';
import InteractionLog from './pages/Logs/InteractionLog';
import NavigationLog from './pages/Logs/NavigationLog';
import NetworkLog from './pages/Logs/NetworkLog';
import UserAuthLog from './pages/Logs/UserAuthLog';

export default function App() {
  const location = useLocation();

  return (
    <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
      {location.pathname == '/login' ? (
        <Col>
          <LoginPage />
        </Col>
      ) : (
        <>
          <Col xs={4} md={3} lg={2}>
            <Sidebar />
          </Col>
          <Col xs={8} md={9} lg={10} style={{padding: 0}}>
            {/* <NavbarComponent /> */}
            <Routes>
              <Route index path="/" element={<MyCompany />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="screenConfiguration" element={<DeviceConfiguration />} />
              <Route path="tracelinkConfiguration" element={<AdminConfiguration />} />
              <Route path="permission" element={<Permissions />} />
              <Route path="apiRequestLogs" element={<ApiRequestLog />} />
              <Route path="navigationLogs" element={<NavigationLog />} />
              <Route path="interactionLogs" element={<InteractionLog />} />
              <Route path="userAuthLogs" element={<UserAuthLog />} />
              <Route path="networkLogs" element={<NetworkLog />} />
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
        </>
      )}
    </div>
  );
}
