import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './SearchForm.module.scss';

class SearchForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.query);

    this.resetForm();
  };

  resetForm = () => {
    this.setState({ query: '' });
  };

  render() {
    return (
      <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
        <button type="submit" className={styles.SearchForm__button}>
          <span className={styles.SearchForm__buttonLabel}>Search</span>
        </button>

        <input
          className={styles.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          name="search"
          value={this.state.query}
          placeholder="Search images and photos"
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default SearchForm;
