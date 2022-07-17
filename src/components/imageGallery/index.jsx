import ImageGalleryItem from './imageGalleryItems';
import styles from './imageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={styles.imageGallery_list}>
      {images.map(image => {
        return (
          <ImageGalleryItem key={image.id} image={image} onClick={onClick} />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  id: PropTypes.number,
};

export default ImageGallery;
