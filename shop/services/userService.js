import { fetcherWithParams } from './apiService';
import { storageService } from './storageService';

const getUserProfile = token =>
  fetcherWithParams('user/my-profile/', {
    headers: {
      Authorization: `Bearer ${token || storageService.getToken()}`,
    },
  });

export const userService = {
  getUserProfile,
};
