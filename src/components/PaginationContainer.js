import React, { useEffect, useRef } from 'react';
import GetDynamicDimensions from '../helper/GetDynamicDimensions';
import Alertify from './Alertify';

export const PAGINATION_CHOICES = [100, 500, 1000];

const Styles = (width, height) => ({
  settingsContainer: {
    height: height * 0.08,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    backgroundColor:"#F7F7F7"
  },
  caretArea: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caret: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.02,
    fontSize: 18,
    fontWeight: '800',
    color: '#C8C8C8',
    borderWidth: 0,
    backgroundColor: 'white',
  },
  paginationArea: {
    flex: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  pageText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.025,
    fontSize: 24,
  },
  presentRows: {
    marginRight: width * 0.015,
    width: width * 0.3,
    maxWidth: 280,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    fontSize: 14,
    fontWeight: '600',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C8C8C8',
    borderStyle: 'solid',
  },
  paginationChoices: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.04,
    fontSize: 18,
    borderRadius: 5,
    borderWidth: 0,
    marginRight: width * 0.005,
  },
});

const PaginationContainer = ({paginationCount, setPaginationCount, page, setPage, itemLength, isModified}) => {
  const [screenSize] = GetDynamicDimensions();
  const {dynamicHeight, dynamicWidth} = screenSize;

  const {paginationArea, caretArea, settingsContainer, caret, pageText, presentRows, paginationChoices} = Styles(dynamicWidth, dynamicHeight);
  const pageLimit = Math.ceil(itemLength / paginationCount);

  const traversePage = (shouldDecrease = false) => {
    if (shouldDecrease) {
      setPage(p => (p - 1 > 0 ? p - 1 : page));
      return;
    }

    setPage(p => {
      if(p + 1 <= pageLimit) {
        if(isModified) {
          Alertify.ErrorNotifications('You have unsaved changes!')
          return page
        }
        return p + 1
      }

      Alertify.ErrorNotifications("You have seen all available entries!")
      return page;
    });
    return;
  };

  const onPaginationChange = count => {
    setPage(1);
    setPaginationCount(count);
    return;
  };

  return (
    <div style={settingsContainer}>
      <div style={caretArea}>
        <button style={caret} onClick={() => traversePage(true)}>
          {'<'}
        </button>
        <div style={pageText}>{page}</div>
        <button style={caret} onClick={() => traversePage()}>
          {'>'}
        </button>
      </div>
      <div style={paginationArea}>
        <div style={presentRows}>{`Displaying ${paginationCount} items `}</div>
        {PAGINATION_CHOICES.map((count, idx) => (
          <button
            key={count}
            style={{...paginationChoices, color: count == paginationCount ? '#C8C8C8' : 'black'}}
            onClick={() => onPaginationChange(count, idx)}>
            {count}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginationContainer;
