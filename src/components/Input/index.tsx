import React from 'react';
import { useRef } from 'react';
import { AiFillPicture } from 'react-icons/ai';
import styles from './Input.module.scss';

const Input: React.FC<{
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (target: HTMLInputElement) => void;
  type?: 'file' | 'text';
}> = ({ label, placeholder, value, onChange, type = 'text' }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const renderFileInput = () => {
    return (
      <div
        className={styles.imageContainer}
        onClick={() => inputFileRef.current?.click()}
      >
        <input
          ref={inputFileRef}
          type="file"
          tabIndex={-1}
          style={{ display: 'none' }}
          onChange={(e) => {
            e.preventDefault();
            onChange(e.target);
          }}
        />
        {value ? (
          <div className={styles.image}>
            <img alt="upload" src={value} />
            <button>Change image</button>
          </div>
        ) : (
          <AiFillPicture size={70} />
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}
      {type === 'text' ? (
        <input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target)}
        />
      ) : type === 'file' ? (
        renderFileInput()
      ) : (
        <></>
      )}
    </div>
  );
};

export default Input;
