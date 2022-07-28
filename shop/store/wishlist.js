import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { takeEvery } from 'redux-saga/effects';

export const actionTypes = {
  AddToWishlist: 'ADD_TO_WISHLIST',
  RemoveFromWishlsit: 'REMOVE_FROM_WISHLIST',
  RefreshStore: 'REFRESH_STORE',
  ShowModal: 'SHOW_WISHLIST_MODAL',
};

const initialState = { list: [], showModal: false };

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AddToWishlist:
      if (state.list.findIndex(item => item === action.payload.product) < 0) {
        return {
          ...state,
          list: [...state.list, action.payload.product],
        };
      }

      return state;

    case actionTypes.RemoveFromWishlsit:
      return {
        list: state.list.filter(product => product !== action.payload.product),
      };

    case actionTypes.RefreshStore:
      return initialState;

    default:
      return state;
  }
};

export const actions = {
  addToWishList: product => ({
    type: actionTypes.AddToWishlist,
    payload: { product },
  }),
  removeFromWishlist: product => ({
    type: actionTypes.RemoveFromWishlsit,
    payload: { product },
  }),
};

export function* wishlistSaga() {
  yield takeEvery(actionTypes.AddToWishlist, function* saga(e) {
    document.querySelector('.wishlist-popup') &&
      document.querySelector('.wishlist-popup').classList.add('active');

    setTimeout(() => {
      document.querySelector('.wishlist-popup') &&
        document.querySelector('.wishlist-popup').classList.remove('active');
    }, 2000);
  });
}

const persistConfig = {
  keyPrefix: 'porto-',
  key: 'wishlist',
  storage,
};

export default persistReducer(persistConfig, wishlistReducer);
