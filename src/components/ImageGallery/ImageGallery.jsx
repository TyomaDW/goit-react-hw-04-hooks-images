import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';

import styles from './ImageGallery.module.scss';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={styles.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            image={webformatURL}
            largeImageURL={largeImageURL}
            onClickImage={onImageClick}
            tags={tags}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  id: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;
