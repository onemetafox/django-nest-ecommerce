/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang={this.props.locale || 'es-ES'}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&family=Oswald:wght@300;400;600;700&family=Poppins:wght@200;300;400;500;600;700;800&family=Shadows+Into+Light&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/vendor/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/vendor/fontawesome-free/css/all.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/vendor/country-icons/css/flag-icons.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/vendor/simple-line-icons/css/simple-line-icons.min.css"
          />

          {/* <meta property="og:title" content="PubliExpe" />
          <meta property="fb:app_id" content="" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="" /> */}
          {/* TODO: Needs the logo */}
          {/* <meta property="og:url" content="https://publiexpe.com/" />
          <meta property="og:description" content=" " />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="https://publiexpe.com/" />
          <meta name="twitter:title" content="PubliExpe" /> */}

          {/* <meta
            name="description"
            content="Artículos promocionales y corporativos para la publicidad de tu empresa. Regalos de Empresa y Regalos Publicitarios personalizados,Especialistas en artículos de Merchandising publicitario al por mayor."
          ></meta> */}
        </Head>
        <body>
          <Main />
          <script src="/js/jquery.min.js"></script>
          <NextScript />
        </body>
      </Html>
    );
  }
}
