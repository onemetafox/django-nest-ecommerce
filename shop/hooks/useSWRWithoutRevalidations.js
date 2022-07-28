import useSWR from 'swr';

import { fetcher } from '../services/apiService';
import { useApiError } from './useApiError';

export const useSWRWithoutRevalidations = (config, options) => {
  const onError = useApiError();

  return useSWR(config, fetcher, {
    ...options,
    onError,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    dedupingInterval: 10000,
    loadingTimeout: 10000,
  });
};
