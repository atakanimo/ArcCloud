import actionTypes from '../actionTypes';

const initialState = {
  ItemSize: 20,
  Page: 1,
};

const Pagination = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ITEM_SIZE:
      return {...state, ItemSize: action.payload};
    case actionTypes.SET_PAGE:
      return {...state, Page: action.payload};
  }
  return state;
};

export default Pagination;
