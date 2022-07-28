import React from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useTranslation from 'next-translate/useTranslation';

// Import Actions
import { actions as WishlistAction } from '../../../store/wishlist';
import { actions as CartAction } from '../../../store/cart';
import { actions as ModalAction } from '../../../store/modal';

// Import Custom Component
import ALink from '../../common/ALink';
import ProductCountdown from '../product-countdown';

const ProductOne = props => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { adClass = '', product } = props;

  function isSale() {
    return product.price[0] !== product.price[1] &&
      product.variants.length === 0
      ? '-' +
          (
            (100 * (product.price[1] - product.price[0])) /
            product.price[1]
          ).toFixed(0) +
          '%'
      : product.variants.find(variant => variant.sale_price)
      ? 'Sale'
      : false;
  }

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
    props.addToCart(product);
  }

  function onQuickViewClick(e) {
    e.preventDefault();
    props.showQuickView(product.slug);
  }

  return (
    <div className={`product-default media-with-lazy ${adClass}`}>
      <figure>
        <ALink
          href={`/${t('ROUTE_PATH_CATEGORY')}/${product.category.slug}/${t(
            'ROUTE_PATH_PRODUCT',
          )}/${product.slug}`}
        >
          <div className="lazy-overlay"></div>

          <LazyLoadImage
            alt={product.seo?.title}
            src={product.thumbnail}
            threshold={500}
            effect="black and white"
            width="100%"
            height="auto"
          />
          {product.product_images.length >= 2 ? (
            <LazyLoadImage
              alt={product.seo?.title}
              src={
                product.product_images.filter(img => img.main).file ??
                product.product_images.length >= 1
                  ? product.product_images[1].file
                  : product.product_images[0].file
              }
              threshold={500}
              effect="black and white"
              wrapperClassName="product-image-hover"
            />
          ) : (
            ''
          )}
        </ALink>

        <div className="label-group">
          {product.outlet ? (
            <div className="product-label label-hot">{t('OUTLET')}</div>
          ) : (
            ''
          )}

          {isSale() ? (
            <div className="product-label label-sale">{isSale()}</div>
          ) : (
            ''
          )}
        </div>

        {product.until && product.until !== null && <ProductCountdown />}
      </figure>
      <div className="product-details">
        <div className="category-wrap">
          <div className="category-list">
            {product.category ? (
              <React.Fragment key={product.category.slug}>
                <ALink
                  href={{
                    pathname: t('ROUTE_PATH_SHOP'),
                    query: { category: product.category.slug },
                  }}
                >
                  {product.category.category_name}
                </ALink>
              </React.Fragment>
            ) : (
              ''
            )}
          </div>
        </div>

        <h3 className="product-title">
          <ALink
            href={`/${t('ROUTE_PATH_CATEGORY')}/${product.category.slug}/${t(
              'ROUTE_PATH_PRODUCT',
            )}/${product.slug}`}
          >
            {product.product_name}
          </ALink>
        </h3>

        <div className="ratings-container">
          <div className="product-ratings">
            <span
              className="ratings"
              style={{ width: 20 * parseFloat(product.rating) + '%' }}
            ></span>
            <span className="tooltiptext tooltip-top">
              {product.rating === '0.00' ? t('NO_RATING') : product.rating}
            </span>
          </div>
        </div>

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
        </div>

        <div className="product-action">
          {product.variants.length > 0 ? (
            <ALink
              href={`/${t('ROUTE_PATH_CATEGORY')}/${product.category.slug}/${t(
                'ROUTE_PATH_PRODUCT',
              )}/${product.slug}`}
              className="btn-icon btn-add-cart"
            >
              <i className="fa fa-arrow-right"></i>
              <span>{t('SELECT_OPTIONS')}</span>
            </ALink>
          ) : (
            <a
              href="#"
              className={`btn-icon btn-dark btn-add-cart product-type-simple ${
                product.price[0] != null ? '' : 'disabled'
              }`}
              title="Add To Cart"
              onClick={onAddCartClick}
            >
              <i className="icon-shopping-cart"></i>
              <span>{t('ADD_TO_THE_CART')}</span>
            </a>
          )}
          <a
            href="#"
            className={`btn-icon-wish ${
              isInWishlist() ? 'added-wishlist' : ''
            }`}
            onClick={onWishlistClick}
            title={`${
              isInWishlist() === true ? 'Go to Wishlist' : 'Add to Wishlist'
            }`}
          >
            <i className="icon-heart"></i>
          </a>
          <a
            href="#"
            className="btn-quickview"
            title="Quick View"
            onClick={onQuickViewClick}
          >
            <i className="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    wishlist: state.wishlist.list ? state.wishlist.list : [],
  };
};

export default connect(mapStateToProps, {
  ...WishlistAction,
  ...CartAction,
  ...ModalAction,
})(ProductOne);
