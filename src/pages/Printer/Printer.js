import React, {useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Card from '@mui/material/Card';
import TextInput from '../../components/TextInput';
import AlertComponent from '../../components/AlertComponent';
import {Box} from '@mui/material';
import styled from '@emotion/styled';
import {commonStyles} from '../../Styles/Styles';
import DeleteIcon from '../../assets/DeleteIcon.png';
import AddIcon from '../../assets/AddIcon.png';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import ButtonComponent from '../../components/Button';
import PrinterService from '../../Business/PrinterService';
import Spinner from '../../components/Spinner';
import Alertify from '../../components/Alertify';

export default function Printer() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  const {GetPrinter, UpdatePrinter} = PrinterService;

  useEffect(() => {
    getPrinters();
  }, []);

  const getPrinters = async () => {
    setLoading(true);
    const {success, count, list, error} = await GetPrinter();
    if (success) {
      if (list.length > 0) {
        setInfo(list);
        setGridNumber(list.length - 1);
      }
    }
    setLoading(false);
  };

  const updatePrinters = async e => {
    e.preventDefault();
    setLoading(true);
    const {data, success, error} = await UpdatePrinter(info);
    if (success) {
      Alertify.SuccessNotifications('Updated successfully!');
      getPrinters();
    } else Alertify.ErrorNotifications('Error!');
    setLoading(false);
  };

  const initialState = {printerName: '', moduleType: '', numberOfLabels: '', labelLayout: ''};
  const [gridNumber, setGridNumber] = useState(0);
  const [info, setInfo] = useState(initialState);
  const [force, setForce] = useState(false); // TO FORCE THE RENDER AFTER USER PRESSED ON A CHECKBOX
  const [loading, setLoading] = useState(false);

  //for alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState();
  const [alertMessage, setAlertMessage] = useState();

  const styles = {
    inputDiv: {
      display: 'flex',
      flexDirection: 'row',
    },
    cardArea: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      paddingTop: 0,
      marginBottom: 10,
    },
    checkboxCard: {
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'row',
      padding: 16,
      borderRadius: 5,
      width: 'auto',
      minWidth: dynamicWidth / 10,
      marginTop: 16,
      height: 'auto',
    },
    createButton: {
      flex: 1,
    },
    icons: {
      width: dynamicWidth * 0.035,
      height: dynamicHeight * 0.04,
      marginTop: 3,
      marginLeft: 3,
      backgroundColor: 'white',
      borderWidth: 0,
      cursor: 'pointer',
    },
  };

  let elements = [];

  const onInputChange = (field, event, index) => {
    const {value} = event.target;
    info[index] = {...info[index], [field]: value};
    setForce(!force);
  };

  const handlerDelete = (e, itemIndex) => {
    e.preventDefault();
    if (info.length === 1) {
      setShowAlert(true);
      setAlertMessage('Must have at least one card');
      setAlertVariant('danger');
      return;
    }

    Alertify.ConfirmNotification(
      'Delete',
      "For delete permanantly don't forget to press Save button!",
      () => confirmOK(itemIndex),
      () => console.log('Pressed cancel'),
    );
  };

  const confirmOK = async itemIndex => {
    const filtered = info.filter((item, index) => index !== itemIndex);
    setInfo(filtered);
    setGridNumber(gridNumber - 1);
  };

  const handlerAdd = () => {
    let index = -1;
    info.forEach((element, idx) => {
      if (element.ai === '' || element.description === '' || element.length === '' || element.format === '') {
        index = idx;
        return;
      }
    });
    if (index !== -1) {
      setShowAlert(true);
      setAlertMessage(`Please fill in the ${index + 1}th card`);
      setAlertVariant('warning');
      return;
    }
    setInfo([...info, initialState]);
    setGridNumber(gridNumber + 1);
  };

  const createCard = () => {
    if (info && info.length > 0) {
      for (let i = 0; i <= gridNumber; i++) {
        elements.push(
          <Card key={i} style={styles.checkboxCard}>
            <div style={styles.inputDiv}>
              <TextInput value={info[i].printerName} onChange={text => onInputChange('printerName', text, i)} label={'Printer Name'} width={9} />
              <TextInput value={info[i].moduleType} onChange={text => onInputChange('moduleType', text, i)} label={'Module Type'} width={7} />
              <TextInput value={info[i].labelLayout} onChange={text => onInputChange('labelLayout', text, i)} label={'Label Layout'} width={9} />
              <TextInput
                value={info[i].numberOfLabels}
                onChange={text => onInputChange('numberOfLabels', text, i)}
                label={'Number Of Labels'}
                width={9}
              />
              {i > 0 ? <IconComponent icon={DeleteIcon} onClick={e => handlerDelete(e, i)} /> : null}
            </div>
            <div style={styles.createButton}>
              {i === 0 ? (
                <div key={i} style={{display: 'flex', flexDirection: 'row'}}>
                  <IconComponent icon={DeleteIcon} onClick={e => handlerDelete(e, i)} />
                  <IconComponent icon={AddIcon} onClick={() => handlerAdd()} />
                </div>
              ) : null}
            </div>
          </Card>,
        );
      }
      return elements;
    }
  };

  const IconComponent = ({icon, onClick}) => {
    return (
      <div>
        <button onClick={onClick} style={styles.icons}>
          <img style={{width: 30, height: 30}} src={icon} />
        </button>
      </div>
    );
  };
  return (
    <Box sx={commonStyles.boxStyle}>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container_myCompany">
          <Col lg={12}>
            <form onSubmit={e => updatePrinters(e)}>
              <div className="bigCardArea_myCompany" style={{marginTop: 20, display: 'flex', flexDirection: 'column'}}>
                <InlineTitle>Printers</InlineTitle>
                <div style={styles.cardArea}>
                  <AlertComponent variant={alertVariant} text={alertMessage} show={showAlert} setShow={setShowAlert} />
                  {gridNumber >= 0 ? createCard() : null}
                  <ButtonComponent type={'submit'} label="SAVE" width={9} mT={20} />
                </div>
              </div>
            </form>
          </Col>
        </div>
      )}
    </Box>
  );
}
const InlineTitle = styled.h3`
  color: #495057;
`;
