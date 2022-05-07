import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { AiOutlineClose, AiOutlineExport } from 'react-icons/ai';
import CustomModal from 'components/Modal';
import successAnimation from 'assets/gifs/success.json';
import errorAnimation from 'assets/gifs/error.json';
import styles from './ActionModal.module.scss';
import Button from 'components/Button';

export enum ModalType {
  SUCCESS,
  ERROR,
}

export interface Modal {
  show: boolean;
  title: string;
  message: string;
  type: ModalType;
}

const ActionModal: React.FC<{
  title: string;
  message: string;
  onClose: () => void;
  type: ModalType;
}> = ({ title, message, onClose, type = ModalType.SUCCESS }) => {
  const animation = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (animation.current) {
      lottie.loadAnimation({
        container: animation.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData:
          type === ModalType.SUCCESS ? successAnimation : errorAnimation,
      });
    }
    return () => lottie.stop();
  }, [animation]);
  return (
    <CustomModal>
      <div className={styles.container}>
        <div className={styles.head}>
          <p>{title}</p>
          <AiOutlineClose size={20} onClick={onClose} />
        </div>
        <div className={styles.body}>
          <div className={styles.loading} ref={animation}></div>
          {type === ModalType.SUCCESS ? (
            <a href={message} target="_blank" rel="noreferrer">
              <p>View on BscScan</p> <AiOutlineExport size={25} />
            </a>
          ) : (
            <p>{message}</p>
          )}
          <Button text="Close" onClick={onClose} />
        </div>
      </div>
    </CustomModal>
  );
};

export default ActionModal;
