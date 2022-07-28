import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import Reveal from 'react-awesome-reveal';

// Import Settigns
import { fadeInUpShorter } from '../../../utils/data/keyframes';

function FeatureBoxSection() {
  const { t } = useTranslation('common');
  return (
    <section className="feature-boxes-container overflow-hidden">
      <Reveal
        keyframes={fadeInUpShorter}
        delay={100}
        duration={1000}
        triggerOnce
      >
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="feature-box px-sm-5 feature-box-simple text-center">
                <div className="feature-box-icon">
                  <i className="icon-earphones-alt"></i>
                </div>

                <div className="feature-box-content p-0">
                  <h3>{t('FEATURE_BOX_1_H3')}</h3>
                  <h5>{t('FEATURE_BOX_1_H5')}</h5>

                  <p>{t('FEATURE_BOX_1_DESC')}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-box px-sm-5 feature-box-simple text-center">
                <div className="feature-box-icon">
                  <i className="icon-credit-card"></i>
                </div>

                <div className="feature-box-content p-0">
                  <h3>{t('FEATURE_BOX_2_H3')}</h3>
                  <h5>{t('FEATURE_BOX_2_H5')}</h5>

                  <p>{t('FEATURE_BOX_2_DESC')}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-box px-sm-5 feature-box-simple text-center">
                <div className="feature-box-icon">
                  <i className="icon-action-undo"></i>
                </div>

                <div className="feature-box-content p-0">
                  <h3>{t('FEATURE_BOX_3_H3')}</h3>
                  <h5>{t('FEATURE_BOX_3_H5')}</h5>

                  <p>{t('FEATURE_BOX_3_DESC')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default React.memo(FeatureBoxSection);
