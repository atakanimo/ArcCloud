import React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import TextInput from '../../components/TextInput';
import AlertComponent from '../../components/AlertComponent';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import ButtonComponent from '../../components/Button';
import {GetAIs} from '../../helper/GetConfiguration';
import DeleteIcon from '../../assets/DeleteIcon.png';
import AddIcon from '../../assets/AddIcon.png';

function GS1AppIdenList() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

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

  const AIs = GetAIs();

  useEffect(() => {
    setGridNumber(AIs.length - 1);
  }, []);

  const initialState = {ai: '', description: '', length: '', format: ''};
  const [gridNumber, setGridNumber] = useState(0);
  const [info, setInfo] = useState(AIs.length > 0 ? AIs : [initialState]);
  const [force, setForce] = useState(false); // TO FORCE THE RENDER AFTER USER PRESSED ON A CHECKBOX

  //for alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState();
  const [alertMessage, setAlertMessage] = useState();

  let elements = [];

  const onInputChange = (field, event, index) => {
    const {value} = event.target;
    info[index] = {...info[index], [field]: value};
    setForce(!force);
  };

  const handlerDelete = itemIndex => {
    if (info.length === 1) {
      setShowAlert(true);
      setAlertMessage('Must have at least one card');
      setAlertVariant('danger');
      return;
    }
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
    console.log(index, 'index');
    if (index !== -1) {
      setShowAlert(true);
      setAlertMessage(`Please fill in the ${index + 1}th card`);
      setAlertVariant('warning');
      return;
    }
    setInfo([...info, initialState]);
    setGridNumber(gridNumber + 1);
  };

  useEffect(() => {
    console.log(info, 'info');
  }, [info]);

  useEffect(() => {
    console.log(gridNumber, 'gridNumber');
  }, [gridNumber]);

  const IconComponent = ({icon, onClick}) => {
    return (
      <div>
        <button onClick={onClick} style={styles.icons}>
          <img style={{width: 30, height: 30}} src={icon} />
        </button>
      </div>
    );
  };

  const createCard = () => {
    for (let i = 0; i <= gridNumber; i++) {
      elements.push(
        <Card key={i} style={styles.checkboxCard}>
          <div style={styles.inputDiv}>
            <TextInput value={info[i].ai} onChange={text => onInputChange('ai', text, i)} label={'AI'} width={9} />
            <TextInput value={info[i].description} onChange={text => onInputChange('description', text, i)} label={'Description'} width={7} />
            <TextInput value={info[i].lenght} onChange={text => onInputChange('lenght', text, i)} label={'Length'} width={9} />
            <TextInput value={info[i].format} onChange={text => onInputChange('format', text, i)} label={'Format'} width={9} />
            {i > 0 ? <IconComponent icon={DeleteIcon} onClick={() => handlerDelete(i)} /> : null}
          </div>
          <div style={styles.createButton}>
            {i === 0 ? (
              <div key={i} style={{display: 'flex', flexDirection: 'row'}}>
                <IconComponent icon={DeleteIcon} onClick={() => handlerDelete(i)} />
                <IconComponent icon={AddIcon} onClick={() => handlerAdd()} />
              </div>
            ) : null}
          </div>
        </Card>,
      );
    }
    return elements;
  };
  return (
    <div style={styles.cardArea}>
      <AlertComponent variant={alertVariant} text={alertMessage} show={showAlert} setShow={setShowAlert} />
      {gridNumber >= 0 ? createCard() : null}
      <ButtonComponent onClick={() => null} label="SAVE" width={9} mT={20}>
        SAVE
      </ButtonComponent>
    </div>
  );
}
export default GS1AppIdenList;
