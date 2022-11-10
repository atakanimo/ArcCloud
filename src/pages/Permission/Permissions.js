import React, {useEffect, useState} from 'react';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import {Styles} from './styles';

// API
import PermissionService from '../../Business/PermissionService';

// COMPONENTS
import {Box} from '@mui/material';
import {TbEdit} from 'react-icons/tb';
import CheckBox from '../../components/Checkbox/Checkbox';
import PaginationContainer, { PAGINATION_CHOICES } from '../../components/PaginationContainer';
import SettingsModal, {INPUT_MAX_CHAR_LENGTH, INPUT_MIN_CHAR_LENGTH} from './SettingsModal';
import Spinner from 'react-bootstrap/Spinner';
import AlertComponent from '../../components/AlertComponent';

// ICONS
import CancelIcon from '../../assets/cancel.png';
import SearchIcon from '../../assets/search.png';

const columns = ['formName', 'va', 'ea', 'vm', 'em', 'vo', 'eo', 'vu', 'eu', 'vq', 'eq', 'v1', 'e1', 'e2', 'v3', 'e3', 'v4', 'e4', 'v5', 'e5'];

const ADD_COLUMN_TEXT = 'Add New Entry';
const SAVE_TEXT = 'Save Changes';
const UNDO_TEXT = 'Undo All Changes';

const Permissions = () => {
  const [screenSize] = GetDynamicDimensions();
  const {dynamicHeight, dynamicWidth} = screenSize;
  const {container, mainDiv, titles, permDiv, columnsArray, header, addText, saveText, undoText, spinner, spinnerContainer, editIcon, searchInput, searchIcon, searchBtnContainer} = Styles(
    dynamicWidth,
    dynamicHeight,
  );

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
    setData(p => {
      const checkboxValue = p[rowIndex][columnTitle];
      p[rowIndex][columnTitle] = checkboxValue === 0 ? 1 : 0;
      return p;
    })

    setIsModified(true)
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

  return (
    <>
      {modal.trigger && ( <SettingsModal itemToEdit={{item: data[selectedRowIdx] || null, itemIdx: selectedRowIdx}} setData={setData} setIsModified={setIsModified} modalInfo={{ ...modal, setModal }}/> )}
      <Box sx={[container]}>
        {/* <AlertComponent variant={alertVariant} text={alertMessage} show={showAlert} setShow={setShowAlert} /> */}
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
            {/* <img src={searchedItems ? CancelIcon : SearchIcon } style={searchIcon}/> */}
          </button>
          <button disabled={!isModified} onClick={() => undoChanges()} style={undoText(isModified)}>
            {UNDO_TEXT}
          </button>
          <button disabled={!isModified} onClick={() => saveChanges()} style={saveText(isModified)}>
            {SAVE_TEXT}
          </button>
        </div>
        <div style={{height: dynamicHeight * 0.82, overflow: 'scroll'}}>
          <div style={mainDiv}>
            <div style={{...titles(1), borderLeftWidth: 0}}>{'Edit'}</div>
            <div style={{...titles(1)}}>{'ID'}</div>
            <div style={{...titles(1), minWidth: 250}}>{'ControlId'}</div>
            <div style={permDiv}>
              {columns.map((item, index) =>
                item == 'formName' ? (
                  <div key={index} style={{...columnsArray(1), minWidth: 120}}>{item}</div>
                ) : (
                  <div key={index} style={{...columnsArray(1), minWidth: 70}}>{item}</div>
                ),
              )}
            </div>
          </div>
          {loading ? <LoadingSpinner /> : (data && data.length > 0) &&
            data.map((row, index) => {
              return (
                <div key={row.id} style={mainDiv}>
                  <div style={{...titles(index), borderLeftWidth: 0}}>
                    <TbEdit
                      onClick={() => {
                        setSelectedRowIdx(index);
                        setModal({ trigger: true, isNew: false });
                      }}
                      style={editIcon}
                    />
                  </div>
                  <div style={{...titles(index)}}>{row.id}</div>
                  <div style={{...titles(index), minWidth: 250}}>{row.controlId}</div>
                  <div style={permDiv}>
                    {columns.map(col => (
                      <React.Fragment key={col}>
                        {col == 'formName' ? (
                          <div style={{...columnsArray(index), minWidth: 120}}>{row[col]}</div>
                        ) : (
                          <div style={columnsArray(index)}>
                            <CheckBox
                              color="purple"
                              onChange={() => onCheckboxChange(col, index)}
                              checked={row[col] == 1 ? true : row[col] == 9 ? true : false}
                              disabled={row[col] == 9 ? true : false}
                            />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
        <PaginationContainer paginationCount={pageCount} setPaginationCount={setPageCount} page={pageNumber} setPage={setPageNumber} />
      </Box>
    </>
  );
};
export default Permissions;
