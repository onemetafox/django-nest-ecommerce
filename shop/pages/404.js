import ALink from '../components/common/ALink';

export default function PageNotFound() {
  return (
    <div className="container">
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <ALink href="/">
              <i className="icon-home"></i>
            </ALink>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            404
          </li>
        </ol>
      </nav>

      <section className="http-error">
        <div className="row justify-content-center py-3">
          <div className="col-md-7 text-center">
            <div className="http-error-main">
              <h2>
                404<i className="fas fa-file ml-3"></i>
              </h2>
              <p>
                We&apos;re sorry, but the page you were looking for doesn&apos;t exist.
              </p>
            </div>
          </div>
          <div className="col-md-4 mt-4 mt-md-0">
            <h4 className="text-primary">Here are some useful links</h4>
            <ul className="nav nav-list">
              <li className="nav-item">
                <ALink className="nav-link" href="/">
                  Home
                </ALink>
              </li>
              <li className="nav-item">
                <ALink className="nav-link" href={'/pages/about-us'}>
                  About Us
                </ALink>
              </li>
              <li className="nav-item">
                <ALink className="nav-link" href="#">
                  FAQ&apos;s
                </ALink>
              </li>
              <li className="nav-item">
                <ALink className="nav-link" href="#">
                  Sitemap
                </ALink>
              </li>
              <li className="nav-item">
                <ALink className="nav-link" href="/pages/contact-us">
                  Contact Us
                </ALink>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
