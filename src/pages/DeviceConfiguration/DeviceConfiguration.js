import React from 'react';
import BasicCard from '../../components/Card/BasicCard';
import styled from '@emotion/styled';
import {Box} from '@mui/material';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import './DeviceConfiguration.scss';
import SliderBar from '../../components/Slider/SliderBar';
import Switch from '../../components/Checkbox/Checkbox';
import {Card} from '@mui/material';
import SelectLabels from '../../components/Select';
import Col from 'react-bootstrap/Col';
import {commonStyles} from '../../Styles/Styles';
import {GetDeviceConfiguration} from '../../helper/GetConfiguration';

export default function DeviceConfiguration() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  const {screenConfigs, isTestDevice, isSAP, isAdmin, deviceMaxLogCount} = GetDeviceConfiguration();

  const [sliderValue, setSliderValue] = React.useState(deviceMaxLogCount);
  const [isTest, setTest] = React.useState(isTestDevice);
  const [isDeliverySap, setSap] = React.useState(isSAP);
  const [isAdm, setAdmin] = React.useState(isAdmin);
  const [screenConf, setScreenConfigs] = React.useState(screenConfigs);

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
    <Box sx={commonStyles.boxStyle}>
      <div className="container_deviceConf">
        <Col lg={7}>
          <div className="bigCardArea_deviceConf">
            <InlineTitle>Serialization Validation</InlineTitle>
            <div className="cardArea_deviceConf">
              <BasicCard checkBox={screenConf.aggregateStrict} label={messages.aggregate} />
              <BasicCard checkBox={screenConf.disContainer} label={messages.disaggregate} />
              <BasicCard checkBox={screenConf.resetContainer} label={messages.reset} />
              <BasicCard checkBox={screenConf.replaceStrict} label={messages.replace} />
              <BasicCard checkBox={screenConf.decommissionAutoDisaggregate} label={messages.decommission} />
              <BasicCard checkBox={screenConf.outboundAutoDisaggregate} label={messages.outbound} />
            </div>
          </div>
        </Col>
        <Col lg={5}>
          <div style={{marginLeft: 20}} className="bigCardArea_deviceConf">
            <InlineTitle>Other Settings</InlineTitle>
            <div style={{display: 'flex', justifyContent: 'flex-start', paddingLeft: 20}} className="cardArea_deviceConf">
              <SliderBar setSliderValue={setSliderValue} sliderValue={sliderValue} />
              <Card style={{marginLeft: 10}} className="checkboxCardLang_deviceConf">
                <SelectLabels />
              </Card>
              <div className="cardArea_deviceConf">
                <Card className="checkboxCard_deviceConf">
                  <Switch header={'Is test device ?'} checked={isTest} />
                  <Switch header={'Is admin ?'} checked={isDeliverySap} />
                  <Switch header={'Is deliveries info come from SAP ?'} checked={isAdm} />
                </Card>
              </div>
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
