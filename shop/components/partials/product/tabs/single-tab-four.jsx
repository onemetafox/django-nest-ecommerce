import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ALink from '../../../common/ALink';

function SingleTab(props) {
  const { adClass = '', product } = props;

  function activeHandler(e) {
    e.preventDefault();
    document.querySelector('.add-product-review .active') &&
      document
        .querySelector('.add-product-review .active')
        .classList.remove('active');
    e.currentTarget.classList.add('active');
  }

  return (
    <>
      <div className="skel-pro-tabs"></div>
      {product && (
        <Tabs
          className={`product-single-tabs ${adClass}`}
          selectedTabClassName="active"
          selectedTabPanelClassName="show"
        >
          <div className="row">
            <div className="col-lg-2">
              <TabList className="nav nav-tabs">
                <Tab className="nav-item">
                  <ALink href="#" className="nav-link">
                    Description
                  </ALink>
                </Tab>
                <Tab className="nav-item">
                  <ALink href="#" className="nav-link">
                    Size Guide
                  </ALink>
                </Tab>
                <Tab className="nav-item">
                  <ALink href="#" className="nav-link">
                    Reviews ({product.reviews})
                  </ALink>
                </Tab>
              </TabList>
            </div>

            <div className="col-lg-10">
              <div className="tab-content">
                <TabPanel className="tab-pane fade">
                  <div className="product-desc-content">
                    <p>{product.short_description}</p>
                    <ul>
                      <li>
                        Any Product types that You want - Simple, Configurable
                      </li>
                      <li>Downloadable/Digital Products, Virtual Products</li>
                      <li>Inventory Management with Backordered items</li>
                    </ul>
                    <p>
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.{' '}
                    </p>
                  </div>
                </TabPanel>

                <TabPanel className="tab-pane fade">
                  <div className="product-size-content">
                    <div className="row">
                      <div className="col-md-4">
                        <img
                          src="images/products/single/body-shape.png"
                          alt="body shape"
                          width="217"
                          height="398"
                        />
                      </div>

                      <div className="col-md-8">
                        <table className="table table-size">
                          <thead>
                            <tr>
                              <th>SIZE</th>
                              <th>CHEST (in.)</th>
                              <th>WAIST (in.)</th>
                              <th>HIPS (in.)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>XS</td>
                              <td>34-36</td>
                              <td>27-29</td>
                              <td>34.5-36.5</td>
                            </tr>
                            <tr>
                              <td>S</td>
                              <td>36-38</td>
                              <td>29-31</td>
                              <td>36.5-38.5</td>
                            </tr>
                            <tr>
                              <td>M</td>
                              <td>38-40</td>
                              <td>31-33</td>
                              <td>38.5-40.5</td>
                            </tr>
                            <tr>
                              <td>L</td>
                              <td>40-42</td>
                              <td>33-36</td>
                              <td>40.5-43.5</td>
                            </tr>
                            <tr>
                              <td>XL</td>
                              <td>42-45</td>
                              <td>36-40</td>
                              <td>43.5-47.5</td>
                            </tr>
                            <tr>
                              <td>XLL</td>
                              <td>45-48</td>
                              <td>40-44</td>
                              <td>47.5-51.5</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel className="tab-pane fade">
                  <div className="product-reviews-content">
                    {product.reviews !== 0 ? (
                      <>
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
                                        width: `${20 * product.ratings}%`,
                                      }}
                                    ></span>
                                    <span className="tooltiptext tooltip-top">
                                      {product.ratings.toFixed(2)}
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
                      </>
                    ) : (
                      <>
                        <h3 className="reviews-title">Review</h3>
                        <p>There are no reviews yet.</p>
                      </>
                    )}

                    <div className="divider"></div>

                    <div className="add-product-review">
                      <div className="add-product-review">
                        <h3 className="review-title">Add a review</h3>

                        <form action="#" className="comment-form m-0">
                          <div className="rating-form">
                            <label htmlFor="rating">
                              Your rating <span className="required">*</span>
                            </label>
                            <span className="rating-stars">
                              <a
                                className="star-1"
                                href="#"
                                onClick={activeHandler}
                              >
                                1
                              </a>
                              <a
                                className="star-2"
                                href="#"
                                onClick={activeHandler}
                              >
                                2
                              </a>
                              <a
                                className="star-3"
                                href="#"
                                onClick={activeHandler}
                              >
                                3
                              </a>
                              <a
                                className="star-4"
                                href="#"
                                onClick={activeHandler}
                              >
                                4
                              </a>
                              <a
                                className="star-5"
                                href="#"
                                onClick={activeHandler}
                              >
                                5
                              </a>
                            </span>
                          </div>

                          <div className="form-group">
                            <label>
                              Your review <span className="required">*</span>
                            </label>
                            <textarea
                              cols="5"
                              rows="6"
                              className="form-control form-control-sm"
                            ></textarea>
                          </div>

                          <div className="row">
                            <div className="col-md-6 col-xl-12">
                              <div className="form-group">
                                <label>
                                  Name <span className="required">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  required
                                />
                              </div>
                            </div>

                            <div className="col-md-6 col-xl-12">
                              <div className="form-group">
                                <label>
                                  Email <span className="required">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  required
                                />
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="save-name"
                                />
                                <label
                                  className="custom-control-label mb-0"
                                  htmlFor="save-name"
                                >
                                  Save my name, email, and website in this
                                  browser for the next time I comment.
                                </label>
                              </div>
                            </div>
                          </div>

                          <input
                            type="submit"
                            className="btn btn-primary"
                            value="Submit"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </div>
            </div>
          </div>
        </Tabs>
      )}
    </>
  );
}

export default SingleTab;
