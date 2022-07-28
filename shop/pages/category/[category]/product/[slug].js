import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import { useStore } from 'react-redux';

// Import Custom Component
import ALink from '../../../../components/common/ALink';
import ProductMediaOne from '../../../../components/partials/product/media/product-media-one';
import ProductDetailOne from '../../../../components/partials/product/details/product-detail-one';
import RelatedProducts from '../../../../components/partials/product/widgets/related-products';
import { useCustomSWR } from '../../../../hooks/useCustomSWR';
import { fetcher, poster } from '../../../../services/apiService';
import SingleTabThree from '../../../../components/partials/product/tabs/single-tab-three';

// Utils
import { actions as LandingActions } from '../../../../store/landing';

function ProductDefault() {
  const { t } = useTranslation('common');
  const store = useStore();

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
  const { data, error } = useCustomSWR(`web/product/${slug}/view/`, fetcher);
  const { data: relatedProducts, error: relatedProductsError } = useCustomSWR(
    `web/product/${slug}/related/`,
    fetcher,
  );
  const product = data && data;
  const related = relatedProducts ? relatedProducts : [];

  useEffect(() => {
    recordProductView();
  }, []);

  const recordProductView = () => {
    poster(`web/product/${slug}/record-visit/`);
  };

  if (error) {
    return useRouter().push('/pages/404');
  }
  if (!data)
    return (
      <div className="loading-overlay">
        <div className="bounce-loader">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    );

  return (
    <main className="main">
      <Head>
        <title>{product.seo.title}</title>
        <meta name="description" content={product.seo.meta_description} />
        <meta name="keywords" content={product.seo.key_words} />
      </Head>
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
              <ALink href="/shop">{t('SHOP')}</ALink>
            </li>
            <li className="breadcrumb-item">
              {product && product.category && (
                <React.Fragment key={`category-${product.category.slug}`}>
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

        <div className="product-single-container product-single-default">
          <div className="row">
            <ProductMediaOne product={product} />

            <ProductDetailOne product={product} />
          </div>
        </div>
      </div>
      {/* OPTIONS */}

      <div className="container-fluid py-5 px-0">
        <SingleTabThree product={product} adClass="mb-5" />
      </div>

      <div className="container mt-5">
        <RelatedProducts
          products={related}
          loading={related.length ? false : true}
        />
      </div>
      {/* <ProductWidgetContainer /> */}
    </main>
  );
}

export default ProductDefault;
