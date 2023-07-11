import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images }) => {
  return (
    <div>
      <ul className={css.imageGallery}>
        {images.map(image => {
          return <ImageGalleryItem key={image.id} image={image} />;
        })}
      </ul>
    </div>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
