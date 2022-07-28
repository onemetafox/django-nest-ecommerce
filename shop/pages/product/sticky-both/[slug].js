import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

// Import Apollo Server and Query
import withApollo from '../../../server/apollo';
import { GET_PRODUCT } from '../../../server/queries';

// Import Custom Component
import ALink from '../../../components/common/ALink';
import ProductMediaFive from '../../../components/partials/product/media/product-media-five';
import ProductDetailFive from '../../../components/partials/product/details/product-detail-five';
import SingleTabFive from '../../../components/partials/product/tabs/single-tab-five';
import RelatedProducts from '../../../components/partials/product/widgets/related-products';
import ProductWidgetContainer from '../../../components/partials/product/widgets/product-widget-container';
import ProductNav from '../../../components/partials/product/product-nav';

function ProductDefault() {
  const slug = useRouter().query.slug;
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { slug },
  });
  const product = data && data.product.data;
  const related = data && data.product.related;
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <main className="main">
      <div
        className={`container skeleton-body skel-shop-products ${
          loading ? '' : 'loaded'
        }`}
      >
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">
                <i className="icon-home"></i>
              </ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="/shop">Shop</ALink>
            </li>
            <li className="breadcrumb-item">
              {product &&
                product.categories.map((item, index) => (
                  <React.Fragment key={`category-${index}`}>
                    <ALink
                      href={{
                        pathname: '/shop',
                        query: { category: item.slug },
                      }}
                    >
                      {item.name}
                    </ALink>
                    {index < product.categories.length - 1 ? ',' : ''}
                  </React.Fragment>
                ))}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product && product.name}
            </li>
          </ol>
        </nav>

        <div
          className={`product-single-container product-single-default product-both-info`}
        >
          {product && (
            <div className="product-single-details">
              <div className="d-md-flex">
                <div className="d-flex align-items-start">
                  <h1 className="product-title w-auto">{product.name}</h1>

                  <ProductNav
                    prev={data.product.prev}
                    next={data.product.next}
                    adClass="pt-2 ml-5 position-relative top-0 float-right"
                  />
                </div>

                <div className="product-single-share ml-sm-auto">
                  <label className="sr-only">Share:</label>

                  <div className="social-icons mr-2 pr-2 pb-5 pb-md-0">
                    <a
                      href="#"
                      className="social-icon social-facebook icon-facebook"
                      title="Facebook"
                    ></a>
                    <a
                      href="#"
                      className="social-icon social-twitter icon-twitter"
                      title="Twitter"
                    ></a>
                    <a
                      href="#"
                      className="social-icon social-linkedin fab fa-linkedin-in"
                      title="Linkedin"
                    ></a>
                    <a
                      href="#"
                      className="social-icon social-mail icon-mail-alt"
                      title="Mail"
                    ></a>
                  </div>
                </div>
              </div>

              <div className="ratings-container">
                <div className="product-ratings">
                  <span
                    className="ratings"
                    style={{ width: `${20 * product.ratings}%` }}
                  ></span>
                  <span className="tooltiptext tooltip-top">
                    {product.ratings.toFixed(2)}
                  </span>
                </div>

                <a href="#" className="rating-link">
                  ({' '}
                  {product.reviews > 0
                    ? `${product.reviews} Reviews`
                    : 'There are no reviews yet.'}{' '}
                  )
                </a>
              </div>

              <hr className="short-divider" />
            </div>
          )}

          <div className="row mb-lg-3">
            <ProductDetailFive product={product} />

            <ProductMediaFive
              product={product}
              adClass="col-lg-6 mb-lg-0"
              subClass="col-lg-12"
            />
          </div>
        </div>
      </div>

      <SingleTabFive
        product={product}
        isCustom={false}
        adClass={`custom-product-single-tabs pt-2 mb-0 mt-lg-6 mt-2 pb-3 skeleton-body skel-shop-products ${
          loading ? '' : 'loaded'
        }`}
      />

      <div className="product-both-info-bottom bg-gray">
        <div className="container">
          <div className="align-items-center row mb-0">
            <div className="col-md-4 col-sm-6">
              <h3 className="heading">
                <strong>INCREDIBLE QUALITY</strong>
              </h3>

              <p>
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex eacommodo
              </p>

              <h3 className="heading">
                <strong>ADVANCED SOUND</strong>
              </h3>

              <p>
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex eacommodo
              </p>
            </div>

            <div className="col-md-4 d-md-block d-none"></div>

            <div className="col-md-4 col-sm-6">
              <h3 className="heading text-right">
                <strong>ULTRA BOOST</strong>
              </h3>

              <p className="text-md-right">
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo
              </p>

              <h3 className="heading text-right">
                <strong>NOISE REDUCTION</strong>
              </h3>

              <p className="text-md-right">
                Sed do eiusmod tempor incididunt ut labore et dolore magnaut
                aliquip ex ea commodo
              </p>
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts
        adClass={`skeleton-body skel-shop-products ${loading ? '' : 'loaded'}`}
        products={related}
        loading={loading}
        isContainer={true}
      />

      <div className="container">
        <hr className="mt-0 mb-0" />
      </div>

      <ProductWidgetContainer />
    </main>
  );
}

export default withApollo({ ssr: typeof window === 'undefined' })(
  ProductDefault,
);
