import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineWallet } from 'react-icons/ai';
import NavbarItem from 'components/NavbarItem';
import styles from './Navbar.module.scss';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC<{
  onClickWallet: () => void;
}> = ({ onClickWallet }) => {
  const navigate = useNavigate();
  const [showCollapsed, setShowCollapsed] = useState(false);

  const renderOptions = () => {
    return (
      <>
        <NavbarItem text="Explore" onClick={() => navigate('/')} />
        <NavbarItem
          text="MyCollection"
          onClick={() => navigate('/my-collection')}
        />
        <NavbarItem text="Create" onClick={() => navigate('/create-token')} />
        <div onClick={onClickWallet}>
          <AiOutlineWallet size={30} />
          {showCollapsed && <p className={styles.walletText}>My Wallet</p>}
        </div>
      </>
    );
  };

  return (
    <>
      <nav className={styles.container}>
        <div className={styles.left}>
          <button className={styles.logo} onClick={() => navigate('/')}>
            <div className={styles.logoContainer}>
              <img
                src={require('assets/images/logo_opensea.png')}
                className={styles.logoImage}
              />
            </div>
            <p className={styles.logoText}>OpenMKP</p>
          </button>
        </div>
        <ul className={styles.right}>
          <div className={styles.options}>{renderOptions()}</div>
          <div
            className={styles.toggleButton}
            onClick={() => setShowCollapsed(!showCollapsed)}
          >
            <AiOutlineMenu size={30} />
          </div>
        </ul>
      </nav>
      {showCollapsed && (
        <div className={styles.collapsedOptions}>{renderOptions()}</div>
      )}
    </>
  );
};

export default Navbar;
