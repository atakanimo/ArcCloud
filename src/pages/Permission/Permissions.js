import React, {useEffect, useState} from 'react';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import PermissionStyle from './styles';

// API
import PermissionService from '../../Business/PermissionService';

// COMPONENTS
import {Box} from '@mui/material';
import {TbEdit} from 'react-icons/tb';
import CheckBox from '../../components/Checkbox-Switch/Checkbox';
import PaginationContainer, { PAGINATION_CHOICES } from '../../components/PaginationContainer';
import SettingsModal, {INPUT_MAX_CHAR_LENGTH, INPUT_MIN_CHAR_LENGTH} from './SettingsModal';
import Spinner from 'react-bootstrap/Spinner';
import AlertComponent from '../../components/AlertComponent';

// ICONS
import CancelIcon from '../../assets/cancel.png';
import SearchIcon from '../../assets/search.png';

const { Styles, decideColumnStyles } = PermissionStyle;

const titles = ['Edit', 'ID', 'Control ID', 'Description', 'Form Name']
const roles = ['va', 'ea', 'vm', 'em', 'vo', 'eo', 'vu', 'eu', 'vq', 'eq', 'v1', 'e1', 'e2', 'v3', 'e3', 'v4', 'e4', 'v5', 'e5'];
const allColumns = [ ...titles, ...roles];

const ADD_COLUMN_TEXT = 'Add New Entry';
const SAVE_TEXT = 'Save Changes';
const UNDO_TEXT = 'Undo All Changes';

const Permissions = () => {
  const [screenSize] = GetDynamicDimensions();
  const {dynamicHeight, dynamicWidth} = screenSize;
  const { 
    container, header, addText, saveText, undoText, spinner,
    spinnerContainer, editIcon, searchInput, searchIcon, searchBtnContainer, editIconContainer,
    gridContainer } = Styles(dynamicWidth, dynamicHeight);

  const [data, setData] = React.useState([]);

  const [modal, setModal] = React.useState({ trigger: false, isNew: false });
  const [loading, setLoading] = React.useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedRowIdx, setSelectedRowIdx] = React.useState(null);
  const [isModified, setIsModified] = useState(false)

  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(PAGINATION_CHOICES[0]);

  const fetch = async () => {
    setLoading(true);
    const {data, success} = await PermissionService.GetPermissions(true, pageCount, pageNumber);
    // show an alert if request was not successful or/and retry
    if(success) {
      setData(data);
    }
    setLoading(false);
  };

  useEffect(() => { fetch() }, [pageCount, pageNumber]);

  // const handleSearch = () => {
  //   if (!searchedItems && !searchTerm) return null;
  //   if (searchedItems) {
  //     SetParentState('searchedItems', null);
  //     return;
  //   }

  //   // should show an alert or a feedback to let the user know about the result of search
  //   if (filteredItems.length < 1) {
  //     setShowAlert(true);
  //     setAlertMessage('No result');
  //     setAlertVariant('primary');
  //     return;
  //   }

  //   return;
  // };

  const onCheckboxChange = (columnTitle, rowIndex) => {
    const checkboxValue = data[rowIndex][columnTitle];
    data[rowIndex][columnTitle] = checkboxValue === 0 ? 1 : 0;

    setData(data);
    setIsModified(true);
    return;
  };

  const undoChanges = () => {
    fetch();
    setIsModified(false);
  }

  const saveChanges = () => {
    PermissionService.SaveAllChanges(data)
    setIsModified(false);
  }

  const LoadingSpinner = () =>
    <div style={spinnerContainer}>
      <Spinner style={spinner} animation='border' />
    </div>

  const Row = props => {
    const { item, index, row, column } = props;

    const decideStyle = (element, idx = 1) => {
      const decideColor = rowIdx => ({ backgroundColor: rowIdx % 2 === 0 ? '#FFFFFF' : '#C8C8C8' });
      return { ...decideColumnStyles(element, dynamicWidth, dynamicHeight), ...decideColor(idx) };
    }

    const onEdit = () => {
      setSelectedRowIdx(index);
      setModal({ trigger: true, isNew: false });
    }

    // checked={row[col] === 1 || row[col] === 9} disabled={row[col] === 9} onCheckboxChange(col, index)
    if(column) {
      return (
        <span key={index} style={decideStyle(item)}>{item.toUpperCase()}</span>
      )};
    if(row) {
      return (
        <div key={item.id} style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ ...decideStyle('edit', index), editIconContainer}}>
            <TbEdit onClick={onEdit} style={editIcon}/>
          </div>
          <span style={decideStyle('id', index)}>{item.id}</span>
          <span style={decideStyle('control id', index)}>{item.controlId}</span>
          <span style={decideStyle('description', index)}>{item.description}</span>
          <span style={decideStyle('form name', index)}>{item.formName}</span>
          { roles.length > 0 && roles.map(() => <CheckBox style={decideStyle('checkbox', index)} onChange={() => {}} />)}
        </div>
      )
    }
  }

  const Header = () => {
    return (
      <div style={header}>
        <button onClick={() => setModal({ trigger: true, isNew: true })} style={addText}>
          {ADD_COLUMN_TEXT}
        </button>
        <input
          // disabled={searchedItems}
          // value={searchTerm}
          // onChange={e => SetParentState('searchTerm', e.target.value)}
          minLength={INPUT_MIN_CHAR_LENGTH}
          maxLength={INPUT_MAX_CHAR_LENGTH}
          style={searchInput}
          placeholder="Type your search here..."
          />
        <button style={searchBtnContainer} onClick={() => null}>
          { /* when user searches, should it search the current page or make a request? */ }
          <img src={SearchIcon} style={searchIcon}/>
        </button>
        <button disabled={!isModified} onClick={() => undoChanges()} style={undoText(isModified)}>
          {UNDO_TEXT}
        </button>
        <button disabled={!isModified} onClick={() => saveChanges()} style={saveText(isModified)}>
          {SAVE_TEXT}
        </button>
      </div>
    )
  }

  return (
    <div style={container}>
      <Header />
      <div style={gridContainer}>
        { loading ? <LoadingSpinner /> : (
          <>
            <div style={{ display: 'flex' }}>
            { allColumns.length > 0 && allColumns.map((title, i) => <Row index={i} item={title} column/> )}
            </div>
            <div style={{ display:'flex', flexDirection: 'column' }}>
              { data.length > 0 && data.map((row, i) => <Row index={i} item={row} row/> )}
            </div>
          </>
          )
        }
      </div>
      <PaginationContainer paginationCount={pageCount} setPaginationCount={setPageCount} page={pageNumber} setPage={setPageNumber} />
      </div>
  );
};

export default Permissions;
