import { useQuery } from '@apollo/react-hooks';
import StickyBox from 'react-sticky-box';
import { useRouter } from 'next/router';

// Import Apollo Server and Query
import withApollo from '../../../server/apollo';
import { GET_POST_SIDEBAR_DATA } from '../../../server/queries';

// Import Custom Component
import ALink from '../../common/ALink';
import BlogTypeTwo from '../../features/blogs/blog-type-two';

function BlogSidebar() {
  const { data, loading, error } = useQuery(GET_POST_SIDEBAR_DATA);
  const categories = data && data.postSidebarData.categories;
  const recent = data && data.postSidebarData.recent;
  const router = useRouter();
  const query = router.query;

  if (error) {
    return <div>{error.message}</div>;
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
        className={`sidebar mobile-sidebar col-lg-3 h-auto skeleton-body skel-shop-products ${
          loading ? '' : 'loaded'
        }`}
      >
        <StickyBox className="sidebar-wrapper sticky-sidebar" offsetTop={70}>
          {loading ? (
            <div className="skel-widget"></div>
          ) : (
            <div className="widget widget-categories">
              <h4 className="widget-title">Blog Categories</h4>

              <ul className="list">
                {categories.map((item, index) => (
                  <li
                    key={('Blog Category:', index)}
                    className={`${
                      query.category === item.slug ? 'active' : ''
                    }`}
                  >
                    <ALink
                      href={{
                        pathname: '/pages/blog',
                        query: { category: item.slug },
                      }}
                      scroll={false}
                    >
                      {item.name}
                    </ALink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {loading ? (
            <div className="skel-widget"></div>
          ) : (
            <div className="widget widget-post">
              <h4 className="widget-title">Recent Posts</h4>

              <ul className="simple-post-list">
                {recent.slice(0, 2).map((blog, index) => (
                  <BlogTypeTwo blog={blog} key={'BlogTypeTwo' + index} />
                ))}
              </ul>
            </div>
          )}

          {loading ? (
            <div className="skel-widget"></div>
          ) : (
            <div className="widget">
              <h4 className="widget-title">Tags</h4>

              <div className="tagcloud">
                <ALink href="#">ARTICLES</ALink>
                <ALink href="#">CHAT</ALink>
              </div>
            </div>
          )}
        </StickyBox>
      </aside>
    </>
  );
}

export default withApollo({ ssr: typeof window === 'undefined' })(BlogSidebar);
