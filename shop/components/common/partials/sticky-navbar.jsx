import React from 'react';
import { connect } from "react-redux";

// Import Custom Component
import ALink from "../ALink";

function StickyNavbar ( { cartItems } ) {
    function getQtyTotal ( items ) {
        let total = 0;
        if ( items ) {
            for ( let i = 0; i < items.length; i++ ) {
                total += parseInt( items[ i ].qty, 10 );
            }
        }
        return total;
    }

    return (
        <div className="sticky-navbar">
            <div className="sticky-info">
                <ALink href="/"><i className="icon-home"></i>Home</ALink>
            </div>
            <div className="sticky-info">
                <ALink href="/shop" className=""><i className="icon-bars"></i>Categories</ALink>
            </div>
            <div className="sticky-info">
                <ALink href="/pages/wishlist" className=""><i className="icon-wishlist-2"></i>Wishlist</ALink>
            </div>
            <div className="sticky-info">
                <ALink href="/pages/login" className=""><i className="icon-user-2"></i>Account</ALink>
            </div>
            <div className="sticky-info">
                <ALink href="/pages/cart" className="">
                    <i className="icon-shopping-cart position-relative">
                        <span className="cart-count badge-circle">{ getQtyTotal( cartItems ) }</span>
                    </i>Cart
                </ALink>
            </div>
        </div>
    )
}

function mapStateToProps ( state ) {
    return {
        cartItems: state.cartlist.cart ? state.cartlist.cart : []
    }
}

export default connect( mapStateToProps, null )( StickyNavbar );