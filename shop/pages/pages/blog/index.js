import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLazyQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

// Import Apollo Server and Query
import withApollo from '../../../server/apollo';
import { GET_POSTS } from '../../../server/queries';

// Import Custom Component
import BlogTypeOne from '../../../components/features/blogs/blog-type-one';
import BlogSidebar from '../../../components/partials/blog/blog-sidebar';
import Pagination from '../../../components/features/pagination';

function Blog() {
  const router = useRouter();
  const query = router.query;
  const [getBlogs, { data, loading, error }] = useLazyQuery(GET_POSTS);
  const [perPage, setPerPage] = useState(6);
  const blogs = data && data.posts.data;
  const totalPage = data
    ? parseInt(data.posts.total / perPage) +
      (data.posts.total % perPage ? 1 : 0)
    : 1;
  let page = query.page ? query.page : 1;

  if (error) {
    return <div>{error.message}</div>;
  }

  useEffect(() => {
    let offset =
      document.querySelector('.main').getBoundingClientRect().top +
      window.pageYOffset -
      68;
    setTimeout(() => {
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }, 200);

    getBlogs({
      variables: {
        category: query.category,
        from: perPage * (page - 1),
        to: perPage * page,
      },
    });
  }, [query]);

  return (
    <>
      <Helmet>
        <title>Porto React Ecommerce - Blog Page </title>
      </Helmet>

      <main className="main">
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/home">
                  <i className="icon-home"></i>
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Blog
              </li>
            </ol>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div
                className={`blog-section row pt-0 pb-3 skeleton-body skel-shop-products ${
                  loading ? '' : 'loaded'
                }`}
              >
                {loading ? (
                  new Array(parseInt(perPage)).fill(1).map((item, index) => (
                    <div
                      className="col-md-6 col-lg-4"
                      key={'Skeleton:' + index}
                    >
                      <div className="skel-pro skel-pro-grid"></div>
                    </div>
                  ))
                ) : blogs ? (
                  blogs.length ? (
                    blogs.slice(0, 6).map((blog, index) => (
                      <div
                        className="col-md-6 col-lg-4"
                        key={'BlogTypeOne' + index}
                      >
                        <BlogTypeOne blog={blog} />
                      </div>
                    ))
                  ) : (
                    <div className="info-box with-icon">
                      <p>No blogs were found matching your selection.</p>
                    </div>
                  )
                ) : (
                  ''
                )}
              </div>

              <div className="d-flex justify-content-end mb-5">
                <Pagination totalPage={totalPage} />
              </div>
            </div>

            <BlogSidebar />
          </div>
        </div>
      </main>
    </>
  );
}

export default withApollo({ ssr: typeof window === 'undefined' })(Blog);
