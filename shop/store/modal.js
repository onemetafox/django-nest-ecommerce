import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const actionTypes = {
  ShowQuick: 'SHOW_QUICKVIEW',
  HideQuick: 'HIDE_QUICKVIEW',
  ShowVideo: 'SHOW_VIDEO',
  HideVideo: 'HIDE_VIDEO',
  RefreshStore: 'REFRESH_STORE',
};

const initialState = {
  single: null,
  quickShow: false,
  videoShow: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ShowQuick:
      return { single: action.payload.slug, quickShow: true };

    case actionTypes.HideQuick:
      return { quickShow: false, single: null };

    case actionTypes.ShowVideo:
      return { videoShow: true };

    case actionTypes.HideVideo:
      return { videoShow: false };

    case actionTypes.RefreshStore:
      return initialState;

    default:
      return state;
  }
};

export const actions = {
  showQuickView: slug => ({ type: actionTypes.ShowQuick, payload: { slug } }),
  hideQuickView: () => ({ type: actionTypes.HideQuick }),
  showVideo: () => ({ type: actionTypes.ShowVideo }),
  hideVideo: () => ({ type: actionTypes.HideVideo }),
};

const persistConfig = {
  keyPrefix: 'porto-',
  key: 'modal',
  storage,
};

export default persistReducer(persistConfig, modalReducer);
