import React from 'react';
import BasicCard from '../../components/Card/BasicCard';
import styled from '@emotion/styled';
import {Box} from '@mui/material';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import './DeviceConfiguration.scss';
import SliderBar from '../../components/Slider/SliderBar';
import Checkbox from '../../components/Checkbox/Checkbox';
import {Card} from '@mui/material';
import SelectLabels from '../../components/Select';

export default function DeviceConfiguration() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function preventDefault(event) {
    event.preventDefault();
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: dynamicHeight - dynamicHeight / 12,
        p: 2,
        flexDirection: 'column',
        overflowY: 'scroll',
      }}>
      <Title>Device Configuration</Title>
      <div className="bigCardArea">
        <InlineTitle>Serialization Validation</InlineTitle>
        <div className="cardArea">
          <BasicCard
            label={'"Decommission container(s) if empty after operation is performed" checkbox on Disaggregate Items page in Tracelink.'}
          />
          <BasicCard label={'"Decommission container after operation is performed" checkbox on Disaggregate Container page in Tracelink.'} />
          <BasicCard
            label={
              '"Decommission container if empty after operation is performed" checkbox on Disaggregate items from Container page in Tracelink.'
            }
          />
          <BasicCard
            label={
              '"Do not perform operation if any child items are aggregated to another container" checkbox on Reset Container Aggregation page in Tracelink.'
            }
          />
          <BasicCard
            label={
              '"Do not perform operation if any child items are aggregated to another container" checkbox on Aggregate Items in Container page in Tracelink.'
            }
          />
          <BasicCard
            label={
              '"Do not perform operation if any child items are aggregated to another container" checkbox on Replace item in Container page in Tracelink.'
            }
          />
        </div>
      </div>
      <div className="bigCardArea" style={{marginTop: 10}}>
        <InlineTitle>Other Settings</InlineTitle>
        <div className="cardArea">
          <SliderBar />
          <Card className="checkboxCard">
            <Checkbox header={'Is test device ?'} checked={true} />
            <Checkbox header={'Is admin ?'} checked={true} />
            <Checkbox header={'SAP ?'} checked={true} />
          </Card>
          <Card className="checkboxCard">
            <SelectLabels />
          </Card>
        </div>
      </div>
    </Box>
  );
}

const Title = styled.h1`
  text-align: center;
  color: #495057;
`;

const InlineTitle = styled.h3`
  color: #495057;
`;
const Hr = styled.hr`
  width: 20%;
  color: black;
`;
