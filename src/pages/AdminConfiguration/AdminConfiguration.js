import React, {useState, useEffect} from 'react';
import TextInput from '../../components/TextInput';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import {Box} from '@mui/material';
import './AdminConf.scss';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Button from '../../components/Button';
import Text from '../../components/Text/Text';
import {commonStyles} from '../../Styles/Styles';
import ButtonComponent from '../../components/Button';
import Alertify from '../../components/Alertify';
import AdminService from '../../Business/AdminService';
import Spinner from '../../components/Spinner';

export default function AdminConfiguration() {
  const {CreateDirectories, GetAdminConf, SaveAdminConfiguration, TestLogApi, TestPrintApi, TestTracelinkApi} = AdminService;

  useEffect(() => {
    getAdminConfiguration();
  }, []);

  const getAdminConfiguration = async () => {
    setLoading(true);
    const {data, success} = await GetAdminConf();
    console.log(success, 'success', data, 'data');
    if (success) {
      const {directoryAndFilePaths, serviceList, tracelinkLoginInfo} = data;
      if (Object.keys(directoryAndFilePaths).length > 0) setPaths(directoryAndFilePaths);
      if (Object.keys(tracelinkLoginInfo).length > 0) setTLInfo(tracelinkLoginInfo);
      if (Object.keys(serviceList).length > 0) setService(serviceList);
    }
    setLoading(false);
  };

  const [loading, setLoading] = React.useState(false);
  const [TLInfo, setTLInfo] = useState({username: '', password: '', webAddress: ''});
  const [paths, setPaths] = useState({aPKDirectoryPath: '', archiveDirectoryPath: '', inputDirectoryPath: '', logDirectoryPath: ''});
  const [service, setService] = useState([
    {serviceName: '', ipAddress: '', port: ''},
    {serviceName: '', ipAddress: '', port: ''},
  ]);
  const [force, setForce] = useState(false); // TO FORCE THE RENDER AFTER USER PRESSED ON A CHECKBOX

  const onChangeText = e => {
    const {name, value} = e.target;
    setTLInfo({...TLInfo, [name]: value});
  };

  const onChangePath = e => {
    const {name, value} = e.target;
    setPaths({...paths, [name]: value});
  };

  const onChangeService = (e, index, type) => {
    const {name, value} = e.target;
    service[index] = {...service[index], [name]: value, serviceName: type};
    setForce(!force);
  };

  const saveConfigurations = async () => {
    const object = {tracelinkLoginInfo: TLInfo, directoryAndFilePaths: paths, serviceList: service};
    setLoading(true);
    const {data, success} = await SaveAdminConfiguration(object);
    if (success) {
      getAdminConfiguration();
      Alertify.SuccessNotifications('Saved successfully!');
    } else Alertify.ErrorNotifications('Error');
    setLoading(false);
  };

  const testTracelinkAPI = async () => {
    // setLoading(true);
    const {data, success, error} = await TestTracelinkApi(TLInfo);
    console.log(success, 'success', data, 'data', error, 'error');
    if (success) Alertify.SuccessNotifications('Tracelink infos are true!');
    else Alertify.ErrorNotifications('Tracelink infos are true!');
    // setLoading(false);
  }; //ask Onder, API doesn't work

  return (
    <Box sx={commonStyles.boxStyle}>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container_admin">
          <Col xxl={3} lg={4} md={4}>
            <div className="bigCardArea_admin">
              <InlineTitle>Tracelink Configuration</InlineTitle>
              <div className="cardArea_admin">
                <Card className="checkboxCard_admin">
                  <TextInput
                    name={'username'}
                    onChange={onChangeText}
                    value={TLInfo.username}
                    minWidth={210}
                    label={'Tracelink Username'}
                    width={6}
                    isRequired={true}
                    mt={10}
                  />
                  <TextInput
                    onChange={onChangeText}
                    name={'password'}
                    value={TLInfo.password}
                    minWidth={210}
                    label={'Tracelink Password'}
                    width={6}
                    type="password"
                    isRequired={true}
                    mt={20}
                  />
                  <TextInput
                    onChange={onChangeText}
                    name={'url'}
                    value={TLInfo.webAddress}
                    minWidth={210}
                    label={'Tracelink Web Url'}
                    width={6}
                    isRequired={true}
                    mt={20}
                    mb={15}
                  />
                  <Button width={6} onClick={testTracelinkAPI} minWidth={200} label={'Test'} />
                </Card>
              </div>
            </div>
          </Col>
          <Col xxl={9} lg={8} md={8}>
            <div className="bigCardArea_admin" style={{marginLeft: 20, minWidth: 600}}>
              <InlineTitle>Service Endpoints</InlineTitle>
              <div className="cardArea_admin">
                <Card className="checkboxCard_admin">
                  <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Text label={'Log API'} />
                    <TextInput
                      value={service[0].ipAddress}
                      label={'Ip Adress'}
                      name={'ipAddress'}
                      onChange={e => onChangeService(e, 0, 'LogAPI')}
                      width={6}
                    />
                    <TextInput value={service[0].port} label={'Port'} name={'port'} onChange={e => onChangeService(e, 0, 'LogAPI')} width={15} />
                    <Button label={'Test'} width={10} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
                    <Text label={'Print API'} />
                    <TextInput
                      value={service[1].ipAddress}
                      name={'ipAddress'}
                      label={'Ip Adress'}
                      onChange={e => onChangeService(e, 1, 'PrintAPI')}
                      width={6}
                    />
                    <TextInput
                      value={service[1].port}
                      name={'port'}
                      label={'Port'}
                      onChange={e => onChangeService(e, 1, 'PrintAPI')}
                      width={15}
                    />
                    <Button label={'Test'} onClick={() => null} width={10} />
                  </div>
                  <Alert style={{marginTop: 20, flex: 1, fontSize: 18, fontWeight: 'bold'}} variant={'info'}>
                    **Auth ip must fill from the device!
                  </Alert>
                </Card>
              </div>
            </div>
          </Col>
          <Col>
            <div className="bigCardArea_admin" style={{marginTop: 20}}>
              <InlineTitle>Directory and File Path</InlineTitle>
              <div className="cardArea_admin">
                <Card className="checkboxCard_admin" style={{flexDirection: 'row', display: 'flex'}}>
                  <div>
                    <TextInput
                      onChange={onChangePath}
                      value={paths.inputDirectoryPath}
                      name={'inputDirectoryPath'}
                      mR={20}
                      header={'Input Directory Path'}
                      label={'Exp: C:/home/sharedFolder'}
                      width={7}
                    />
                    <TextInput
                      onChange={onChangePath}
                      value={paths.logDirectoryPath}
                      name={'logDirectoryPath'}
                      header={'Log Directory Path'}
                      label={'Exp: C:/home/sharedFolder/logs'}
                      width={7}
                    />
                  </div>
                  <div>
                    <TextInput
                      onChange={onChangePath}
                      value={paths.archiveDirectoryPath}
                      name={'archiveDirectoryPath'}
                      mR={20}
                      header={'Archive Directory Path'}
                      label={'Exp: C:/home/sharedFolder/archive'}
                      width={7}
                    />
                    <TextInput
                      onChange={onChangePath}
                      name={'aPKDirectoryPath'}
                      value={paths.aPKDirectoryPath}
                      header={'APK Directory Path'}
                      label={'Exp: C:/home/sharedFolder/app'}
                      width={7}
                    />
                  </div>
                  <div className="createButtonAdmin">
                    <Button height={65} width={8} label={'Create Directories'} />
                  </div>
                </Card>
              </div>
            </div>
            <ButtonComponent onClick={() => saveConfigurations()} label="SAVE" width={9} mT={20} mL={20}>
              SAVE
            </ButtonComponent>
          </Col>
        </div>
      )}
    </Box>
  );
}
const InlineTitle = styled.h3`
  color: #495057;
`;
