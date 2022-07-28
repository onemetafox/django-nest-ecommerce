import { all } from 'redux-saga/effects';
import { cartSaga } from './cart';
import { wishlistSaga } from './wishlist';
import { userSaga } from './user';
// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([cartSaga(), wishlistSaga(), userSaga()]);
}
