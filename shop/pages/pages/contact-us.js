import GoogleMapReact from 'google-map-react';

import ALink from '../../components/common/ALink';
import Card from '../../components/features/accordion/card';
import Accordion from '../../components/features/accordion/accordion';

const AnyReactComponent = () => <div></div>;

export default function ContactUs() {
  return (
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">
                <i className="icon-home"></i>
              </ALink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Contact Us
            </li>
          </ol>
        </div>
      </nav>

      <div id="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'your-api-key' }}
          defaultCenter={{ lat: 59.95, lng: 30.33 }}
          defaultZoom={11}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} />
        </GoogleMapReact>
      </div>

      <div className="container contact-us-container">
        <div className="contact-info">
          <div className="row">
            <div className="col-12">
              <h2 className="ls-n-25 m-b-1">Contact Info</h2>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                imperdiet libero id nisi euismod, sed porta est consectetur.
                Vestibulum auctor felis eget orci semper vestibulum.
                Pellentesque ultricies nibh gravida, accumsan libero luctus,
                molestie nunc.L orem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </p>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="feature-box text-center">
                <i className="sicon-location-pin"></i>
                <div className="feature-box-content">
                  <h3>Address</h3>
                  <h5>123 Wall Street, New York / NY</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="feature-box text-center">
                <i className="fa fa-mobile-alt"></i>
                <div className="feature-box-content">
                  <h3>Phone Number</h3>
                  <h5>(800) 123-4567</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="feature-box text-center">
                <i className="far fa-envelope"></i>
                <div className="feature-box-content">
                  <h3>E-mail Address</h3>
                  <h5>porto@portotheme.com</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="feature-box text-center">
                <i className="far fa-calendar-alt"></i>
                <div className="feature-box-content">
                  <h3>Working Days/Hours</h3>
                  <h5>Mon - Sun / 9:00AM - 8:00PM</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <h2 className="mt-6 mb-2">Send Us a Message</h2>

            <form className="mb-0" action="#">
              <div className="form-group">
                <label className="mb-1" htmlFor="contact-name">
                  Your Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contact-name"
                  name="contact-name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="mb-1" htmlFor="contact-email">
                  Your E-mail <span className="required">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="contact-email"
                  name="contact-email"
                  required
                />
              </div>

              <div className="form-group">
                <label className="mb-1" htmlFor="contact-message">
                  Your Message <span className="required">*</span>
                </label>
                <textarea
                  cols="30"
                  rows="1"
                  id="contact-message"
                  className="form-control"
                  name="contact-message"
                  required
                ></textarea>
              </div>

              <div className="form-footer mb-0">
                <button
                  type="submit"
                  className="btn btn-dark font-weight-normal"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="col-lg-6">
            <h2 className="mt-6 mb-1">Frequently Asked Questions</h2>
            <div id="accordion">
              <Accordion adClass="accordion-simple">
                <Card
                  title="Curabitur eget leo at velit imperdiet viaculis vitaes?"
                  adClass="card-accordion"
                >
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur eget leo at velit imperdiet varius. In eu ipsum
                    vitae velit congue iaculis vitae at risus. Nullam tortor
                    nunc, bibendum vitae semper a, volutpat eget massa.
                  </p>
                </Card>

                <Card
                  title="Curabitur eget leo at velit imperdiet vague iaculis vitaes?"
                  adClass="card-accordion"
                >
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur eget leo at velit imperdiet varius. In eu ipsum
                    vitae velit congue iaculis vitae at risus. Nullam tortor
                    nunc, bibendum vitae semper a, volutpat eget massa. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Integer
                    fringilla, orci sit amet posuere auctor, orci eros
                    pellentesque odio, nec pellentesque erat ligula nec massa.
                    Aenean consequat lorem ut felis ullamcorper posuere gravida
                    tellus faucibus. Maecenas dolor elit, pulvinar eu vehicula
                    eu, consequat et lacus. Duis et purus ipsum. In auctor
                    mattis ipsum id molestie. Donec risus nulla, fringilla a
                    rhoncus vitae, semper a massa. Vivamus ullamcorper, enim sit
                    amet consequat laoreet, tortor tortor dictum urna, ut
                    egestas urna ipsum nec libero. Nulla justo leo, molestie vel
                    tempor nec, egestas at massa. Aenean pulvinar, felis
                    porttitor iaculis pulvinar, odio orci sodales odio, ac
                    pulvinar felis quam sit.
                  </p>
                </Card>

                <Card
                  title="Curabitur eget leo at velit imperdiet viaculis vitaes?"
                  adClass="card-accordion"
                >
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur eget leo at velit imperdiet varius. In eu ipsum
                    vitae velit congue iaculis vitae at risus. Nullam tortor
                    nunc, bibendum vitae semper a, volutpat eget massa.
                  </p>
                </Card>

                <Card
                  title="Curabitur eget leo at velit imperdiet vague iaculis vitaes?"
                  adClass="card-accordion"
                >
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur eget leo at velit imperdiet varius. In eu ipsum
                    vitae velit congue iaculis vitae at risus. Nullam tortor
                    nunc, bibendum vitae semper a, volutpat eget massa. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Integer
                    fringilla, orci sit amet posuere auctor, orci eros
                    pellentesque odio, nec pellentesque erat ligula nec massa.
                    Aenean consequat lorem ut felis ullamcorper posuere gravida
                    tellus faucibus. Maecenas dolor elit, pulvinar eu vehicula
                    eu, consequat et lacus. Duis et purus ipsum. In auctor
                    mattis ipsum id molestie. Donec risus nulla, fringilla a
                    rhoncus vitae, semper a massa. Vivamus ullamcorper, enim sit
                    amet consequat laoreet, tortor tortor dictum urna, ut
                    egestas urna ipsum nec libero. Nulla justo leo, molestie vel
                    tempor nec, egestas at massa. Aenean pulvinar, felis
                    porttitor iaculis pulvinar, odio orci sodales odio, ac
                    pulvinar felis quam sit.
                  </p>
                </Card>

                <Card
                  title="Curabitur eget leo at velit imperdiet varius iaculis vitaes?"
                  adClass="card-accordion"
                >
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur eget leo at velit imperdiet varius. In eu ipsum
                    vitae velit congue iaculis vitae at risus. Nullam tortor
                    nunc, bibendum vitae semper a, volutpat eget massa. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Integer
                    fringilla, orci sit amet posuere auctor, orci eros
                    pellentesque odio, nec pellentesque erat ligula nec massa.
                    Aenean consequat lorem ut felis ullamcorper posuere gravida
                    tellus faucibus. Maecenas dolor elit, pulvinar eu vehicula
                    eu, consequat et lacus. Duis et purus ipsum. In auctor
                    mattis ipsum id molestie. Donec risus nulla, fringilla a
                    rhoncus vitae, semper a massa. Vivamus ullamcorper, enim sit
                    amet consequat laoreet, tortor tortor dictum urna, ut
                    egestas urna ipsum nec libero. Nulla justo leo, molestie vel
                    tempor nec, egestas at massa. Aenean pulvinar, felis
                    porttitor iaculis pulvinar, odio orci sodales odio, ac
                    pulvinar felis quam sit.
                  </p>
                </Card>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8"></div>
    </main>
  );
}
