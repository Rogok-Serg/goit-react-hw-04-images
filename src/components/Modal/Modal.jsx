import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeyDown);
  }
  hendleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  hendleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    const { largeImageURL, tags } = this.props;
    return (
      <div className={css.overlay} onClick={this.hendleOverlayClick}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
