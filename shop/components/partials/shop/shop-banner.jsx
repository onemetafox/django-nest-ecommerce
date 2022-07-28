import ALink from '../../common/ALink';

export default function ShopBanner() {
  return (
    <div className="category-banner-container bg-gray">
      <div
        className="category-banner banner text-uppercase"
        style={{
          background: 'no-repeat 60%/cover url(images/banners/banner-top.jpg)',
        }}
      >
        <div className="container position-relative">
          <div className="row">
            <div className="pl-lg-5 pb-5 pb-md-0 col-sm-5 col-xl-4 col-lg-4 offset-1">
              <h3>
                Electronic
                <br />
                Deals
              </h3>
              <ALink href="/shop" className="btn btn-dark" scroll={false}>
                Get Yours!
              </ALink>
            </div>
            <div className="pl-lg-3 col-sm-4 offset-sm-0 offset-1 pt-3">
              <div className="coupon-sale-content">
                <h4 className="m-b-1 coupon-sale-text bg-white text-transform-none">
                  Exclusive COUPON
                </h4>
                <h5 className="mb-2 coupon-sale-text d-block ls-10 p-0">
                  <i className="ls-0">UP TO</i>
                  <b className="text-dark">$100</b> OFF
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
