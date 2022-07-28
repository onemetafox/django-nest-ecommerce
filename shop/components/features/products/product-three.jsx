import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Custom Component
import ALink from '../../common/ALink';

export default function ProductThree(props) {
  const { adClass = '', link = 'default', product } = props;

  return (
    <div
      className={`product-default media-with-lazy left-details product-widget ${adClass}`}
    >
      <figure>
        <ALink href={`/product/${link}/${product.slug}`}>
          <div className="lazy-overlay"></div>

          <LazyLoadImage
            alt="product"
            src={product.product_images[0].file}
            threshold={500}
            effect="black and white"
            width="100%"
          />
          {product.product_images.length >= 2 ? (
            <LazyLoadImage
              alt="product"
              src={product.product_images[1].file}
              threshold={500}
              effect="black and white"
              wrapperClassName="product-image-hover"
            />
          ) : (
            ''
          )}
        </ALink>
      </figure>

      <div className="product-details">
        <h3 className="product-title">
          <ALink href={`/product/default/${product.slug}`}>
            {product.name}
          </ALink>
        </h3>

        <div className="ratings-container">
          <div className="product-ratings">
            <span
              className="ratings"
              style={{ width: 20 * parseFloat(product.rating) + '%' }}
            ></span>
            <span className="tooltiptext tooltip-top">
              {parseFloat(product.rating).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="price-box">
          {product.price[0] == product.price[1] ? (
            <span className="product-price">
              {'$' + product.price[0].toFixed(2)}
            </span>
          ) : product.variants.length > 0 ? (
            <span className="product-price">
              {'$' + product.price[0].toFixed(2)} &ndash;{' '}
              {'$' + product.price[1].toFixed(2)}
            </span>
          ) : (
            <>
              <span className="old-price">
                {'$' + product.price[1].toFixed(2)}
              </span>
              <span className="product-price">
                {'$' + product.price[0].toFixed(2)}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
