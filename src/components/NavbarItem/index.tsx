import React from 'react';
import styles from './NavbarItem.module.scss';

const NavbarItem: React.FC<{
  text: string;
  onClick: () => void;
}> = ({ text, onClick }) => {
  return (
    <li className={styles.container} onClick={onClick}>
      {text}
    </li>
  );
};

export default NavbarItem;
