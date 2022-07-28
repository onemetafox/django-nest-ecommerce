import { useState, useEffect } from 'react';
import { useRouter, withRouter } from 'next/router';

import ALink from '../../components/common/ALink';
import ShopBanner from '../../components/partials/shop/shop-banner';
import ShopSidebarOne from '../../components/partials/shop/sidebar/shop-sidebar-one';
import Pagination from '../../components/features/pagination';
import ProductsRow from '../../components/partials/products-collection/product-row';

import { connect } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import { fetcher } from '../../services/apiService';

function Shop(props) {
  const { t } = useTranslation();
  const router = useRouter();
  const query = router.query;
  const [perPage, setPerPage] = useState(12);
  const [sortBy, setSortBy] = useState(
    query.sortBy ? query.sortBy : 'product_name',
  );
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cats, setCats] = useState(null);

  const products = data && data.results;
  const totalPage = data
    ? parseInt(data.count / perPage) + (data.count % perPage ? 1 : 0)
    : 1;

  useEffect(() => {
    setError(false);
    let offset =
      document.querySelector('.main-content').getBoundingClientRect().top +
      window.pageYOffset -
      58;
    window.scrollTo({ top: offset, behavior: 'smooth' });

    let page = query.page ? query.page : 1;

    getProducts({
      search: query.search || [],
      colors: query.colors ? query.colors.split(',') : [],
      sizes: query.sizes ? query.sizes.split(',') : [],
      min_price: parseInt(query.min_price) || [],
      max_price: parseInt(query.max_price) || [],
      category__slug: query.category,
      tag: query.tag || [],
      page: page,
      size: perPage,
    });
  }, [query, perPage, sortBy]);

  useEffect(() => {
    if (!cats) {
      setCats(props.cats);
    }
  }, [props]);

  async function getProducts(variables) {
    setLoading(true);
    setData(null);
    await fetcher(
      'web/filter?' + new URLSearchParams({ ...variables }).toString(),
    )
      .then(res => {
        let data = res;
        let sortedResults = data.results;

        if (sortBy === 'min_price') {
          sortedResults = data.results.sort((a, b) => a[sortBy] - b[sortBy]);
        }
        if (sortBy === 'max_price') {
          sortedResults = data.results.sort((a, b) => b[sortBy] - a[sortBy]);
        }
        setData({ ...data, results: sortedResults });
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError(err);
      });
  }

  function onPerPageChange(e) {
    setPerPage(e.target.value);
  }

  function onSortByChange(e) {
    router.push({
      query: {
        ...query,
        sortBy: e.target.value,
        page: 1,
      },
    });
    setSortBy(e.target.value);
  }

  function sidebarToggle(e) {
    let body = document.querySelector('body');
    e.preventDefault();
    if (body.classList.contains('sidebar-opened')) {
      body.classList.remove('sidebar-opened');
    } else {
      body.classList.add('sidebar-opened');
    }
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <main className="main">
      <ShopBanner />

      <div className="container">
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">
                <i className="icon-home"></i>
              </ALink>
            </li>
            {query.category ? (
              <>
                <li className="breadcrumb-item">
                  <ALink href="/shop" scroll={false}>
                    {t('SHOP')}
                  </ALink>
                </li>
                <li className="breadcrumb-item active">
                  {query.search ? (
                    <>
                      {t('BREADCRUMBS_SEARCH')}-{' '}
                      <ALink
                        href={{ query: { category: query.category } }}
                        scroll={false}
                      >
                        {t(
                          `${
                            cats?.find(cat => cat.slug === query.category)
                              ?.category_name
                          }`,
                        )}
                      </ALink>{' '}
                      / {query.search}
                    </>
                  ) : (
                    t(
                      `${
                        cats?.find(cat => cat.slug === query.category)
                          ?.category_name
                      }`,
                    )
                  )}
                </li>
              </>
            ) : query.search ? (
              <>
                <li className="breadcrumb-item">
                  <ALink
                    href={{ pathname: router.pathname, query: {} }}
                    scroll={false}
                  >
                    {t('SHOP')}
                  </ALink>
                </li>
                <li
                  className="breadcrumb-item active"
                  aria-current="page"
                >{`Search - ${query.search}`}</li>
              </>
            ) : query.tag ? (
              <>
                <li className="breadcrumb-item">
                  <ALink
                    href={{ pathname: router.pathname, query: {} }}
                    scroll={false}
                  >
                    {t('SHOP')}
                  </ALink>
                </li>
                <li
                  className="breadcrumb-item active"
                  aria-current="page"
                >{`Product Tag - ${query.tag}`}</li>
              </>
            ) : (
              <li className="breadcrumb-item active" aria-current="page">
                {t('SHOP')}
              </li>
            )}
          </ol>
        </nav>

        <div className="row">
          <div className="col-lg-9 main-content">
            <nav className="toolbox sticky-header mobile-sticky">
              <div className="toolbox-left">
                <a
                  href="#"
                  className="sidebar-toggle"
                  onClick={e => sidebarToggle(e)}
                >
                  <svg
                    data-name="Layer 3"
                    id="Layer_3"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="15"
                      x2="26"
                      y1="9"
                      y2="9"
                      className="cls-1"
                    ></line>
                    <line x1="6" x2="9" y1="9" y2="9" className="cls-1"></line>
                    <line
                      x1="23"
                      x2="26"
                      y1="16"
                      y2="16"
                      className="cls-1"
                    ></line>
                    <line
                      x1="6"
                      x2="17"
                      y1="16"
                      y2="16"
                      className="cls-1"
                    ></line>
                    <line
                      x1="17"
                      x2="26"
                      y1="23"
                      y2="23"
                      className="cls-1"
                    ></line>
                    <line
                      x1="6"
                      x2="11"
                      y1="23"
                      y2="23"
                      className="cls-1"
                    ></line>
                    <path
                      d="M14.5,8.92A2.6,2.6,0,0,1,12,11.5,2.6,2.6,0,0,1,9.5,8.92a2.5,2.5,0,0,1,5,0Z"
                      className="cls-2"
                    ></path>
                    <path
                      d="M22.5,15.92a2.5,2.5,0,1,1-5,0,2.5,2.5,0,0,1,5,0Z"
                      className="cls-2"
                    ></path>
                    <path
                      d="M21,16a1,1,0,1,1-2,0,1,1,0,0,1,2,0Z"
                      className="cls-3"
                    ></path>
                    <path
                      d="M16.5,22.92A2.6,2.6,0,0,1,14,25.5a2.6,2.6,0,0,1-2.5-2.58,2.5,2.5,0,0,1,5,0Z"
                      className="cls-2"
                    ></path>
                  </svg>
                  <span>{t('FILTER')}</span>
                </a>

                <div className="toolbox-item toolbox-sort">
                  <label>{t('SORTBY')}</label>

                  <div className="select-custom">
                    <select
                      name="orderby"
                      className="form-control"
                      value={sortBy}
                      onChange={e => onSortByChange(e)}
                    >
                      <option value="product_name">
                        {t('DEFAULT_SORTING')}
                      </option>
                      <option value="total_visit">
                        {t('SORTBY_POPULARITY')}
                      </option>
                      <option value="rating">{t('SORTBY_RATING')}</option>
                      <option value="created_at">{t('SORTBY_NEWNESS')}</option>
                      <option value="min_price">{t('SORTBY_LOW_PRICE')}</option>
                      <option value="max_price">
                        {t('SORTBY_HIGH_PRICE')}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="toolbox-right">
                <div className="toolbox-item toolbox-show">
                  <label>{t('SHOW')}</label>

                  <div className="select-custom">
                    <select
                      name="count"
                      className="form-control"
                      value={perPage}
                      onChange={e => onPerPageChange(e)}
                    >
                      <option value="12">12</option>
                      <option value="24">24</option>
                      <option value="36">36</option>
                    </select>
                  </div>
                </div>

                <div className="toolbox-item layout-modes">
                  <ALink
                    href={{ pathname: router.pathname, query: query }}
                    className="layout-btn btn-grid active"
                    title="Grid"
                  >
                    <i className="icon-mode-grid"></i>
                  </ALink>
                  <ALink
                    href={{
                      pathname: `/${t('ROUTE_PATH_SHOP')}/list`,
                      query: query,
                    }}
                    className="layout-btn btn-list"
                    title="List"
                  >
                    <i className="icon-mode-list"></i>
                  </ALink>
                </div>
              </div>
            </nav>

            <ProductsRow
              products={products}
              loading={loading}
              perPage={perPage}
            />

            {loading || (products && products.length) ? (
              <nav className="toolbox toolbox-pagination">
                <div className="toolbox-item toolbox-show">
                  <label>{t('SHOW')}</label>

                  <div className="select-custom">
                    <select
                      name="count"
                      className="form-control"
                      value={perPage}
                      onChange={e => onPerPageChange(e)}
                    >
                      <option value="12">12</option>
                      <option value="24">24</option>
                      <option value="36">36</option>
                    </select>
                  </div>
                </div>
                <Pagination totalPage={totalPage} />
              </nav>
            ) : (
              ''
            )}
          </div>

          <ShopSidebarOne />
        </div>

        <div className="mb-4"></div>
      </div>
    </main>
  );
}

const mapStateToProps = state => ({
  cats: state.landing.categories ?? null,
});

export default connect(mapStateToProps, null)(withRouter(Shop));
