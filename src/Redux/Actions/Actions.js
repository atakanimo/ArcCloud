import actionTypes from '../actionTypes';
import store from '../store';

export const LoginAction = () => {
  store.dispatch({
    type: actionTypes.LOGIN_SUCCESS,
    payload: null,
  });
};
