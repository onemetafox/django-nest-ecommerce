import React from 'react';
import { useRouter } from 'next/router';

// Import Custom Component
import ALink from '../../../components/common/ALink';
import ProductMediaOne from '../../../components/partials/product/media/product-media-one';
import ProductDetailOne from '../../../components/partials/product/details/product-detail-one';
import ProductWidgetContainer from '../../../components/partials/product/widgets/product-widget-container';
import RelatedProducts from '../../../components/partials/product/widgets/related-products';
import SingleTabOne from '../../../components/partials/product/tabs/single-tab-one';
import useSWR from 'swr';
import { fetcher } from '../../../services/apiService';
import FeatureBoxSection from '../../../components/partials/home/feature-box-section';

function ProductDefault() {
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
    <main className="main">
      <div
        className={`container skeleton-body skel-shop-products ${
          !Boolean(data) ? '' : 'loaded'
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
              {product && product.name}
            </li>
          </ol>
        </nav>

        <div className="product-single-container product-single-default">
          <div className="row">
            <ProductMediaOne product={product} />

            <ProductDetailOne product={product} />
          </div>
        </div>

        {/* <SingleTabOne product={product} /> */}

        <RelatedProducts
          products={relatedProducts}
          loading={relatedProducts ? false : true}
        />
        <hr className="mt-0 mb-0" />
      </div>
      <ProductWidgetContainer />
      <FeatureBoxSection />
    </main>
  );
}

export default ProductDefault;
