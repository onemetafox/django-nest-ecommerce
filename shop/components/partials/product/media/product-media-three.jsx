import React, { useState } from 'react';
import LightBox from 'react-image-lightbox';
import { Magnifier } from 'react-image-magnifiers';

function GridThumbnail(props) {
  const [openLB, setOpenLB] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
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

  function openLightBox(index) {
    setOpenLB(true);
    setPhotoIndex(index);
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
    <>
      <div className="skel-pro skel-magnifier-grid mb-2"></div>
      <div className={`product-single-gallery ${adClass}`}>
        {product && (
          <>
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

            <div className="row">
              {product
                ? product.large_pictures.map((item, index) => (
                    <div
                      className="col-sm-6 product-item"
                      key={'product-item' + index}
                    >
                      <div className="inner">
                        <Magnifier
                          style={{ paddingTop: '100%', position: 'relative' }}
                          imageSrc={
                            process.env.NEXT_PUBLIC_ASSET_URI + item.url
                          }
                          imageAlt="product"
                          mouseActivation="hover"
                          cursorStyleActive="crosshair"
                          dragToMove={false}
                          className="product-single-image"
                        />

                        <span
                          className="prod-full-screen"
                          onClick={() => openLightBox(index)}
                        >
                          <i className="icon-plus"></i>
                        </span>
                      </div>
                    </div>
                  ))
                : ''}
            </div>
          </>
        )}

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
  );
}

export default GridThumbnail;
