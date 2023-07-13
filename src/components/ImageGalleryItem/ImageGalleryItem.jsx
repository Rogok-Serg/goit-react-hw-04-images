import css from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ImageGalleryItem = ({ image }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const { webformatURL, tags, largeImageURL } = image;
  return (
    <li className={css.imageGalleryItem}>
      <img
        onClick={toggleModal}
        className={css.imageItem}
        src={webformatURL}
        alt={tags}
      />
      {isOpenModal && (
        <Modal largeImageURL={largeImageURL} onClose={toggleModal} />
      )}
    </li>
  );
};
ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};

// export class oldImageGalleryItem extends Component {
//   state = {
//     isOpenModal: false,
//   };

//   toggleModal = () => {
//     this.setState(({ isOpenModal }) => ({
//       isOpenModal: !isOpenModal,
//     }));
//   };

//   render() {
//     const { webformatURL, tags, largeImageURL } = this.props.image;
//     return (
//       <li className={css.imageGalleryItem}>
//         <img
//           onClick={this.toggleModal}
//           className={css.imageItem}
//           src={webformatURL}
//           alt={tags}
//         />
//         {this.state.isOpenModal && (
//           <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
//         )}
//       </li>
//     );
//   }
// }
