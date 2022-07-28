import React from 'react';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Action
import { actions as ModalAction } from '../../../store/modal';

// Import Custom Component
import ALink from '../../common/ALink';
import OwlCarousel from '../../features/owl-carousel';

function BlogSingle(props) {
  const { blog, loading } = props;

  let date = new Date(blog && blog.date);
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

  return loading ? (
    <div className="skel-post"></div>
  ) : (
    <>
      <article className="post single">
        <figure
          className="post-media"
          style={{
            paddingTop: `${
              (100 * blog.picture[0].height) / blog.picture[0].width
            }%`,
          }}
        >
          {blog.picture ? (
            blog.picture.length > 1 ? (
              <OwlCarousel
                adClass="owl-theme post-slider show-nav-hover"
                options={{ nav: true, dots: false }}
              >
                {blog.picture.map((picture, index) => (
                  <LazyLoadImage
                    alt="post_image"
                    src={process.env.NEXT_PUBLIC_ASSET_URI + picture.url}
                    threshold={500}
                    width="100%"
                    height="100%"
                    effect="blur"
                    key={'blog' + index}
                  />
                ))}
              </OwlCarousel>
            ) : (
              <LazyLoadImage
                alt="post_image"
                src={process.env.NEXT_PUBLIC_ASSET_URI + blog.picture[0].url}
                threshold={500}
                width="100%"
                height="100%"
                effect="blur"
              />
            )
          ) : (
            ''
          )}

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
        <div className="post-body">
          <div className="post-date">
            <span className="day">{`${
              date.getUTCDate() < 10
                ? '0' + date.getUTCDate()
                : date.getUTCDate()
            }`}</span>
            <span className="month">{monthArray[date.getUTCMonth()]}</span>
          </div>

          <h2 className="post-title">
            <ALink href="#">{blog.title}</ALink>
          </h2>

          <div className="post-meta">
            <ALink href="#" className="hash-scroll">
              <span>{blog.comments}</span> Comments
            </ALink>
          </div>

          <div className="post-content">
            <p>{blog.content}</p>

            <h3>
              “ Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model search for evolved over
              sometimes by accident, sometimes on purpose ”
            </h3>

            <p>
              Aenean lorem diam, venenatis nec venenatis id, adipiscing ac
              massa. Nam vel dui eget justo dictum pretium a rhoncus ipsum.
              Donec venenatis erat tincidunt nunc suscipit, sit amet bibendum
              lacus posuere. Sed scelerisque, dolor a pharetra sodales, mi augue
              consequat sapien, et interdum tellus leo et nunc. Nunc imperdiet
              eu libero ut imperdiet.
            </p>
          </div>

          <div className="post-share">
            <h3 className="d-flex align-items-center">
              <i className="fas fa-share"></i>
              Share this post
            </h3>

            <div className="social-icons">
              <ALink
                href="#"
                className="social-icon social-facebook"
                title="Facebook"
              >
                <i className="icon-facebook"></i>
              </ALink>
              <ALink
                href="#"
                className="social-icon social-twitter"
                title="Twitter"
              >
                <i className="icon-twitter"></i>
              </ALink>
              <ALink
                href="#"
                className="social-icon social-linkedin"
                title="Linkedin"
              >
                <i className="fab fa-linkedin-in"></i>
              </ALink>

              <ALink href="#" className="social-icon social-mail" title="Email">
                <i className="icon-mail-alt"></i>
              </ALink>
            </div>
          </div>

          <div className="post-author">
            <h3>
              <i className="far fa-user"></i>Author
            </h3>

            <div className="media-with-lazy">
              <figure className="mb-0">
                <ALink href="#">
                  <LazyLoadImage
                    alt="author"
                    src="images/blog/author.jpg"
                    threshold={500}
                    width="100%"
                    height={80}
                    effect="blur"
                  />
                </ALink>
              </figure>
            </div>

            <div className="author-content">
              <h4>
                <ALink href="#">Jone Doe</ALink>
              </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                viverra euismod odio, gravida pellentesque urna varius vitae.
                Sed dui lorem, adipiscing in adipiscing et, interdum nec metus.
                Mauris ultricies, justo eu convallis placerat, felis enim ornare
                nisi, vitae mattis nulla ante id dui.
              </p>
            </div>
          </div>

          <div className="comment-respond">
            <h3>Leave a Reply</h3>

            <form action="#">
              <p>
                Your email address will not be published. Required fields are
                marked *
              </p>

              <div className="form-group">
                <label>Comment</label>
                <textarea
                  cols="30"
                  rows="1"
                  className="form-control"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" required />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input type="url" className="form-control" />
              </div>

              <div className="form-group-custom-control mb-2">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="save-name"
                  />
                  <label className="custom-control-label" htmlFor="save-name">
                    Save my name, email, and website in this browser for the
                    next time I comment.
                  </label>
                </div>
              </div>

              <div className="form-footer my-0">
                <button type="submit" className="btn btn-sm btn-primary">
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </article>
    </>
  );
}

export default connect(null, ModalAction)(BlogSingle);
