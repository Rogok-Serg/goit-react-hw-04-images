import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} type="button" className={css.button}>
      Load More
    </button>
  );
};
Button.protoType = {
  onClick: PropTypes.func.isRequired,
};
