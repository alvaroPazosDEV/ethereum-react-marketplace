import React from 'react';
import { MarketItem } from 'services/web3';
import styles from './ItemCard.module.scss';

const ItemCard: React.FC<{
  item: MarketItem;
  onClick: () => void;
  type?: 'buy' | 'sell';
}> = ({ item, onClick, type = 'buy' }) => {
  return (
    <div className={styles.container}>
      <img alt="nft" src={item.imageUri} />
      <div className={styles.body}>
        <div className={styles.itemInfo}>
          <p>{item.name}</p>
          <span>{item.description}</span>
        </div>
        <div className={styles.itemPrice}>
          <p>{type === 'buy' ? 'Price' : 'Buy price'}</p>
          <div>
            <img src={require('assets/images/ethereum.png')} alt="ether" />
            <p>{item.price}</p>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <button onClick={onClick}>{type === 'buy' ? 'Buy' : 'Sell'} now</button>
      </footer>
    </div>
  );
};

export default ItemCard;
