import ExternalAccountLayout from '../../components/layouts/externalAccountLayout';

import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import ALink from '../../components/common/ALink';
import { poster } from '../../services/apiService';
import { useRouter } from 'next/router';

import { actions as UserActions } from '../../store/user';
import { useStore } from 'react-redux';

export default function ForgotPassword() {
  const router = useRouter();
  const store = useStore();

  const [submitted, setSubmitted] = useState(false);
  const [pswdError, setPswdError] = useState(false);
  const [data, setData] = useState('');
  const { t } = useTranslation('common');

  useEffect(() => {
    if (!router.query.token || !router.query.uid) {
      router.push('/');
    }
  }, [router.query]);

  function onSubmit(e) {
    e.preventDefault();

    if (!data) {
      return;
    }

    if (data.new_password !== data.re_new_password) {
      setPswdError(true);
      document.querySelectorAll('input[type=password]').forEach(input => {
        input.classList.add('is-invalid');
      });
      return;
    } else {
      document.querySelectorAll('input[type=password]').forEach(input => {
        input.classList.remove('is-invalid');
      });
      setPswdError(false);
    }

    poster('accounts/users/reset_password_confirm/', {
      ...data,
      ...router.query,
    })
      .then(response => {
        if (response.status !== 204) throw new Error();
        if (response.status === 204) {
          setSubmitted(true);
          store.dispatch(UserActions.removeUser());
        }
      })
      .catch(err => {
        if (err.response.data.token) router.push('/');
      });
  }

  // function login(e) {
  //   e.preventDefault();
  //   poster('accounts/jwt/create/', {
  //     username: data.email,
  //     password: data.password,
  //   }).then(response => {
  //     if (response.status === 200) {
  //       store.dispatch(UserActions.setUser(response.data));
  //       store.dispatch(UserActions.getUserProfile(response.data.access));
  //       router.push('/');
  //     }
  //   });
  // }

  return (
    <ExternalAccountLayout>
      <main className="main">
        <div className="page-header">
          <div className="container d-flex flex-column align-items-center">
            <img
              src="../../public/images/commons/key.png"
              alt={t('SET_NEW_PASSWORD')}
              title={t('SET_NEW_PASSWORD')}
            />
            <h1>{!submitted ? t('SET_NEW_PASSWORD') : t('PASSWORD_RESET')}</h1>
          </div>
        </div>

        <div className="container reset-password-container">
          <div className="row">
            {!submitted ? (
              <div className="col-lg-6 offset-lg-3">
                <div className="card p-5">
                  <div className="feature-box-content text-bold">
                    <form
                      className="mb-0 text-dark"
                      action="#"
                      onSubmit={onSubmit}
                    >
                      <p className="text-center">
                        {t('SET_NEW_PASSWORD_TEXT')}
                      </p>
                      <div className="form-group mb-2">
                        <label
                          htmlFor="password"
                          className="font-weight-normal"
                        >
                          {t('PASSWORD')}
                        </label>

                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          required
                          minLength={8}
                          onChange={e =>
                            setData({ ...data, new_password: e.target.value })
                          }
                        />
                        <div className="p-0">
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
                      <div className="form-group mb-2">
                        <label
                          htmlFor="re_password"
                          className="font-weight-normal"
                        >
                          {t('CONFIRM_PASSWORD')}
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          name="re_password"
                          required
                          minLength={8}
                          onChange={e =>
                            setData({
                              ...data,
                              re_new_password: e.target.value,
                            })
                          }
                        />
                        <div
                          id="pswd-error-confirm"
                          className={`${
                            pswdError ? 'd-block' : 'd-none'
                          } text-danger`}
                        >
                          {t('PASSWORD_NOT_MATCH')}
                        </div>
                      </div>

                      <div className="form-footer mb-2">
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
                            type="submit"
                            className="btn btn-dark btn-block btn-md"
                          >
                            {t('RESET_PASSWORD')}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <p className="text-center">
                    <ALink href="/">{t('BACK_TO_HOME')}</ALink>
                  </p>
                </div>
              </div>
            ) : (
              <div className="col-lg-6 offset-lg-3">
                <div className="card p-5 text-center">
                  <h6>{t('PASSWORD_RESET_TEXT')}</h6>
                  <div className="d-block mt-2">
                    <a
                      href="#"
                      className="btn btn-outline-dark btn-md"
                      onClick={e => {
                        router.push('/');
                      }}
                    >
                      {t('RESET_PASSWORD')}
                    </a>
                  </div>
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
            )}
          </div>
        </div>
      </main>
    </ExternalAccountLayout>
  );
}

ForgotPassword.getLayout = page => {
  return <ExternalAccountLayout>{page}</ExternalAccountLayout>;
};
