import { Fragment, useEffect } from 'react';

// Import Custom Component
import { CarouselSection } from '../components/partials/home/carousel-section';
import { InfoSection } from '../components/partials/home/info-section';
import { BannerSection } from '../components/partials/home/banner-section';
import FeatureBoxSection from '../components/partials/home/feature-box-section';
import PromoSection from '../components/partials/home/promo-section';
// import BlogSection from '../components/partials/home/blog-section';
import FeaturedCollection from '../components/partials/home/featured-collection';
import NewCollection from '../components/partials/home/new-collection';
import SaleBanner from '../components/partials/home/sale-banner';
import ProductWidgetContainer from '../components/partials/home/product-widget-container';
import { fetcher } from '../services/apiService';
import { getPlaiceholderList } from '../utils/getPlaiceholderList';

export default function Home(props) {
  const { sliders, banners, landing, error } = props;

  const featured = landing && landing.featured_products;
  const bestSelling = landing && landing.best_selling;
  const latest = landing && landing.latest_products;
  const topRated = landing && landing.top10_selling;
  // TODO:not being used right now
  // const topPromo = landing && landing.active_promo;
  // const blog = landing && landing.posts;

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Fragment>
      <main
        className={`skeleton-body skel-shop-products ${
          !landing ? '' : 'loaded'
        }`}
      >
        {/* Slider */}
        <CarouselSection sliders={sliders} />

        <div
          className="container-fluid mt-5 py-4 bg-gray"
          css={{ marginBottom: '2.5rem' }}
        >
          <InfoSection />
        </div>

        {/* Banner */}
        <BannerSection banners={banners} />

        <FeaturedCollection product={featured} />

        <NewCollection product={latest} />

        <div className="container-fluid px-0">
          <SaleBanner />
        </div>
        <FeatureBoxSection />

        <div className="container-fluid px-0">
          <hr className="mt-0 mb-0" />
          <PromoSection />
          <hr className="mt-0 mb-0" />
        </div>

        {/* <BlogSection blog={blog} /> */}

        {bestSelling &&
          topRated &&
          Boolean(bestSelling.length && topRated.length) && (
            <ProductWidgetContainer
              bestSelling={bestSelling}
              topRated={topRated}
              loading={!landing && !error}
            />
          )}
      </main>

      {/* <NewsletterModal /> */}
    </Fragment>
  );
}

export async function getStaticProps() {
  let sliders = null;
  let banners = null;
  let landing = null;
  let errors = null;

  try {
    sliders = await fetcher('web/sliders').then(sliders =>
      getPlaiceholderList(sliders, slider => slider.image),
    );
  } catch (_) {
    // do nothing
  }

  try {
    banners = await fetcher('web/banners').then(banners =>
      getPlaiceholderList(banners, banner => banner.image),
    );
  } catch (_) {
    // do nothing
  }
  try {
    landing = await fetcher('web/');
  } catch (error) {
    errors = { ...errors, ...error };
  }
  return { props: { sliders, banners, landing, errors }, revalidate: 500 };
}
