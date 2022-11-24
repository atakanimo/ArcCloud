import React, {useState} from 'react';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import LogService from '../../Business/LogService';
import TextInput from '../TextInput';
import {commonStyles} from '../../Styles/Styles';
import ButtonComponent from '../Button';
import Switch from '../Checkbox-Switch/Switch';

export default function LogPagesSearch({setLoading, setPageNumber}) {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  const [searchedItems, setSearchedItems] = useState({});
  const [checked, setChecked] = useState(false);

  const styles = {
    header: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      height: commonStyles.LogSearchFormHeight.height,
      alignItems: 'center',
      paddingLeft: dynamicWidth * 0.01,
      backgroundColor: '#F7F7F7',
    },
    headerColumn: {
      display: 'flex',
      flexDirection: 'column',
    },
    searchBtnContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      height: dynamicHeight * 0.12,
      padding: 5,
    },
    switchStyle: {
      width: 160,
      height: 50,
      marginTop: 50,
      paddingTop: 10,
    },
    headerStyle: {
      width: 100,
      marginTop: 5,
    },
    searchBtnColumn: {
      display: 'flex',
      flexDirection: 'column',
      margin: 15,
    },
  };

  const handleSearch = async e => {
    e.preventDefault();
  };

  const onChange = e => {
    const {name, value} = e.target;
    setSearchedItems({...searchedItems, [name]: value});
  };

  const reset = async () => {
    setLoading(true);
    console.log('Reset');
    setLoading(false);
    setPageNumber(1);
  };

  return (
    <div style={styles.header}>
      <div style={styles.headerColumn}>
        <TextInput label={'Origin'} name={'Origin'} onChange={onChange} mL={10} mb={5} width={10} />
        <TextInput label={'Status'} name={'Status'} onChange={onChange} mL={10} mb={5} width={10} />
      </div>
      <div style={styles.headerColumn}>
        <TextInput label={'Object Type'} name={'Object Type'} onChange={onChange} mL={10} mb={5} width={10} />
        <TextInput label={'Request Status'} name={'Request Status'} onChange={onChange} mL={10} mb={5} width={10} />
      </div>
      <div style={styles.headerColumn}>
        <TextInput label={'EPC Type'} name={'EPC Type'} onChange={onChange} mL={10} mb={5} width={10} />
        <TextInput label={'Serial Number Source'} name={'Serial Number Source'} onChange={onChange} mL={10} mb={5} width={10} />
      </div>
      <div style={styles.headerColumn}>
        <TextInput label={'Object from'} name={'Object from'} onChange={onChange} mL={10} mb={5} width={10} />
        <TextInput label={'Object to'} name={'Object to'} onChange={onChange} mL={10} mb={5} width={10} />
      </div>
      <div>
        <Switch
          switchAreaStyle={styles.switchStyle}
          header="Show Free SNs"
          headerStyle={styles.headerStyle}
          checked={checked}
          setValue={setChecked}
        />
      </div>
      <div style={styles.searchBtnContainer}>
        <div style={styles.searchBtnColumn}>
          <ButtonComponent onClick={handleSearch} height={38} mT={5} minWidth={110} width={11} label={'Search'} />
          <ButtonComponent onClick={reset} height={38} mT={10} minWidth={110} width={11} label={'Reset'} />
        </div>
        <div style={styles.searchBtnColumn}>
          <ButtonComponent onClick={null} height={38} mT={5} minWidth={110} width={11} label={'SN List Display'} />
          <ButtonComponent onClick={null} height={38} mT={10} minWidth={110} width={11} label={'New Range'} />
        </div>
      </div>
    </div>
  );
}
