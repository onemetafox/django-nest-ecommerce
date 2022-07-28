import LightBox from 'react-image-lightbox';
import { useState, useEffect } from 'react';

// Import Custom Component
import OwlCarousel from '../../../features/owl-carousel';

// Import Settings
import { productExtendSlider } from '../../../../utils/data/slider';

export default function ProductMediaOne(props) {
  const { adClass = '', product } = props;
  const [openLB, setOpenLB] = useState(false);
  const [redraw, setRedraw] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (product) {
      setOpenLB(false);
      setPhotoIndex(0);
      setRedraw(true);
    }
  }, [product]);

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

  function openLightBox() {
    let productItem = document.querySelector(
      '.product-single-carousel .center',
    );
    if (productItem) {
      let index = productItem
        .querySelector('.image-item')
        .getAttribute('data-index');

      if (!index) {
        index = 0;
      }

      setPhotoIndex(index);
      setOpenLB(true);
      setRedraw(false);
    }
  }

  function closeLightBox() {
    setOpenLB(false);
  }

  function moveNextPhoto() {
    setPhotoIndex((photoIndex + 1) % product.large_pictures.length);
  }

  function movePrevPhoto() {
    setPhotoIndex(
      (photoIndex + product.large_pictures.length - 1) %
        product.large_pictures.length,
    );
  }

  return (
    <div className={`product-single-gallery ${adClass}`}>
      <div className="skel-pro skel-magnifier-extended"></div>
      {product && (
        <>
          <div className="product-slider-container">
            <div className="label-group">
              {product.is_hot ? (
                <div className="product-label label-hot">HOT</div>
              ) : (
                ''
              )}

              {isSale() ? (
                <div className="product-label label-sale">{isSale()}</div>
              ) : (
                ''
              )}
            </div>

            <OwlCarousel
              adClass="product-single-carousel owl-carousel owl-theme show-nav-hover"
              redraw={redraw}
              options={productExtendSlider}
            >
              {product.large_pictures.map((item, index) => (
                <div
                  className="product-item media-with-lazy"
                  key={`product-item-${index}`}
                >
                  <figure>
                    <img
                      src={process.env.NEXT_PUBLIC_ASSET_URI + item.url}
                      className="image-item"
                      alt="product"
                      data-index={index}
                    />
                  </figure>
                </div>
              ))}
            </OwlCarousel>

            <span className="prod-full-screen" onClick={openLightBox}>
              <i className="icon-plus"></i>
            </span>

            {openLB && (
              <LightBox
                mainSrc={
                  process.env.NEXT_PUBLIC_ASSET_URI +
                  product.large_pictures[photoIndex].url
                }
                prevSrc={
                  process.env.NEXT_PUBLIC_ASSET_URI +
                  product.large_pictures[
                    (photoIndex + product.large_pictures.length - 1) %
                      product.large_pictures.length
                  ].url
                }
                nextSrc={
                  process.env.NEXT_PUBLIC_ASSET_URI +
                  product.large_pictures[
                    (photoIndex + 1) % product.large_pictures.length
                  ].url
                }
                onCloseRequest={closeLightBox}
                onMoveNextRequest={moveNextPhoto}
                onMovePrevRequest={movePrevPhoto}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
