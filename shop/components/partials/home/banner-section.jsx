import React from 'react';
import Image from 'next/image';
import Reveal from 'react-awesome-reveal';

import OwlCarousel from '../../features/owl-carousel';
import { fadeInLeftShorter } from '../../../utils/data/keyframes';
import { BannerCard } from '../../common/banner-card';

export function BannerSection({ banners }) {
  if (
    !Array.isArray(banners) ||
    !banners.every(slider => typeof slider === 'object')
  ) {
    return <div>Banners Error!</div>;
  }

  return (
    <div
      className="banners-container container"
      css={{
        padding: 16,
        paddingLeft: 15,
        width: '100%',
        margin: '0 auto',
        overflow: 'hidden',

        '.owl-carousel .owl-stage-outer': {
          overflow: 'visible',
        },

        '@media (min-width: 992px)': {
          maxWidth: '100%',
          paddingLeft: 30,
        },

        '@media (min-width: 1200px)': {
          maxWidth: 1140,
        },
        '@media (min-width: 1220px)': {
          maxWidth: 1200,
        },
      }}
    >
      <OwlCarousel
        adClass="banners-slider"
        options={{
          margin: 10,
          items: 2,
          responsive: {
            700: {
              items: 3,
            },
            1200: {
              items: 4,
            },
          },
        }}
      >
        {banners
          .filter(({ is_active }) => is_active === true)
          .map(({ id, imageProps, title, link_to }) => (
            <Reveal
              keyframes={fadeInLeftShorter}
              delay={500}
              duration={1000}
              triggerOnce
              key={id}
            >
              <BannerCard
                title={title}
                href={link_to.replace(
                  new RegExp(
                    `https?:\/\/(${window.location.host}|publiexpe.com)`,
                    'g',
                  ),
                  '',
                )}
              >
                <Image
                  {...imageProps}
                  placeholder="blur"
                  layout="fill"
                  objectFit="cover"
                  alt={title}
                />
              </BannerCard>

            </Reveal>
          ))}
      </OwlCarousel>
    </div>
  );
}
