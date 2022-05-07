import React from 'react';
import { useState } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import infuraAPI from 'services/infuraAPI';
import styles from './CreateToken.module.scss';

import web3 from 'services/web3';
import { isDecimal } from 'utils/validators';
import { useAppDispatch } from 'context/hooks';
import { start, stop } from 'context/features/loading/loadingSlice';
import ActionModal, { Modal, ModalType } from 'layouts/ActionModal';

const initialFormValues = {
  name: '',
  description: '',
  price: '',
  imageUri: '',
};

const initialModalValue: Modal = {
  show: false,
  title: '',
  message: '',
  type: ModalType.SUCCESS,
};

const CreateToken = () => {
  const [form, setForm] = useState(initialFormValues);
  const [modal, setModal] = useState<Modal>(initialModalValue);
  const [loadingImage, setLoadingImage] = useState(false);
  const dispatch = useAppDispatch();

  const handleFileChange = async (files: FileList | null) => {
    if (files && files.length > 0) {
      setLoadingImage(true);
      const file = files[0];
      const uploadResult = await infuraAPI.uploadImage(file);
      setLoadingImage(false);
      if (uploadResult) {
        setForm({ ...form, imageUri: uploadResult });
      }
    }
  };

  const createToken = async () => {
    dispatch(start('Uploading token metadata'));
    const url = await infuraAPI.uploadTokenData(
      form.name,
      form.description,
      form.imageUri
    );
    if (url) {
      dispatch(start('Waiting for wallet signature'));
      const result = await web3.createToken(url, form.price);
      dispatch(stop());
      if (result.success) {
        resetForm();
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
    } else {
      dispatch(stop());
    }
  };

  const resetForm = () => {
    setForm(initialFormValues);
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
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <h1 className={styles.formTitle}>Create New Item</h1>
          <Input
            label="Upload image"
            type="file"
            value={
              loadingImage
                ? require('assets/images/loading_image.gif')
                : form.imageUri
            }
            onChange={(target) => handleFileChange(target.files)}
          />
          <Input
            label="Name"
            placeholder="Item name"
            value={form.name}
            onChange={(target) => setForm({ ...form, name: target.value })}
          />
          <Input
            label="Description"
            placeholder="Provide a detailed description of your item"
            value={form.description}
            onChange={(target) =>
              setForm({ ...form, description: target.value })
            }
          />
          <Input
            label="Price (ETHER)"
            placeholder="0.1"
            value={form.price}
            onChange={(target) => {
              if (isDecimal(target.value)) {
                setForm({ ...form, price: target.value });
              }
            }}
          />
          <Button
            text="Create"
            onClick={() => createToken()}
            disabled={
              !(form.name && form.description && form.price && form.imageUri)
            }
          />
        </form>
      </div>
    </>
  );
};

export default CreateToken;
