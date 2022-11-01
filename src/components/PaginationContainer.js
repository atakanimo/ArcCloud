import React, {useEffect, useState} from 'react';
import GetDynamicDimensions from '../helper/GetDynamicDimensions';

const PAGINATION_COUNTS = [10, 20, 30];

const Styles = (width, height) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: height * 0.915,
  },
  settingsContainer: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  caret: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.05,
    height: 40,
    fontSize: 18,
    fontWeight: '800',
    color: 'purple',
  },
  pageText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.025,
    height: 40,
    fontSize: 24,
  },
  presentRows: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.2,
    height: 40,
    fontSize: 14,
    marginLeft: width * 0.35,
    marginRight: 5,
    fontWeight: '600',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'purple',
    borderStyle: 'solid',
  },
  paginationChoices: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.04,
    height: 40,
    fontSize: 18,
    marginRight: 2,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

const PaginationContainer = props => {
  const [forceRender, setForce] = useState(false);
  const [selectedPaginationIdx, setPaginationIdx] = useState(0);

  const {itemArray, ChildComponent} = props;
  const [screenSize] = GetDynamicDimensions();
  const {dynamicHeight, dynamicWidth} = screenSize;
  const {container, settingsContainer, caret, pageText, presentRows, paginationChoices} = Styles(dynamicWidth, dynamicHeight);

  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(10);

  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(0);

  const chopArray = (array, count) => {
    const choppedArray = [];
    const maxPageCount = Math.ceil(array.length / count);

    let startIndex = 0;
    for (let i = 0; i < maxPageCount; i++) {
      choppedArray.push(array.slice(startIndex, count));
      startIndex = +count;
      count += itemCount;
    }

    setPageLimit(maxPageCount);
    setItems(choppedArray);
    return;
  };

  useEffect(() => {
    chopArray(itemArray, itemCount);
  }, [itemCount, page]);

  const itemCountInCurrentPage = (items[page - 1] && items[page - 1].length) || itemCount;

  const traversePage = (shouldDecrease = false) => {
    if (shouldDecrease) {
      setPage(p => (p - 1 > 0 ? p - 1 : page));
      setForce(p => !p);
      return;
    }

    setPage(p => (p + 1 <= pageLimit ? p + 1 : page));
    setForce(p => !p);
    return;
  };

  const handleItemCount = (count, countIdx) => {
    setPage(1);
    setItemCount(count);
    setPaginationIdx(countIdx);
  };

  const choiceBtnsColors = idx => ({
    backgroundColor: idx === selectedPaginationIdx && 'purple',
    color: idx === selectedPaginationIdx && 'white',
  });

  return (
    <div style={container}>
      {items.length > 0 && <ChildComponent forceRender={forceRender} items={items[page - 1]} />}
      <div style={settingsContainer}>
        <div style={caret} onClick={() => traversePage(true)}>
          {'<'}
        </div>
        <div style={pageText}>{page}</div>
        <div style={caret} onClick={() => traversePage()}>
          {'>'}
        </div>
        <div style={presentRows}>{`Displaying ${itemCountInCurrentPage} items of ${itemArray.length} available`}</div>
        {PAGINATION_COUNTS.map((count, idx) => (
          <div style={{...paginationChoices, ...choiceBtnsColors(idx)}} onClick={() => handleItemCount(count, idx)}>
            {count}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaginationContainer;
