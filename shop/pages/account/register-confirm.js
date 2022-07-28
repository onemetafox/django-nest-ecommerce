import ExternalAccountLayout from '../../components/layouts/externalAccountLayout';
import useTranslation from 'next-translate/useTranslation';
import ALink from '../../components/common/ALink';
import { useRouter } from 'next/router';

export default function RegisterConfirm() {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <ExternalAccountLayout>
      <main className="main">
        <div className="page-header">
          <div className="container d-flex flex-column align-items-center">
            <img
              src="../../public/images/commons/key.png"
              alt={t('REGISTER')}
              title={t('REGISTER')}
            />
            <h1>{t('ACCOUNT_CREATED')}</h1>
          </div>
        </div>

        <div className="container reset-password-container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="card p-5 text-center">
                <h6>{t('ACCOUNT_CREATED_TEXT')}</h6>
                <div className="d-block mt-2">
                  <ALink href="/" className="btn btn-outline-dark btn-md">
                    {t('RESET_PASSWORD')}
                  </ALink>
                </div>
                <div className="d-flex mt-3 justify-content-around">
                  <a
                    href="https://mail.google.com/mail/u/0/"
                    className="text-center d-flex align-items-center"
                    rel="noopener noreferrer"
                    target="_blank"
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
                    <img
                      src="../../public/images/commons/gmail.png"
                      alt=""
                      className="img-thumbnail mr-2"
                    />
                    {t('OPEN_GMAIL')}
                  </a>
                  <a
                    href="https://outlook.live.com/mail/0/inbox"
                    className="text-center d-flex align-items-center"
                    rel="noopener noreferrer"
                    target="_blank"
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
                    <img
                      src="../../public/images/commons/outlook.png"
                      alt=""
                      className="img-thumbnail mr-2"
                    />
                    {t('OPEN_OUTLOOK')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ExternalAccountLayout>
  );
}

RegisterConfirm.getLayout = page => {
  return <ExternalAccountLayout>{page}</ExternalAccountLayout>;
};
