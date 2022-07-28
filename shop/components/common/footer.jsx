import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import ALink from './ALink';

function Footer() {
  const { t } = useTranslation('common');
  return (
    <footer className="footer bg-dark">
      <div className="footer-middle">
        <div className="container">
          <div
            css={{
              position: 'absolute',
              padding: '1rem',
              left: '1.5rem',
              top: '-8.2rem',
              color: '#fff',
              fontSize: '2.1rem',
              minWidth: '13rem',
              fontFamily: "'Shadows Into Light', cursive",
              lineHeight: 1,
              letteSpacing: '.01em',
              backgroundColor: '#336188',
              textAlign: 'center',
              zIndex: 10,

              '&::before': {
                display: 'block',
                position: 'absolute',
                top: 0,
                left: '-1.5rem',
                width: 0,
                height: 0,
                content: '""',
                borderRight: '15px solid #079',
                borderTop: '17px solid transparent',
              },
            }}
          >
            {t('MORE_ABOUT_US')}
          </div>
          <div
            className="row"
            css={{
              display: 'flex',
              flexWrap: 'wrap',
              marginRight: '-15px',
              marginLeft: '-15px',
            }}
          >
            <div className="col-lg-4 col-sm-6">
              <div className="widget">
                {/* <h4 className="widget-title">Contact Info</h4> */}
                <ul className="contact-info">
                  <li
                    css={{
                      position: 'relative',
                      lineHeight: 1.4,
                      marginBottom: '0.9rem',
                    }}
                  >
                    <span
                      css={{
                        display: 'block',
                        fontWeight: 400,
                        fontSize: '1.3rem',
                        fontFamily: "'Oswald',sans-serif",
                        color: '#fff',
                        textTransform: 'uppercase',
                        marginBottom: '0.3rem',
                        letterSpacing: '.02em',
                      }}
                    >
                      {t('DIRECTION')}:
                    </span>
                    PI IZNAMONTES, C/ DEIFONTES, PLOTS 32, 33 and 34, GRANADA,{' '}
                    {t('SPAIN')}
                  </li>
                  <li
                    css={{
                      position: 'relative',
                      lineHeight: 1.4,
                      marginBottom: '0.9rem',
                    }}
                  >
                    <span
                      css={{
                        display: 'block',
                        fontWeight: 400,
                        fontSize: '1.3rem',
                        fontFamily: "'Oswald',sans-serif",
                        color: '#fff',
                        textTransform: 'uppercase',
                        marginBottom: '0.3rem',
                        letterSpacing: '.02em',
                      }}
                    >
                      {t('TELEPHONE')}:
                    </span>
                    <ALink href="tel:">(+34) 958 10 63 22</ALink>
                  </li>
                  <li
                    css={{
                      position: 'relative',
                      lineHeight: 1.4,
                      marginBottom: '0.9rem',
                    }}
                  >
                    <span
                      css={{
                        display: 'block',
                        fontWeight: 400,
                        fontSize: '1.3rem',
                        fontFamily: "'Oswald',sans-serif",
                        color: '#fff',
                        textTransform: 'uppercase',
                        marginBottom: '0.3rem',
                        letterSpacing: '.02em',
                      }}
                    >
                      Email:
                    </span>
                    <ALink href="mailto:publiexpe@publiexpe.com">
                      publiexpe@publiexpe.com
                    </ALink>
                  </li>
                </ul>
                <div className="social-icons">
                  <ALink
                    href="#"
                    className="social-icon social-facebook icon-facebook"
                    title="Facebook"
                  ></ALink>
                  <ALink
                    href="#"
                    className="social-icon social-twitter icon-twitter"
                    title="Twitter"
                  ></ALink>
                  <ALink
                    href="#"
                    className="social-icon social-instagram icon-instagram"
                    title="Instagram"
                  ></ALink>
                </div>
              </div>
            </div>

            <div className="col-sm-1" />
            <div className="col-lg-3 col-sm-5">
              <div
                css={{
                  flex: '0 0 50%!important',
                  maxWidth: '33.333333%',
                  alignItems: 'center',
                  justifyContent: 'center!important',
                  '(max-width: 575px)': {
                    alignItems: 'flex-start',
                  },
                }}
              >
                {/* <h4 className="widget-title">Customer Service</h4> */}

                <ul className="links">
                  <li>
                    <ALink href="#">{t('MY_ACCOUNT')}</ALink>
                  </li>
                  <li>
                    <ALink href="#">{t('CONTACT')}</ALink>
                  </li>
                  <li>
                    <ALink href="#">{t('MY_LIST')}</ALink>
                  </li>
                  <li>
                    <ALink href="#">{t('PRIVACY_POLICY')}</ALink>
                  </li>
                  <li>
                    <ALink href="#">{t('RETURN_POLICY')}</ALink>
                  </li>
                  <li>
                    <ALink href="/pages/account">{t('LEGAL_WARNING')}</ALink>
                  </li>
                  <li>
                    <ALink href="#">{t('LOG_IN')}</ALink>
                  </li>
                  {/* <li><ALink href="/pages/about-us">About Us</ALink></li>
                                    <li><ALink href="#">Corporate Sales</ALink></li>
                                    <li><ALink href="#">Privacy</ALink></li> */}
                </ul>
              </div>
            </div>

            {/* <div className="col-lg-3 col-sm-6">
                            <div className="widget">
                                <h4 className="widget-title">Popular Tags</h4>

                                <div className="tagcloud">
                                    <ALink href={ { pathname: "/shop", query: { tag: "bag" } } } scroll={ false }>Bag</ALink>
                                    <ALink href={ { pathname: "/shop", query: { tag: "black" } } } scroll={ false }>Black</ALink>
                                    <ALink href={ { pathname: "/shop", query: { tag: "blue" } } } scroll={ false }>Blue</ALink>
                                    <ALink href={ { pathname: "/shop", query: { tag: "clothes" } } } scroll={ false }>Clothes</ALink>
                                    <ALink href={ { pathname: "/shop", query: { tag: "fashion" } } } scroll={ false }>Fashion</ALink>
                                    <ALink href={ { pathname: "/shop", query: { tag: "hub" } } } scroll={ false }>Hub</ALink>
                                    <ALink href={ { pathname: "/shop", query: { tag: "shirt" } } } scroll={ false }>Shirt</ALink>
                                    <ALink href={ { pathname: "/shop", query: { tag: "shoes" } } } scroll={ false }>Shoes</ALink>
                                    <ALink href={ { pathname: "/shop", query: { tag: "skirt" } } } scroll={ false }>Skirt</ALink>
                                    <ALink href={ { pathname: "/shop", query: { tag: "sports" } } } scroll={ false }>Sports</ALink>
                                    <ALink href={ { pathname: "/shop", query: { tag: "sweater" } } } scroll={ false }>Sweater</ALink>
                                </div>
                            </div>
                        </div> */}

            <div className="col-lg-4 col-sm-6">
              <div
                css={{
                  marginBottom: '3.9rem',
                  width: '391.188px',
                }}
              >
                <h4
                  css={{
                    color: '#fff',
                    font: " 400 1.6rem/1.1 'Oswald', sans-serif",
                    letterSpacing: 0,
                    textTransform: 'uppercase',
                    marginBottom: '2.4rem',
                  }}
                >
                  {t('SUBSCRIBE_TO_THE_NEWSLETTER')}
                </h4>
                <p
                  css={{
                    marginTop: '-0.4rem',
                    marginBottom: '3.5rem',
                    lineHeight: 1.67,
                    maxWidth: '290px',
                  }}
                >
                  {t('SUBSCRIBE_TO_THE_NEWSLETTER_BANNER')}
                </p>
                <form
                  action="#"
                  css={{ position: 'relative', maxWidth: '750px' }}
                >
                  <input
                    type="email"
                    css={{
                      height: '4.2rem',
                      fontWeight: 400,
                      fontSize: '1.3rem',
                      lineHeight: 1,
                      color: '#6b7074',
                      border: '1px solid #ffffff',
                      backgroundColor: '#ffffff',
                      padding: '1.1rem 12.4rem 1.1rem 1.6rem',
                      marginBottom: '1rem',
                      borderRadius: 0,
                      display: 'block',
                      width: '100%',
                      overflow: 'visible',
                      backgroundClip: 'padding-box',
                    }}
                    placeholder={t('SMALL_EMAIL_ADDRESS')}
                    required
                  />

                  <input
                    type="submit"
                    // className="btn btn-primary shadow-none"
                    css={{
                      cursor: 'pointer',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      display: 'inline-block',
                      fontWeight: 600,
                      fontSize: '1.2rem',
                      lineHeight: 1,
                      fontFamily: "'Open Sans',sans-serif",
                      letterSpacing: 0,
                      color: '#fff',
                      borderColor: '#393939',
                      backgroundColor: '#393939',
                      textTransform: 'uppercase',
                      borderRadius: 0,
                      padding: '1.4rem 1.5rem',
                      minWidth: '102px',
                      textAlign: 'center',
                      userSelect: 'none',
                      border: '1px solid transparent',
                    }}
                    value={t('SUBSCRIBE')}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className="footer-bottom"
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '3rem',
            paddingBottom: '5.2rem',
            borderTop: '1px solid #353a3e',
          }}
        >
          <div className="container d-sm-flex align-items-center">
            <div className="footer-left">
              <span className="footer-copyright">
                {t('ALL_RIGHTS_RESERVED')} ©{' '}
                {new Date().toLocaleDateString('es-Es', {
                  year: 'numeric',
                })}{' '}
                Publiexpe | {t('DEVELOPED_BY')}
              </span>
            </div>

            {/* <div className="footer-right ml-auto mt-1 mt-sm-0">
              <div className="payment-icons">
                <span
                  className="payment-icon visa"
                  style={{
                    backgroundImage: "url(images/payments/payment-visa.svg)",
                  }}
                ></span>
                <span
                  className="payment-icon paypal"
                  style={{
                    backgroundImage: "url(images/payments/payment-paypal.svg)",
                  }}
                ></span>
                <span
                  className="payment-icon stripe"
                  style={{
                    backgroundImage: "url(images/payments/payment-stripe.png)",
                  }}
                ></span>
                <span
                  className="payment-icon verisign"
                  style={{
                    backgroundImage:
                      "url(images/payments/payment-verisign.svg)",
                  }}
                ></span>
              </div>
            </div> */}
            <a
              href="#"
              data-toggle="modal"
              data-target="#modalComercial"
              css={{
                position: 'fixed',
                width: '60px',
                height: '60px',
                bottom: '40px',
                right: '40px',
                backgroundColor: '#00A3F5',
                color: '#FFF',
                borderRadius: '50px',
                textAlign: 'center',
                boxShadow: '2px 2px 2px #999',
                zIndex: 1000,
              }}
            >
              <svg
                // className="svg-inline--fa fa-phone fa-w-16 fa-2x my-float"
                css={{
                  overflow: 'visible',
                  width: '1em',
                  marginTop: '15px',
                  fontSize: '2em',
                  display: 'inline-block',
                  height: '1em',
                  verticalAlign: '-0.125em',
                }}
                aria-hidden="true"
                focusable="false"
                data-prefix="fa"
                data-icon="phone"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
