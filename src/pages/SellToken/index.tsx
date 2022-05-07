import Button from 'components/Button';
import Input from 'components/Input';
import { start, stop } from 'context/features/loading/loadingSlice';
import { useAppDispatch } from 'context/hooks';
import ActionModal, { Modal, ModalType } from 'layouts/ActionModal';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import web3, { MarketItem } from 'services/web3';
import { isDecimal } from 'utils/validators';
import styles from './SellToken.module.scss';

interface StateType {
  item: MarketItem;
}

const initialModalValue: Modal = {
  show: false,
  title: '',
  message: '',
  type: ModalType.ERROR,
};

const SellToken = () => {
  const [price, setPrice] = useState('');
  const location = useLocation();
  const { item } = location.state as StateType;
  const [modal, setModal] = useState<Modal>(initialModalValue);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const sellToken = async () => {
    dispatch(start('Waiting for wallet signature'));
    const result = await web3.resellToken(item.tokenId, price);
    dispatch(stop());
    if (result.success) {
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

  const closeModal = () => {
    if (modal.type === ModalType.ERROR) {
      setModal(initialModalValue);
    } else {
      navigate('/my-collection');
    }
  };

  return (
    <>
      {modal.show && (
        <ActionModal
          title={modal.title}
          message={modal.message}
          type={modal.type}
          onClose={() => closeModal()}
        />
      )}
      <div className={styles.container}>
        <h1>Sell token</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <div>
              <p>Name:</p>
              <b>{item.name}</b>
            </div>
            <div>
              <p>Description: </p>
              <b>{item.description}</b>
            </div>
            <div>
              <p>Buy price (ETH): </p>
              <b>{item.price}</b>
            </div>
            <div>
              <p>Price (ETH): </p>
              <Input
                value={price}
                placeholder="0.1"
                onChange={(target) => {
                  if (isDecimal(target.value)) {
                    setPrice(target.value);
                  }
                }}
              />
            </div>
            <Button text="Sell" onClick={() => sellToken()} />
          </div>
          <img src={item.imageUri} />
        </form>
      </div>
    </>
  );
};

export default SellToken;
