import Head from 'next/head';
import { useEffect } from 'react';
import { Provider, useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { css, Global } from '@emotion/react';
import useTranslation from 'next-translate/useTranslation';

// Utils
import { fetcher } from '../services/apiService.js';
import { actions as LandingActions } from '../store/landing';

// Components
import { wrapper } from '../store/index.js';
import Layout from '../components/layout';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../public/sass/style.scss';

const App = ({ Component, pageProps }) => {
  const store = useStore();
  const { t } = useTranslation('common');

  useEffect(() => {
    if (
      !store.getState().landing.webCommons ||
      !store.getState().landing.menu
    ) {
      fetchData();
    }
  }, []);

  async function fetchData() {
    return await fetcher('web/').then(res => {
      store.dispatch(LandingActions.setMenu(res.menu));
      store.dispatch(LandingActions.setWebCommons(res.web_commons));
    });
  }

  const getLayout = Component.getLayout || (page => page);

  return getLayout(
    <Provider store={store}>
      <PersistGate
        persistor={store.__persistor}
        loading={
          <div className="loading-overlay">
            <div className="bounce-loader">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>
        }
      >
        <Global
          styles={css`
            &,
            &::before,
            &::after {
              margin: 0;
              padding: 0;
              box-sizing: inherit;
            }

            body {
              font-family: 'Open sans', sans-serif;
              box-sizing: border-box;
            }
          `}
        />

        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          {/* TODO: Inject title from database */}
          <title>PubliEXPE- {t('PAGE_TITLE')}</title>

          <meta name="keywords" content={t('MERCHANDISING_CONTENT')} />
          <meta property="og:title" content="PubliExpe" />
          <meta property="fb:app_id" content="" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="" />
          {/* TODO: Needs the logo */}
          <meta property="og:url" content="https://publiexpe.com/" />
          <meta property="og:description" content=" " />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="https://publiexpe.com/" />
          <meta name="twitter:title" content="PubliExpe" />

          <meta name="description" content={t('PROMOTIONAL_CONTENT')}></meta>
        </Head>
        {getLayout() === undefined ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </PersistGate>
    </Provider>,
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default wrapper.withRedux(App);
