import { start, stop } from 'context/features/loading/loadingSlice';
import { useAppDispatch } from 'context/hooks';
import CardList from 'layouts/CardList';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import web3, { MarketItem } from 'services/web3';
import styles from './Collection.module.scss';

const Collection = () => {
  const [items, setItems] = useState<MarketItem[] | null>(null);
  const [searchText, setSearchText] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNFTS();
  }, []);

  const fetchNFTS = async () => {
    dispatch(start('Fetching your NFT collection'));
    const myCollection = await web3.fetchMarketItems(true);
    if (myCollection) {
      setItems(myCollection);
    }
    dispatch(stop());
  };

  return (
    <>
      <div className={styles.container}>
        <h1>My NFT collection</h1>
        {items ? (
          <CardList
            items={items}
            searchText={searchText}
            onChangeSearchText={(text) => setSearchText(text)}
            onCardClick={(item) =>
              navigate('/my-collection/sell', {
                state: {
                  item,
                },
              })
            }
            type="sell"
          />
        ) : (
          <p>There are no items in the collection.</p>
        )}
      </div>
    </>
  );
};

export default Collection;
