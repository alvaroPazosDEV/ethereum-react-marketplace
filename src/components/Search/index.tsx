import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import styles from './Search.module.scss';

const Search: React.FC<{
  text: string;
  onChange: (text: string) => void;
}> = ({ text, onChange }) => {
  return (
    <div className={styles.container}>
      <AiOutlineSearch size={25} />
      <input
        type={'text'}
        placeholder="Search"
        value={text}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
