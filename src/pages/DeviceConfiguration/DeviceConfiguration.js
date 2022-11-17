import React, {useEffect, useState} from 'react';
import BasicCard from '../../components/Card/BasicCard';
import styled from '@emotion/styled';
import {Box} from '@mui/material';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import './DeviceConfiguration.scss';
import SliderBar from '../../components/Slider/SliderBar';
import Switch from '../../components/Checkbox-Switch/Switch';
import {Card} from '@mui/material';
import SelectLabels from '../../components/Select';
import Col from 'react-bootstrap/Col';
import {commonStyles} from '../../Styles/Styles';
import ButtonComponent from '../../components/Button';
import Alertify from '../../components/Alertify';
import DeviceService from '../../Business/DeviceService';
import Spinner from '../../components/Spinner';

export default function DeviceConfiguration() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  const {GetDeviceConf, UpdateDeviceConfiguration} = DeviceService;

  const getDeviceConfiguration = async () => {
    setLoading(true);
    const {data, success} = await GetDeviceConf();
    if (success) {
      const {
        aggregateValidation,
        decommissionValidation,
        deviceMaxLogCount,
        disaggregateValidation,
        isAdmin,
        isDeliveriesInfoComeFromSAP,
        isTestDevice,
        language,
        outboundValidation,
        replaceValidation,
        resetValidation,
      } = data.serializationValidation;
      if (deviceMaxLogCount) setSliderValue(deviceMaxLogCount);
      setDeviceLanguage(language);
      setAdmin(isAdmin);
      setSap(isDeliveriesInfoComeFromSAP);
      setTest(isTestDevice);
      setScreenConfigs({
        aggregateValidation,
        decommissionValidation,
        disaggregateValidation,
        outboundValidation,
        replaceValidation,
        resetValidation,
      });
    }
    setLoading(false);
  };

  const updateDeviceConfiguration = async () => {
    const object = {
      aggregateValidation,
      decommissionValidation,
      deviceMaxLogCount: sliderValue,
      disaggregateValidation,
      isAdmin,
      isDeliveriesInfoComeFromSAP: isDeliverySap,
      isTestDevice,
      language: 'EN',
      outboundValidation,
      replaceValidation,
      resetValidation,
    };
    setLoading(true);
    const {data, success} = await UpdateDeviceConfiguration(object);
    if (success) {
      getDeviceConfiguration();
      Alertify.SuccessNotifications('Saved successfully!');
    } else Alertify.ErrorNotifications('Error');
    setLoading(false);
  };

  useEffect(() => {
    getDeviceConfiguration();
  }, []);

  const [deviceLanguage, setDeviceLanguage] = useState('EN');
  const [loading, setLoading] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [isTestDevice, setTest] = useState(false);
  const [isDeliverySap, setSap] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [screenConf, setScreenConfigs] = useState({
    aggregateValidation: false,
    decommissionValidation: false,
    disaggregateValidation: false,
    outboundValidation: false,
    replaceValidation: false,
    resetValidation: false,
  });

  const styles = {
    area: {
      width: 'auto',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      padding: '10px',
      display: 'flex',
      flexDirection: 'row',
    },
    checkBoxCard: {
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
      borderRadius: '5px',
      marginRight: 20,
      minWidth: '220px',
    },
  };

  const {aggregateValidation, decommissionValidation, disaggregateValidation, outboundValidation, replaceValidation, resetValidation} =
    screenConf;

  const messages = {
    aggregate: 'Do not perform operation if any child items are aggregated to another container.',
    disaggregate: 'Decommission container after operation is performed.',
    reset:
      'If checked: It is not allowed to aggregate already aggregated items to a container. If unchecked: It is allowed to aggregate already aggregated items to a container.',
    replace: 'Do not perform operation if any child items are aggregated to another container.',
    decommission: 'Automatically disaggregate items from parent container.',
    outbound: 'Automatically disaggregate serial numbers that are aggregated to another number.',
  };
  const onChangeSerialize = name => setScreenConfigs({...screenConf, [name]: !screenConf[name]});

  return (
    <Box sx={commonStyles.boxStyle}>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container_deviceConf">
          <Col lg={7}>
            <div className="bigCardArea_deviceConf">
              <InlineTitle>Serialization Validation</InlineTitle>
              <div className="cardArea_deviceConf">
                <BasicCard onChange={() => onChangeSerialize('aggregateValidation')} checkBox={aggregateValidation} label={messages.aggregate} />
                <BasicCard
                  onChange={() => onChangeSerialize('disaggregateValidation')}
                  checkBox={disaggregateValidation}
                  label={messages.disaggregate}
                />
                <BasicCard onChange={() => onChangeSerialize('resetValidation')} checkBox={resetValidation} label={messages.reset} />
                <BasicCard onChange={() => onChangeSerialize('replaceValidation')} checkBox={replaceValidation} label={messages.replace} />
                <BasicCard
                  onChange={() => onChangeSerialize('decommissionValidation')}
                  checkBox={decommissionValidation}
                  label={messages.decommission}
                />
                <BasicCard onChange={() => onChangeSerialize('outboundValidation')} checkBox={outboundValidation} label={messages.outbound} />
              </div>
            </div>
          </Col>
          <Col lg={5}>
            <div style={{marginLeft: 20}} className="bigCardArea_deviceConf">
              <InlineTitle>Other Settings</InlineTitle>
              <div style={{display: 'flex', justifyContent: 'flex-start', paddingLeft: 20}} className="cardArea_deviceConf">
                <SliderBar setSliderValue={setSliderValue} sliderValue={sliderValue} />
                <Card style={{marginLeft: 10}} className="checkboxCardLang_deviceConf">
                  <SelectLabels deviceLanguage={deviceLanguage} />
                </Card>
                <div className="cardArea_deviceConf">
                  <Card className="checkboxCard_deviceConf">
                    <Switch setValue={setTest} header={'Is test device ?'} checked={isTestDevice} />
                    <Switch setValue={setAdmin} header={'Is admin ?'} checked={isAdmin} />
                    <Switch setValue={setSap} header={'Is deliveries info come from SAP ?'} checked={isDeliverySap} />
                  </Card>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={12}>
            <div className="bigCardArea_deviceConf" style={{marginTop: 20}}>
              <InlineTitle>Permissions</InlineTitle>
              <div style={styles.area}>
                <Card style={styles.checkBoxCard}>
                  <Switch setValue={setTest} header={'Outbound'} checked={isTestDevice} />
                  <Switch setValue={setAdmin} header={'Pack&Repack'} checked={isAdmin} />
                  <Switch setValue={setSap} header={'Status Update and Queries'} checked={isDeliverySap} />
                </Card>
                <Card style={styles.checkBoxCard}>
                  <Switch setValue={setTest} header={'Update SN Status'} checked={isTestDevice} />
                  <Switch setValue={setAdmin} header={'Decommission'} checked={isAdmin} />
                  <Switch setValue={setSap} header={'Take Product Sample'} checked={isDeliverySap} />
                </Card>
              </div>
            </div>
          </Col>
          <ButtonComponent onClick={() => updateDeviceConfiguration()} label="SAVE" width={9} mT={20} mL={20} />
        </div>
      )}
    </Box>
  );
}

const InlineTitle = styled.h3`
  color: #495057;
`;
