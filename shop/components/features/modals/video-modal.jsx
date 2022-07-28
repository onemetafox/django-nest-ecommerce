import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

// Import Action
import { actions as ModalAction } from '../../../store/modal';

const customStyles = {
  content: {
    top: '50%',
    transform: 'translateY(-50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: '10000',
  },
};

Modal.setAppElement('#__next');

function VideoModal(props) {
  const { showModal } = props;

  function closeHandler() {
    document.querySelector('.ReactModal__Overlay').classList.add('close-modal');

    setTimeout(() => {
      props.hideVideo();
    }, 350);
  }

  return showModal ? (
    <Modal
      isOpen={showModal}
      style={customStyles}
      onRequestClose={closeHandler}
      shouldReturnFocusAfterClose={false}
      contentLabel="Video Modal"
      className="video-modal"
      closeTimeoutMS={100}
    >
      <button
        type="button"
        className="modal-close"
        data-dismiss="modal"
        aria-label="Close"
        onClick={closeHandler}
      >
        ×
      </button>
      <iframe
        className="mfp-iframe"
        src="//www.youtube.com/embed/vBPgmASQ1A0?autoplay=1"
        frameBorder="0"
        allowFullScreen=""
        title="youtube"
      ></iframe>
    </Modal>
  ) : (
    ''
  );
}

export const mapStateToProps = state => {
  return {
    showModal: state.modal.videoShow,
  };
};

export default connect(mapStateToProps, ModalAction)(VideoModal);
