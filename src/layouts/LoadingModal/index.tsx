import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import spinnerAnimation from 'assets/gifs/loading.json';
import Modal from 'components/Modal';
import styles from './LoadingModal.module.scss';

const LoadingModal: React.FC<{
  message: string | null;
}> = ({ message }) => {
  const animation = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (animation.current) {
      lottie.loadAnimation({
        container: animation.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: spinnerAnimation,
      });
    }
    return () => lottie.stop();
  }, [animation]);

  return (
    <Modal>
      <div className={styles.container}>
        <div className={styles.loading} ref={animation}></div>
        <p className={styles.text}>{message}</p>
      </div>
    </Modal>
  );
};

export default LoadingModal;
