import React from 'react';
import Reveal from 'react-awesome-reveal';

// Import Custom Component
import ALink from '../../common/ALink';

// Import Settings
import { fadeInUpShorter } from '../../../utils/data/keyframes';
import useTranslation from 'next-translate/useTranslation';

function SaleBanner() {
  const { t } = useTranslation('common');
  return (
    <Reveal keyframes={fadeInUpShorter} delay={200} duration={1000} triggerOnce>
      <div className="banner banner-big-sale py-5">
        <div className="banner-content row align-items-center mx-0">
          <div className="col-md-9 col-sm-8">
            <h2 className="text-white text-uppercase text-center text-sm-left ls-n-20 mb-md-0 px-4">
              <b className="d-inline-block mr-4 mb-1 mb-md-0">{t('OUTLET')}</b>{' '}
              {t('OUTLET_DESCRIPTION_TITLE')}
              <small className="text-transform-none align-middle">
                {t('OUTLET_UNTIL_END')}
              </small>
            </h2>
          </div>
          <div className="col-md-3 col-sm-4 text-center text-sm-right">
            <ALink
              className="btn btn-light btn-outline-dark btn-lg"
              href="/outlet"
            >
              {t('OUTLET_SHOW_TEXT')}
            </ALink>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default React.memo(SaleBanner);
