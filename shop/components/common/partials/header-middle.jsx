import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import ALink from '../ALink';
import SearchForm from './search-form';
import CartMenu from '../partials/cart-menu';

export default function HeaderMiddle() {
  const { t } = useTranslation('common');
  const store = useStore();
  const [webDetails, setWebDetails] = useState(null);

  useEffect(() => {
    if (!webDetails) {
      setWebDetails(store.getState().landing?.webCommons?.web_config ?? null);
    }
  }, []);

  function openMobileMenu(e) {
    e.preventDefault();
    document.querySelector('body').classList.toggle('mmenu-active');
    e.currentTarget.classList.toggle('active');
  }

  return (
    <div className="header-middle sticky-header mobile-sticky">
      <div className="container">
        <div className="header-left col-lg-2 w-auto pl-0">
          <button
            className="mobile-menu-toggler"
            type="button"
            onClick={openMobileMenu}
          >
            <i className="fa fa-bars"></i>
          </button>

          <a href="/" className="logo">
            <img src={'/images/logo.png'} alt="PUBLIEXPE Logo" />
          </a>
        </div>

        <div className="header-right w-lg-max">
          <SearchForm />

          <div className="header-contact d-none d-lg-flex pl-4 pr-4">
            <a
              css={{ color: '#fff', '&:hover, &:focus': { color: '#bbb' } }}
              href="tel:+34958106322"
            >
              <img
                alt="phone"
                src="/images/phone.png"
                width="30"
                height="30"
                className="pb-1"
              />
            </a>
            <h6>
              <span css={{ color: '#fff' }}>{t('CALL_US')}</span>
              <a
                css={{ color: '#fff', '&:hover, &:focus': { color: '#bbb' } }}
                href={`tel:+34${
                  webDetails ? webDetails.phone_number : '958 10 63 22'
                }`}
              >
                {webDetails ? webDetails.phone_number : '958 10 63 22'}
              </a>
            </h6>
          </div>

          <ALink href="/pages/login" className="header-icon" title="login">
            <i className="icon-user-2"></i>
          </ALink>

          <ALink
            href="/pages/wishlist"
            className="header-icon"
            title="wishlist"
          >
            <i className="icon-wishlist-2"></i>
          </ALink>

          <CartMenu />
        </div>
      </div>
    </div>
  );
}
