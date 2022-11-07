import React, {useEffect, useState} from 'react';
import GetDynamicDimensions from '../helper/GetDynamicDimensions';

const PAGINATION_COUNTS = [20, 30, 50];

const Styles = (width, height) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  settingsContainer: {
    height: height * 0.08,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
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

const PaginationContainer = props => {
  const {allItems, ChildComponent} = props;
  const [screenSize] = GetDynamicDimensions();
  const {dynamicHeight, dynamicWidth} = screenSize;
  const {paginationArea, caretArea, container, settingsContainer, caret, pageText, presentRows, paginationChoices} = Styles(
    dynamicWidth,
    dynamicHeight,
  );

  // this state should be used to update the nested components
  const [parentState, setParentState] = useState({allItems}); // add { allItems } here for demo only

  const [items, setItems] = useState([]);

  const [paginationCount, setPaginationCount] = useState(20);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(0);
  const [selectedPaginationIdx, setPaginationIdx] = useState(0);

  const chopArray = (array, count) => {
    const choppedArray = [];
    const maxPageCount = Math.ceil(array.length / count);

    let startIndex = 0;
    for (let i = 0; i < maxPageCount; i++) {
      choppedArray.push(array.slice(startIndex, count));
      startIndex = +count;
      count += paginationCount;
    }

    setPageLimit(maxPageCount);
    setItems(choppedArray);
    return;
  };

  useEffect(() => {
    chopArray(allItems, paginationCount);
  }, [parentState.allItems.length, paginationCount]); // instead of parentState.allItems, in prod, effect should fire everytime when allItems from props(from api in prod) changes

  const traversePage = (shouldDecrease = false) => {
    if (shouldDecrease) {
      setPage(p => (p - 1 > 0 ? p - 1 : page));
      return;
    }

    setPage(p => (p + 1 <= pageLimit ? p + 1 : page));
    return;
  };

  const onPaginationChange = (count, countIdx) => {
    setPage(1);
    setPaginationCount(count);
    setPaginationIdx(countIdx);
    return;
  };

  const choiceBtnsColors = idx => ({
    backgroundColor: idx === selectedPaginationIdx && '#C8C8C8',
    color: idx === selectedPaginationIdx && 'black',
  });

  const itemCountInCurrentPage = (items[page - 1] && items[page - 1].length) || paginationCount;

  return (
    <div style={container}>
      {items.length > 0 && ChildComponent && (
        <ChildComponent currentPage={page} items={items[page - 1]} parent={{state: parentState, setter: setParentState}} />
      )}
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
          <div style={presentRows}>{`Displaying ${itemCountInCurrentPage} items of ${allItems.length} available`}</div>
          {PAGINATION_COUNTS.map((count, idx) => (
            <button style={{...paginationChoices, ...choiceBtnsColors(idx)}} onClick={() => onPaginationChange(count, idx)}>
              {count}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaginationContainer;
