import SlideToggle from 'react-slide-toggle';

import React from 'react';

const ProductReviews = props => {
  const { reviews, rating } = props;

  if (!reviews) return null;
  return (
    reviews && (
      <SlideToggle collapsed={true}>
        {({ onToggle, setCollapsibleElement, toggleState }) => (
          <div className="product-collapse-panel">
            <h3 className="product-collapse-title" onClick={onToggle}>
              <ALink
                className={`toggle-button ${toggleState.toLowerCase()}`}
                href="#"
              >
                Reviews ({reviews.length})
              </ALink>
            </h3>

            <div className="product-collapse-body" ref={setCollapsibleElement}>
              <div className="collapse-body-wrapper pl-0">
                <div className="product-reviews-content">
                  <h3 className="reviews-title">
                    1 review for Men Black Sports Shoes
                  </h3>

                  <div className="comment-list">
                    <div className="comments">
                      <figure className="img-thumbnail">
                        <img
                          src="images/blog/author.jpg"
                          alt="author"
                          width="80"
                          height="80"
                        />
                      </figure>

                      <div className="comment-block">
                        <div className="comment-header">
                          <div className="comment-arrow"></div>

                          <div className="ratings-container float-sm-right">
                            <div className="product-ratings">
                              <span
                                className="ratings"
                                style={{
                                  width: `${20 * parseFloat(rating)}%`,
                                }}
                              ></span>
                              <span className="tooltiptext tooltip-top">
                                {parseFloat(rating).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <span className="comment-by">
                            <strong>Joe Doe</strong> – April 12, 2018
                          </span>
                        </div>

                        <div className="comment-content">
                          <p>Excellent.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </SlideToggle>
    )
  );
};

export default ProductReviews;
