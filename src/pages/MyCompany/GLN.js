import React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import TextInput from '../../components/TextInput';
import AlertComponent from '../../components/AlertComponent';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import ButtonComponent from '../../components/Button';
import DeleteIcon from '../../assets/DeleteIcon.png';
import AddIcon from '../../assets/AddIcon.png';
import CompanyService from '../../Business/CompanyService';
import Spinner from '../../components/Spinner';
import Alertify from '../../components/Alertify';
import styled from '@emotion/styled';
import companyKeys from './CompanyKeys';

function GLN({expanded}) {
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

  const {GetCompany, DeleteAI, UpdateAI} = CompanyService;

  const initialState = [{plantId: '0000', key: companyKeys.GLN, code: '', description: '', length: ''}];
  const [gridNumber, setGridNumber] = useState(0);
  const [info, setInfo] = useState(initialState);
  const [force, setForce] = useState(false); // TO FORCE THE RENDER AFTER USER PRESSED ON A CHECKBOX
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

  //for alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState();
  const [alertMessage, setAlertMessage] = useState();

  useEffect(() => {
    if (expanded === 'panel2') getCompany();
  }, [expanded]);

  const getCompany = async () => {
    setLoading(true);
    const {data, success} = await GetCompany(companyKeys.GLN);
    if (success) {
      if (data.list.length > 0) {
        setInfo(data.list);
        setGridNumber(data.list.length - 1);
      }
    }
    setLoading(false);
  };
  const updateAI = async e => {
    e.preventDefault();
    const index = info.length - 1;
    if (info[index].code === '' || info[index].description === '' || info[index].format === '' || info[index].length === '') {
      setShowAlert(true);
      setAlertMessage(`Please fill in the ${info.length}th card`);
      setAlertVariant('warning');
      return;
    }
    setShowAlert(false);
    setLoading(true);
    const {data, success} = await UpdateAI(info);
    if (success) {
      Alertify.SuccessNotifications('Updated successfully!');
      getCompany();
    } else Alertify.ErrorNotifications('Error!');
    setLoading(false);
  };

  const confirmOK = async id => {
    setLoading(true);
    const {data, success, error} = await DeleteAI(id);
    console.log(data, success, error);
    if (success) {
      Alertify.SuccessNotifications('Deleted successfully!');
      getCompany();
    } else Alertify.ErrorNotifications('Error!');
    setLoading(false);
  };

  const deleteAI = async (e, id) => {
    e.preventDefault();
    if (info.length === 1) {
      setShowAlert(true);
      setAlertMessage('Must have at least one card');
      setAlertVariant('danger');
      return;
    }
    Alertify.ConfirmNotification(
      'DELETE',
      'Are you sure you want to delete?',
      () => confirmOK(id),
      () => console.log('Pressed cancel'),
    );
  };

  let elements = [];

  const onInputChange = (field, event, index) => {
    const {value} = event.target;
    info[index] = {...info[index], [field]: value};
    setForce(!force);
  };

  const handlerAdd = () => {
    let index = -1;
    info.forEach((element, idx) => {
      if (element.code === '' || element.description === '' || element.length === '' || element.format === '') {
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
    info[gridNumber + 1] = initialState[0];
    setGridNumber(gridNumber + 1);
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

  const createCard = () => {
    if (info && info.length > 0) {
      for (let i = 0; i <= gridNumber; i++) {
        elements.push(
          <Card key={i} style={styles.checkboxCard}>
            <div style={styles.inputDiv}>
              <TextInput value={info[i].code} onChange={text => onInputChange('code', text, i)} label={'GLN Code'} width={9} />
              <TextInput value={info[i].description} onChange={text => onInputChange('description', text, i)} label={'Company code'} width={7} />
              <TextInput value={info[i].length} onChange={text => onInputChange('length', text, i)} label={'Company name'} width={9} />
              {i > 0 ? <IconComponent icon={DeleteIcon} onClick={e => deleteAI(e, info[i].id)} /> : null}
            </div>
            <div style={styles.createButton}>
              {i === 0 ? (
                <div key={i} style={{display: 'flex', flexDirection: 'row'}}>
                  <IconComponent icon={DeleteIcon} onClick={e => deleteAI(e, info[i].id)} />
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
  return (
    <div style={styles.cardArea}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <form onSubmit={e => updateAI(e)}>
            <AlertComponent variant={alertVariant} text={alertMessage} show={showAlert} setShow={setShowAlert} />
            {gridNumber >= 0 ? createCard() : null}
            <ButtonComponent type="submit" label="Update" width={9} mT={20} />
          </form>
        </>
      )}
    </div>
  );
}
export default GLN;

const InlineTitle = styled.h3`
  color: #495057;
`;

const styles1 = {
  accordionTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  accordionText: {
    marginRight: 20,
    fontWeight: 'bold',
    fontSize: 36,
  },
};
