import React from 'react';
import styles from './Modal.module.scss';

const Modal: React.FC<{}> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
};

export default Modal;
