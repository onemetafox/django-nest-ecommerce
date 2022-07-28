import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';

export function CarouselSection({ sliders }) {
  if (
    !Array.isArray(sliders) ||
    !sliders.every(slider => typeof slider === 'object')
  ) {
    return <div>Sliders Error!</div>;
  }

  return sliders.length <= 0 ? null : (
    <div
      css={{
        '.slide.selected': {
          zIndex: '1 !important',
        },
      }}
    >
      <Carousel
        showArrows
        showStatus={false}
        showIndicators={false}
        infiniteLoop={true}
        showThumbs={false}
        useKeyboardArrows
        autoPlay
        stopOnHover
        dynamicHeight={true}
        emulateTouch={false}
        autoFocus={false}
        interval={5000}
        transitionTime={500}
        animationHandler="fade"
        swipeable={false}
      >
        {sliders
          .filter(({ is_active }) => is_active === true)
          .map(function ({
            id,
            name,
            imageProps,
            title,
            subtitle,
            link_to,
            button_text,
            text_color,
          }) {
            return (
              <div
                key={id}
                css={{ width: '100%', height: 300, position: 'relative' }}
              >
                {(!!title || !!subtitle || (!!button_text && !!link_to)) && (
                  <div
                    className="container"
                    css={{
                      position: 'relative',
                      zIndex: 1,
                      color: text_color ?? '#fff',
                      height: '100%',
                    }}
                  >
                    <div
                      css={{
                        height: '100%',
                        marginLeft: '5%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        padding: '20px 0 50px 0',

                        '& > *:not(a)': {
                          color: 'inherit',
                          userSelect: 'none',
                        },

                        '@media (min-width: 992px)': {
                          width: '50%',
                        },
                      }}
                    >
                      {!!title && (
                        <h1 css={{ marginBottom: '16px' }}>{title}</h1>
                      )}
                      {!!subtitle && (
                        <p css={{ fontSize: '20px' }}>{subtitle}</p>
                      )}
                      {!!button_text && !!link_to && (
                        <Link
                          href={link_to.replace(
                            new RegExp(
                              `https?:\/\/(${window.location.host}|publiexpe.com)`,
                              'g',
                            ),
                            '',
                          )}
                          passHref
                        >
                          <a
                            className="btn btn-light btn-outline-dark btn-lg"
                            css={{
                              color: '#336188',
                              verticalAlign: 'inherit',
                              marginTop: 'auto',
                            }}
                          >
                            {button_text}
                          </a>
                        </Link>
                      )}
                    </div>
                  </div>
                )}

                <div
                  css={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                  }}
                >
                  <Image
                    {...imageProps}
                    placeholder="blur"
                    layout="fill"
                    objectFit="cover"
                    alt={name}
                  />
                </div>
              </div>
            );
          })}
      </Carousel>
    </div>
  );
}
