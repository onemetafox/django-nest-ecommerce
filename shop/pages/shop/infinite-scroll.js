import { useRouter } from 'next/router';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import ReactScroll from 'react-infinite-scroll-component';
import ALink from '../../components/common/ALink';
import ShopBanner from '../../components/partials/shop/shop-banner';
import ShopSidebarOne from '../../components/partials/shop/sidebar/shop-sidebar-one';
import ProductsGrid from '../../components/partials/products-collection/product-grid';

import withApollo from '../../server/apollo';
import { GET_PRODUCTS } from '../../server/queries';

function ShopInfinite() {
  const router = useRouter();
  const query = router.query;
  const [getProducts, { data, loading, error }] = useLazyQuery(GET_PRODUCTS);
  const [loadMoreProducts, { data: newData }] = useLazyQuery(GET_PRODUCTS, {
    fetchPolicy: 'no-cache',
  });
  const [sortBy, setSortBy] = useState(query.sortBy ? query.sortBy : 'default');
  const [products, setProducts] = useState([]);
  const total = data && data.products.total;

  useEffect(() => {
    let offset =
      document.querySelector('.main-content').getBoundingClientRect().top +
      window.pageYOffset -
      58;

    setTimeout(() => {
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }, 200);

    getProducts({
      variables: {
        search: query.search,
        colors: query.colors ? query.colors.split(',') : [],
        sizes: query.sizes ? query.sizes.split(',') : [],
        min_price: parseInt(query.min_price),
        max_price: parseInt(query.max_price),
        category: query.category,
        tag: query.tag,
        sortBy: sortBy,
        from: 0,
        to: Math.max(products ? products.length : 0, 12),
      },
    });
  }, [query, sortBy]);

  useLayoutEffect(() => {
    data && setProducts(data.products.data);
  }, [data]);

  useEffect(() => {
    let newProducts = newData ? newData.products.data : [];
    setProducts([...products, ...newProducts]);
  }, [newData]);

  function onSortByChange(e) {
    router.push({
      pathname: router.pathname,
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

  function onLoadMoreProducts() {
    loadMoreProducts({
      variables: {
        search: query.search,
        colors: query.colors ? query.colors.split(',') : [],
        sizes: query.sizes ? query.sizes.split(',') : [],
        min_price: parseInt(query.min_price),
        max_price: parseInt(query.max_price),
        category: query.category,
        tag: query.tag,
        sortBy: sortBy,
        from: products.length,
        to: products.length + 3,
      },
    });
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
              <ALink href="/">Home</ALink>
            </li>
            {query.category ? (
              <>
                <li className="breadcrumb-item">
                  <ALink
                    href={{ pathname: router.pathname, query: {} }}
                    scroll={false}
                  >
                    Shop
                  </ALink>
                </li>
                {data &&
                  data.products.categoryFamily.map((item, index) => (
                    <li
                      className="breadcrumb-item"
                      key={`category-family-${index}`}
                    >
                      <ALink
                        href={{ query: { category: item.slug } }}
                        scroll={false}
                      >
                        {item.name}
                      </ALink>
                    </li>
                  ))}
                <li className="breadcrumb-item active">
                  {query.search ? (
                    <>
                      Search -{' '}
                      <ALink
                        href={{ query: { category: query.category } }}
                        scroll={false}
                      >
                        {query.category}
                      </ALink>{' '}
                      / {query.search}
                    </>
                  ) : (
                    query.category
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
                    Shop
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
                    Shop
                  </ALink>
                </li>
                <li
                  className="breadcrumb-item active"
                  aria-current="page"
                >{`Product Tag - ${query.tag}`}</li>
              </>
            ) : (
              <li className="breadcrumb-item active" aria-current="page">
                Shop
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
                  <span>Filter</span>
                </a>

                <div className="toolbox-item toolbox-sort">
                  <label>Sort By:</label>

                  <div className="select-custom">
                    <select
                      name="orderby"
                      className="form-control"
                      value={sortBy}
                      onChange={e => onSortByChange(e)}
                    >
                      <option value="default">Default sorting</option>
                      <option value="popularity">Sort by popularity</option>
                      <option value="rating">Sort by average rating</option>
                      <option value="date">Sort by newness</option>
                      <option value="price">Sort by price: low to high</option>
                      <option value="price-desc">
                        Sort by price: high to low
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="toolbox-right">
                <div className="toolbox-item layout-modes">
                  <ALink
                    href={{ pathname: router.pathname, query: query }}
                    className="layout-btn btn-grid active"
                    title="Grid"
                  >
                    <i className="icon-mode-grid"></i>
                  </ALink>
                  <ALink
                    href={{ pathname: '/shop/list', query: query }}
                    className="layout-btn btn-list"
                    title="List"
                  >
                    <i className="icon-mode-list"></i>
                  </ALink>
                </div>
              </div>
            </nav>

            <ReactScroll
              dataLength={products ? products.length : 0}
              scrollThreshold={'90%'}
              next={onLoadMoreProducts}
              hasMore={
                total && products && total > products.length ? true : false
              }
              style={{ overflow: 'visible', position: 'relative' }}
              loader={
                <div className="loader">
                  <div className="bounce-loader">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                  </div>
                </div>
              }
            >
              <ProductsGrid
                products={products}
                loading={loading}
                perPage={data ? products.length + 3 : 12}
              />
            </ReactScroll>
          </div>

          <ShopSidebarOne />
        </div>
      </div>

      <div className="mb-4"></div>
    </main>
  );
}

export default withApollo({ ssr: typeof window === 'undefined' })(ShopInfinite);
