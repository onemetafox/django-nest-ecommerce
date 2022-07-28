import useTranslation from 'next-translate/useTranslation';
import { Fragment } from 'react';

import LoginModal from '../features/modals/login-modal';
import ALink from './ALink';
import { TopHeaderLink } from './top-header-link';

const separator = (
  <span
    css={{
      backgroundColor: '#fff',
    }}
    className="separator"
  />
);

export function HeaderTop() {
  const { t } = useTranslation('common');

  const navLinkList = {
    ['/my-account']: t('MY_ACCOUNT'),
    ['/my-list']: t('MY_LIST'),
    ['/blog']: t('BLOG'),
    ['/about-us']: t('ABOUT_US'),
    ['/contact']: t('CONTACT'),
  };

  return (
    <div
      css={{
        fontSize: '1.1rem',
        lineHeight: '1.5',
        letterSpacing: '.025rem',
        color: '#fff',
        borderBottom: '2px solid #e7e7e7',
        paddingTop: '0.4rem',
        paddingBottom: '0.4rem',
      }}
    >
      <div className="container">
        <div
          css={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        />
        <div className="header-right header-dropdowns ml-0 ml-sm-auto w-sm-100">
          <div className="header-dropdown dropdown-expanded d-none d-lg-block">
            <div
              css={{
                color: '#fff',
                textTransform: 'uppercase',
              }}
              className="header-menu"
            >
              <ul>
                <li>
                  <p>{t('WELCOME_TO_PUBLIEXPE')}</p>
                </li>
                {separator}

                {Object.entries(navLinkList).map(([key, value]) => (
                  <Fragment key={key}>
                    <li>
                      <TopHeaderLink href={key}>{value}</TopHeaderLink>
                    </li>
                    {separator}
                  </Fragment>
                ))}

                <LoginModal />
              </ul>
            </div>
          </div>

          <span
            css={{
              backgroundColor: '#fff',
            }}
            className="separator"
          ></span>

          <div
            css={{
              color: '#fff',
            }}
            className="header-dropdown"
          >
            <ALink
              href={`/${process.env.NEXT_PUBLIC_SERVER_URL}/en`}
              css={{
                'header &': {
                  color: '#ccc',

                  '&:hover, &:focus, &:active': {
                    color: '#fff',
                  },
                },
              }}
            >
              <span className="fi fi-us mr-3"></span> ENG
            </ALink>
            <div className="header-menu">
              <ul>
                <li>
                  <ALink href={`/${process.env.NEXT_PUBLIC_SERVER_URL}/es`}>
                    <span className="fi fi-es mr-2"></span> {t('SPA')}
                  </ALink>
                </li>
                <li>
                  <ALink href={`/${process.env.NEXT_PUBLIC_SERVER_URL}/en`}>
                    <span className="fi fi-england mr-2"></span> ENG
                  </ALink>
                </li>
                <li>
                  <ALink href={`/${process.env.NEXT_PUBLIC_SERVER_URL}/fr`}>
                    <span className="fi fi-fr mr-2"></span> FRA
                  </ALink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
