import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  function handleInput(e) {
    const { value } = e.currentTarget;
    setQuery(value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (query.trim() === '') {
      toast('Enter some word!');
      return;
    }
    onSubmit(query);
    setQuery('');
  }

  return (
    <header className={s.searchBar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.btn}>
          <span className={s.btnLabel}>Search</span>
        </button>
        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          required
          placeholder="Search images and photos"
          value={query}
          onChange={handleInput}
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
