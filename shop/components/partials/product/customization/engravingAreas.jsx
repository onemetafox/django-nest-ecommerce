import useTranslation from 'next-translate/useTranslation';
import ReactTooltip from 'react-tooltip';
import { Fragment, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useStore } from 'react-redux';
import { actions as ProductActions } from '../../../../store/product';

const EngravingAreas = ({ areas }) => {
  const { t } = useTranslation('common');
  const store = useStore();
  const [selectedArea, setSelectedArea] = useState([]);

  const handleChange = area => {
    setSelectedArea(area);
  };

  useEffect(() => {
    if (selectedArea) {
      store.dispatch(ProductActions.selectArea(selectedArea));
    }
  }, [selectedArea]);

  const isAreaSelected = area => {
    return selectedArea.id === area.id ? 'selected' : '';
  };

  return (
    <div className="product-collapse-panel engraving-areas">
      <h3 className="product-collapse-title my-3">{t('AVAILABLE_AREAS')}</h3>
      <p>{t('AREAS_TEXT')}</p>
      <div className="product-collapse-body">
        <div className="collapse-body-wrapper pl-0">
          <div className="product-size-content">
            <div className="row align-items-center align-items-md-start justify-content-center justify-content-md-start">
              {areas.map(area => (
                <Fragment key={area.id}>
                  <div className="col-5 col-md-5 font-weight-bold">
                    <div className="text-center col-12 p-0">{area.name}</div>
                    <div
                      className={`col-12 p-0 ${isAreaSelected(area)}`}
                      onClick={() => handleChange(area)}
                    >
                      <figure className="mb-0">
                        <LazyLoadImage
                          src={area.image}
                          alt={area.name}
                          width="100%"
                          height="auto"
                          className="d-block prod-thumbnail"
                        />
                      </figure>
                    </div>
                  </div>
                  <div className="col-5 col-md-7 text-right">
                    <div className="area-info d-md-block">
                      <br></br>
                      <p>{t('AREA_SIZE')}</p>
                      {Boolean(area.width && area.height) && (
                        <i>
                          {t('AREA_MAX_SIZE_TEXT')}:{' '}
                          {`${area.width} x ${area.height} cm, approx. `}
                        </i>
                      )}
                      {Boolean(area.diameter && area.diameter !== '0.00') && (
                        <i>
                          {t('AREA_DIAMETER')}: {`${area.diameter}. `}
                        </i>
                      )}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
            <div className="col-12 area-info text-rigth">
              <a data-tip data-for="area-size-info">
                {t('MORE_INFO')}
              </a>
              <ReactTooltip
                id="area-size-info"
                type="info"
                effect="solid"
                className="tooltip"
                place="bottom"
                backgroundColor="#f4f4f4"
                textColor="#000"
                wrapper="div"
              >
                <span>{t('AREA_SIZE_INFO')}</span>
              </ReactTooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngravingAreas;
