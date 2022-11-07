import actionTypes from '../actionTypes';
import store from '../store';

export const SaveItemSize = itemSize => {
  store.dispatch({
    type: actionTypes.SET_ITEM_SIZE,
    payload: itemSize,
  });
};
export const SavePageNumber = pageNumber => {
  store.dispatch({
    type: actionTypes.SET_PAGE,
    payload: pageNumber,
  });
};
