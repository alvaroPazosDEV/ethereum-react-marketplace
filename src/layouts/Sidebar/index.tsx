import React from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC<{
  show: boolean;
  onClose: () => void;
}> = ({ show, onClose, children }) => {
  const { left } = useSpring({
    from: { left: '-100%' },
    left: show ? '0' : '-100%',
  });

  return (
    <>
      {show && <div className={styles.overlay}></div>}
      <animated.div style={{ right: left }} className={styles.sidebar}>
        <div className={styles.outterArea} onClick={onClose}></div>
        <div className={styles.content}>{children}</div>
      </animated.div>
    </>
  );
};

export default Sidebar;
