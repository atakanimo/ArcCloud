import React, {useEffect, useState} from 'react';
import CheckBox from '../../components/Checkbox/Checkbox';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import Mock from '../../Mock/permissions_mock.json';
import {Box} from '@mui/material';

import CancelIcon from '../../assets/cancel.png';
import SearchIcon from '../../assets/search.png';
import {TbEdit} from 'react-icons/tb';
import PaginationContainer from '../../components/PaginationContainer';
import SettingsModal, {INPUT_MAX_CHAR_LENGTH, INPUT_MIN_CHAR_LENGTH} from './SettingsModal';

const columns = ['formName', 'va', 'ea', 'vm', 'em', 'vo', 'eo', 'vu', 'eu', 'vq', 'eq', 'v1', 'e1', 'e2', 'v3', 'e3', 'v4', 'e4', 'v5', 'e5'];

const ADD_COLUMN_TEXT = 'Add New Column';

const Styles = (width, height) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: height * 0.92,
    overflow: 'scroll'
  },
  mainDiv: {
    display: 'flex',
  },
  titles: index => ({
    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#C8C8C8',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 40,
    minWidth: 250,
    fontSize: 16,
    fontWeight: '600'
  }),
  permDiv: {
    display: 'flex',
  },
  columnsArray: (index = 0) => ({
    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#C8C8C8',
    width: 70,
    height: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
  }),
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: height * 0.1,
    alignItems: 'center',
  },
  addText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.1,
    height: 40,
    fontSize: 14,
    fontWeight: '600',
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: '#C8C8C8',
    color: 'black',
    marginLeft: 10,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  editIcon: {
    width: 35,
    height: 35,
    color: 'black'
  },
  searchInput: {
    width: width * 0.3,
    height: 40,
    backgroundColor: 'white',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#C8C8C8'
  },
  searchIcon: {
    width: 30,
    height: 30
  },
  searchBtnContainer: {
    width: width * 0.05,
    height: 40,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#C8C8C8'
  }
});

const Permissions = () => {
  const [screenSize] = GetDynamicDimensions();
  const {dynamicHeight, dynamicWidth} = screenSize;
  const {container, mainDiv, titles, permDiv, columnsArray, header, addText, editIcon, searchInput, searchIcon, searchBtnContainer} = Styles(
    dynamicWidth,
    dynamicHeight,
  );

  const [force, setForce] = useState(false); // TO FORCE THE RENDER AFTER USER PRESSED ON A CHECKBOX
  const [selectedRowIdx, setSelectedRowIdx] = useState(null);
  const [triggerModal, setTriggerModal] = useState(false);
  const [searchedItems, setSearchedItems] = useState(null);

  const Grid = props => {
    const [searchTerm, setSearchTerm] = useState(null);
    const [data, setData] = useState(searchedItems || props.items || []);

    useEffect(() => {
      setForce(p => !p);
    }, [searchedItems, props.items]);

    const handleSearch = () => {
      if(!searchedItems && !searchTerm) return null;
      if(searchedItems) {
        setSearchedItems(null);
        return;
      }

      const filteredItems = Mock.filter(item => {
        // the array to be filtered should be the array including all items available
        const itemId = item.controlId.toLowerCase();
        const searchedTerm = new RegExp(searchTerm.toLowerCase());
        if (itemId.match(searchedTerm)) return item;
      });

      // should show an alert or a feedback to let the user know about the result of search
      if (filteredItems.length < 1) {
        console.log('no result');
        return null;
      }

      setSearchedItems(filteredItems);
      return;
    };

    // place a save button >> try to change the checkbox when scrolled down to see why
    const handleChange = (title, objIdx) => {
      const checkboxValue = data[objIdx][title];
      data[objIdx][title] = checkboxValue === 0 ? 1 : 0;
      setData(data);
      setForce(p => !p);
      return;
    };

    const handleCreateEvent = event => {};
    const mainDivColumnStyles = {minWidth: 100, justifyContent: 'center', alignItems: 'center', display: 'flex', fontSize: 16, fontWeight: '600' };

    return (
      <>
        {triggerModal && <SettingsModal setters={{setTriggerModal, setData}} open={true} itemToEdit={data[selectedRowIdx] || null} />}
        <Box sx={[container, {opacity: triggerModal ? 0.3 : 1}]}>
          <div style={header}>
            <button onClick={e => handleCreateEvent(e)} style={addText}>
              {ADD_COLUMN_TEXT}
            </button>
            <input
              disabled={searchedItems}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              minlength={String(INPUT_MIN_CHAR_LENGTH)}
              maxlength={String(INPUT_MAX_CHAR_LENGTH)}
              style={searchInput}
              placeholder="Type your search here..."
            />
            <button style={searchBtnContainer} onClick={() => handleSearch()}>
              <img src={searchedItems ? CancelIcon : SearchIcon } style={searchIcon}/>
            </button>
          </div>
          <div style={mainDiv}>
            <div style={{...titles(1), ...mainDivColumnStyles}}>{'Edit'}</div>
            <div style={{...titles(1), ...mainDivColumnStyles}}>{'ID'}</div>
            <div style={{...titles(1), ...mainDivColumnStyles, minWidth: 250 }}>{'ControlId'}</div>
            <div style={permDiv}>
              {columns.map((item, index) =>
                item == 'formName' ? <div style={{...columnsArray(1), ...mainDivColumnStyles, minWidth: 120}}>{item}</div> : <div style={{ ...columnsArray(1), ...mainDivColumnStyles, minWidth: 70 }}>{item}</div>,
              )}
            </div>
          </div>
          {data.length > 0 &&
            data.map((permissionObj, index) => {
              return (
                <div style={mainDiv}>
                  <div style={{...titles(index), ...mainDivColumnStyles}}>
                    <TbEdit
                      onClick={() => {
                        setTriggerModal(true);
                        setSelectedRowIdx(index);
                      }}
                      style={editIcon}
                    />
                  </div>
                  <div style={{...titles(index), ...mainDivColumnStyles }}>{permissionObj.id}</div>
                  <div style={{...titles(index), ...mainDivColumnStyles, minWidth: 250 }}>{permissionObj.controlId}</div>
                  <div style={permDiv}>
                    {columns.map((item) => (
                      <>
                        {item == 'formName' ? (
                          <div style={{...columnsArray(index), minWidth: 120}}>{permissionObj[item]}</div>
                        ) : (
                          <div style={columnsArray(index)}>
                            <CheckBox
                              color='purple'
                              onChange={() => handleChange(item, index)}
                              checked={permissionObj[item] == 1 ? true : permissionObj[item] == 9 ? true : false}
                              disabled={permissionObj[item] == 9 ? true : false}
                            />
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              );
            })}
        </Box>
      </>
    );
  };

  return <PaginationContainer itemArray={Mock} ChildComponent={Grid} />;
};

export default Permissions;
