import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

// Import Apollo Server and Query
import withApollo from '../../../server/apollo';
import { GET_PRODUCT } from '../../../server/queries';

// Import Custom Component
import ALink from '../../../components/common/ALink';
import ProductMediaThree from '../../../components/partials/product/media/product-media-three';
import ProductDetailThree from '../../../components/partials/product/details/product-detail-three';
import SingleTabOne from '../../../components/partials/product/tabs/single-tab-one';
import RelatedProducts from '../../../components/partials/product/widgets/related-products';
import ProductWidgetContainer from '../../../components/partials/product/widgets/product-widget-container';

function ProductGrid() {
  if (!useRouter().query.slug)
    return (
      <div className="loading-overlay">
        <div className="bounce-loader">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    );

  const slug = useRouter().query.slug;
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { slug },
  });
  const product = data && data.product.data;
  const related = data && data.product.related;

  if (error) {
    return useRouter().push('/pages/404');
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

        <div className="product-single-container product-single-default product-single-grid">
          <div className="row">
            <div className="col-lg-8">
              <ProductMediaThree product={product} />
            </div>

            <div className="col-lg-4">
              <ProductDetailThree
                adClass=""
                product={product}
                prev={product && data.product.prev}
                next={product && data.product.next}
              />
            </div>
          </div>
        </div>

        <SingleTabOne product={product} />

        <RelatedProducts products={related} loading={loading} />
        <hr className="mt-0 mb-0" />
      </div>
      <ProductWidgetContainer />
    </main>
  );
}

export default withApollo({ ssr: typeof window === 'undefined' })(ProductGrid);
