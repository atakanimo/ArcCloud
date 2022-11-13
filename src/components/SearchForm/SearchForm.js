import React, {useState} from 'react';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import LogService from '../../Business/LogService';
import TextInput from '../TextInput';
import {commonStyles} from '../../Styles/Styles';
import ButtonComponent from '../Button';

import TextField from '@mui/material/TextField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

export default function LogPagesSearch({pageNumber, pageCount, setData, setLoading, logType}) {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;
  const {types, GetDataByFilter, GetLog} = LogService;

  const [searchedItems, setSearchedItems] = useState({dateTo: Date.now('yyyy-MM-dd'), dateFrom: Date.now('yyyy-MM-dd')});

  const styles = {
    header: {
      display: 'flex',
      flexDirection: 'row',
      height: commonStyles.LogSearchFormHeight.height,
      alignItems: 'center',
      paddingLeft: dynamicWidth * 0.03,
      backgroundColor: '#F7F7F7',
    },
    headerColumn: {
      display: 'flex',
      flexDirection: 'column',
    },
    searchBtnContainer: {
      flex: 1,
      flexDirection: 'column',
      height: dynamicHeight * 0.12,
      display: 'flex',
      justifyContent: 'space-between',
      padding: 10,
      marginLeft: 10,
    },
  };

  const handleSearch = async e => {
    e.preventDefault();
    // if (searchedItems.length > 0 && searchedItems.length < 5) {
    //   console.log('At least write 5 words!');
    // } else if (searchedItems.length >= 5)
    await getData();
  };

  const getData = async () => {
    const {id, username, requestData, responseData, clientMessage, moduleName, dateFrom, dateTo} = searchedItems;
    console.log(dateFrom.toString());
    let querry;
    if (logType == types.ApiRequest) {
      querry = `${logType}?RequestData=${requestData == undefined ? '' : requestData}&ResponseData=${
        responseData == undefined ? '' : responseData
      }&ClientMessage=${clientMessage == undefined ? '' : clientMessage}&ModuleName=${
        moduleName == undefined ? '' : moduleName
      }&IsPaging=${true}&PageNumber=${pageNumber}&PageCount=${pageCount}&Username=${
        username == undefined ? '' : username
      }&RequestDateFrom=${dateFrom}&RequestDateTo=${dateTo}`;
    } else if (logType == types.Nav) {
      querry = `${logType}?ClientMessage=${
        clientMessage == undefined ? '' : clientMessage
      }&IsPaging=${true}&PageNumber=${pageNumber}&PageCount=${pageCount}&ActitivyDateFrom=${dateFrom}&ActitivyDateFrom=${dateTo}`;
    } else if (logType == types.Interaction) {
      querry = `${logType}?ClientMessage=${clientMessage == undefined ? '' : clientMessage}&Username=${
        username == undefined ? '' : username
      }&IsPaging=${true}&PageNumber=${pageNumber}&PageCount=${pageCount}&ActitivyDateFrom=${dateFrom}&ActitivyDateTo=${dateTo}`;
    } else {
      querry = `${logType}?ClientMessage=${
        clientMessage == undefined ? '' : clientMessage
      }&IsPaging=${true}&PageNumber=${pageNumber}&PageCount=${pageCount}`;
    }

    // setLoading(true);
    const {data, success, error} = await GetDataByFilter(logType, id, querry, true);
    console.log(data, 'success');
    setData(data);
    // setLoading(false);
  };
  const onChange = e => {
    const {name, value} = e.target;
    setSearchedItems({...searchedItems, [name]: value});
  };

  const reset = async () => {
    setLoading(true);
    const {data, success} = await GetLog(logType, true, pageCount, pageNumber);
    setData(data);
    setLoading(false);
  };
  if (logType == types.UserAuth) {
    return (
      <div style={styles.header}>
        <div style={styles.headerColumn}>
          <TextInput label={'ID'} name={'id'} onChange={onChange} mL={10} mb={5} width={8} />
          <TextInput label={'Activity Type'} name={'activityType'} onChange={onChange} mL={10} mb={5} width={8} />
        </div>
        <div style={styles.headerColumn}>
          <TextInput label={'Client Message'} name={'clientMessage'} onChange={onChange} mL={10} mb={5} width={8} />
          <TextInput label={'Error Message'} name={'errorMessage'} onChange={onChange} mL={10} mb={5} width={8} />
        </div>
        <div style={{...styles.headerColumn, marginLeft: 10}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Request Date From"
              value={searchedItems.dateFrom}
              onChange={newValue => setSearchedItems({...searchedItems, dateFrom: newValue.toISOString()})}
              renderInput={params => <TextField style={{marginBottom: 5, backgroundColor: 'white'}} size="small" {...params} />}
            />
            <DatePicker
              label="Request Date To"
              value={searchedItems.dateTo}
              onChange={newValue => setSearchedItems({...searchedItems, dateTo: newValue.toISOString()})}
              renderInput={params => <TextField style={{marginTop: 5, backgroundColor: 'white'}} size="small" {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div style={styles.searchBtnContainer}>
          <ButtonComponent onClick={handleSearch} mT={'0'} minWidth={110} width={16.5} label={'Search'} />
          <ButtonComponent onClick={reset} mT={'0'} minWidth={110} width={16.5} label={'Reset'} />
        </div>
      </div>
    );
  }

  if (logType == types.Nav) {
    return (
      <div style={styles.header}>
        <div style={styles.headerColumn}>
          <TextInput label={'ID'} name={'id'} onChange={onChange} mL={10} mb={5} width={8} />
          <TextInput label={'Client Message'} name={'clientMessage'} onChange={onChange} mL={10} mb={5} width={8} />
        </div>
        <div style={{...styles.headerColumn, marginLeft: 10}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Request Date From"
              value={searchedItems.dateFrom}
              onChange={newValue => setSearchedItems({...searchedItems, dateFrom: newValue.toISOString()})}
              renderInput={params => <TextField style={{marginBottom: 5, backgroundColor: 'white'}} size="small" {...params} />}
            />
            <DatePicker
              label="Request Date To"
              value={searchedItems.dateTo}
              onChange={newValue => setSearchedItems({...searchedItems, dateTo: newValue.toISOString()})}
              renderInput={params => <TextField style={{marginTop: 5, backgroundColor: 'white'}} size="small" {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div style={styles.searchBtnContainer}>
          <ButtonComponent onClick={handleSearch} mT={'0'} minWidth={110} width={16.5} label={'Search'} />
          <ButtonComponent onClick={reset} mT={'0'} minWidth={110} width={16.5} label={'Reset'} />
        </div>
      </div>
    );
  }
  if (logType == types.Interaction) {
    return (
      <div style={styles.header}>
        <div style={styles.headerColumn}>
          <TextInput label={'ID'} name={'id'} onChange={onChange} mL={10} mb={5} width={8} />
          <TextInput label={'Username'} name={'username'} onChange={onChange} mL={10} mb={5} width={8} />
        </div>
        <div style={{...styles.headerColumn, marginLeft: 10}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Request Date From"
              value={searchedItems.dateFrom}
              onChange={newValue => setSearchedItems({...searchedItems, dateFrom: newValue.toISOString()})}
              renderInput={params => <TextField style={{marginBottom: 5, backgroundColor: 'white'}} size="small" {...params} />}
            />
            <DatePicker
              label="Request Date To"
              value={searchedItems.dateTo}
              onChange={newValue => setSearchedItems({...searchedItems, dateTo: newValue.toISOString()})}
              renderInput={params => <TextField style={{marginTop: 5, backgroundColor: 'white'}} size="small" {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div style={{...styles.headerColumn, marginLeft: 10}}>
          <TextInput label={'Client Message'} name={'clientMessage'} onChange={onChange} mL={10} mb={5} width={8} />
        </div>
        <div style={styles.searchBtnContainer}>
          <ButtonComponent onClick={handleSearch} mT={'0'} minWidth={110} width={16.5} label={'Search'} />
          <ButtonComponent onClick={reset} mT={'0'} minWidth={110} width={16.5} label={'Reset'} />
        </div>
      </div>
    );
  }
  return (
    <div style={styles.header}>
      <div style={styles.headerColumn}>
        <TextInput label={'Username'} name={'username'} onChange={onChange} mL={10} mb={5} width={8} />
        <TextInput label={'ID'} name={'id'} onChange={onChange} mL={10} mb={5} width={8} />
      </div>
      <div style={styles.headerColumn}>
        <TextInput label={'Request Data'} name={'requestData'} onChange={onChange} mL={10} mb={5} width={8} />
        <TextInput label={'Response Data'} name={'responseData'} onChange={onChange} mL={10} mb={5} width={8} />
      </div>
      <div style={{...styles.headerColumn, marginLeft: 10}}>
        <TextInput label={'Client Message'} name={'clientMessage'} onChange={onChange} mL={10} mb={5} width={8} />
        <TextInput label={'Module Name'} name={'moduleName'} onChange={onChange} mL={10} mb={5} width={8} />
      </div>
      <div style={{...styles.headerColumn, marginLeft: 10}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Request Date From"
            value={searchedItems.dateFrom}
            onChange={newValue => setSearchedItems({...searchedItems, dateFrom: newValue.toISOString()})}
            renderInput={params => <TextField style={{marginBottom: 5, backgroundColor: 'white'}} size="small" {...params} />}
          />
          <DatePicker
            label="Request Date To"
            value={searchedItems.dateTo}
            onChange={newValue => setSearchedItems({...searchedItems, dateTo: newValue.toISOString()})}
            renderInput={params => <TextField style={{marginTop: 5, backgroundColor: 'white'}} size="small" {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div style={styles.searchBtnContainer}>
        <ButtonComponent onClick={handleSearch} mT={'0'} minWidth={110} width={16.5} label={'Search'} />
        <ButtonComponent onClick={reset} mT={'0'} minWidth={110} width={16.5} label={'Reset'} />
      </div>
    </div>
  );
}
