import React, { useEffect, useMemo } from 'react';
import SlideToggle from 'react-slide-toggle';
import StickyBox from 'react-sticky-box';
import Tree from 'rc-tree';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Aollo Server and Query
import withApollo from '../../../../server/apollo';
import { GET_SHOP_SIDEBAR_DATA } from '../../../../server/queries';

// Import Custom Component
import ProductThree from '../../../features/products/product-three';
import OwlCarousel from '../../../features/owl-carousel';

// Import Settings
import { widgetFeaturedProductSlider } from '../../../../utils/data/slider';

const TreeNode = props => {
  return (
    <>
      {props.name}
      <span className="products-count">({props.count})</span>
    </>
  );
};

function ProductSidebarOne(props) {
  const router = useRouter();
  const query = router.query;
  const { adClass = '' } = props;
  const { data, loading, error } = useQuery(GET_SHOP_SIDEBAR_DATA, {
    variables: { featured: true },
  });
  const categories = useMemo(() => {
    let cats = data ? data.shopSidebarData.categories : [];
    let stack = [],
      result = [];
    result = cats.reduce((acc, cur) => {
      if (!cur.parent) {
        let newNode = {
          key: cur.slug,
          title: <TreeNode name={cur.name} count={cur.count} />,
          children: [],
        };
        acc.push(newNode);
        stack.push({
          name: cur.name,
          children: newNode.children,
        });
      }
      return acc;
    }, []);

    let temp, children, childNode;

    while (stack.length) {
      temp = stack[stack.length - 1];
      stack.pop();
      children = cats.filter(item => item.parent === temp.name);
      children.forEach(child => {
        childNode = {
          key: child.slug,
          title: <TreeNode name={child.name} count={child.count} />,
          children: [],
        };
        temp.children.push(childNode);
        stack.push({
          name: child.name,
          children: childNode.children,
        });
      });
    }

    return result;
  }, [data]);

  useEffect(() => {
    return () => {
      closeSidebar();
    };
  }, []);

  function sidebarToggle(e) {
    let body = document.querySelector('body');

    e.preventDefault();
    if (body.classList.contains('sidebar-opened')) {
      body.classList.remove('sidebar-opened');
    } else {
      body.classList.add('sidebar-opened');
    }
  }

  function filterByCategory(selected) {
    router.push({
      pathname: '/shop',
      query: {
        category: selected[0],
        grid: query.grid,
      },
    });
  }

  function closeSidebar() {
    document.querySelector('body').classList.contains('sidebar-opened') &&
      document.querySelector('body').classList.remove('sidebar-opened');
  }

  return (
    <>
      <div className="sidebar-overlay" onClick={closeSidebar}></div>
      <div
        className="sidebar-toggle custom-sidebar-toggle"
        onClick={e => sidebarToggle(e)}
      >
        <i className="fas fa-sliders-h"></i>
      </div>
      <aside
        className={`sidebar-product col-lg-3 mobile-sidebar skeleton-body skel-shop-products ${adClass} ${
          loading ? '' : 'loaded'
        }`}
      >
        <StickyBox className="sticky-wrapper" offsetTop={70}>
          {loading ? (
            <div className="skel-widget"></div>
          ) : (
            <div className="widget widget-product-categories mb-3">
              <SlideToggle>
                {({ onToggle, setCollapsibleElement, toggleState }) => (
                  <>
                    <h3 className="widget-title">
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault(), onToggle();
                        }}
                        className={
                          toggleState === 'COLLAPSED' ? 'collapsed' : ''
                        }
                      >
                        Categories
                      </a>
                    </h3>
                    <div
                      className="overflow-hidden"
                      ref={setCollapsibleElement}
                    >
                      <div className="widget-body">
                        <Tree
                          className="no-icon cat-list border-0"
                          selectable={true}
                          showIcon={false}
                          defaultExpandedKeys={
                            query.category ? [query.category] : []
                          }
                          switcherIcon={props => {
                            return !props.isLeaf ? (
                              <span className="toggle"></span>
                            ) : (
                              ''
                            );
                          }}
                          selectedKeys={query.category ? [query.category] : []}
                          treeData={categories}
                          onSelect={filterByCategory}
                        />
                      </div>
                    </div>
                  </>
                )}
              </SlideToggle>
            </div>
          )}

          {loading ? (
            <div className="skel-widget"></div>
          ) : (
            <div className="widget">
              <div className="maga-sale-container">
                <figure className="mega-image">
                  <LazyLoadImage
                    alt="banner"
                    src="images/banners/banner-sidebar.jpg"
                    threshold={500}
                    effect="blur"
                    width={100}
                    height={335}
                  />
                </figure>

                <div className="mega-content">
                  <div className="mega-price-box">
                    <span className="price-big">50</span>
                    <span className="price-desc">
                      <em>%</em>OFF
                    </span>
                  </div>

                  <div className="mega-desc">
                    <h3 className="mega-title mb-0">MEGA SALE</h3>
                    <span className="mega-subtitle">MANY ITEM</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="widget widget-featured">
            <h3 className="widget-title">Featured</h3>

            <div className="widget-body">
              <OwlCarousel
                adClass="widget-featured-products"
                isTheme={false}
                options={widgetFeaturedProductSlider}
              >
                <div className="featured-col">
                  {loading
                    ? [0, 1, 2].map((item, index) => (
                        <div
                          className="skel-product-col skel-pro mb-2"
                          key={'product-one' + index}
                        ></div>
                      ))
                    : data.shopSidebarData.featured.map((item, index) => (
                        <ProductThree
                          product={item}
                          key={'product-three' + index}
                        />
                      ))}
                </div>

                <div className="featured-col">
                  {data &&
                    data.shopSidebarData.featured.map((item, index) => (
                      <ProductThree product={item} key={`featured-${index}`} />
                    ))}
                </div>
              </OwlCarousel>
            </div>
          </div>
        </StickyBox>
      </aside>
    </>
  );
}

export default withApollo({ ssr: typeof window === 'undefined' })(
  ProductSidebarOne,
);
