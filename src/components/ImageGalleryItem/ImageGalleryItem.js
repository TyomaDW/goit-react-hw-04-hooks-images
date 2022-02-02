import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ src, onModalOpen, largeImageUrl }) {
  return (
    <img
      className={s.image}
      src={src}
      alt=""
      onClick={() => onModalOpen(largeImageUrl)}
    />
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
