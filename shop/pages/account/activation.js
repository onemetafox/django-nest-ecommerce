import ExternalAccountLayout from '../../components/layouts/externalAccountLayout';
import useTranslation from 'next-translate/useTranslation';
import ALink from '../../components/common/ALink';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { poster } from '../../services/apiService';

export default function AccountActivation() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const { t } = useTranslation('common');

  useEffect(() => {
    if (!router.query.token || !router.query.uid) {
      router.push('/');
    } else activateAccount(router.query);
  }, [router.query]);

  function activateAccount() {
    poster('accounts/users/activation/', {
      ...router.query,
      language: router.locale || router.defaultLocale || 'es-ES',
    })
      .then(res => {
        if (res.status === 204) {
          setActive(true);
        }
      })
      .catch(err => {
        setActive(true);
      });
  }

  return (
    <ExternalAccountLayout>
      {active ? (
        <main className="main">
          <div className="page-header">
            <div className="container d-flex flex-column align-items-center">
              <img
                src="../../public/images/commons/account-100.png"
                alt={t('ACCOUNTS')}
                title={t('ACCOUNTS')}
              />
              <h1>{t('ACCOUNT_ACTIVATED')}</h1>
            </div>
          </div>

          <div className="container reset-password-container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="card p-5 text-center">
                  <h6>{t('ACCOUNT_ACTIVATED_TEXT')}</h6>
                  <div className="d-block mt-2">
                    <ALink href="/" className="btn btn-outline-dark btn-md">
                      {t('RESET_PASSWORD')}
                    </ALink>
                  </div>
                  <div className="d-flex mt-3 justify-content-around">
                    <div className="d-block mt-3">
                      <ALink
                        href="/"
                        className="text-center"
                        css={{
                          '&:hover': {
                            color: '#08c',
                            i: {
                              transform: 'scale(1.2)',
                            },
                          },
                          'font-size': '1.5rem',
                        }}
                      >
                        <i className="fas fa-long-arrow-alt-left mr-3"></i>
                        {t('BACK_TO_HOME')}
                      </ALink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div className="loading-overlay">
          <div className="bounce-loader">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>
      )}
    </ExternalAccountLayout>
  );
}

AccountActivation.getLayout = page => {
  return <ExternalAccountLayout>{page}</ExternalAccountLayout>;
};
