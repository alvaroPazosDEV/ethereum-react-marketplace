import React from 'react';
import { reduceAddress } from 'utils/formatters';
import { AiOutlineUser } from 'react-icons/ai';
import styles from './WalletInfo.module.scss';

const WalletInfo: React.FC<{
  address?: string;
  balance?: string;
}> = ({ address, balance }) => {
  return (
    <>
      <div className={styles.head}>
        {address ? (
          <img
            src={require('assets/images/opensea_default_user.png')}
            alt="user"
          />
        ) : (
          <div className={styles.placeholder}>
            <AiOutlineUser size={20} />
          </div>
        )}
        <p>My Wallet</p>
        {address && <span>{reduceAddress(address)}</span>}
      </div>
      {balance && (
        <div className={styles.balance}>
          <p>Total balance</p>
          <b>{balance} ETH</b>
        </div>
      )}
    </>
  );
};

export default WalletInfo;
