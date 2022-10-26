import React from 'react';
import TextInput from '../../components/TextInput';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import Button from '@mui/material/Button';
import {Box} from '@mui/material';
import './AdminConf.scss';

export default function AdminConfiguration() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;
  return (
    <Box
      sx={{
        display: 'flex',
        height: dynamicHeight - dynamicHeight / 12,
        p: 2,
        flexDirection: 'column',
        overflowY: 'scroll',
      }}>
      <Title>Admin Configuration</Title>
      <div className="bigCardArea" style={{marginTop: 10}}>
        <InlineTitle>Tracelink Configuration</InlineTitle>
        <div className="cardArea">
          <Card className="checkboxCard">
            <div>
              <TextInput label={'Tracelink Username'} width={7} />
              <TextInput label={'Tracelink Web Url'} width={6} />
            </div>
            <div>
              <TextInput label={'Tracelink Password'} type="password" width={7} />
              <Button style={{marginTop: 20, width: dynamicWidth / 6, height: 50}} variant="contained">
                Test
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <div className="bigCardArea" style={{marginTop: 10}}>
        <InlineTitle>Service Endpoints</InlineTitle>
        <div className="cardArea">
          <Card className="checkboxCard">
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <h4 style={{marginTop: 20, marginRight: 20}}>Log Api</h4>
              <TextInput label={'Ip Adress'} width={7} />
              <TextInput label={'Port'} width={10} />
              <Button style={{marginTop: 20, width: dynamicWidth / 10, height: 50}} variant="contained">
                Test
              </Button>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <h4 style={{marginTop: 20, marginRight: 20}}>Log Api</h4>
              <TextInput label={'Ip Adress'} width={7} />
              <TextInput label={'Port'} width={10} />
              <Button style={{marginTop: 20, width: dynamicWidth / 10, height: 50}} variant="contained">
                Test
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Box>
  );
}
const InlineTitle = styled.h3`
  color: #495057;
`;

const Title = styled.h1`
  font-size: 2.1em;
  text-align: center;
  color: #495057;
`;
