import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import ALink from '../../components/common/ALink';
import Qty from '../../components/partials/product/qty';
import { actions as CartAction } from '../../store/cart';
import { getCartTotal } from '../../utils';

function Cart(props) {
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    setCartList([...props.cart]);
  }, [props.cart]);

  function removeFromCart(item, id) {
    props.removeFromCart(item);
  }

  function onChangeQty(id, qty) {
    setCartList(
      cartList.map((item, index) => {
        return index === id ? { ...item, qty: qty } : item;
      }),
    );
  }

  function updateCart() {
    props.updateCart(cartList);
  }

  return (
    <main className="main">
      <div className="container">
        <ul className="checkout-progress-bar d-flex justify-content-center flex-wrap">
          <li className="active">
            <ALink href="/pages/cart">Shopping Cart</ALink>
          </li>
          <li>
            <ALink href="/pages/checkout">Checkout</ALink>
          </li>
          <li className="disabled">
            <ALink href="#">Order Complete</ALink>
          </li>
        </ul>

        {cartList.length === 0 ? (
          <div className="cart-table-container">
            <div className="table table-cart">
              <div className="cart-empty-page text-center">
                <i className="icon-bag-2"></i>
                <p>No products added to the cart</p>
                <ALink
                  href="/shop"
                  className="btn btn-dark btn-add-cart product-type-simple btn-shop font1"
                >
                  return to shop
                </ALink>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-table-container">
                <table className="table table-cart">
                  <thead>
                    <tr>
                      <th className="thumbnail-col"></th>
                      <th className="product-col">Product</th>
                      <th className="price-col">Price</th>
                      <th className="qty-col">Quantity</th>
                      <th className="text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartList.map((item, index) => (
                      <tr key={'cart-item' + index} className="product-row">
                        <td>
                          <figure className="product-image-container">
                            <ALink
                              href={`/product/default/${item.slug}`}
                              className="product-image"
                            >
                              <img
                                src={ item.variants[item.index].image }
                                alt="product"
                              />
                            </ALink>

                            <a
                              href="#"
                              className="btn-remove icon-cancel"
                              title="Remove Product"
                              onClick={e => {
                                e.preventDefault();
                                removeFromCart(item, index);
                              }}
                            ></a>
                          </figure>
                        </td>
                        <td className="product-col">
                          <h5 className="product-title">
                            <ALink href={`/product/default/${item.slug}`}>
                              {item.variants[item.index].variant_name}
                            </ALink>
                          </h5>
                        </td>
                        <td>${item.price}</td>
                        <td>
                          <Qty
                            value={item.qty}
                            max={item.variants[item.index].stock}
                            onChangeQty={qty => onChangeQty(index, qty)}
                          />
                        </td>
                        <td className="text-right">
                          <span className="subtotal-price">
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
                    <tr>
                      <td colSpan="5" className="clearfix">
                        <div className="float-left">
                          <div className="cart-discount">
                            <form action="#">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Coupon Code"
                                  required
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-sm" type="submit">
                                    Apply Coupon
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>

                        <div className="float-right">
                          <button
                            type="submit"
                            className="btn btn-shop btn-update-cart"
                            onClick={updateCart}
                          >
                            Update Cart
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="cart-summary">
                <h3>CART TOTALS</h3>

                <table className="table table-totals">
                  <tbody>
                    <tr>
                      <td>Subtotal</td>
                      <td>${getCartTotal(cartList).toFixed(2)}</td>
                    </tr>

                    <tr>
                      <td colSpan="2" className="text-left">
                        <h4>Shipping</h4>

                        <div className="form-group form-group-custom-control">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              name="radio"
                              defaultChecked
                            />
                            <label className="custom-control-label">
                              Local pickup
                            </label>
                          </div>
                        </div>

                        <div className="form-group form-group-custom-control mb-0">
                          <div className="custom-control custom-radio mb-0">
                            <input
                              type="radio"
                              name="radio"
                              className="custom-control-input"
                            />
                            <label className="custom-control-label">
                              Flat rate
                            </label>
                          </div>
                        </div>

                        <form action="#">
                          <div className="form-group form-group-sm">
                            <label>
                              Shipping to <strong>NY.</strong>
                            </label>
                            <div className="select-custom">
                              <select className="form-control form-control-sm">
                                <option value="USA">United States (US)</option>
                                <option value="Turkey">Turkey</option>
                                <option value="China">China</option>
                                <option value="Germany">Germany</option>
                              </select>
                            </div>
                          </div>

                          <div className="form-group form-group-sm">
                            <div className="select-custom">
                              <select className="form-control form-control-sm">
                                <option value="NY">New York</option>
                                <option value="CA">California</option>
                                <option value="TX">Texas</option>
                              </select>
                            </div>
                          </div>

                          <div className="form-group form-group-sm">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Town / City"
                              required
                            />
                          </div>

                          <div className="form-group form-group-sm">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="ZIP"
                              required
                            />
                          </div>

                          <button
                            type="submit"
                            className="btn btn-shop btn-update-total"
                          >
                            Update Totals
                          </button>
                        </form>
                      </td>
                    </tr>
                  </tbody>

                  <tfoot>
                    <tr>
                      <td>Total</td>
                      <td>${getCartTotal(cartList).toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>

                <div className="checkout-methods">
                  <ALink href="checkout" className="btn btn-block btn-dark">
                    Proceed to Checkout
                    <i className="fa fa-arrow-right"></i>
                  </ALink>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6"></div>
    </main>
  );
}

const mapStateToProps = state => {
  return {
    cart: state.cartlist.cart ? state.cartlist.cart : [],
  };
};

export default connect(mapStateToProps, { ...CartAction })(Cart);
