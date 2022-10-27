import React from 'react';
import TextInput from '../../components/TextInput';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import Button from '@mui/material/Button';
import {Box} from '@mui/material';
import './AdminConf.scss';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import GS1AppIdenList from './GS1AppIdenList';

export default function AdminConfiguration() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;
  return (
    <Box
      sx={{
        display: 'flex',
        height: dynamicHeight - dynamicHeight / 6,
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
                <TextInput mTop={2} label={'Tracelink Username'} width={6.5} />
                <TextInput mTop={2} label={'Tracelink Password'} type="password" width={6.5} />
                <TextInput mTop={2} label={'Tracelink Web Url'} width={6.5} />
                <Button style={{marginTop: 20, width: dynamicWidth / 6.5, height: 50}} variant="contained">
                  Test
                </Button>
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
                  <h4 style={{marginTop: 20, marginRight: 20, width: 60}}>Log Api</h4>
                  <TextInput mTop={2} label={'Ip Adress'} width={7} />
                  <TextInput mTop={2} label={'Port'} width={10} />
                  <Button style={{marginTop: 10, width: dynamicWidth / 10, height: 50}} variant="contained">
                    Test
                  </Button>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <h4 style={{marginTop: 20, marginRight: 20, width: 60}}>Print Api</h4>
                  <TextInput mTop={2} label={'Ip Adress'} width={7} />
                  <TextInput mTop={2} label={'Port'} width={10} />
                  <Button style={{marginTop: 20, width: dynamicWidth / 10, height: 50}} variant="contained">
                    Test
                  </Button>
                </div>
                <Alert style={{marginTop: 20, flex: 1, fontSize: 20, fontWeight: 'bold'}} variant={'info'}>
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
                  <TextInput header={'Input Directory Path'} label={'C:/home/sharedFolder'} width={7} />
                  <TextInput header={'Log Directory Path'} label={'C:/home/sharedFolder/logs'} width={7} />
                </div>
                <div>
                  <TextInput header={'Archive Directory Path'} label={'C:/home/sharedFolder/archive'} width={7} />
                  <TextInput header={'APK Directory Path'} label={'C:/home/sharedFolder/app'} width={7} />
                </div>
                <div className="createButtonAdmin">
                  <Button variant="contained">Create Directories</Button>
                </div>
              </Card>
            </div>
          </div>
        </Col>
        <Col>
          <div className="bigCardArea_admin" style={{marginTop: 20, display: 'flex', flexDirection: 'column'}}>
            <InlineTitle>GS1 Application Identifier List</InlineTitle>
            <GS1AppIdenList />
          </div>
        </Col>
      </div>
    </Box>
  );
}
const InlineTitle = styled.h3`
  color: #495057;
`;
