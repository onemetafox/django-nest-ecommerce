import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { takeEvery } from 'redux-saga/effects';

export const actionTypes = {
  SelectVariant: 'SELECT_VARIANT',
  CleanVariant: 'CLEAN_VARIANT',
  SelectArea: 'SELECT_AREA',
};

const initialState = {
  selectedVariant: null,
  selectedArea: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SelectVariant:
      return {
        ...state,
        selectedVariant: { ...action.payload.variant },
      };

    case actionTypes.CleanVariant:
      return {
        ...state,
        selectedVariant: null,
        selectedArea: null,
      };

    case actionTypes.SelectArea:
      return {
        ...state,
        selectedArea: action.payload.area,
      };

    default:
      return state;
  }
};

export const actions = {
  selectVariant: variant => ({
    type: actionTypes.SelectVariant,
    payload: { variant },
  }),
  cleanVariant: () => ({
    type: actionTypes.CleanVariant,
  }),
  selectArea: area => ({
    type: actionTypes.SelectArea,
    payload: { area },
  }),
};

export function* productSaga() {}

const persistConfig = {
  keyPrefix: 'publiexpe-',
  key: 'product',
  storage,
};

export default persistReducer(persistConfig, productReducer);
