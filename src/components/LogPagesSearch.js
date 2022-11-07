import React, {useState} from 'react';
import GetDynamicDimensions from '../helper/GetDynamicDimensions';
import CancelIcon from '../assets/cancel.png';
import SearchIcon from '../assets/search.png';
import Mock from '../Mock/permissions_mock.json';

export default function LogPagesSearch() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  const [searchedItems, setSearchedItems] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const styles = {
    header: {
      display: 'flex',
      flexDirection: 'row',
      height: dynamicHeight * 0.1,
      alignItems: 'center',
    },
    searchInput: {
      marginLeft: dynamicWidth * 0.02,
      marginRight: dynamicWidth * 0.02,
      width: dynamicWidth * 0.3,
      maxWidth: 400,
      height: 40,
      backgroundColor: 'white',
      fontSize: 16,
      color: 'black',
      paddingLeft:10,
      borderRadius: 5,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#C8C8C8',
    },
    searchIcon: {
      width: 30,
      height: 30,
    },
    searchBtnContainer: {
      width: dynamicWidth * 0.05,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 5,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#C8C8C8',
    },
  };
  const handleSearch = () => {
    if (!searchedItems && !searchTerm) return null;
    if (searchedItems) {
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
  return (
    <div style={styles.header}>
      <input
        disabled={searchedItems}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        // minlength={String(INPUT_MIN_CHAR_LENGTH)}
        // maxlength={String(INPUT_MAX_CHAR_LENGTH)}
        style={styles.searchInput}
        placeholder="Type your search here..."
      />
      <button style={styles.searchBtnContainer} onClick={() => handleSearch()}>
        <img src={searchedItems ? CancelIcon : SearchIcon} style={styles.searchIcon} />
      </button>
    </div>
  );
}
