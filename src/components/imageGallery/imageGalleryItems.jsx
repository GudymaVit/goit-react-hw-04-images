import styles from './imageGallery.module.css';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className={styles.imageGalleryItem} id={image.id}>
      <img
        className={styles.imageGalleryItem_image}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onClick(image.largeImageURL, image.tags)}
      />
    </li>
  );
};

export default ImageGalleryItem;
