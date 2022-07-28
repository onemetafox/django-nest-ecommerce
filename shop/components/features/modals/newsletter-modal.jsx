import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Cookie from 'js-cookie';

const modalStyles = {
  content: {
    backgroundColor: '#fff',
    backgroundImage: 'url(images/newsletter_popup_bg.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    top: 'auto',
    outline: 'none',
    width: '100%',
    marginLeft: '1rem',
    marginRight: '1rem',
  },
};

Modal.setAppElement('#__next');

export default function NewsletterModal() {
  const router = useRouter();
  const [modalIsOpen, setOpenNewsletter] = useState(false);
  const [doNotShow, setDoNotShow] = useState(false);

  useEffect(() => {
    let timer;
    Cookie.get('hideNewsletter') ||
      (timer = setTimeout(() => {
        setOpenNewsletter(true);
      }, 5000));

    return () => {
      timer && clearTimeout(timer);
    };
  }, []);

  function closeModal() {
    if (!document.querySelector('.mfp-newsletter.open-modal')) return;
    document
      .querySelector('.mfp-newsletter.open-modal')
      .classList.add('close-modal');

    setTimeout(() => {
      setOpenNewsletter(false);

      doNotShow &&
        Cookie.set('hideNewsletter', 'true', {
          expires: 7,
          path: router.basePath,
        });
    }, 350);
  }

  function handleChange(event) {
    setDoNotShow(event.target.checked);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      style={modalStyles}
      onRequestClose={closeModal}
      shouldReturnFocusAfterClose={false}
      className="newsletter-popup bg-img"
      overlayClassName="mfp-bg mfp-newsletter d-flex align-items-center justify-content-center open-modal"
    >
      <div className="newsletter-popup-content">
        <img
          src="images/logo.png"
          alt="Logo"
          className="logo-newsletter"
          width="202"
          height="80"
        />
        <h2>Subscribe to newsletter</h2>

        <p>
          Subscribe to the Porto mailing list to receive updates on new
          arrivals, special offers and our promotions.
        </p>

        <form action="#">
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              id="newsletter-email"
              name="newsletter-email"
              placeholder="Your email address"
              required
            />
            <input type="submit" className="btn btn-primary" value="Submit" />
          </div>
        </form>
        <div className="newsletter-subscribe">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              value={doNotShow}
              id="show-again"
              onChange={handleChange}
            />
            <label htmlFor="show-again" className="custom-control-label">
              Don't show this popup again
            </label>
          </div>
        </div>
      </div>

      <button
        title="Close (Esc)"
        type="button"
        className="mfp-close"
        onClick={closeModal}
      >
        ×
      </button>
    </Modal>
  );
}
