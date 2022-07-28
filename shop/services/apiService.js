import axios from 'axios';

// using fetch instead of axios because we want to use it in the server as well
export const fetcher = config => {
  const url = config?.url ?? config;
  const queryReX = /\?.*$/;

  return fetch(
    process.env.NEXT_PUBLIC_API_PATH +
      `/api/v1${url.startsWith('/') ? '' : '/'}` +
      `${url}${url.endsWith('/') ? '' : url.match(queryReX) ? '' : '/'}`,
    {
      ...(typeof config === 'object' ? config : {}),

      method: config?.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(typeof config?.headers === 'object' && 'headers' in config
          ? config.headers
          : {}),
      },

      ...(typeof config === 'object' && 'data' in config
        ? {
            body: JSON.stringify(config.data),
          }
        : {}),
    },
  ).then(async res => {
    if (!res.ok) {
      const data = await res.json();
      throw { status: res.status, data };
    }

    return res.json();
  });
};

/**
 * Function to make POST calls to the api
 * @param {url} url
 * @param {any} data
 * @returns promise
 */
export const poster = async (url, data) =>
  await axios.post(process.env.NEXT_PUBLIC_API_PATH + '/api/v1/' + url, data);
