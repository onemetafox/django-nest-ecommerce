import React, { useRef, useEffect } from 'react';
import Carousel from 'react-owl-carousel2';

function OwlCarousel(props) {
  const { adClass, options, events, isTheme = true } = props;
  const carouselRef = useRef(null);
  const defaultOptions = {
    loop: false,
    margin: 0,
    nav: false,
    navText: ['<i class="icon-angle-left">', '<i class="icon-angle-right">'],
    dots: false,
    autoplay: false,
    autoplayTimeout: 15000,
    items: 1,
  };

  useEffect(() => {
    if (props.onChangeRef) {
      props.onChangeRef(carouselRef);
    }
  }, [carouselRef]);

  let settings = Object.assign({}, defaultOptions, options);

  return props.children !== undefined ? (
    props.children.length > 0 ||
    (props.children && props.children.length === undefined) ? (
      <Carousel
        ref={carouselRef}
        className={`owl-carousel ${isTheme ? 'owl-theme' : ''} ${adClass}`}
        options={settings}
        events={events}
      >
        {props.children}
      </Carousel>
    ) : (
      ''
    )
  ) : (
    ''
  );
}

function areEqual(prev, next) {
  if (next.redraw === false) {
    return true;
  }
  return prev === next;
}

export default React.memo(OwlCarousel, areEqual);
