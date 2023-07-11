import { BallTriangle } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <BallTriangle
      height={150}
      width={150}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperClass={css.loader}
      wrapperStyle=""
      visible={true}
    />
  );
};
