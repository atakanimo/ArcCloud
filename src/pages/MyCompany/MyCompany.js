import React from 'react';
import Col from 'react-bootstrap/Col';
import {Box} from '@mui/material';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import styled from '@emotion/styled';
import './MyCompany.scss';
import GS1AppIdenList from '../MyCompany/GS1AppIdenList';

export default function MyCompany() {
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
      <div className="container_myCompany">
        <Col lg={12}>
          <div className="bigCardArea_myCompany" style={{marginTop: 20, display: 'flex', flexDirection: 'column'}}>
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
