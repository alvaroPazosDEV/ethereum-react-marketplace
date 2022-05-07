import React, { useEffect, useState } from 'react';
import { start, stop } from 'context/features/loading/loadingSlice';
import { useAppDispatch } from 'context/hooks';
import CardList from 'layouts/CardList';
import web3, { MarketItem } from 'services/web3';
import styles from './Home.module.scss';
import ActionModal, { Modal, ModalType } from 'layouts/ActionModal';

const initialModalValue: Modal = {
  show: false,
  title: '',
  message: '',
  type: ModalType.SUCCESS,
};

const Home = () => {
  const [items, setItems] = useState<MarketItem[] | null>(null);
  const [searchText, setSearchText] = useState('');
  const [modal, setModal] = useState<Modal>(initialModalValue);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchMarketItems();
  }, []);

  const updatedItems = (item: MarketItem) => {
    if (!items) return [];
    return items.filter((i) => i.tokenId !== item.tokenId);
  };

  const fetchMarketItems = async () => {
    dispatch(start('Fetching market items'));
    const marketData = await web3.fetchMarketItems();
    if (marketData) {
      setItems(marketData);
    }
    dispatch(stop());
  };

  const buytoken = async (item: MarketItem) => {
    dispatch(start('Waiting for wallet signature'));
    const result = await web3.buyMarketItem(item.tokenId, item.price);
    dispatch(stop());
    if (result.success) {
      setItems(updatedItems(item));
      setModal({
        show: true,
        title: 'Transaction submitted',
        message: result.message,
        type: ModalType.SUCCESS,
      });
    } else {
      setModal({
        show: true,
        title: 'Error',
        message: result.message,
        type: ModalType.ERROR,
      });
    }
  };

  return (
    <>
      {modal.show && (
        <ActionModal
          title={modal.title}
          message={modal.message}
          type={modal.type}
          onClose={() => setModal(initialModalValue)}
        />
      )}
      <div className={styles.container}>
        <h1>Explore NFT art</h1>
        {items ? (
          <CardList
            items={items}
            searchText={searchText}
            onChangeSearchText={(text) => setSearchText(text)}
            onCardClick={(item) => buytoken(item)}
          />
        ) : (
          <p>There are no items in the market</p>
        )}
      </div>
    </>
  );
};

export default Home;
