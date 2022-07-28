import { connect } from 'react-redux';

import SlideToggle from 'react-slide-toggle';
import ALink from '../../components/common/ALink';
import { getCartTotal } from '../../utils';

function CheckOut({ cartList }) {
  return (
    <main className="main main-test">
      <div className="container checkout-container">
        <ul className="checkout-progress-bar d-flex justify-content-center flex-wrap">
          <li>
            <ALink href="cart">Shopping Cart</ALink>
          </li>
          <li className="active">
            <ALink href="checkout">Checkout</ALink>
          </li>
          <li className="disabled">
            <ALink href="#">Order Complete</ALink>
          </li>
        </ul>
        {cartList.length === 0 ? (
          <div className="cart-empty-page text-center">
            <p className="noproduct-msg mb-2">
              Checkout is not available while your cart is empty.
            </p>
            <i className="icon-bag-2"></i>
            <p>No products added to the cart</p>
            <ALink
              href="/shop"
              className="btn btn-dark btn-add-cart product-type-simple btn-shop font1"
            >
              return to shop
            </ALink>
          </div>
        ) : (
          <>
            <div className="checkout-discount">
              <SlideToggle duration={300} collapsed>
                {({ onToggle, setCollapsibleElement, toggleState }) => (
                  <h4>
                    Returning customer?{' '}
                    <button
                      className="btn btn-link btn-toggle"
                      onClick={onToggle}
                    >
                      Login
                    </button>
                    <div
                      className="login-form-container"
                      ref={setCollapsibleElement}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="login-section feature-box">
                        <div className="feature-box-content">
                          <form action="#" id="login-form">
                            <p className="ls-0">
                              If you have shopped with us before, please enter
                              your details below. If you are a new customer,
                              please proceed to the Billing & Shipping section.
                            </p>

                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="mb-0 pb-1">
                                    Username or email{' '}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    required
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="mb-0 pb-1">
                                    Password <span className="required">*</span>
                                  </label>
                                  <input
                                    type="password"
                                    className="form-control"
                                    required
                                  />
                                </div>
                              </div>
                            </div>

                            <button type="submit" className="btn">
                              LOGIN
                            </button>

                            <div className="form-footer mb-1">
                              <div className="custom-control custom-checkbox mb-0 mt-0">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="lost-password"
                                />
                                <label
                                  className="custom-control-label mb-0"
                                  htmlFor="lost-password"
                                >
                                  Remember me
                                </label>
                              </div>

                              <ALink
                                href="forgot-password"
                                className="forget-password ls-0"
                              >
                                Lost your password?
                              </ALink>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </h4>
                )}
              </SlideToggle>
            </div>
            <div className="checkout-discount">
              <SlideToggle duration={200} collapsed>
                {({ onToggle, setCollapsibleElement, toggleState }) => (
                  <h4>
                    Have a coupon?{' '}
                    <button
                      className="btn btn-link btn-toggle"
                      onClick={onToggle}
                    >
                      ENTER YOUR CODE
                    </button>
                    <div
                      className="feature-box feature-coupon"
                      ref={setCollapsibleElement}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="feature-box-content">
                        <p className="ls-0">
                          If you have a coupon code, please apply it below.
                        </p>

                        <form action="#">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control htmlForm-control-sm w-auto"
                              placeholder="Coupon code"
                              required
                            />
                            <div className="input-group-append">
                              <button className="btn btn-sm mt-0" type="submit">
                                Apply Coupon
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </h4>
                )}
              </SlideToggle>
            </div>
            <div className="row">
              <div className="col-lg-7">
                <ul className="checkout-steps">
                  <li>
                    <h2 className="step-title">Billing details</h2>

                    <form action="#" id="checkout-form">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              First name{' '}
                              <abbr className="required" title="required">
                                *
                              </abbr>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Last name{' '}
                              <abbr className="required" title="required">
                                *
                              </abbr>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Company name (optional)</label>
                        <input type="text" className="form-control" />
                      </div>

                      <div className="select-custom">
                        <label>
                          Country / Region{' '}
                          <abbr className="required" title="required">
                            *
                          </abbr>
                        </label>
                        <select name="orderby" className="form-control">
                          <option value="" defaultValue="selected">
                            Vanuatu
                          </option>
                          <option value="1">Brunei</option>
                          <option value="2">Bulgaria</option>
                          <option value="3">Burkina Faso</option>
                          <option value="4">Burundi</option>
                          <option value="5">Cameroon</option>
                        </select>
                      </div>

                      <div className="form-group mb-1 pb-2">
                        <label>
                          Street address{' '}
                          <abbr className="required" title="required">
                            *
                          </abbr>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="House number and street name"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Apartment, suite, unite, etc. (optional)"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Town / City{' '}
                          <abbr className="required" title="required">
                            *
                          </abbr>
                        </label>
                        <input type="text" className="form-control" required />
                      </div>

                      <div className="select-custom">
                        <label>
                          State / County{' '}
                          <abbr className="required" title="required">
                            *
                          </abbr>
                        </label>
                        <select name="orderby" className="form-control">
                          <option value="" defaultValue="selected">
                            NY
                          </option>
                          <option value="1">Brunei</option>
                          <option value="2">Bulgaria</option>
                          <option value="3">Burkina Faso</option>
                          <option value="4">Burundi</option>
                          <option value="5">Cameroon</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          Postcode / Zip{' '}
                          <abbr className="required" title="required">
                            *
                          </abbr>
                        </label>
                        <input type="text" className="form-control" required />
                      </div>

                      <div className="form-group">
                        <label>
                          Phone{' '}
                          <abbr className="required" title="required">
                            *
                          </abbr>
                        </label>
                        <input type="tel" className="form-control" required />
                      </div>

                      <div className="form-group">
                        <label>
                          Email address{' '}
                          <abbr className="required" title="required">
                            *
                          </abbr>
                        </label>
                        <input type="email" className="form-control" required />
                      </div>
                      <SlideToggle duration={200} collapsed>
                        {({ onToggle, setCollapsibleElement }) => (
                          <div className="form-group mb-1">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="create-account"
                                onChange={onToggle}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="create-account"
                              >
                                Create an account?
                              </label>
                            </div>
                            <div
                              className="form-group"
                              ref={setCollapsibleElement}
                              style={{ overflow: 'hidden' }}
                            >
                              <label className="mt-14">
                                Create account password{' '}
                                <abbr className="required" title="required">
                                  *
                                </abbr>
                              </label>
                              <input
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                required
                              />
                            </div>
                          </div>
                        )}
                      </SlideToggle>
                      <SlideToggle duration={300} collapsed>
                        {({ onToggle, setCollapsibleElement }) => (
                          <div className="form-group mb-11">
                            <div className="custom-control custom-checkbox mt-0 address-box">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="different-shipping"
                                onChange={onToggle}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="different-shipping"
                              >
                                Ship to a different address?
                              </label>
                            </div>
                            <div
                              className="shipping-info"
                              ref={setCollapsibleElement}
                              style={{ overflow: 'hidden' }}
                            >
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>
                                      First name{' '}
                                      <abbr
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </abbr>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>
                                      Last name{' '}
                                      <abbr
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </abbr>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="form-group">
                                <label>Company name (optional)</label>
                                <input type="text" className="form-control" />
                              </div>

                              <div className="select-custom">
                                <label>
                                  Country / Region{' '}
                                  <span className="required">*</span>
                                </label>
                                <select name="orderby" className="form-control">
                                  <option value="" defaultValue="selected">
                                    Vanuatu
                                  </option>
                                  <option value="1">Brunei</option>
                                  <option value="2">Bulgaria</option>
                                  <option value="3">Burkina Faso</option>
                                  <option value="4">Burundi</option>
                                  <option value="5">Cameroon</option>
                                </select>
                              </div>

                              <div className="form-group mb-1 pb-2">
                                <label>
                                  Street address{' '}
                                  <abbr className="required" title="required">
                                    *
                                  </abbr>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="House number and street name"
                                  required
                                />
                              </div>

                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Apartment, suite, unit, etc. (optional)"
                                  required
                                />
                              </div>

                              <div className="form-group">
                                <label>
                                  Town / City{' '}
                                  <abbr className="required" title="required">
                                    *
                                  </abbr>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>

                              <div className="select-custom">
                                <label>
                                  State / County{' '}
                                  <abbr className="required" title="required">
                                    *
                                  </abbr>
                                </label>
                                <select name="orderby" className="form-control">
                                  <option value="" defaultValue="selected">
                                    NY
                                  </option>
                                  <option value="1">Brunei</option>
                                  <option value="2">Bulgaria</option>
                                  <option value="3">Burkina Faso</option>
                                  <option value="4">Burundi</option>
                                  <option value="5">Cameroon</option>
                                </select>
                              </div>

                              <div className="form-group">
                                <label>
                                  Postcode / ZIP{' '}
                                  <abbr className="required" title="required">
                                    *
                                  </abbr>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </SlideToggle>

                      <div className="form-group">
                        <label className="order-comments">
                          Order notes (optional)
                        </label>
                        <textarea
                          className="form-control"
                          placeholder="Notes about your order, e.g. special notes for delivery."
                          required
                        ></textarea>
                      </div>
                    </form>
                  </li>
                </ul>
              </div>

              <div className="col-lg-5">
                <div className="order-summary">
                  <h3>YOUR ORDER</h3>

                  <table className="table table-mini-cart">
                    <thead>
                      <tr>
                        <th colSpan="2">Product</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartList.map((item, index) => (
                        <tr key={'checks' + index}>
                          <td className="product-col">
                            <h2 className="product-title">
                              {item.variants[item.index].variant_name + '×' + item.qty}
                            </h2>
                          </td>

                          <td className="price-col">
                            <span>${item.price}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="cart-subtotal">
                        <td>
                          <h4>Subtotal</h4>
                        </td>

                        <td className="price-col">
                          <span>${getCartTotal(cartList).toFixed(2)}</span>
                        </td>
                      </tr>
                      <tr className="order-shipping">
                        <td className="text-left" colSpan="2">
                          <h4 className="m-b-sm">Shipping</h4>
                          <div className="form-group form-group-custom-control">
                            <div className="custom-control custom-radio d-flex">
                              <input
                                type="radio"
                                className="custom-control-input"
                                name="radio"
                                defaultChecked
                              />
                              <label className="custom-control-label">
                                Local Pickup
                              </label>
                            </div>
                          </div>

                          <div className="form-group form-group-custom-control mb-0">
                            <div className="custom-control custom-radio mb-0 d-flex">
                              <input
                                type="radio"
                                name="radio"
                                className="custom-control-input"
                              />
                              <label className="custom-control-label">
                                Flat Rate
                              </label>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr className="order-total">
                        <td>
                          <h4>Total</h4>
                        </td>
                        <td>
                          <b className="total-price">
                            <span>${getCartTotal(cartList).toFixed(2)}</span>
                          </b>
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                  <div className="payment-methods">
                    <h4 className="">Payment methods</h4>
                    <div className="info-box with-icon p-0">
                      <p>
                        Sorry, it seems that there are no available payment
                        methods for your state. Please contact us if you require
                        assistance or wish to make alternate arrangements.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    value="Place Order"
                    name="form-control"
                    className="btn btn-dark btn-place-order"
                  >
                    Place order
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

const mapStateToProps = state => {
  return {
    cartList: state.cartlist.cart ? state.cartlist.cart : [],
  };
};

export default connect(mapStateToProps)(CheckOut);
