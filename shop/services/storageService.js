const LOCAL_STORAGE_TOKEN = 'token';
const LOCAL_USER_DATA = 'publiexpe-user';
const LOCAL_USER_PREFERENCES = 'UserPreferences';

/**
 * Get user token
 * @returns {String} user token from local storage
 */
const getToken = () => {
  const { token } = localStorage.getItem(LOCAL_USER_DATA);
  return token.access;
};

const getUserData = () => {
  let userData = JSON.parse(localStorage.getItem(LOCAL_USER_DATA));
  if (userData) {
    return {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    };
  }
};

export const storageService = {
  getToken,
  getUserData,
};
