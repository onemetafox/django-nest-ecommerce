// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'rc-tree/assets/index.css';
import 'react-input-range/lib/css/index.css';
import 'react-image-lightbox/style.css';
import 'react-toastify/dist/ReactToastify.min.css';

import StickyNavbar from './common/partials/sticky-navbar';
import Header from './common/header';
import Footer from './common/footer';
import MobileMenu from './common/partials/mobile-menu';
import QuickModal from '../components/features/modals/quickview';
import VideoModal from '../components/features/modals/video-modal';
import Cookie from 'js-cookie';

import { stickyInit, scrollTopHandlder, scrollTopInit } from '../utils';
import { useRouter } from 'next/router';

function Layout({ children }) {
  const router = useRouter();
  const store = useStore();
  const { promo } = store.getState().landing;

  const [promoData, setPromoData] = useState(null);
  const [showTopNotice, setShowTopNotice] = useState(
    !Cookie.get('closeTopNotice'),
  );

  useEffect(() => {
    if (promo) {
      setPromoData(promo);
    }
  }, [promo]);

  function closeTopNotice() {
    setShowTopNotice(false);
    Cookie.set('closeTopNotice', true, { expires: 7, path: router.basePath });
  }

  useEffect(() => {
    window.addEventListener('scroll', stickyInit, { passive: true });
    window.addEventListener('scroll', scrollTopInit, { passive: true });
    window.addEventListener('resize', stickyInit);

    return () => {
      window.removeEventListener('scroll', stickyInit, { passive: true });
      window.removeEventListener('scroll', scrollTopInit, { passive: true });
      window.removeEventListener('resize', stickyInit);
    };
  }, []);

  return (
    <>
      <div className="page-wrapper">
        {promoData && showTopNotice ? (
          <div className="top-notice bg-primary text-white">
            <div className="container text-center">
              <span
                className="mx-1 small"
                dangerouslySetInnerHTML={{ __html: promo.description }}
              ></span>
              <button
                title="Close (Esc)"
                type="button"
                onClick={closeTopNotice}
                className="mfp-close"
              >
                ×
              </button>
            </div>
          </div>
        ) : (
          ''
        )}

        <Header />

        {children}

        <Footer />

        <ToastContainer
          draggable={false}
          autoClose={3000}
          duration={300}
          className="toast-container"
          position="bottom-right"
          closeButton={false}
          hideProgressBar={true}
          newestOnTop={true}
        />

        <QuickModal />
        <VideoModal />

        <div className="wishlist-popup">
          <div className="wishlist-popup-msg">Product added!</div>
        </div>
      </div>

      <MobileMenu />
      <StickyNavbar />

      <a
        id="scroll-top"
        href="#"
        title="Top"
        role="button"
        className="btn-scroll"
        onClick={scrollTopHandlder}
      >
        <i className="icon-angle-up"></i>
      </a>
    </>
  );
}

export default Layout;
