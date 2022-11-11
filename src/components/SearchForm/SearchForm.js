import React, {useState} from 'react';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import LogService from '../../Business/LogService';
import TextInput from '../TextInput';
import {commonStyles} from '../../Styles/Styles';
import ButtonComponent from '../Button';

import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

export default function LogPagesSearch({pageNumber, pageCount, setData, setLoading}) {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;
  const {types, GetDataByClientMessage} = LogService;

  const [searchedItems, setSearchedItems] = useState('');
  const [isSearched, setSearched] = useState(false);

  const styles = {
    header: {
      display: 'flex',
      flexDirection: 'row',
      height: commonStyles.LogSearchFormHeight.height,
      alignItems: 'center',
      paddingLeft: dynamicWidth * 0.03,
      // backgroundColor: 'gray',
    },
    headerColumn: {
      display: 'flex',
      flexDirection: 'column',
    },
    searchBtnContainer: {
      flex: 1,
      flexDirection: 'row',
      height: dynamicHeight * 0.12,
      display: 'flex',
      justifyContent: 'space-between',
      padding: 10,
      // marginLeft: dynamicWidth * 0.01,
    },
  };

  const handleSearch = async e => {
    e.preventDefault();
    if (searchedItems.length > 0 && searchedItems.length < 5) {
      console.log('At least write 5 words!');
    } else if (searchedItems.length >= 5) await getData();
  };
  const getData = async () => {
    setLoading(true);
    const {data, success} = await GetDataByClientMessage(types.ApiRequest, searchedItems, true, pageCount, pageNumber);
    setData(data);
    setLoading(false);
  };

  const [dateFrom, setFrom] = React.useState(dayjs('2022-04-07'));
  const [dateTo, setTo] = React.useState(dayjs('2022-04-07'));

  return (
    <div style={styles.header}>
      <div style={styles.headerColumn}>
        <TextInput label={'Username'} mL={10} mb={5} width={8} />
        <TextInput label={'ID'} mL={10} mb={5} width={8} />
      </div>
      <div style={styles.headerColumn}>
        <TextInput label={'Request Data'} mL={10} mb={5} width={8} />
        <TextInput label={'Response Data'} mL={10} mb={5} width={8} />
      </div>
      <div style={{...styles.headerColumn, marginLeft: 10}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Request Date From"
            value={dateFrom}
            onChange={newValue => setFrom(newValue)}
            renderInput={params => <TextField style={{marginBottom: 5}} size="small" {...params} />}
          />
          <DatePicker
            label="Request Date To"
            value={dateTo}
            onChange={newValue => setTo(newValue)}
            renderInput={params => <TextField style={{marginTop: 5}} size="small" {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div style={{...styles.headerColumn, marginLeft: 10}}>
        <TextInput label={'Client Message'} mL={10} mb={'0'} width={8} />
        <div style={styles.searchBtnContainer}>
          <ButtonComponent mT={'0'} minWidth={110} width={16.5} label={'Search'} />
          <ButtonComponent mL={10} mT={'0'} minWidth={110} width={16.5} label={'Reset'} />
        </div>
      </div>
    </div>
  );
}
