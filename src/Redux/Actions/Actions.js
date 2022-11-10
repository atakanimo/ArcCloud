import actionTypes from '../actionTypes';
import store from '../store';

export const SaveConfiguration = conf => {
  store.dispatch({
    type: actionTypes.GET_CONFIGURATION,
    payload: conf,
  });
};
