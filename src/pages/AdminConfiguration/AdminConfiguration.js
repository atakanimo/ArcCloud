import React from 'react';
import TextInput from '../../components/TextInput';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import {Box} from '@mui/material';
import './AdminConf.scss';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Button from '../../components/Button';
import Text from '../../components/Text/Text';

export default function AdminConfiguration() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;
  return (
    <Box
      sx={{
        display: 'flex',
        height: dynamicHeight,
        p: 2,
        flexDirection: 'column',
        overflowY: 'scroll',
      }}>
      <div className="container_admin">
        <Col lg={3}>
          <div className="bigCardArea_admin">
            <InlineTitle>Tracelink Configuration</InlineTitle>
            <div className="cardArea_admin">
              <Card className="checkboxCard_admin">
                <TextInput label={'Tracelink Username'} width={6.5} />
                <TextInput label={'Tracelink Password'} width={6.5} type="password" />
                <TextInput label={'Tracelink Web Url'} width={6.5} />
                <Button label={'Test'} />
              </Card>
            </div>
          </div>
        </Col>
        <Col lg={9}>
          <div className="bigCardArea_admin" style={{marginLeft: 20}}>
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
                  <TextInput mR={20} header={'Input Directory Path'} label={'C:/home/sharedFolder'} width={7} />
                  <TextInput header={'Log Directory Path'} label={'C:/home/sharedFolder/logs'} width={7} />
                </div>
                <div>
                  <TextInput mR={20} header={'Archive Directory Path'} label={'C:/home/sharedFolder/archive'} width={7} />
                  <TextInput header={'APK Directory Path'} label={'C:/home/sharedFolder/app'} width={7} />
                </div>
                <div className="createButtonAdmin">
                  <Button width={8} label={'Create Directories'} />
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
