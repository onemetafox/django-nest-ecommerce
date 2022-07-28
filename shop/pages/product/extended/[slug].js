import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

// Import Apollo Server and Query
import withApollo from '../../../server/apollo';
import { GET_PRODUCT } from '../../../server/queries';

// Import Custom Component
import ALink from '../../../components/common/ALink';
import ProductMediaTwo from '../../../components/partials/product/media/product-media-two';
import ProductDetailTwo from '../../../components/partials/product/details/product-detail-two';
import RelatedProducts from '../../../components/partials/product/widgets/related-products';
import ProductWidgetContainer from '../../../components/partials/product/widgets/product-widget-container';
import SingleTabOne from '../../../components/partials/product/tabs/single-tab-one';
import useSWR from 'swr';
import { fetcher } from '../../../services/apiService';

function ProductExtended() {
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
  const { data, error } = useSWR(`web/product/${slug}/view/`, fetcher);
  const { data: relatedProducts, error: related_error } = useSWR(
    `web/product/${slug}/related/`,
    fetcher,
  );
  const product = data && data;

  if (error) {
    return useRouter().push('/pages/404');
  }

  return (
    <main className="main product-extended-page">
      <div
        className={`container skeleton-body skel-shop-products ${
          !data ? '' : 'loaded'
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
              {product && product.category && (
                <React.Fragment key={`category-${product.product_name}`}>
                  <ALink
                    href={{
                      pathname: '/shop',
                      query: { category: product.category.slug },
                    }}
                  >
                    {product.category.category_name}
                  </ALink>
                </React.Fragment>
              )}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product && product.product_name}
            </li>
          </ol>
        </nav>

        <div
          className={`product-single-container product-single-default product-single-extended product-page`}
        >
          <ProductMediaTwo product={product} />

          <ProductDetailTwo product={product} />
        </div>

        <SingleTabOne product={product} />

        <RelatedProducts
          products={relatedProducts}
          loading={relatedProducts ? false : true}
        />
        <hr className="mt-0 mb-0" />
      </div>

      <ProductWidgetContainer />
    </main>
  );
}

export default withApollo({ ssr: typeof window === 'undefined' })(
  ProductExtended,
);
