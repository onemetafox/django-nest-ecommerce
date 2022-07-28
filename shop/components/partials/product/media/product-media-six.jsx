import LightBox from 'react-image-lightbox';
import { useState, useEffect } from 'react';
import { Magnifier } from 'react-image-magnifiers';

//Import Custom Component
import OwlCarousel from '../../../features/owl-carousel';

//Import Utils
import { productSingleSlider } from '../../../../utils/data/slider';

export default function ProductMediaOne(props) {
  const {
    adClass = 'col-lg-5 col-md-6',
    product,
    parent = '.product-single-default',
  } = props;
  const [openLB, setOpenLB] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [mediaRef, setMediaRef] = useState(null);
  let verticalCarousel,
    thumbs,
    thumbsWrap,
    productThumb,
    thumbStyle,
    thumbCount,
    thumbsHight,
    thumbUp,
    thumbDown,
    thumbsDots,
    count = 0;

  const events = {
    onTranslate: function (e) {
      document
        .querySelector(`${parent} .vertical-thumbs .owl-dot.active`)
        .classList.remove('active');
      let thumbs = document.querySelectorAll(
        `${parent} .vertical-thumbs .owl-dot`,
      );
      thumbs[e.item.index].classList.add('active');
      thumbsSetActive(e.item.index);
    },

    onTranslated: function (e) {
      setPhotoIndex(e.item.index);
    },
  };

  useEffect(() => {
    window.addEventListener('resize', calcHeight);

    return () => {
      window.removeEventListener('resize', calcHeight);
    };
  });

  useEffect(() => {
    product && thumbsInit();
  });

  useEffect(() => {
    if (product) {
      setOpenLB(false);
      setPhotoIndex(0);
      calcHeight();
      document.querySelector(`${parent} .vertical-thumbs .owl-dot.active`) &&
        document
          .querySelector(`${parent} .vertical-thumbs .owl-dot.active`)
          .classList.remove('active');
      document
        .querySelector(`${parent} .vertical-thumbs .owl-dot`)
        .classList.add('active');
    }
  }, [product]);

  function calcHeight() {
    thumbsRefresh();
    thumbsHight =
      parseInt(productThumb.offsetHeight * 3) + parseInt(thumbStyle * 2) + 3;
    document.querySelector('.product-thumbs-wrap').style.height =
      thumbsHight + 'px';
  }

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
    setOpenLB(true);
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

  function changeMediaIndex(index, e) {
    if (!e.currentTarget.classList.contains('active')) {
      let thumbs = e.currentTarget.closest('.vertical-thumbs');
      thumbs.querySelector('.owl-dot.active') &&
        thumbs.querySelector('.owl-dot.active').classList.remove('active');
      e.currentTarget.classList.add('active');
    }

    mediaRef.current.goTo(index);

    let defaultTop =
      thumbsWrap.getBoundingClientRect().top +
      window.pageYOffset +
      parseInt(productThumb.offsetHeight) +
      parseInt(thumbStyle);

    if (thumbCount > 3) {
      let curThumb = thumbsDots[index];
      let offsetTop = curThumb.getBoundingClientRect().top + pageYOffset;

      if (
        offsetTop > defaultTop &&
        offsetTop !== defaultTop &&
        index < thumbCount - 1
      ) {
        thumbsSetActive(index + 1);
      } else if (
        offsetTop < defaultTop &&
        offsetTop !== defaultTop &&
        index !== 0
      ) {
        thumbsSetActive(index - 1);
      }
    }
  }

  function thumbsSetActive(index) {
    let top = parseInt(
      window.getComputedStyle(thumbs).getPropertyValue('top').slice(0, -2),
    );
    let offset =
      top +
      index * (parseInt(productThumb.offsetHeight) + parseInt(thumbStyle));
    let curThumb = thumbsDots[index];

    if (offset < 0) {
      if (curThumb.previousSibling == null) {
        !thumbUp.classList.contains('disabled') &&
          thumbUp.classList.add('disabled');
      } else {
        thumbUp.classList.contains('disabled') &&
          thumbUp.classList.remove('disabled');
      }

      thumbDown.classList.contains('disabled') &&
        thumbDown.classList.remove('disabled');
      thumbs.setAttribute('style', 'top: ' + parseInt(top - offset) + 'px');
    } else {
      offset =
        thumbs.getBoundingClientRect().top +
        thumbs.offsetHeight -
        curThumb.getBoundingClientRect().top -
        curThumb.offsetHeight;

      if (offset < 0) {
        if (curThumb.nextSibling == null) {
          !thumbDown.classList.contains('disabled') &&
            thumbDown.classList.add('disabled');
        } else {
          thumbDown.classList.contains('disabled') &&
            thumbDown.classList.remove('disabled');
        }

        thumbUp.classList.contains('disabled') &&
          thumbUp.classList.remove('disabled');
        thumbs.setAttribute('style', 'top: ' + parseInt(top + offset) + 'px');
      }
    }
  }

  function thumbsInit() {
    verticalCarousel = document.querySelector('.pg-vertical');
    thumbs = verticalCarousel.querySelector('.product-thumbs');
    thumbStyle = window
      .getComputedStyle(thumbs.querySelector('.owl-dot'))
      .getPropertyValue('margin-bottom')
      .slice(0, -2);
    productThumb = thumbs.querySelector('.owl-dot');
    thumbsWrap = thumbs.parentElement;
    thumbsDots = thumbs.querySelectorAll('.owl-dot');
    thumbCount = thumbsDots.length;
    thumbsHight =
      productThumb.offsetHeight * thumbCount + thumbStyle * (thumbCount - 1);
    thumbUp = document.querySelector('.vertical-thumbs .thumb-up');
    thumbDown = document.querySelector('.vertical-thumbs .thumb-down');
  }

  function thumbsUp(e) {
    let maxTop = thumbsWrap.getBoundingClientRect().top + window.pageYOffset,
      curTop = thumbs.getBoundingClientRect().top + window.pageYOffset,
      top =
        parseInt(
          window.getComputedStyle(thumbs).getPropertyValue('top').slice(0, -2),
        ) +
        parseInt(productThumb.offsetHeight) +
        parseInt(thumbStyle);

    if (count !== 0) count--;

    if (maxTop > curTop) {
      thumbs.setAttribute('style', 'top: ' + top + 'px');

      if (count == 0) {
        !thumbUp.classList.contains('disabled') &&
          thumbUp.classList.add('disabled');
        thumbDown.classList.contains('disabled') &&
          thumbDown.classList.remove('disabled');
      }
    }
  }

  function thumbsDown(e) {
    let maxBottom =
        thumbsWrap.getBoundingClientRect().top +
        window.pageYOffset +
        thumbsWrap.offsetHeight,
      curBottom =
        thumbsHight + thumbs.getBoundingClientRect().top + window.pageYOffset,
      top =
        parseInt(
          window.getComputedStyle(thumbs).getPropertyValue('top').slice(0, -2),
        ) -
        parseInt(productThumb.offsetHeight) -
        parseInt(thumbStyle);

    if (count !== thumbCount - 3) count++;

    if (maxBottom <= curBottom) {
      thumbs.setAttribute('style', 'top: ' + top + 'px');

      if (count == thumbCount - 3) {
        thumbUp.classList.contains('disabled') &&
          thumbUp.classList.remove('disabled');
        !thumbDown.classList.contains('disabled') &&
          thumbDown.classList.add('disabled');
      }
    }
  }

  function thumbsRefresh() {
    if (thumbCount <= 3) {
      thumbDown.setAttribute('style', 'visibility: hidden');
      thumbUp.setAttribute('style', 'visibility: hidden');
    } else {
      thumbs.style.top = 0 + 'px';
      thumbDown.setAttribute('style', 'visibility: visible');
      thumbUp.setAttribute('style', 'visibility: visible');
      !thumbUp.classList.contains('disabled') &&
        thumbUp.classList.add('disabled');
      thumbDown.classList.contains('disabled') &&
        thumbDown.classList.remove('disabled');
    }
  }

  return (
    <div className={`product-single-gallery ${adClass}`}>
      <div
        className={`skel-pro skel-magnifier-vertical skel-full ${adClass}`}
      ></div>
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
              options={productSingleSlider}
              events={events}
              onChangeRef={setMediaRef}
            >
              {product.large_pictures.map((item, index) => (
                <div className="product-item" key={`product-item-${index}`}>
                  <Magnifier
                    style={{ paddingTop: '100%', position: 'relative' }}
                    imageSrc={process.env.NEXT_PUBLIC_ASSET_URI + item.url}
                    imageAlt="product"
                    mouseActivation="hover"
                    cursorStyleActive="crosshair"
                    dragToMove={false}
                    className="product-single-image"
                  />
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

          <div className="vertical-thumbs">
            <button className="thumb-up disabled" onClick={thumbsUp}>
              <i className="icon-angle-up"></i>
            </button>
            <div className="product-thumbs-wrap">
              <div className="product-thumbs owl-dots">
                {product.pictures.map((item, index) => (
                  <div
                    className="owl-dot media-with-lazy"
                    key={`owl-dot-${index}`}
                    onClick={e => changeMediaIndex(index, e)}
                  >
                    <figure>
                      <img
                        src={process.env.NEXT_PUBLIC_ASSET_URI + item.url}
                        alt="Thumbnail"
                      />
                    </figure>
                  </div>
                ))}
              </div>
            </div>
            <button className="thumb-down disabled" onClick={thumbsDown}>
              <i className="icon-angle-down"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
