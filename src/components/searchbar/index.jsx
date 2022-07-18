import { useState } from 'react';
import styles from './searchBar.module.css';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmit }) => {
  const [serchQuery, setSerchQuery] = useState('');

  const handleInputChange = e => {
    setSerchQuery(e.target.value.toLowerCase());
  };
  const handleSubmitForm = e => {
    if (serchQuery.trim() === '') {
      alert('please enter');
      return;
    }
    e.preventDefault();
    onSubmit(serchQuery);
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSubmitForm}>
        <button type="submit" className={styles.searchForm_button}>
          <ImSearch />
        </button>

        <input
          className={styles.searchForm_input}
          type="text"
          value={serchQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default SearchBar;
