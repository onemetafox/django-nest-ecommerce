import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { takeLatest, call, put } from 'redux-saga/effects';
import { userService } from '../services/userService';

export const actionTypes = {
  setToken: 'SET_TOKEN',
  setUser: 'SET_USER',
  removeUser: 'REMOVE_USER',
  getUserProfile: 'GET_USER_PROFILE',
  setIsLoggedIn: 'SET_IS_LOGGED_IN',
  setLocale: 'SET_LOCALE',
};

const initialState = { user: null, token: null };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.setToken:
      return {
        ...state,
        token: { ...action.payload.token },
      };

    case actionTypes.setUser:
      return {
        ...state,
        ...action.payload,
      };

    case actionTypes.removeUser:
      return {
        token: null,
        profile: null,
      };

    case actionTypes.setIsLoggedIn:
      return {
        ...state,
        ...action.payload,
      };

    case actionTypes.setLocale:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const actions = {
  setToken: token => ({
    type: actionTypes.setToken,
    payload: { token },
  }),
  setUser: user => ({
    type: actionTypes.setUser,
    payload: { user },
  }),
  removeUser: () => ({
    type: actionTypes.removeUser,
    payload: {},
  }),
  getUserProfile: token => ({
    type: actionTypes.getUserProfile,
    payload: { token },
  }),
  setIsLoggedIn: isLoggedIn => ({
    type: actionTypes.setIsLoggedIn,
    payload: { isLoggedIn },
  }),
  setLocale: locale => ({
    type: actionTypes.setLocale,
    payload: { locale },
  }),
};

export function* userSaga() {
  yield takeLatest(actionTypes.getUserProfile, function* saga(e) {
    try {
      const { user_profile } = yield call(
        userService.getUserProfile,
        e.payload.token,
      );
      let userData = {
        firstName: user_profile.first_name || user_profile.username,
        lastName: user_profile.last_name,
        email: user_profile.email,
        user_billing_address: user_profile.user_billing_address || {},
        user_profile: user_profile.user_profile || {},
        user_shipping_address: user_profile.user_shipping_address || {},
      };
      yield put(actions.setUser(JSON.stringify(userData)));
      yield put(actions.setIsLoggedIn(true));
    } catch (error) {
      yield put(actions.setIsLoggedIn(false));
      console.log(error);
    }
  });
}

const persistConfig = {
  keyPrefix: 'publiexpe-',
  key: 'user',
  storage,
};

export default persistReducer(persistConfig, userReducer);
