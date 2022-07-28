import React, { useEffect, useRef, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Modal from 'react-modal';
import { connect, useStore } from 'react-redux';

import { useRouter } from 'next/router';
import { poster } from '../../../services/apiService';
import { actions as UserActions } from '../../../store/user';

// Import Custom Component
import ALink from '../../common/ALink';

const customStyles = {
  content: {
    position: 'relative',
    maxWidth: '525px',
    marginLeft: '1rem',
    marginRight: '1rem',
    outline: 'none',
    backgroundColor: '#fff',
  },
};

function LoginModal(props) {
  const store = useStore();
  const router = useRouter();

  const errorDiv = useRef(null);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { t } = useTranslation('common');

  function closeModal(e) {
    if (!document.querySelector('.open-modal')) return;
    e.preventDefault();
    document.querySelector('.open-modal').classList.add('close-modal');

    if (e.currentTarget.classList.contains('btn-regist')) {
      router.push(`/${t('ROUTE_PATH_ACCOUNT')}/${t('ROUTE_PATH_REGISTER')}`);
      setOpen(false);
    }

    setTimeout(() => {
      setOpen(false);
    }, 350);
  }

  useEffect(() => {
    router.events.on('routeChangeStart', () => setOpen(false));
  }, [router.events]);

  function openModal(e) {
    e.preventDefault();
    setOpen(true);
  }

  function onSubmit(e) {
    e.preventDefault();
    poster('accounts/jwt/create/', user)
      .then(response => {
        if (response.data) {
          store.dispatch(UserActions.setToken(response.data));
          store.dispatch(UserActions.getUserProfile(response.data.access));
          setOpen(false);
        }
      })
      .catch(error => {
        if (error) {
          let msg = '';
          switch (Object.keys(error.response.data)[0]) {
            case 'password':
              msg = t('PASSWORD_ERROR');
              break;
            case 'detail':
              msg = t('ACCOUNT_ERROR');
              document.getElementById('register-btn').classList.add('shake');
              break;
          }

          errorDiv.current.textContent = msg;
        }
      });
  }

  return (
    <li>
      <a
        href="#"
        css={{
          'header ul &': {
            color: '#ddd',
            transition: '.3s ease-in',
            textDecorationLine: 'underline',
            textDecorationColor: 'transparent',

            '&:hover, &:focus, &:active': {
              color: '#fff',
              textDecorationColor: 'currentcolor',
            },
          },
        }}
        className="login-link"
        onClick={openModal}
      >
        {t('LOG_IN')}
      </a>

      {open ? (
        <Modal
          isOpen={open}
          style={customStyles}
          contentLabel="login Modal"
          className="login-popup"
          overlayClassName="ajax-overlay open-modal"
          shouldReturnFocusAfterClose={false}
          onRequestClose={closeModal}
          closeTimeoutMS={10}
        >
          <div className="modal-wrapper">
            <div className="container">
              <h2 className="title">{t('LOGIN')}</h2>

              <form action="#" className="mb-0">
                <label htmlFor="login-email">
                  {t('USERNAME_EMAIL_ADDRESS')}
                  <span className="required"> *</span>
                </label>
                <input
                  type="email"
                  className="form-input form-wide mb-2"
                  id="login-email"
                  name="email"
                  autoComplete="username email"
                  required
                  onChange={e => {
                    setUser({
                      ...user,
                      username: e.target.value,
                    });
                    errorDiv.current.textContent = '';
                  }}
                />

                <label htmlFor="login-password">
                  {t('PASSWORD')}
                  <span className="required"> *</span>
                </label>

                <input
                  type="password"
                  className="form-input form-wide mb-2"
                  id="login-password"
                  required
                  name="password"
                  autoComplete="current-password"
                  onChange={e => {
                    setUser({
                      ...user,
                      password: e.target.value,
                    });
                    errorDiv.current.textContent = '';
                  }}
                />

                <div className="form-footer">
                  <div className="custom-control custom-checkbox ml-0">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="remember-me"
                      autoComplete="rememberme"
                    />
                    <label
                      className="custom-control-label form-footer-right"
                      htmlFor="remember-me"
                      css={{ 'padding-left': '2.5rem !important' }}
                    >
                      {t('REMEMBER_ME')}
                    </label>
                  </div>
                  <div className="form-footer-right">
                    <ALink
                      href={`/${t('ROUTE_PATH_ACCOUNT')}/${t(
                        'ROUTE_PATH_FORGOT_PASSWORD',
                      )}`}
                      className="forget-password text-dark"
                    >
                      {t('FORGOT_PASSWORD')}
                    </ALink>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-dark btn-block btn-md"
                    onClick={onSubmit}
                  >
                    {t('LOGIN')}
                  </button>

                  <a
                    href="#"
                    className="btn btn-regist text-dark bg-transparent text-transform-none p-0"
                    onClick={closeModal}
                    id="register-btn"
                  >
                    {t('REGISTER')}
                  </a>
                </div>
              </form>
              <div
                className="text-danger text-center mt-3"
                ref={errorDiv}
              ></div>
            </div>

            <button
              title={t('CLOSE')}
              type="button"
              className="mfp-close"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </Modal>
      ) : (
        ''
      )}
    </li>
  );
}

export default connect(null, UserActions)(LoginModal);
