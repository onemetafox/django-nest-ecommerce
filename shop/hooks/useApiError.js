import useTranslation from 'next-translate/useTranslation';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

export const useApiError = () => {
  const { t } = useTranslation('common');

  return useCallback(
    error => {
      let msg = t('TYPICAL_SERVER_ERROR');
      
      switch (
        Object.keys(typeof error.data === 'object' ? error.data : {})?.[0]
      ) {
        case 'password':
          msg = t('PASSWORD_ERROR');
          break;
        case 'detail':
          msg = t('ACCOUNT_ERROR');
          break;

        default:
          msg = t('TYPICAL_SERVER_ERROR');
      }

      toast(msg);
    },
    [t],
  );
};
