import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';

import ALink from '../../components/common/ALink';
import ShopSidebarOne from '../../components/partials/shop/sidebar/shop-sidebar-one';
import Pagination from '../../components/features/pagination';
import ProductsGrid from '../../components/partials/products-collection/product-grid';

import withApollo from '../../server/apollo';
import { GET_PRODUCTS } from '../../server/queries';

function ShopImage() {
  const router = useRouter();
  const query = router.query;
  const [getProducts, { data, loading, error }] = useLazyQuery(GET_PRODUCTS);
  const [perPage, setPerPage] = useState(12);
  const [sortBy, setSortBy] = useState(query.sortBy ? query.sortBy : 'default');
  const products = data && data.products.data;
  const totalPage = data
    ? parseInt(data.products.total / perPage) +
      (data.products.total % perPage ? 1 : 0)
    : 1;

  useEffect(() => {
    let offset =
      document.querySelector('.main-content').getBoundingClientRect().top +
      window.pageYOffset -
      58;
    setTimeout(() => {
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }, 200);

    let page = query.page ? query.page : 1;

    getProducts({
      variables: {
        search: query.search,
        colors: query.colors ? query.colors.split(',') : [],
        sizes: query.sizes ? query.sizes.split(',') : [],
        min_price: parseInt(query.min_price),
        max_price: parseInt(query.max_price),
        category: query.category,
        sortBy: sortBy,
        from: perPage * (page - 1),
        to: perPage * page,
      },
    });
  }, [query, perPage, sortBy]);

  function onPerPageChange(e) {
    setPerPage(e.target.value);
    router.push({
      pathname: router.pathname,
      query: {
        ...query,
        page: 1,
      },
    });
  }

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

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <main className="main">
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
                  <ALink
                    href={{ pathname: router.pathname, query: {} }}
                    scroll={false}
                  >
                    shop
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
            <div
              className="category-banner banner text-uppercase small-banner mb-2"
              style={{
                backgroundImage: 'url(images/banners/banner-top.jpg)',
              }}
            >
              <div className="row">
                <div className="pb-5 pb-md-0 col-sm-5 col-lg-5 offset-1">
                  <h3 className="mb-2 ls-10">
                    Electronic
                    <br />
                    Deals
                  </h3>
                  <ALink href="/shop" className="btn btn-dark btn-black ls-10">
                    Get Yours!
                  </ALink>
                </div>
                <div className="col-sm-4 offset-sm-0 offset-1">
                  <div className="coupon-sale-content">
                    <h4 className="m-b-2 coupon-sale-text bg-white ls-10 text-transform-none">
                      Exclusive COUPON
                    </h4>
                    <h5 className="mb-2 coupon-sale-text d-block ls-10 p-0">
                      <i className="ls-0">UP TO</i>
                      <b className="text-dark">$100</b> OFF
                    </h5>
                  </div>
                </div>
              </div>
            </div>
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
                <div className="toolbox-item toolbox-show">
                  <label>Show:</label>

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
                    href={{ pathname: '/shop/list', query: query }}
                    className="layout-btn btn-list"
                    title="List"
                  >
                    <i className="icon-mode-list"></i>
                  </ALink>
                </div>
              </div>
            </nav>

            <ProductsGrid
              products={products}
              loading={loading}
              perPage={perPage}
            />

            {loading || (products && products.length) ? (
              <nav className="toolbox toolbox-pagination">
                <div className="toolbox-item toolbox-show">
                  <label>Show:</label>

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

export default withApollo({ ssr: typeof window === 'undefined' })(ShopImage);
