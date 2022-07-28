import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Custom Component
import ALink from '../../common/ALink';

function CartPopup(props) {
  const { product } = props;
  return (
    <div className="minipopup-area">
      <div className="minipopup-box" style={{ top: '0' }}>
        <div className="product media-with-lazy">
          <figure className="product-media w-100">
            <ALink href={`/product/default/${product.slug}`}>
              <LazyLoadImage
                alt="product"
                src={product.variants[product.index].image}
                    // ? `${
                    //     process.env.NEXT_PUBLIC_ASSET_URI +
                    //     product.small_pictures[0].url
                    //   }`
                    // : ''
                // }
                threshold={500}
                effect="black and white"
                width="100%"
                height="auto"
              />
            </ALink>
          </figure>
          <div className="product-detail">
            {product.index > -1 ? (
              !product.variants[product.index].color ? (
                <ALink
                  className="product-name"
                  href={`/product/default/${product.slug}`}
                >
                  {product.variants[product.index].variant_name +
                    ' - ' +
                    product.variants[product.index].size.size_name}
                </ALink>
              ) : !product.variants[product.index].size ? (
                <ALink
                  className="product-name"
                  href={`/product/default/${product.slug}`}
                >
                  {product.variants[product.index].variant_name +
                    ' - ' +
                    product.variants[product.index].color.color_name}
                </ALink>
              ) : (
                <ALink
                  className="product-name"
                  href={`/product/default/${product.slug}`}
                >
                  {product.variants[product.index].variant_name +
                    ' - ' +
                    product.variants[product.index].color.color_name +
                    ', ' +
                    product.variants[product.index].size.size_name}
                </ALink>
              )
            ) : (
              <ALink
                className="product-name"
                href={`/product/default/${product.slug}`}
              >
                {product.variants[product.index].variant_name}
              </ALink>
            )}

            <p>has been added to your cart.</p>
          </div>
        </div>
        <div className="product-action">
          <ALink href="/pages/cart" className="btn viewcart">
            View Cart
          </ALink>
          <ALink href="/pages/checkout" className="btn btn-dark checkout">
            Checkout
          </ALink>
        </div>
        <button className="mfp-close"></button>
      </div>
    </div>
  );
}

export default React.memo(CartPopup);
