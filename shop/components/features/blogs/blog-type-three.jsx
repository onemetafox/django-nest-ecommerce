import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Custom Component
import ALink from '../../common/ALink';

function BlogTypeThree(props) {
  const { blog } = props;
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

  return (
    <article className="post media-with-lazy">
      <figure className="post-media zoom-effect">
        {blog.picture ? (
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
        ) : (
          ''
        )}
      </figure>
      <div className="post-body">
        <div className="post-date">
          <span className="day">{`${
            date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate()
          }`}</span>
          <span className="month">{monthArray[date.getUTCMonth()]}</span>
        </div>

        <h2 className="post-title">
          <ALink href={`/pages/blog/${blog.slug}`}>{blog.title}</ALink>
        </h2>

        <div className="post-content">
          <p>{blog.content}</p>
          <ALink
            href={`/pages/blog/${blog.slug}`}
            className="read-more d-flex align-items-center"
          >
            Read More <i className="fas fa-angle-right"></i>
          </ALink>
        </div>
      </div>
    </article>
  );
}

export default BlogTypeThree;
