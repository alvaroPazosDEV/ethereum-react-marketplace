import React, { useEffect, useState } from 'react';
import Sidebar from 'layouts/Sidebar';
import styles from './WalletSidebar.module.scss';
import WalletsList from 'components/WalletsList';
import web3 from 'services/web3';
import WalletInfo from 'components/WalletInfo';

const WalletSidebar: React.FC<{
  show: boolean;
  onClose: () => void;
}> = ({ show, onClose }) => {
  const [userData, setUserData] = useState<{
    address: string;
    balance: string;
  } | null>(null);

  useEffect(() => {
    fetchAccountData();
    contractSubscriber();
    web3Subscriber();
  }, []);

  const contractSubscriber = async () => {
    const myContract = await web3.getContract();
    myContract.on('Transfer', () => {
      fetchAccountData();
    });
  };

  const web3Subscriber = async () => {
    window.ethereum.on('accountsChanged', () => {
      fetchAccountData();
    });
    window.ethereum.on('chainChanged', () => {
      fetchAccountData();
    });
  };

  const fetchAccountData = async () => {
    const accountData = await web3.getUserInfo();
    if (accountData) {
      setUserData(accountData);
    }
  };

  return (
    <Sidebar show={show} onClose={onClose}>
      <div className={styles.container}>
        <WalletInfo address={userData?.address} balance={userData?.balance} />
        {!userData && <WalletsList />}
      </div>
    </Sidebar>
  );
};

export default WalletSidebar;
