module.exports = {
  defaultLocale: 'es',
  locales: ['en', 'es', 'fr'],
  pages: {
    '*': ['common', 'cats'],
  },
  defaultNS: 'common',
  loadLocaleFrom: (lang, ns) =>
    // You can use a dynamic import, fetch, whatever. You should
    // return a Promise with the JSON file.
    import(`./services/translation/locales/${lang}/${ns}.json`).then(
      m => m.default,
    ),
};
