import React, {useState} from 'react';
import GetDynamicDimensions from '../helper/GetDynamicDimensions';
import CancelIcon from '../assets/cancel.png';
import SearchIcon from '../assets/search.png';
import LogService from '../Business/LogService';

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
      paddingLeft: 10,
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

  return (
    <div style={styles.header}>
      <input
        // disabled={searchedItems}
        value={searchedItems}
        onChange={e => setSearchedItems(e.target.value)}
        // minlength={String(INPUT_MIN_CHAR_LENGTH)}
        // maxlength={String(INPUT_MAX_CHAR_LENGTH)}
        style={styles.searchInput}
        placeholder="Type your search here..."
      />
      <button style={styles.searchBtnContainer} onClick={e => handleSearch(e)}>
        <img src={isSearched == true ? CancelIcon : SearchIcon} style={styles.searchIcon} />
      </button>
    </div>
  );
}
