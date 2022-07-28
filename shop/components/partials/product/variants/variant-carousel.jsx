import React, { Fragment, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { prodThumbSlider } from '../../../../utils/data/slider';
import ALink from '../../../common/ALink';
import OwlCarousel from '../../../features/owl-carousel';
import ResumeOrderProduct from '../customization/resume-order-product';
import Qty from '../qty';

import { actions, actions as CartActions } from '../../../../store/cart';

const VariantCarousel = props => {
  const {
    variants,
    carouselVariants,
    changeMediaIndex,
    options,
    t,
    getStock,
    onRemove,
    selectedVariants,
    getVariantStock,
    changeQty,
    variant,
    setCustomizeProduct,
    getVariantQty,
    getAvailability,
    engravingAreas,
    addToCart,
    customizeProduct,
  } = props;

  const sliderOption = {
    ...prodThumbSlider,
    dots: false,
    nav: true,
    responsive: {
      ...prodThumbSlider.responsive,
      1200: { items: 8 },
      768: { items: 5 },
    },
  };

  function scrollToCustomization() {
    if (!customizeProduct) {
      const element =
        document.getElementById('customize-product')?.offsetTop - 120;
      element &&
        window.scroll({
          behavior: 'smooth',
          top: element,
        });
      return;
    }
    return;
  }

  return Boolean(variants.length > 1) ? (
    <Fragment>
      <div className="container">
        <h3 className="section-title heading-border ls-20 border-0 nav-link active font-bolder">
          <ALink href="#">{t('VARIANTS')}</ALink>
        </h3>
      </div>
      <div className="container-fluid bg-gray py-5 p-0">
        <div className="container">
          <OwlCarousel
            adClass="prod-thumbnail owl-theme owl-dots"
            options={sliderOption}
          >
            {carouselVariants &&
              carouselVariants.map((variant, index) => (
                <div
                  className="owl-dot media-with-lazy"
                  key={`owl-dot-${index}`}
                  onClick={e => changeMediaIndex(index, e)}
                >
                  <figure className="mb-0">
                    <LazyLoadImage
                      src={variant.image}
                      alt={variant.variant_name}
                      width="100%"
                      height="auto"
                      className="d-block"
                    />
                  </figure>
                  {getStock(variant) ? (
                    <span className="stock">
                      <i className="stock-icon stock-icon-ok"></i>
                    </span>
                  ) : (
                    <span className="stock">
                      <i className="stock-icon stock-icon-out"></i>
                    </span>
                  )}
                </div>
              ))}
          </OwlCarousel>
        </div>
      </div>
      <div className="container">
        <div className="col-12 p-1 p-md-0 mb-3">
          <div className="product-action select-variant">
            {Boolean(options) ? (
              <>
                {t('COLOR')}:&nbsp;
                <span className="selected">{variant.color.color_name}</span>
              </>
            ) : (
              <>
                {t('CHOOSE_OPTION')}
                <i className="ml-3 fas fa-plus"></i>
              </>
            )}
          </div>
          <div className="d-block">
            <i className="icon-info mr-1"></i>({t('COLOR_INFO_TEXT')})
          </div>
        </div>

        <div className="col-12 product-filters-container p-0">
          <div className="product-single-filter justify-content-between align-items-baseline row flex-column-reverse flex-lg-row">
            <div className="col-12 col-lg-4 p-0">
              {Boolean(selectedVariants.length) && (
                <ResumeOrderProduct
                  selectedVariants={selectedVariants}
                  onRemove={onRemove}
                />
              )}
            </div>
            <div className="col-12 col-lg-7 p-0 pr-lg-1">
              <div className="table-responsive text-uppercase">
                {Boolean(options) && (
                  <Fragment>
                    <table className="table text-center">
                      <thead>
                        <tr>
                          <th scope="col">{t('QUANTITY')}</th>
                          <th scope="col">{t('REFERENCE')}</th>
                          <th scope="col">{t('SIZE')}</th>
                          <th scope="col">{t('STOCK')}</th>
                          <th scope="col">{t('AVAILABILITY')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {options.map(variant => (
                          <tr scope="row" key={variant.id}>
                            <td>
                              <Qty
                                max={variant.stock}
                                value={getVariantQty(variant.reference)}
                                onChangeQty={e => changeQty(variant, e)}
                                disabled={variant.stock > 0 ? false : true}
                              />
                            </td>
                            <td>{variant.reference}</td>
                            <td>{variant.size.size_name}</td>
                            <td
                              className={
                                variant.stock > 0
                                  ? 'text-success'
                                  : 'text-danger'
                              }
                            >
                              {getVariantStock(variant)}
                            </td>
                            <td>{getAvailability(variant.available_from)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="product-single-details">
                      <div
                        className={`product-action mt-3 d-md-flex ${
                          engravingAreas.length ? '' : 'justify-content-end'
                        } `}
                      >
                        <a
                          href="#"
                          className={`btn btn-primary add-cart shopping-cart mr-md-2 w-100 ${
                            !selectedVariants.length ? 'disabled' : ''
                          }`}
                          title={t('ADD_TO_THE_CART')}
                          onClick={addToCart}
                        >
                          {!engravingAreas.length
                            ? t('ADD_TO_THE_CART')
                            : t('ADD_TO_THE_CART_RAW')}
                        </a>
                        {Boolean(engravingAreas.length) && (
                          <Fragment>
                            <a
                              href="#"
                              className={`btn btn-dark add-cart shopping-cart mr-md-2 mt-1 mt-md-0 w-100 ${
                                !selectedVariants.length ? 'disabled' : ''
                              }`}
                              title={t('CUSTOMIZE_PRODUCT')}
                              onClick={e => {
                                e.preventDefault();
                                if (selectedVariants.length) {
                                  setCustomizeProduct(!customizeProduct);
                                  scrollToCustomization();
                                }
                              }}
                            >
                              {t('CUSTOMIZE_PRODUCT')}
                            </a>
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : null;
};

export default VariantCarousel;
