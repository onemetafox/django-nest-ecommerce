import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

// Import Actions
import { actions as CartAction } from "../../../store/cart";

// Import Custom Component
import ALink from '../ALink';

// Import Utils
import { getCartTotal } from '../../../utils';

function CartMenu ( props ) {
    const { cartItems } = props;

    const router = useRouter();

    useEffect( () => {
        router.events.on( 'routeChangeStart', cartClose );

        return () => {
            router.events.off( 'routeChangeStart', cartClose );
        }
    }, [] )

    function toggleCart ( e ) {
        e.preventDefault();
        document.querySelector( 'body' ).classList.toggle( 'cart-opened' );
    }

    function cartClose () {
        document.querySelector( 'body' ).classList.contains( 'cart-opened' ) && document.querySelector( 'body' ).classList.remove( 'cart-opened' );
    }

    function getQtyTotal ( items ) {
        let total = 0;
        if ( items ) {
            for ( let i = 0; i < items.length; i++ ) {
                total += parseInt( items[ i ].qty, 10 );
            }
        }
        return total;
    }

    function removeFromCart ( e, cart ) {
        e.preventDefault();
        props.removeFromCart( cart );
    }

    return (
        <div className="dropdown cart-dropdown">
            <a href="#" title="Cart" className="dropdown-toggle dropdown-arrow cart-toggle" onClick={ toggleCart }>
                <i className="minicart-icon"></i>
                <span className="cart-count badge-circle">{ getQtyTotal( cartItems ) }</span>
            </a>

            <div className="cart-overlay" onClick={ cartClose }></div>

            <div className="dropdown-menu mobile-cart">
                <a href="#" title="Close (Esc)" className="btn-close" onClick={ e => { cartClose(); e.preventDefault(); } }>×</a>

                <div className="dropdownmenu-wrapper">
                    <div className="dropdown-cart-header">Shopping Cart</div>

                    {
                        cartItems.length > 0 ?
                            <>
                                <div className="dropdown-cart-products">
                                    {
                                        cartItems.map( ( cart, index ) => (
                                            <div className="product" key={ "cartItems" + index }>
                                                <div className="product-details">
                                                    <h2 className="product-title">
                                                        {
                                                            cart.index > -1 ?
                                                                !cart.variants[ cart.index ].color ?
                                                                    <ALink href={ `/product/default/${cart.slug}` }>{ cart.variants[ cart.index ].variant_name + ' - ' + cart.variants[ cart.index ].size.size_name }</ALink>
                                                                    :
                                                                    !cart.variants[ cart.index ].size ?
                                                                        <ALink href={ `/product/default/${cart.slug}` }>{ cart.variants[ cart.index ].variant_name + ' - ' + cart.variants[ cart.index ].color.color_name }</ALink>
                                                                        :
                                                                        <ALink href={ `/product/default/${cart.slug}` }>{ cart.variants[ cart.index ].variant_name + ' - ' + cart.variants[ cart.index ].color.name + ', ' + cart.variants[ cart.index ].size.size_name }</ALink>
                                                                :
                                                                <ALink href={ `/product/default/${cart.slug}` }>{ cart.variants[ cart.index ].variant_name }</ALink>
                                                        }
                                                    </h2>

                                                    <span className="cart-product-info">
                                                        <span className="cart-product-qty">{ cart.qty }</span> × ${ cart.max_price.toFixed( 2 ) }
                                                    </span>
                                                </div>

                                                <figure className="product-image-container">
                                                    <ALink href={ `/product/default/${cart.slug}` } className="product-image">
                                                        <img src={ cart.variants[ cart.index ].image } width="78" height="78" alt="product" />
                                                    </ALink>
                                                    <a href="#" className="btn-remove icon-cancel" title="Remove Product" onClick={ e => { removeFromCart( e, cart ); } }></a>
                                                </figure>
                                            </div>
                                        ) )
                                    }
                                </div>

                                <div className="dropdown-cart-total">
                                    <span>SUBTOTAL:</span>

                                    <span className="cart-total-price float-right">${ getCartTotal( cartItems ).toFixed( 2 ) }</span>
                                </div>

                                <div className="dropdown-cart-action">
                                    <ALink href="/pages/cart" className="btn btn-gray btn-block view-cart">View Cart</ALink>
                                    <ALink href="/pages/checkout" className="btn btn-dark btn-block text-white">Checkout</ALink>
                                </div>
                            </>
                            :
                            <p className="pt-3 mt-2">No products in the cart.</p>
                    }
                </div>
            </div>
        </div >
    );
}

function mapStateToProps ( state ) {
    return {
        cartItems: state.cartlist.cart ? state.cartlist.cart : []
    }
}

export default connect( mapStateToProps, CartAction )( CartMenu );