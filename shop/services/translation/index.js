const getLang = langName => {
  try {
    return require(`../../locales/${langName}/common.json`);
  } catch (error) {
    return require(`../../locales/es/common.json`);
  }
};

const getLocale = langName => {
  try {
    const lang = langName;
    return lang === 'es' ? 'es' : lang;
  } catch (error) {
    return 'es';
  }
};

export const translationService = { getLang, getLocale };
