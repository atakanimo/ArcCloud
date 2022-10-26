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

  const messages = {
    aggregate: 'Do not perform operation if any child items are aggregated to another container.',
    disaggregate: 'Decommission container after operation is performed.',
    reset:
      'If checked: It is not allowed to aggregate already aggregated items to a container. If unchecked: It is allowed to aggregate already aggregated items to a container.',
    replace: 'Do not perform operation if any child items are aggregated to another container.',
    decommission: 'Automatically disaggregate items from parent container.',
    outbound: 'Automatically disaggregate serial numbers that are aggregated to another number.',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: dynamicHeight - dynamicHeight / 6,
        p: 2,
        flexDirection: 'column',
        overflowY: 'scroll',
      }}>
      <Title>Device Configuration</Title>
      <div className="container_deviceConf">
        <div className="bigCardArea_deviceConf">
          <InlineTitle>Serialization Validation</InlineTitle>
          <div className="cardArea_deviceConf">
            <BasicCard label={messages.aggregate} />
            <BasicCard label={messages.disaggregate} />
            <BasicCard label={messages.reset} />
            <BasicCard label={messages.replace} />
            <BasicCard label={messages.decommission} />
            <BasicCard label={messages.outbound} />
          </div>
        </div>
        <div style={{marginLeft: 20}} className="bigCardArea_deviceConf">
          <InlineTitle>Other Settings</InlineTitle>
          <div>
            <div className="cardArea_deviceConf">
              <SliderBar />
              <Card style={{marginLeft: 10, width: 'auto'}} className="checkboxCard_deviceConf">
                <SelectLabels />
              </Card>
            </div>
            <Card className="checkboxCard_deviceConf">
              <Checkbox header={'Is test device ?'} checked={true} />
              <Checkbox header={'Is admin ?'} checked={true} />
              <Checkbox header={'SAP ?'} checked={true} />
            </Card>
          </div>
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
