import React from 'react';
import Search from 'components/Search';
import { MarketItem } from 'services/web3';
import styles from './CardList.module.scss';
import ItemCard from 'components/ItemCard';

const CardList: React.FC<{
  items: MarketItem[];
  searchText: string;
  onChangeSearchText: (text: string) => void;
  onCardClick: (item: MarketItem) => void;
  type?: 'buy' | 'sell';
}> = ({ items, searchText, onChangeSearchText, onCardClick, type = 'buy' }) => {
  const filteredItems = items.filter((item) =>
    item.name.toUpperCase().includes(searchText.toUpperCase())
  );

  return items.length === 0 ? (
    <p className={styles.errorMessage}>
      There are no items in
      {type === 'buy' ? ' the marketplace' : ' your collection'}.
    </p>
  ) : (
    <div className={styles.container}>
      <Search text={searchText} onChange={(text) => onChangeSearchText(text)} />
      <p>{filteredItems.length} items</p>
      <div className={styles.cards}>
        {filteredItems.map((item) => (
          <ItemCard
            key={item.tokenId}
            item={item}
            onClick={() => onCardClick(item)}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
