import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
  };

  toggleModal = () => {
    this.setState(({ isOpenModal }) => ({
      isOpenModal: !isOpenModal,
    }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.image;
    return (
      <li className={css.imageGalleryItem}>
        <img
          onClick={this.toggleModal}
          className={css.imageItem}
          src={webformatURL}
          alt={tags}
        />
        {this.state.isOpenModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
      </li>
    );
  }
}
ImageGalleryItem.propTypes = {
  image: PropTypes.objectOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
