import React, { Component } from 'react';
import styles from './searchBar.module.css';
import { ImSearch } from 'react-icons/im';

class SearchBar extends Component {
  state = {
    serchQuery: '',
  };

  handleInputChange = e => {
    this.setState({ serchQuery: e.target.value.toLowerCase() });
  };
  handleSubmitForm = e => {
    if (this.state.serchQuery.trim() === '') {
      alert('please enter');
      return;
    }
    e.preventDefault();
    this.props.onSubmit(this.state.serchQuery);
    this.setState({ serchQuery: '' });
  };
  render() {
    const { serchQuery } = this.state;
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.handleSubmitForm}>
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
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
