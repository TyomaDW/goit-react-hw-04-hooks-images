import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const Button = ({ onClickButton }) => {
  return (
    <button className={styles.Button} type="button" onClick={onClickButton}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
