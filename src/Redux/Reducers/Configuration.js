import actionTypes from '../actionTypes';

const initialState = {
  Configuration: [],
};

const ConfigurationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CONFIGURATION:
      return {...state, Configuration: action.payload};
  }
  return state;
};

export default ConfigurationReducer;
