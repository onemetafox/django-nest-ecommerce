import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const actionTypes = {
  LoadLaning: 'LOAD_LANDUNG',
  RefreshStore: 'REFRESH_STORE',
  SetPromo: 'SET_PROMO',
  SetWebCommons: 'SET_WEB_COMMONS',
  SetMenu: 'SET_MENU',
  SetCategories: 'SET_CATEGORIES',
};

const initialState = {
  single: null,
  LoadLaning: null,
  promo: null,
  current: 0,
  webCommons: null,
  menu: null,
  categories: null,
};

const webReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SetMenu:
      return {
        ...state,
        menu: { ...action.payload },
      };

    case actionTypes.LoadLaning:
      return { single: action.payload.slug, quickShow: true };

    case actionTypes.RefreshStore:
      return {
        ...state,
        current: action.payload.current,
      };

    case actionTypes.SetPromo:
      return { ...state, promo: action.payload };

    case actionTypes.SetWebCommons:
      return { ...state, webCommons: action.payload };

    case actionTypes.SetCategories:
      return { ...state, categories: action.payload };

    default:
      return state;
  }
};

export const actions = {
  refreshStore: current => ({
    type: actionTypes.RefreshStore,
    payload: { current },
  }),
  setPromo: data => ({ type: actionTypes.SetPromo, payload: data }),
  setWebCommons: data => ({ type: actionTypes.SetWebCommons, payload: data }),
  setMenu: menu => ({ type: actionTypes.SetMenu, payload: menu }),
  setCategories: categories => ({
    type: actionTypes.SetCategories,
    payload: categories,
  }),
};

export function* langindSaga() {}

const persistConfig = {
  keyPrefix: 'publiexpe-',
  key: 'publiexpe',
  storage,
};

export default persistReducer(persistConfig, webReducer);
