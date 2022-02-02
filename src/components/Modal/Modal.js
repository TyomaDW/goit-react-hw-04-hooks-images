import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

function Modal({ onModalClose, largeImageUrl }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  function handleKeyDown(evt) {
    if (evt.code === 'Escape') {
      onModalClose();
    }
  }

  function handleOverlayClick(evt) {
    if (evt.currentTarget === evt.target) {
      onModalClose();
    }
  }

  return (
    <div className={s.overlay} onClick={handleOverlayClick}>
      <div className={s.modal}>
        <img src={largeImageUrl} alt="" />
      </div>
    </div>
  );
}
Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};
export default Modal;
