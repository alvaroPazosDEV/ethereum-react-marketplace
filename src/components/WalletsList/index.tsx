import React from 'react';
import WalletButton from 'components/WalletButton';
import styles from './WalletsList.module.scss';
import web3 from 'services/web3';

const WalletsList = () => {
  const connectToMetamask = async () => {
    if (window.ethereum) {
      await web3.getUserInfo();
    } else {
      window.open('https://metamask.io/download/');
    }
  };

  const wallets = [
    {
      imageUri: require('assets/images/metamask.png'),
      text: 'Metamask',
      label: 'Popular',
      onClick: () => {
        connectToMetamask();
      },
    },
    {
      imageUri: require('assets/images/coinbase_wallet.png'),
      text: 'Coinbase Wallet',
      onClick: () =>
        window.open(
          'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad'
        ),
    },
    {
      imageUri: require('assets/images/wallet_connect.png'),
      text: 'Wallet Connect',
      onClick: () => window.open('https://walletconnect.com/'),
    },
  ];

  return (
    <div className={styles.container}>
      <p>
        Connect with one of our available <b>wallet</b> providers o create a new
        one.
      </p>
      <div className={styles.wallets}>
        {wallets.map((walletData, i) => (
          <WalletButton
            imageUri={walletData.imageUri}
            text={walletData.text}
            label={walletData.label}
            onClick={walletData.onClick}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default WalletsList;
