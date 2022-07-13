import ImageGalleryItem from './imageGalleryItems';
import styles from './imageGallery.module.css';

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

export default ImageGallery;
