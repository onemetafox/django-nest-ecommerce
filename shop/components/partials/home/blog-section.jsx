import React from 'react';
import Reveal from 'react-awesome-reveal';

// Import Custom Component
import OwlCarousel from '../../features/owl-carousel';
import BlogTypeOne from '../../features/blogs/blog-type-one';

// Import Utils
import { fadeIn } from '../../../utils/data/keyframes';
import { blogSlider } from '../../../utils/data/slider';

export default function BlogSection(props) {
  const { loading, blog } = props;
  const sliderOptions = {
    ...blogSlider,
    responsive: { ...blogSlider.responsive, 1200: { items: 4 } },
  };

  return (
    <section className="blog-section pb-0">
      <div className="container">
        <h2 className="section-title heading-border border-0 ls-0">
          Latest News
        </h2>

        <OwlCarousel options={sliderOptions}>
          {loading
            ? [0, 1, 2, 3, 4].map((item, index) => (
                <div
                  className="skel-pro skel-pro-grid"
                  key={'product-one' + index}
                ></div>
              ))
            : blog.slice(0, 4).map((item, index) => (
                <Reveal
                  keyframes={fadeIn}
                  delay={100}
                  duration={1000}
                  triggerOnce
                  key={'product-one' + index}
                >
                  <BlogTypeOne blog={item} />
                </Reveal>
              ))}
        </OwlCarousel>
      </div>
    </section>
  );
}
