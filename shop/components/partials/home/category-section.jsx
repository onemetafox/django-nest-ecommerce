import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Reveal from 'react-awesome-reveal';

import OwlCarousel from '../../features/owl-carousel';
import ALink from '../../common/ALink';

// Import Settigns
import { categorySlider } from '../../../utils/data/slider';
import { fadeInUpShorter } from '../../../utils/data/keyframes';

export default function CategorySection() {
  return (
    <div className="category-section">
      <Reveal
        keyframes={fadeInUpShorter}
        delay={100}
        duration={1000}
        triggerOnce
      >
        <h2 className="section-title categories-section-title heading-border border-0 ls-0">
          Browse Our Categories
        </h2>
      </Reveal>

      <Reveal
        keyframes={fadeInUpShorter}
        delay={100}
        duration={1000}
        triggerOnce
      >
        <OwlCarousel
          adClass="categories-slider owl-theme nav-outer show-nav-hover"
          options={categorySlider}
        >
          <div className="product-category">
            <ALink href={{ pathname: '/shop', query: { category: 'dress' } }}>
              <figure>
                <LazyLoadImage
                  alt="category"
                  src="images/home/products/categories/category-1.jpg"
                  width="100%"
                  height="auto"
                  threshold={500}
                  effect="black and white"
                />
              </figure>
              <div className="category-content">
                <h3>Dress</h3>
                <span>
                  <mark className="count">3</mark> products
                </span>
              </div>
            </ALink>
          </div>

          <div className="product-category">
            <ALink href={{ pathname: '/shop', query: { category: 'watches' } }}>
              <figure>
                <LazyLoadImage
                  alt="category"
                  src="images/home/products/categories/category-2.jpg"
                  width="100%"
                  height="auto"
                  threshold={500}
                  effect="black and white"
                />
              </figure>
              <div className="category-content">
                <h3>Watches</h3>
                <span>
                  <mark className="count">3</mark> products
                </span>
              </div>
            </ALink>
          </div>

          <div className="product-category">
            <ALink href={{ pathname: '/shop', query: { category: 'machine' } }}>
              <figure>
                <LazyLoadImage
                  alt="category"
                  src="images/home/products/categories/category-3.jpg"
                  width="100%"
                  height="auto"
                  threshold={500}
                  effect="black and white"
                />
              </figure>
              <div className="category-content">
                <h3>Machine</h3>
                <span>
                  <mark className="count">3</mark> products
                </span>
              </div>
            </ALink>
          </div>

          <div className="product-category">
            <ALink href={{ pathname: '/shop', query: { category: 'sofa' } }}>
              <figure>
                <LazyLoadImage
                  alt="category"
                  src="images/home/products/categories/category-3.jpg"
                  width="100%"
                  height="auto"
                  threshold={500}
                  effect="black and white"
                />
              </figure>
              <div className="category-content">
                <h3>Sofa</h3>
                <span>
                  <mark className="count">3</mark> products
                </span>
              </div>
            </ALink>
          </div>

          <div className="product-category">
            <ALink
              href={{ pathname: '/shop', query: { category: 'headphone' } }}
            >
              <figure>
                <LazyLoadImage
                  alt="category"
                  src="images/home/products/categories/category-4.jpg"
                  width="100%"
                  height="auto"
                  threshold={500}
                  effect="black and white"
                />
              </figure>
              <div className="category-content">
                <h3>Headphone</h3>
                <span>
                  <mark className="count">3</mark> products
                </span>
              </div>
            </ALink>
          </div>

          <div className="product-category">
            <ALink href={{ pathname: '/shop', query: { category: 'sports' } }}>
              <figure>
                <LazyLoadImage
                  alt="category"
                  src="images/home/products/categories/category-5.jpg"
                  width="100%"
                  height="auto"
                  threshold={500}
                  effect="black and white"
                />
              </figure>
              <div className="category-content">
                <h3>Sports</h3>
                <span>
                  <mark className="count">3</mark> products
                </span>
              </div>
            </ALink>
          </div>
        </OwlCarousel>
      </Reveal>
    </div>
  );
}
