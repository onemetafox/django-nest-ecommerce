import React from 'react';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Custom Component
import ALink from '../../common/ALink';
import OwlCarousel from '../owl-carousel';

// Import Utils
import { postSlider } from '../../../utils/data/slider';

// Import Action
import { actions as ModalAction } from '../../../store/modal';

function BlogTypeOne(props) {
  const { adClass = '', blog } = props;
  let date = new Date(blog.date);
  let monthArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  function openModal(e) {
    e.preventDefault();
    props.showVideo();
  }

  return (
    <article className={`post media-with-lazy ${adClass}`}>
      {blog.picture &&
        (blog.picture.length > 1 ? (
          <OwlCarousel
            adClass="owl-theme post-slider mb-0 show-nav-hover"
            options={postSlider}
          >
            {blog.picture.map((picture, index) => (
              <figure className="post-media zoom-effect" key={('Blog:', index)}>
                <ALink href={`/pages/blog/${blog.slug}`}>
                  <div className="lazy-overlay"></div>

                  <LazyLoadImage
                    alt="post_image"
                    src={process.env.NEXT_PUBLIC_ASSET_URI + picture.url}
                    threshold={500}
                    width="100%"
                    height="auto"
                    effect="blur"
                  />
                </ALink>

                <div className="post-date">
                  <span className="day">{`${
                    date.getUTCDate() < 10
                      ? '0' + date.getUTCDate()
                      : date.getUTCDate()
                  }`}</span>
                  <span className="month">
                    {monthArray[date.getUTCMonth()]}
                  </span>
                </div>

                {blog.video && (
                  <a
                    className="btn-play btn-iframe"
                    onClick={openModal}
                    href="https://www.youtube.com/watch?v=vBPgmASQ1A0"
                  >
                    <i className="fas fa-play"></i>
                  </a>
                )}
              </figure>
            ))}
          </OwlCarousel>
        ) : (
          <figure className="post-media zoom-effect">
            <ALink href={`/pages/blog/${blog.slug}`}>
              <div className="lazy-overlay"></div>

              <LazyLoadImage
                alt="post_image"
                src={process.env.NEXT_PUBLIC_ASSET_URI + blog.picture[0].url}
                threshold={500}
                width="100%"
                height="auto"
                effect="blur"
              />
            </ALink>

            {blog.video && (
              <a
                className="btn-play btn-iframe"
                onClick={openModal}
                href="https://www.youtube.com/watch?v=vBPgmASQ1A0"
              >
                <i className="fas fa-play"></i>
              </a>
            )}

            <div className="post-date">
              <span className="day">{`${
                date.getUTCDate() < 10
                  ? '0' + date.getUTCDate()
                  : date.getUTCDate()
              }`}</span>
              <span className="month">{monthArray[date.getUTCMonth()]}</span>
            </div>
          </figure>
        ))}

      <div className="post-body">
        <h2 className="post-title">
          <ALink href={`/pages/blog/${blog.slug}`}>{blog.title}</ALink>
        </h2>

        <div className="post-content">
          <p>{blog.content}</p>

          <ALink href={`/pages/blog/${blog.slug}`} className="post-comment">
            <span>{blog.comments}</span> Comments
          </ALink>
        </div>
      </div>
    </article>
  );
}

export default connect(null, ModalAction)(BlogTypeOne);
