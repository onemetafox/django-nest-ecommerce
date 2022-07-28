import { fetcher } from './apiService';

const fetchMenu = () => fetcher('web/menu/');

export const webService = {
  fetchMenu,
};
