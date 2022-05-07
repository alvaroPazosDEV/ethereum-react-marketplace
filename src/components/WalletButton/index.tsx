import React from 'react';
import styles from './WalletButton.module.scss';

const WalletButton: React.FC<{
  imageUri: string;
  text: string;
  label?: string;
  onClick: () => void;
}> = ({ imageUri, text, label, onClick }) => {
  return (
    <button className={styles.container} onClick={onClick}>
      <img alt="wallet" src={imageUri} />
      <p>{text}</p>
      {label && <label>{label}</label>}
    </button>
  );
};

export default WalletButton;
