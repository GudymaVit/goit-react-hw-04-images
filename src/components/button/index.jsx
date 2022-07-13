import styles from './button.module.css';

const Button = ({ onClick }) => (
  <button className={styles.button} type="button" onClick={onClick}>
    Load more
  </button>
);

export default Button;
