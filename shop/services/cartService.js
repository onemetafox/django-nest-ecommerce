import { fetcherWithParams, poster } from './apiService';
import { storageService } from './storageService';

const createCart = (data) =>
  poster('order/cart/create', data);

export const cartService = {
    createCart,
};
