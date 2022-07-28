import { useRouter } from 'next/router';
import { connect, useStore } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SlideToggle from 'react-slide-toggle';
import useTranslation from 'next-translate/useTranslation';

// Import Actions
import { actions as WishlistAction } from '../../../../store/wishlist';
import { actions as CartAction } from '../../../../store/cart';
import { actions as ProductAction } from '../../../../store/product';

// Import Custom Component
import ProductNav from '../product-nav';
import Qty from '../qty';
import ALink from '../../../common/ALink';
import ProductCountdown from '../../../features/product-countdown';
import ShareButtons from '../../../../components/partials/product/widgets/share-buttons';

function ProductDetailOne(props) {
  const { t } = useTranslation('common');
  const store = useStore();
  const router = useRouter();

  const {
    product,
    selectedVariant,
    adClass = 'col-lg-7 col-md-6',
    prev,
    next,
    isNav = true,
    parent = '.product-single-details',
    isSticky = true,
    webConfig,
  } = props;

  const [variant, setVariant] = useState(null);
  const [sticky, setSticky] = useState(isSticky);
  const [qty, setQty] = useState(0);
  const [onlyOnevariant, setOnlyOnevariant] = useState(null);
  const [globalConfig, setGlobalConfig] = useState(null);

  useEffect(() => {
    if (product) initState();
    if (product?.variants.length === 1) setOnlyOnevariant(product.variants[0]);
  }, [product]);

  useEffect(() => {
    if (product && variant) {
      if (!product.price || product.price[0] === null || variant.stock === 0) {
        document.querySelector(`${parent} .add-cart .shopping-cart`) &&
          document
            .querySelector(`${parent} .add-cart .shopping-cart`)
            .classList.add('disabled');
        document.querySelector(`${parent} .sticky-cart .add-cart`) &&
          document
            .querySelector(`${parent} .sticky-cart .add-cart`)
            .classList.add('disabled');
      } else {
        document.querySelector(`${parent} .add-cart .shopping-cart`) &&
          document
            .querySelector(`${parent} .add-cart .shopping-cart`)
            .classList.remove('disabled');
        document.querySelector(`${parent} .sticky-cart .add-cart`) &&
          document
            .querySelector(`${parent} .sticky-cart .add-cart`)
            .classList.remove('disabled');
      }
    }
  }, [variant]);

  useEffect(() => {
    selectedVariant && setVariant(selectedVariant);
    selectedVariant && setQty(selectedVariant.qty);
  }, [selectedVariant]);

  useEffect(() => {
    setGlobalConfig(webConfig);
  }, [webConfig]);

  // Unmount component and clean data
  useEffect(() => {
    return () => {
      setVariant(null);
      store.dispatch(ProductAction.cleanVariant(null));
    };
  }, []);

  function isInWishlist() {
    return (
      product &&
      props.wishlist.findIndex(item => item.slug === product.slug) > -1
    );
  }

  function onWishlistClick(e) {
    e.preventDefault();
    if (!isInWishlist()) {
      let target = e.currentTarget;
      target.classList.add('load-more-overlay');
      target.classList.add('loading');

      setTimeout(() => {
        target.classList.remove('load-more-overlay');
        target.classList.remove('loading');
        props.addToWishList(product);
      }, 1000);
    } else {
      router.push('/pages/wishlist');
    }
  }

  function onAddCartClick(e) {
    e.preventDefault();
    if (product.variants.length > 1) {
      if (document.querySelector('.product-customization')) {
        let ele =
          document.querySelector('.product-customization')?.parentElement
            ?.offsetTop - 100;
        ele &&
          window.scroll({
            behavior: 'smooth',
            inline: 'nearest',
            top: ele,
          });
      }
      return;
    }
    if (product.stock > 0 && !e.currentTarget.classList.contains('disabled')) {
      if (product.variants.length === 0) {
        props.addToCart(product, qty, -1);
      } else {
        props.addToCart(product, qty, variant.id);
      }
    }
  }

  function onAddCartClickSticky(e) {
    e.preventDefault();
    if (product.stock > 0 && !e.currentTarget.classList.contains('disabled')) {
      if (product.variants.length === 0) {
        props.addToCart(product, qty, -1);
      } else {
        props.addToCart(product, qty, variant.id);
      }
    }
  }

  function changeQty(value) {
    value >= product.minimum_order && setQty(value);
  }

  function initState() {
    setQty(product?.minimum_order);
  }

  return (
    <>
      <div className={`skel-pro skel-detail ${adClass}`}></div>
      {product && (
        <div className={`product-single-details ${adClass}`}>
          <h1 className="product-title">{product.product_name}</h1>
          {isNav ? <ProductNav prev={prev} next={next} /> : ''}
          <div className="ratings-container">
            <div className="product-ratings">
              <span
                className="ratings"
                style={{ width: `${20 * parseFloat(product.rating)}%` }}
              ></span>
              <span className="tooltiptext tooltip-top">
                {parseFloat(product.rating).toFixed(2)}
              </span>
            </div>

            <ALink href="#" className="rating-link">
              ({' '}
              {product.review === '0.00'
                ? `${product.review} Reviews`
                : t('NO_PRODUCT_REVIEWS')}{' '}
              )
            </ALink>
          </div>
          <hr className="short-divider" />
          <div className="price-box">
            {product.price[0] == product.price[1] ? (
              <span className="product-price">
                {product.price[0] != null ? product.price[0] + ' €' : '-'}
              </span>
            ) : (
              <>
                <span className="old-price">{product.price[1] + ' €'}</span>
                <span className="product-price">{product.price[0] + ' €'}</span>
              </>
            )}
            <span className="product-price-vat">
              {globalConfig && globalConfig.vat_show_in_products === true ? (
                <span>{t('VAT_INCLUDE')}</span>
              ) : (
                <span>{t('VAT_NOT_INCLUDE')}</span>
              )}
            </span>
          </div>
          {/* REFERENCE */}
          <ul className="single-info-list">
            <li>
              {t('SKU')}: <strong>{product.root_reference}</strong>
            </li>
            <li>
              {t('BRAND')}: <strong>{product.provider}</strong>
            </li>
          </ul>

          {product.until && product.until !== null && (
            <ProductCountdown type="1" />
          )}

          {/* PRODUCT DESCRIPTION */}
          <div className="product-desc mt-4 mb-4">
            <p>{product.product_description}</p>
          </div>
          {/* 360 */}
          {product.link_360 ? (
            <div className="mt-4 mb-4">
              <a target="_blank" href={product.link_360}>
                {t('VIEW_IN_360')}
              </a>
            </div>
          ) : (
            ''
          )}

          <ul className="single-info-list">
            <li>
              {t('CATEGORY')}:{' '}
              {product.category && (
                <React.Fragment key={`single-cat-${product.category.slug}`}>
                  <strong>
                    <ALink
                      href={{
                        pathname: t('ROUTE_PATH_SHOP'),
                        query: { category: product.category.slug },
                      }}
                      className="category"
                    >
                      {product.category.category_name}
                    </ALink>
                  </strong>
                </React.Fragment>
              )}
            </li>

            {product.tags.length > 0 ? (
              <li>
                TAGs:{' '}
                {product.tags.map((item, index) => (
                  <React.Fragment key={`single-cat-${index}`}>
                    <strong>
                      <ALink
                        href={{
                          pathname: t('ROUTE_PATH_SHOP'),
                          query: { tag: item },
                        }}
                        className="category badge badge-light"
                      >
                        {item}
                      </ALink>
                    </strong>
                    {index < product.tags.length - 1 ? ', ' : ''}
                  </React.Fragment>
                ))}
              </li>
            ) : (
              ''
            )}
          </ul>

          {/* STICKY ADD TO CART */}
          {sticky && (
            <div className="sticky-wrapper">
              <div className="sticky-header desktop-sticky sticky-cart d-none d-lg-block">
                <div className="container">
                  <div className="sticky-img mr-4 media-with-lazy">
                    <figure className="mb-0">
                      <LazyLoadImage
                        src={
                          variant
                            ? variant.image
                            : product.product_images[0].file
                        }
                        width="100%"
                        height="auto"
                        alt="Thumbnail"
                      />
                    </figure>
                  </div>
                  <div className="sticky-detail">
                    <div className="sticky-product-name">
                      <h2 className="product-title w-100 ls-0">
                        {variant ? variant.variant_name : product.product_name}
                      </h2>
                      <div className="price-box">
                        {product.price[0] == product.price[1] ? (
                          <span className="product-price">
                            {product.price[0] != null
                              ? product.price[0] + ' €'
                              : '-'}
                          </span>
                        ) : (
                          <>
                            <span className="old-price">
                              {product.price[1] + ' €'}
                            </span>
                            <span className="product-price">
                              {product.price[0] + ' €'}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="product-action">
                    <Qty
                      max={variant?.stock}
                      min={product.minimum_order}
                      value={qty}
                      onChangeQty={changeQty}
                      disabled={variant?.stock ? false : true}
                    />
                    <a
                      href="#"
                      className={`btn btn-primary add-cart shopping-cart mr-2 ${
                        typeof variant === 'object' && !variant
                          ? 'disabled'
                          : ''
                      }`}
                      title={t('ADD_TO_THE_CART')}
                      onClick={onAddCartClickSticky}
                    >
                      {!product.engraved_area.length
                        ? t('ADD_TO_THE_CART')
                        : t('ADD_TO_THE_CART_RAW')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {onlyOnevariant ? (
            <div className="col-12 p-0 mt-3">
              <SlideToggle collapsed={false}>
                {({ _, setCollapsibleElement }) => (
                  <>
                    <div
                      className="price-box product-filtered-price m-0"
                      ref={setCollapsibleElement}
                    >
                      {onlyOnevariant ? (
                        <span className="product-stock pb-3 d-block">
                          {onlyOnevariant?.stock === 0
                            ? t('OUT_OF_STOCK')
                            : `${onlyOnevariant?.stock - qty} ${t('IN_STOCK')}`}
                        </span>
                      ) : (
                        ''
                      )}
                    </div>
                  </>
                )}
              </SlideToggle>
            </div>
          ) : (
            ''
          )}

          <div
            className={`product-action ${
              onlyOnevariant ? 'only-one-variation' : ''
            }`}
          >
            {Boolean(onlyOnevariant) && (
              <div className="product-single-qty">
                <Qty
                  max={variant ? variant.stock : onlyOnevariant?.stock}
                  min={product.minimum_order}
                  value={qty}
                  onChangeQty={changeQty}
                  disabled={onlyOnevariant?.stock > 0 ? false : true}
                />
              </div>
            )}

            <a
              href="#"
              className={`btn btn-primary add-cart shopping-cart mr-2 w-100 ${
                onlyOnevariant && onlyOnevariant.stock === 0 ? 'disabled' : ''
              }`}
              id="calculate-price-btn"
              title={
                !onlyOnevariant
                  ? t('CALCULATE_PRICE_BUTTON')
                  : t('ADD_TO_THE_CART')
              }
              onClick={onAddCartClick}
            >
              {!onlyOnevariant
                ? t('CALCULATE_PRICE_BUTTON')
                : t('ADD_TO_THE_CART')}
            </a>
          </div>

          <hr className="divider mb-0 mt-0" />

          <a
            href="#"
            className={`btn-icon-wish add-wishlist float-right ${
              isInWishlist() ? 'added-wishlist' : ''
            }`}
            onClick={onWishlistClick}
            title={`${isInWishlist() ? 'Go to Wishlist' : 'Add to Wishlist'}`}
          >
            <i className="icon-wishlist-2"></i>
            <span>{isInWishlist() ? 'Go to Wishlist' : 'Add to Wishlist'}</span>
          </a>
          <ShareButtons />
        </div>
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {
    wishlist: state.wishlist.list ? state.wishlist.list : [],
    selectedVariant: state.product.selectedVariant,
    webConfig: state.landing.webCommons?.web_config,
  };
};

export default connect(mapStateToProps, { ...WishlistAction, ...CartAction })(
  ProductDetailOne,
);
