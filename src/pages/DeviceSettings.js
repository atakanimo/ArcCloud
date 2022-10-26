import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SelectLabels from '../components/Select';
import styled from '@emotion/styled';
import {Button} from '@mui/material';
import GetDynamicDimensions from '../helper/GetDynamicDimensions';

export default function DeviceSettings() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: dynamicHeight - dynamicHeight / 12,
        justifyContent: 'center',
      }}>
      <Title>Device Settings</Title>
      <Card
        style={{minWidth: 200}}
        elevation={7}
        sx={{
          width: dynamicWidth / 4.5,
          textAlign: 'center',
          marginRight: 2,
          marginLeft: 2,
          marginTop: 2,
        }}>
        <CardContent>
          <div
            style={{
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Hr />
            <SelectLabels />
            <Hr />
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Button style={{marginTop: 20, width: dynamicWidth / 10}} variant="contained">
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
const Hr = styled.hr`
  width: 80%;
`;

const Title = styled.h1`
  font-size: 2.1em;
  text-align: center;
  color: #495057;
`;
