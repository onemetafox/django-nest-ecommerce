import useTranslation from 'next-translate/useTranslation';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

// Import Custom Component
import ALink from './ALink';
import MainMenu from './partials/main-menu';
import LoginModal from '../features/modals/login-modal';
import HeaderMiddle from './partials/header-middle';

// Import actions
import { actions as userActions } from '../../store/user';

import languages from '../../services/constant/languages.json';
import { useStore } from 'react-redux';

export default function Header(props) {
  const { adClass = '', welcomeMessage = '' } = props;
  const { t } = useTranslation('common');
  const store = useStore();
  const { locales, defaultLocale } = useRouter();

  const { locale } = store.getState().user;

  const navLinkList = {
    ['/my-account']: {
      href: t('ROUTE_PATH_MY_ACCOUNT'),
      text: t('MY_ACCOUNT'),
    },
    ['/wishlist']: { href: t('ROUTE_PATH_WISHLIST'), text: t('WISHLIST') },
    ['/blog']: { href: t('ROUTE_PATH_BLOG'), text: t('BLOG') },
    ['/about-us']: { href: t('ROUTE_PATH_ABOUT_US'), text: t('ABOUT_US') },
    ['/contact-us']: {
      href: t('ROUTE_PATH_CONTACT_US'),
      text: t('CONTACT_US'),
    },
  };

  function changeLanguage(e, lang) {
    e.preventDefault();
    store.dispatch(userActions.setLocale(lang));
    window.location.reload();
  }

  return (
    <header className={`header ${adClass}`}>
      <div className="header-top">
        <div className="container">
          <div className="header-left d-none d-sm-block">
            <p className="top-message text-uppercase">
              {welcomeMessage || t('WELCOME_TO_PUBLIEXPE')}
            </p>
          </div>

          <div className="header-right header-dropdowns ml-0 ml-sm-auto w-sm-100">
            <div className="header-dropdown dropdown-expanded d-none d-lg-block">
              <ALink href="#">Links</ALink>
              <div className="header-menu">
                <ul>
                  {Object.entries(navLinkList).map(([key, value]) => (
                    <Fragment key={key}>
                      <li>
                        <ALink href={value.href}>{value.text}</ALink>
                      </li>
                    </Fragment>
                  ))}

                  <LoginModal />
                </ul>
              </div>
            </div>

            <span className="separator"></span>

            <div className="header-dropdown">
              {/* TODO: When _persist_gate is removed and new storage is done*/}
              {locale ? (
                <a>
                  <i
                    className={`flag-${
                      locale === 'en' ? 'england' : locale
                    } flag mr-2`}
                  ></i>
                </a>
              ) : (
                <a>
                  <i
                    className={`flag-${
                      defaultLocale === 'en' ? 'england' : defaultLocale
                    } flag mr-2`}
                  ></i>
                </a>
              )}
              {/* FLAGS */}
              <div className="header-menu">
                <ul>
                  <li>
                    {locales.map((locale, index) => (
                      <a
                        href={locale}
                        key={locale + '_' + index}
                        onClick={e => changeLanguage(e, locale)}
                      >
                        <i
                          className={`flag-${
                            locale === 'en' ? 'england' : locale
                          } flag mr-2`}
                        ></i>
                        {t(languages[locale]?.toUpperCase())}
                      </a>
                    ))}
                  </li>
                </ul>
              </div>
            </div>

            <span className="separator"></span>

            {/* TODO: get them from the backend */}
            <div className="social-icons">
              <ALink
                href="#"
                className="social-icon social-facebook icon-facebook"
              ></ALink>
              <ALink
                href="#"
                className="social-icon social-twitter icon-twitter"
              ></ALink>
              <ALink
                href="#"
                className="social-icon social-instagram icon-instagram"
              ></ALink>
            </div>
          </div>
        </div>
      </div>

      <HeaderMiddle />

      <div className="header-bottom sticky-header desktop-sticky d-none d-lg-block">
        <div className="container">
          <MainMenu />
        </div>
      </div>
    </header>
  );
}
