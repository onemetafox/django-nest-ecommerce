import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { cartService } from '../services/cartService';
// Import Custom Component
import CartPopup from '../components/features/modals/add-to-cart-popup';

export const actionTypes = {
  AddToCart: 'ADD_TO_CART',
  RemoveFromCart: 'REMOVE_FROM_CART',
  RefreshStore: 'REFRESH_STORE',
  UpdateCart: 'UPDATE_CART',
  AddVariantToCart: 'ADD_VARIANT_TO_CART'
};

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AddToCart:
      const productSlug = action.payload.product.slug;
      if (
        state.cart.findIndex(
          product =>
            product.slug === productSlug && product.index === action.index,
        ) !== -1
      ) {
        const cart = state.cart.reduce((cartAcc, product) => {
          if (product.slug === productSlug && product.index === action.index) {
            cartAcc.push({
              ...product,
              qty: parseInt(product.qty) + parseInt(action.qty),
              sum:
                (product.sale_price ? product.sale_price : product.price) *
                (parseInt(product.qty) + parseInt(action.qty)),
            }); // Increment qty
          } else {
            cartAcc.push(product);
          }

          return cartAcc;
        }, []);

        return { ...state, cart };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.payload.product,
            qty: action.qty,
            price:
              action.payload.product.variants.length &&
              !action.payload.product.variants.find(item => item.price === null)
                ? action.payload.product.variants[action.index].sale_price
                  ? action.payload.product.variants[action.index].sale_price
                  : action.payload.product.variants[action.index].price
                : action.payload.product.sale_price
                ? action.payload.product.sale_price
                : action.payload.product.price[0],
            index: action.index,
          },
        ],
      };
    case actionTypes.AddVariantToCart:
      {
        console.log(action.payload);
      }

      return {
        ...state,
        cart: [
          ...state.cart, action.payload
        ]
      }
    case actionTypes.UpdateCart:
      return {
        ...state,
        cart: action.payload.products,
      };

    case actionTypes.RemoveFromCart:
      let cart = state.cart.reduce((cartAcc, product) => {
        if (
          product.slug !== action.payload.product.slug ||
          product.index !== action.payload.product.index
        ) {
          cartAcc.push(product);
        }

        return cartAcc;
      }, []);

      return { ...state, cart };

    case actionTypes.RefreshStore:
      return initialState;

    default:
      return state;
  }
};

export const actions = {
  addToCart: (product, qty = 1, index = -1) => ({
    type: actionTypes.AddToCart,
    payload: { product },
    qty,
    index,
  }),
  removeFromCart: product => ({
    type: actionTypes.RemoveFromCart,
    payload: { product },
  }),
  updateCart: products => ({
    type: actionTypes.UpdateCart,
    payload: { products },
  }),
};

export function* cartSaga() {
  yield takeEvery(actionTypes.AddToCart, function* saga(e) {
    toast(<CartPopup product={{ ...e.payload.product, index: e.index }} />);
  });
}

const persistConfig = {
  keyPrefix: 'porto-',
  key: 'cart',
  storage,
};

export default persistReducer(persistConfig, cartReducer);
