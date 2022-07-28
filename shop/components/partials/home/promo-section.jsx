import React, { useEffect } from 'react';
import Reveal from 'react-awesome-reveal';

// Import Custom Component
import ALink from '../../common/ALink';

// Import Utils
import { setParallax } from '../../../utils/index';
import {
  fadeIn,
  fadeInRightShorter,
  fadeInLeftShorter,
} from '../../../utils/data/keyframes';

function PromoSection() {
  useEffect(() => {
    window.addEventListener('scroll', setParallax);

    return () => {
      window.removeEventListener('scroll', setParallax);
    };
  }, []);

  return (
    <section
      className="promo-section bg-dark parallax overflow-hidden"
      style={{ backgroundImage: 'url(images/home/banners/banner-5.jpg)' }}
    >
      <div className="promo-banner banner pt-1 container text-uppercase">
        <div className="banner-content  row align-items-center text-center">
          <div className="col-md-4 ml-xl-auto text-md-right">
            <Reveal
              keyframes={fadeInRightShorter}
              delay={600}
              duration={1000}
              triggerOnce
            >
              <h2 className="mb-md-0 text-white">
                Top Fashion
                <br />
                Deals
              </h2>
            </Reveal>
          </div>

          <div className="col-md-4 col-xl-3 pb-4 pb-md-0">
            <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
              <ALink href="/shop" className="btn btn-dark btn-black ls-10">
                View Sale
              </ALink>
            </Reveal>
          </div>

          <div className="col-md-4 mr-xl-auto text-md-left">
            <Reveal
              keyframes={fadeInLeftShorter}
              delay={600}
              duration={1000}
              triggerOnce
            >
              <div>
                <h4 className="mb-1 mt-1 font1 coupon-sale-text p-0 d-block ls-n-10 text-transform-none">
                  <b>Exclusive COUPON</b>
                </h4>
                <h5 className="mb-1 coupon-sale-text text-white ls-10 p-0">
                  <i className="ls-0">UP TO</i>
                  <b className="text-white bg-secondary ls-n-10">$100</b> OFF
                </h5>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(PromoSection);
