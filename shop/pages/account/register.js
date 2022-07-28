import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ALink from '../../components/common/ALink';
import LoginModal from '../../components/features/modals/login-modal';
import ShopBanner from '../../components/partials/shop/shop-banner';
import ExternalAccountLayout from '../../components/layouts/externalAccountLayout';
import { fetcher } from '../../services/apiService';

export default function Register() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [data, setData] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [pswdError, setPswdError] = useState(false);

  const onChange = (event, key) => {
    event.preventDefault();
    let errors = document.getElementsByClassName('.text-danger');
    if (errors.length > 0) {
      error.map(item => {
        item.remove();
      });
    }
    setData({ ...data, [key]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    if (
      !data ||
      !data.email ||
      !data.password ||
      !data.re_password ||
      !data.first_name
    )
      return;

    let newData = { ...data, username: data.email };
    if (data.password !== data.re_password) {
      setPswdError(true);
      return;
    } else {
      setPswdError(false);
    }

    fetcher({ method: 'POST', url: 'accounts/users/', data: newData })
      .then(response => {
        if (response) {
          setData(null);
          setPswdError(false);
          setEmailError(false);
          router.push(
            `/${t('ROUTE_PATH_ACCOUNT')}/${t('ROUTE_PATH_ACCOUNT_CREATED')}`,
          );
        }
      })
      .catch(error => {
        switch (
          Object.keys(typeof error.data === 'object' ? error.data : {})[0]
        ) {
          case 'username':
            setEmailError(true);
            break;
          case 'email':
            setEmailError(true);
            break;
          case 'password':
            setPswdError(true);
            if (error.response.data.password.length)
              if (
                error.response.data.password[0] ===
                'This password is too common.'
              ) {
                document.getElementById('pswd-error').textContent = t(
                  'PASSWORD_TOO_COMMON',
                );
              }
            if (
              error.response.data.password[1] ===
              'This password is entirely numeric.'
            ) {
              document.getElementById('pswd-error').textContent = t(
                'PASSWORD_TRY_DIFFERENT',
              );
              document.getElementById('pswd-error-confirm').textContent = '';
            }
            break;
          default:
            document.getElementById('register-submit').textContent =
              t('REGISTER_ERROR');
        }
      });
  };

  return (
    <ExternalAccountLayout>
      <main className="main">
        <div>
          <div className="page-header">
            <div className="container d-flex flex-column align-items-center">
              <h1>{t('REGISTER')}</h1>
            </div>
          </div>
          <section className="vh-100 bg-image register-page">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div className="card">
                      <div className="card-body p-5">
                        <h2 className="text-center mb-5">
                          {t('REGISTER_PAGE_TITLE')}
                        </h2>

                        <form onSubmit={onSubmit}>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="register-name"
                              className="form-control form-control-lg"
                              required
                              onChange={e => onChange(e, 'first_name')}
                              name="first_name"
                            />
                            <label
                              className="form-label"
                              htmlFor="register-name"
                            >
                              {t('NAME')}
                            </label>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              type="email"
                              id="register-email"
                              className="form-control form-control-lg"
                              required
                              onChange={e => onChange(e, 'email')}
                              name="email"
                              autoComplete="on"
                            />
                            <label
                              className="form-label"
                              htmlFor="register-email"
                            >
                              Email
                            </label>
                            <div
                              id="email-error"
                              className={`${
                                emailError ? 'd-block' : 'd-none'
                              } text-danger`}
                            >
                              {t('REGISTER_EMAIL_ERROR')}{' '}
                              <ALink
                                href={`${t('ROUTE_PATH_ACCOUNT')}/${t(
                                  'ROUTE_PATH_FORGOT_PASSWORD',
                                )}`}
                              />
                            </div>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="register-password"
                              required
                              className={`form-control form-control-lg ${
                                pswdError ? 'border-danger' : ''
                              }`}
                              name="password"
                              autoComplete="on"
                              onChange={e => onChange(e, 'password')}
                              onKeyUp={e => setPswdError(false)}
                            />
                            <label
                              className="form-label"
                              htmlFor="register-password"
                            >
                              {t('PASSWORD')}{' '}
                              <span className="required">*</span>
                            </label>
                            <div className="info-box p-0">
                              <i className="icon-info mr-1"></i>
                              {t('PASSWORD_MIN_REQUIREMENTS')}
                            </div>
                            <div
                              id="pswd-error"
                              className={`${
                                pswdError ? 'd-block' : 'd-none'
                              } text-danger`}
                            >
                              {t('PASSWORD_NOT_MATCH')}
                            </div>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="register-password-confirm"
                              className={`form-control form-control-lg ${
                                pswdError ? 'border-danger' : ''
                              }`}
                              required
                              minLength={8}
                              onChange={e => onChange(e, 're_password')}
                              onKeyUp={e => setPswdError(false)}
                            />
                            <label
                              className="form-label"
                              htmlFor="register-password-confirm"
                            >
                              {t('CONFIRM_PASSWORD')}{' '}
                              <span className="required">*</span>
                            </label>
                            <div
                              id="pswd-error-confirm"
                              className={`${
                                pswdError ? 'd-block' : 'd-none'
                              } text-danger`}
                            >
                              {t('PASSWORD_NOT_MATCH')}
                            </div>
                          </div>

                          <div className="form-check d-flex justify-content-center mb-5">
                            <input
                              className="form-input mx-2"
                              type="checkbox"
                              value=""
                              required
                              aria-required="true"
                              id="form2Example3cg"
                              minLength={8}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="form2Example3cg"
                            >
                              {t('REGISTER_TERMS_CONDITIONS')}{' '}
                              <ALink
                                href={`/${t(
                                  'ROUTE_PAHT_TERMS_AND_CONDITIONS',
                                )}`}
                                className="text-body"
                              >
                                <u>{t('TERMS_OF_SERVICE')}</u>
                              </ALink>
                            </label>
                          </div>

                          <div className="d-flex justify-content-center">
                            <button
                              type="submit"
                              className="btn btn-dark btn-md w-100 mr-0"
                              id="register-submit"
                            >
                              {t('REGISTER')}
                            </button>
                          </div>

                          <p className="text-center text-muted mt-5 mb-0 login-modal">
                            {t('ALREADY_HAVE_ACCOUNT')} <LoginModal />
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <ShopBanner />
      </main>
    </ExternalAccountLayout>
  );
}

Register.getLayout = page => {
  return <ExternalAccountLayout>{page}</ExternalAccountLayout>;
};
