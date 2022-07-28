const isProduction = process.env.NODE_ENV === 'production';
const nextTranslate = require('next-translate');

module.exports = {
  trailingSlash: isProduction,
  ...nextTranslate(),
  async rewrites() {
    return [
      // ACOUNTS
      // password-reset
      {
        source: '/accounts/password-reset/confirm',
        has: [
          {
            type: 'query',
            key: 'uid',
          },
          {
            type: 'query',
            key: 'token',
          },
        ],
        destination: '/account/password-reset-confirm',
      },
      {
        source: '/cuenta/recuperar-password',
        destination: '/account/forgot-password',
      },
      //user activation
      {
        source: '/accounts/activation',
        has: [
          {
            type: 'query',
            key: 'uid',
          },
          {
            type: 'query',
            key: 'token',
          },
        ],
        destination: '/account/activation',
      },
      {
        source: '/cuenta/registro',
        destination: '/account/register',
      },
      {
        source: '/cuenta/cuenta-creada',
        destination: '/account/register-confirm',
      },
      {
        source: '/mi-cuenta',
        destination: '/account',
      },
      {
        source: '/blog',
        destination: '/pages/blog',
      },
      {
        source: '/contact',
        destination: '/pages/contact-us',
      },
      {
        source: '/contacto',
        destination: '/pages/contact-us',
      },
      {
        source: '/acerca-de',
        destination: '/pages/about-us',
      },
      // PRODUCTS
      {
        source: '/categoria/:category/producto/:slug',
        destination: '/category/:category/product/:slug',
      },
      // MENU
      {
        source: '/tienda',
        has: [
          {
            type: 'query',
            key: 'category',
            value: '(?<category>.*)',
          },
        ],
        destination: '/shop?:category',
      },
      {
        source: '/tienda/list',
        has: [
          {
            type: 'query',
            key: 'category',
            value: '(?<category>.*)',
          },
        ],
        destination: '/shop/list?:category',
      },
      // {
      //   source: '/:path*',
      //   has: [
      //     {
      //       type: 'header',
      //       key: 'Authorization',
      //       value: '(?<authorized>yes|true)',
      //     },
      //   ],
      //   destination: '/home?authorized=:authorized',
      // },

      // ECO
      {
        source: '/eco/:path*/',
        destination: 'https://eco.publiexpe.com/:path*/',
      },
    ];
  },
  images: {
    domains: ['127.0.0.1', 'localhost', 'preprod.publiexpe.com'],
  },
};
