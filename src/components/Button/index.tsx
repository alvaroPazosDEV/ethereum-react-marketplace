import React from 'react';
import styles from './Button.module.scss';

const Button: React.FC<{
  text: string;
  disabled?: boolean;
  onClick: () => void;
}> = ({ text, disabled = false, onClick }) => {
  return (
    <button
      className={`${styles.container} ${disabled ? styles.disabled : ''}`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};

export default Button;
