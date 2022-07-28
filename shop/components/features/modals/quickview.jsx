import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import Modal from 'react-modal';

// Import Apollo Server and Query
import withApollo from '../../../server/apollo';
import { GET_PRODUCT } from '../../../server/queries';

// Import Action
import { actions as ModalAction } from '../../../store/modal';

// Import Custom Component
import ProductMediaOne from '../../partials/product/media/product-media-one';
import ProductDetailOne from '../../../components/partials/product/details/product-detail-one';

Modal.setAppElement('#__next');

const customStyles = {
  content: {
    position: 'relative',
    maxWidth: '930px',
    width: '100%',
    padding: '3rem',
    marginLeft: '2rem',
    marginRight: '2rem',
    overflow: 'hidden auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    maxHeight: 'calc( 100vh - 4rem )',
  },
};

function QuickModal(props) {
  const { slug } = props;
  if (!slug) return <div></div>;
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { demo: 4, slug, onlyData: true },
  });
  const router = useRouter();
  const product = data && data.product.data;

  useEffect(() => {
    router.events.on('routeChangeStart', closeModal);

    return () => {
      router.events.off('routeChangeStart', closeModal);
    };
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  }

  function closeModal() {
    if (!document.querySelector('.open-modal')) return;
    document.querySelector('.open-modal').classList.add('close-modal');

    setTimeout(() => {
      props.hideQuickView();
    }, 350);
  }

  return (
    <>
      <Modal
        isOpen={props.modalShow}
        onRequestClose={closeModal}
        className="product-single-container product-single-default product-quick-view custom-scrollbar mb-0"
        overlayClassName="ajax-overlay open-modal"
        closeTimeoutMS={100}
        shouldReturnFocusAfterClose={false}
        style={customStyles}
      >
        <div
          className={`row skeleton-body skel-shop-products ${
            loading ? '' : 'loaded'
          }`}
        >
          <ProductMediaOne
            product={product}
            parent=".product-quick-view"
            adClass="col-md-6 mb-md-0"
          />

          <div className="col-md-6">
            <ProductDetailOne
              product={product}
              parent=".product-quick-view"
              isNav={false}
              adClass="mb-0"
            />
          </div>
        </div>

        <button
          title="Close (Esc)"
          type="button"
          className="mfp-close"
          onClick={closeModal}
        >
          ×
        </button>
      </Modal>
    </>
  );
}

const mapStateToProps = state => {
  return {
    slug: state.modal.single,
    modalShow: state.modal.quickShow,
  };
};

export default withApollo({ ssr: typeof window === 'undefined' })(
  connect(mapStateToProps, ModalAction)(QuickModal),
);
