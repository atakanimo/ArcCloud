import React from 'react';
import Col from 'react-bootstrap/Col';
import {Box} from '@mui/material';
import styled from '@emotion/styled';
import {commonStyles} from '../../Styles/Styles';

import './MyCompany.scss';
import GS1AppIdenList from '../MyCompany/GS1AppIdenList';
import Spinner from '../../components/Spinner';

export default function MyCompany() {
  const [loading, setLoading] = React.useState(false);
  return (
    <Box sx={commonStyles.boxStyle}>
      <div className="container_myCompany">
        <Col lg={12}>
          <div className="bigCardArea_myCompany" style={{marginTop: 20, display: 'flex', flexDirection: 'column'}}>
            <InlineTitle>GS1 Application Identifier List</InlineTitle>
            <GS1AppIdenList setLoading={setLoading} />
          </div>
        </Col>
      </div>
    </Box>
  );
}
const InlineTitle = styled.h3`
  color: #495057;
`;
