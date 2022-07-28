import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';
import { persistStore } from 'redux-persist';

// Import Custom Component
import cartReducer from './cart';
import wishlistReducer from './wishlist';
import modalReducer from './modal';
import webReducer from './landing';
import userReducer from './user';
import productReducer from './product';

const sagaMiddleware = createSagaMiddleware();

const rootReducers = combineReducers({
  cartlist: cartReducer,
  wishlist: wishlistReducer,
  modal: modalReducer,
  landing: webReducer,
  user: userReducer,
  product: productReducer,
});

export const makeStore = context => {
  const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));

  store.sagaTask = sagaMiddleware.run(rootSaga);
  store.__persistor = persistStore(store);
  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
