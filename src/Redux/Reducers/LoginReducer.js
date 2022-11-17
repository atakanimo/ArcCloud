import actionTypes from '../actionTypes';

const initialState = {
  isLogin: false,
  token: '',
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {...state, isLogin: true, token: '123'};
  }
  return state;
};

export default LoginReducer;
