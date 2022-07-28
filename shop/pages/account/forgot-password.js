import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import ALink from '../../components/common/ALink';
import { poster } from '../../services/apiService';
import ExternalAccountLayout from '../../components/layouts/externalAccountLayout';

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const { t } = useTranslation('common');

  function onSubmit(e) {
    e.preventDefault();

    if (!email) {
      document.getElementById('reset-email').value = '';
      document.getElementById('reset-email').focus();
      return;
    }

    poster('accounts/users/reset_password/', { email }).then(response => {
      console.log(response);
      if (response.status === 204) {
        let resend = document.getElementById('resend-email');
        resend && submitted ? resend.remove() : null;
        setSubmitted(true);
      }
    });
  }

  return (
    <main className="main">
      <div className="page-header">
        <div className="container d-flex flex-column align-items-center">
          <img
            src="../../public/images/commons/mail.svg"
            alt={t('PASSWORD_HELP')}
            title={t('PASSWORD_HELP')}
          />
          <h1>{!submitted ? t('PASSWORD_HELP') : t('EMAIL_SENT')}</h1>
        </div>
      </div>

      <div className="container reset-password-container">
        <div className="row">
          {!submitted ? (
            <div className="col-lg-6 offset-lg-3">
              <div className="card p-5">
                <div className="feature-box-content text-bold">
                  <form className="mb-0" action="#">
                    <p>{t('PASSWORD_HELP_TEXT')}</p>
                    <div className="form-group mb-0">
                      <label
                        htmlFor="reset-email"
                        className="font-weight-normal"
                      >
                        {t('USERNAME_EMAIL_ADDRESS')}
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="reset-email"
                        name="reset-email"
                        required
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-footer mb-0">
                      <div
                        className="text-center"
                        css={{
                          width: '100%',
                          '& button': {
                            width: '100% !important',
                          },
                        }}
                      >
                        <button
                          onClick={onSubmit}
                          className="btn btn-dark btn-block btn-md"
                        >
                          {t('RESET_PASSWORD')}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-lg-6 offset-lg-3">
              <div className="card p-5 text-center">
                <h6>
                  {t('EMAIL_SENT_TEXT')}{' '}
                  <p className="p-2 font-weight-bold">{email}</p>
                </h6>
                <div className="d-block">
                  <ALink href="/" className="btn btn-outline-dark btn-md">
                    {t('BACK_TO_HOME')}
                  </ALink>
                </div>
                <div className="d-block mt-5" id="resend-email">
                  {t('EMAIL_SENT_DID_NOT_RECEIVE')}{' '}
                  <a
                    href="#"
                    className="text-dark font-weight-bold"
                    onClick={e => {
                      onSubmit(e);
                    }}
                  >
                    {t('CLICK_TO_RESEND')}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

ForgotPassword.getLayout = page => {
  return <ExternalAccountLayout>{page}</ExternalAccountLayout>;
};
