import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import Image from 'next/image';

// Import Custom Component
import ALink from '../ALink';

// Import Utils
import useTranslation from 'next-translate/useTranslation';
import { connect } from 'react-redux';
import { menuConstant } from '../../../services/constant/menu';

function MainMenu(props) {
  const { router, webMenu } = props;
  const { t } = useTranslation(['common', 'cats']);

  const [menu, setMenu] = useState([]);
  const [catMenu, setCatMenu] = useState([]);
  const [ecoMenu, setEcoMenu] = useState([]);

  const pathname = router.pathname;

  useEffect(() => {
    if (webMenu && webMenu.web_menu) {
      
      setMenu(webMenu.web_menu.filter(item => item.slug !== menuConstant.ECO));
      setCatMenu(
        webMenu.category_menu.filter(item => item.slug !== menuConstant.ECO),
      );

      if (ecoMenu.length === 0) {
        setEcoMenu(
          webMenu.web_menu.find(item => item.slug === menuConstant.ECO),
        );
      }
    }
  }, [webMenu]);

  function isOtherPage() {
    return menu.find(cat => cat.slug === pathname);
  }

  function getEcoMenuCols() {
    return ecoMenu ? Math.round(ecoMenu?.subcategory?.length / 2) : 0;
  }

  function getCatMenuColClass() {
    return catMenu
      ? catMenu.length <= 10
        ? 'col-lg-12'
        : 'col-lg-4'
      : 'col-lg-12';
  }

  if (!webMenu) return null;

  return (
    <>
      <nav className="main-nav w-100">
        <ul className="menu sf-js-enabled sf-arrows">
          <li className={pathname === '/' ? 'active' : ''}>
            <ALink href="/">{t('HOME')}</ALink>
          </li>

          {/* ALL CATEGORIES FIX */}
          <li className={pathname.startsWith(t('SHOP')) ? 'active' : ''}>
            <ALink href="#" className="sf-with-ul">
              {t('CATEGORIES')}
            </ALink>
            <div className="megamenu megamenu-fixed-width megamenu-3cols">
              <div className="row">
                <div className="col-12">
                  <div className={getCatMenuColClass()}>
                    <ALink href="#" className="nolink">
                      {t('ALL_CATEGORIES')}
                    </ALink>
                    <ul className="submenu">
                      {Boolean(catMenu.length) &&
                        catMenu.slice(0, 10).map((item, index) => (
                          <li key={'menu-item' + item.slug}>
                            <ALink
                              href={{
                                pathname: `/${t('ROUTE_PATH_SHOP')}/`,
                                query: { category: item.slug },
                              }}
                            >
                              {t(item.category_name)}
                            </ALink>
                          </li>
                        ))}
                    </ul>
                  </div>
                  {Boolean(catMenu.length > 10) && (
                    <div className="col-lg-4">
                      <ALink href="#" className="nolink">
                        &nbsp;
                      </ALink>
                      <ul className="submenu">
                        {catMenu.slice(10, 20).map((item, index) => (
                          <li key={'menu-item' + item.slug}>
                            <ALink
                              href={{
                                pathname: `/${t('ROUTE_PATH_SHOP')}/`,
                                query: { category: item.slug },
                              }}
                            >
                              {t(item.category_name)}
                            </ALink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {Boolean(catMenu.length > 20) && (
                    <div className="col-lg-4">
                      <ALink href="#" className="nolink">
                        &nbsp;
                      </ALink>
                      <ul className="submenu">
                        {catMenu.slice(20, 30).map((item, index) => (
                          <li key={'menu-item' + item.slug}>
                            <ALink
                              href={{
                                pathname: `/${t('ROUTE_PATH_SHOP')}/`,
                                query: { category: item.slug },
                              }}
                            >
                              {t(item.category_name)}
                            </ALink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>

          {/* ECO MENU FIX */}
          <li className={pathname.startsWith('/eco') ? 'active' : ''}>
            <ALink href="/eco" className="sf-with-ul">
              {t('ECO_PRODUCTS')}
            </ALink>
            <div className="megamenu megamenu-fixed-width megamenu-3cols">
              <div className="row">
                <div className="col-lg-4">
                  <ALink href="#" className="nolink">
                    {t('CARE_THE_WORLD')}
                  </ALink>
                  <ul className="submenu">
                    {Boolean(ecoMenu?.subcategory) &&
                      ecoMenu.subcategory
                        .slice(0, getEcoMenuCols())
                        .map((item, index) => (
                          <li key={'menu-item' + item.slug}>
                            <ALink
                              href={{
                                pathname: `/${t('ROUTE_PATH_SHOP')}/`,
                                query: { category: item.slug },
                              }}
                            >
                              {t(item.category_name)}
                            </ALink>
                          </li>
                        ))}
                  </ul>
                </div>

                <div className="col-lg-4">
                  <ALink href="#" className="nolink">
                    &nbsp;
                  </ALink>
                  <ul className="submenu">
                    {Boolean(ecoMenu?.subcategory) &&
                      ecoMenu.subcategory
                        .slice(getEcoMenuCols(), ecoMenu.subcategory.length)
                        .map((variations, index) => (
                          <li key={'menu-item' + variations.slug}>
                            <ALink href={`${variations.slug}`}>
                              {variations.category_name}
                            </ALink>
                          </li>
                        ))}
                  </ul>
                </div>

                <div className="col-lg-4 p-0">
                  <div className="menu-banner">
                    <figure style={{ opacity: 0.5 }}>
                      <Image
                        src="/images/eco.jpg"
                        alt="Menu banner"
                        width="300"
                        height="300"
                      />
                    </figure>
                    <div className="banner-content">
                      <h4>
                        <span className="">{t('UP_TO')}</span>
                        <br />
                        <b className="">-50%</b>
                        <i>CO2</i>
                      </h4>
                      <ALink
                        href="/shop"
                        className="btn btn-sm btn-dark text-white"
                      >
                        {t('SHOP_NOW')}
                      </ALink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>

          {/* MENU */}
          {Boolean(menu.length) &&
            menu.slice(2, 6).map((item, index) => (
              <li
                key={'item_' + index}
                className={pathname.startsWith(t('SHOP')) ? 'active' : ''}
              >
                <ALink
                  href={{
                    pathname: `/${t('ROUTE_PATH_SHOP')}/`,
                    query: { category: item.slug },
                  }}
                  className="sf-with-ul"
                >
                  {t(item.category_name)}
                </ALink>

                {Boolean(item.subcategory.length > 0) && (
                  <ul className="submenu">
                    {item.subcategory.map((variations, index) => (
                      <li key={'menu-item' + index}>
                        <ALink
                          href={{
                            pathname: `/${t('ROUTE_PATH_SHOP')}/`,
                            query: { category: variations.slug },
                          }}
                        >
                          {variations.category_name}
                        </ALink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

          {/* FIX RIGHT */}
          <li className="float-right">
            <a href="#" className="pl-5" target="_blank">
              Fijo
            </a>
          </li>
          <li className="float-right">
            <ALink href="#" className="pl-5">
              Fijo
            </ALink>
          </li>
        </ul>
      </nav>
    </>
  );
}
const mapStateToProps = state => ({
  webMenu: state.landing.menu,
});

export default connect(mapStateToProps, null)(withRouter(MainMenu));
