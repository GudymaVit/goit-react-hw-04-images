import styles from './imageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className={styles.imageGalleryItem} id="card">
      <img
        className={styles.imageGalleryItem_image}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onClick(image.largeImageURL, image.tags)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
