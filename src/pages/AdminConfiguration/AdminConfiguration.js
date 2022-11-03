import React, {useState} from 'react';
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
export default function AdminConfiguration() {
  const [TLInfo, setTLInfo] = useState({username: 'tracelink', password: 'password', url: 'https://itestapi.tracelink.com:443/'});
  const [paths, setPaths] = useState({
    InputDirectoryPath: 'input',
    LogDirectoryPath: 'logDirectory',
    ArchiveDirectoryPath: 'archive',
    APKDirectoryPath: 'apk',
  });

  const onChangeText = e => {
    const {name, value} = e.target;
    setTLInfo({...TLInfo, [name]: value});
  };
  const onChangePath = e => {
    const {name, value} = e.target;
    setPaths({...paths, [name]: value});
  };

  console.log(TLInfo, 'TLInfo', paths, 'paths');
  return (
    <Box sx={commonStyles.boxStyle}>
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
                  minWidth={200}
                  label={'Tracelink Username'}
                  width={6.5}
                />
                <TextInput
                  onChange={onChangeText}
                  name={'password'}
                  value={TLInfo.password}
                  minWidth={200}
                  label={'Tracelink Password'}
                  width={6.5}
                  type="password"
                />
                <TextInput onChange={onChangeText} name={'url'} value={TLInfo.url} minWidth={200} label={'Tracelink Web Url'} width={6.5} />
                <Button minWidth={200} label={'Test'} />
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
                  <TextInput label={'Ip Adress'} width={6} />
                  <TextInput label={'Port'} width={15} />
                  <Button label={'Test'} width={10} />
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <Text label={'Print API'} />
                  <TextInput label={'Ip Adress'} width={6} />
                  <TextInput label={'Port'} width={15} />
                  <Button label={'Test'} width={10} />
                </div>
                <Alert style={{flex: 1, fontSize: 18, fontWeight: 'bold'}} variant={'info'}>
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
                    value={paths.InputDirectoryPath}
                    name={'InputDirectoryPath'}
                    mR={20}
                    header={'Input Directory Path'}
                    label={'C:/home/sharedFolder'}
                    width={7}
                  />
                  <TextInput
                    onChange={onChangePath}
                    value={paths.LogDirectoryPath}
                    name={'LogDirectoryPath'}
                    header={'Log Directory Path'}
                    label={'C:/home/sharedFolder/logs'}
                    width={7}
                  />
                </div>
                <div>
                  <TextInput
                    onChange={onChangePath}
                    value={paths.ArchiveDirectoryPath}
                    name={'ArchiveDirectoryPath'}
                    mR={20}
                    header={'Archive Directory Path'}
                    label={'C:/home/sharedFolder/archive'}
                    width={7}
                  />
                  <TextInput
                    onChange={onChangePath}
                    name={'APKDirectoryPath'}
                    value={paths.APKDirectoryPath}
                    header={'APK Directory Path'}
                    label={'C:/home/sharedFolder/app'}
                    width={7}
                  />
                </div>
                <div className="createButtonAdmin">
                  <Button height={65} width={8} label={'Create Directories'} />
                </div>
              </Card>
            </div>
          </div>
        </Col>
      </div>
    </Box>
  );
}
const InlineTitle = styled.h3`
  color: #495057;
`;
