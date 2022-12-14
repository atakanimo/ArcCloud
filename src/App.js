import './App.css';
import React, {useEffect} from 'react';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import AdminConfiguration from './pages/AdminConfiguration/AdminConfiguration';
import Col from 'react-bootstrap/Col';
import Sidebar from './pages/LeftMenu/SideBar';
import LoginPage from './pages/LoginPage/LoginPage';
import MyCompany from './pages/MyCompany/MyCompany';
import DeviceConfiguration from './pages/DeviceConfiguration/DeviceConfiguration';
import Permissions from './pages/Permission/Permissions';
import ApiRequestLog from './pages/Logs/ApiRequestLog';
import InteractionLog from './pages/Logs/InteractionLog';
import NavigationLog from './pages/Logs/NavigationLog';
// import NetworkLog from './pages/Logs/NetworkLog';
import UserAuthLog from './pages/Logs/UserAuthLog';
import Printer from './pages/Printer/Printer';
import SNManagement from './pages/SNManagement/SNManagement';
import store from './Redux/store';

export default function App() {
  const {isLogin, token} = store.getState().LoginReducer;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin == false) navigate('/');
  }, []);

  return (
    <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
      {location.pathname == '/' ? (
        <Col>
          <LoginPage />
        </Col>
      ) : (
        <>
          <Col xs={4} md={3} lg={2}>
            <Sidebar />
          </Col>
          <Col xs={8} md={9} lg={10} style={{padding: 0}}>
            <Routes>
              <Route index path="/" element={<LoginPage />} />
              <Route path="/myCompany" element={<MyCompany />} />
              <Route path="screenConfiguration" element={<DeviceConfiguration />} />
              <Route path="tracelinkConfiguration" element={<AdminConfiguration />} />
              <Route path="permission" element={<Permissions />} />
              <Route path="apiRequestLogs" element={<ApiRequestLog />} />
              <Route path="navigationLogs" element={<NavigationLog />} />
              <Route path="interactionLogs" element={<InteractionLog />} />
              <Route path="userAuthLogs" element={<UserAuthLog />} />
              <Route path="printers" element={<Printer />} />
              <Route path="SNManagement" element={<SNManagement />} />
              {/* <Route path="networkLogs" element={<NetworkLog />} /> */}
              <Route
                path="*"
                element={
                  <main style={{padding: '1rem'}}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Routes>
          </Col>
        </>
      )}
    </div>
  );
}
