import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useStore } from 'react-redux';

// Import Custom Component
import ALink from '../ALink';
import useTranslation from 'next-translate/useTranslation';

// Utils
import { fetcher } from '../../../services/apiService';
import { actions as LandingActions } from '../../../store/landing';

function SearchForm() {
  const { t } = useTranslation(['common', 'cats']);
  const router = useRouter();
  const store = useStore();

  const [cat, setCat] = useState('');
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [timer, setTimer] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    document.querySelector('body').addEventListener('click', onBodyClick, !1);

    if (!categories) fetchCategories();

    return () => {
      document
        .querySelector('body')
        .removeEventListener('click', onBodyClick, !1);
    };
  }, []);

  useEffect(() => {
    setSearch('');
    setCat('');
  }, [router.query.slug]);

  useEffect(() => {
    if (search.length > 2) {
      if (timer) clearTimeout(timer);
      let timerId = setTimeout(() => {
        searchProducts({ search: search, category: cat });
        setTimer(null);
      }, 500);

      setTimer(timerId);
    }
  }, [search, cat]);

  useEffect(() => {
    document.querySelector('.header-search.show-results') &&
      document
        .querySelector('.header-search.show-results')
        .classList.remove('show-results');
  }, [router.pathname]);

  async function fetchCategories() {
    await fetcher('web/categories/')
      .then(res => {
        if (res.length) {
          setCategories(res);
          store.dispatch(LandingActions.setCategories(res));
        }
      })
      .catch(err => console.log(err));
  }

  function removeXSSAttacks(html) {
    const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    // Removing the <script> tags
    while (SCRIPT_REGEX.test(html)) {
      html = html.replace(SCRIPT_REGEX, '');
    }

    // Removing all events from tags...
    html = html.replace(/ on\w+="[^"]*"/g, '');

    return {
      __html: html,
    };
  }

  function matchEmphasize(name) {
    let regExp = new RegExp(search, 'i');
    return name.replace(regExp, match => '<strong>' + match + '</strong>');
  }

  function onSearchClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.parentNode.classList.toggle('show');
  }

  function onBodyClick(e) {
    if (e.target.closest('.header-search'))
      return (
        e.target.closest('.header-search').classList.contains('show-results') ||
        e.target.closest('.header-search').classList.add('show-results')
      );

    document.querySelector('.header-search.show') &&
      document.querySelector('.header-search.show').classList.remove('show');
    document.querySelector('.header-search.show-results') &&
      document
        .querySelector('.header-search.show-results')
        .classList.remove('show-results');
  }

  function onCatSelect(e) {
    setCat(e.target.value);
  }

  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    router.push({
      pathname: t('ROUTE_PATH_SHOP'),
      query: {
        search: search,
        category: cat,
      },
    });
  }

  async function searchProducts(search) {
    await fetcher('web/search?' + new URLSearchParams({ ...search }).toString())
      .then(res => {
        setProducts(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function normalizeSlug(slug) {
    return slug.replace(/-/g, '_').toUpperCase();
  }

  return (
    <div className="header-icon header-search header-search-inline header-search-category w-lg-max text-right mt-0">
      <a
        href="#"
        className="search-toggle"
        role="button"
        onClick={onSearchClick}
      >
        <i className="icon-search-3"></i>
      </a>
      <form action="#" method="get" onSubmit={e => onSubmitSearchForm(e)}>
        <div className="header-search-wrapper">
          <input
            type="search"
            className="form-control"
            name="q"
            id="q"
            placeholder={t('SEARCH')}
            value={search}
            required
            onChange={e => onSearchChange(e)}
          />
          <div className="select-custom">
            <select
              id="cat"
              name="cat"
              value={cat}
              onChange={e => onCatSelect(e)}
            >
              <option value="">{t('ALL_CATEGORIES')}</option>
              {Boolean(categories) &&
                categories.map((item, index) => (
                  <Fragment key={item.slug}>
                    <option value={item.slug}>
                      {t(item.slug.toUpperCase())}
                    </option>
                    {item.subcategory.length > 0 ? (
                      <option value={item.slug}>
                        - {t(normalizeSlug(item.slug))}
                      </option>
                    ) : null}
                  </Fragment>
                ))}
            </select>
          </div>

          <button
            className="btn icon-magnifier p-0"
            title="search"
            type="submit"
          ></button>

          <div className="live-search-list bg-white">
            {Boolean(search.length > 2 && products.length)
              ? products.map((product, index) => (
                  <ALink
                    href={`/${t('ROUTE_PATH_CATEGORY')}/${
                      product.category.slug
                    }/${t('ROUTE_PATH_PRODUCT')}/${product.slug}`}
                    className="autocomplete-suggestion"
                    key={`search-result-${index}`}
                  >
                    <LazyLoadImage
                      src={
                        product.product_images.find(image => image.main)
                          ?.file || product.product_images[0].file
                      }
                      width={40}
                      height={40}
                      alt={product.seo?.title}
                    />
                    <div
                      className="search-name"
                      dangerouslySetInnerHTML={removeXSSAttacks(
                        matchEmphasize(product.product_name),
                      )}
                    ></div>
                    <span className="search-price">
                      {product.price[0] == product.price[1] ? (
                        <span className="product-price">
                          {product.price[0].toFixed(2) + '€'}
                        </span>
                      ) : product.variants.length > 0 ? (
                        <span className="product-price">
                          {product.price[0].toFixed(2) + '€'} &ndash;{' '}
                          {product.price[1].toFixed(2) + '€'}
                        </span>
                      ) : (
                        <>
                          <span className="old-price">
                            {product.price[1].toFixed(2) + '€'}
                          </span>
                          <span className="product-price">
                            {product.price[0].toFixed(2) + '€'}
                          </span>
                        </>
                      )}
                    </span>
                  </ALink>
                ))
              : Boolean(search.length > 2 && !products.length) && null}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
