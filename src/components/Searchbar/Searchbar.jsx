import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searcheQuery: '',
  };
  handleImageGhange = event => {
    this.setState({
      searcheQuery: event.target.value.toLowerCase(),
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searcheQuery.trim() === '') {
      toast.info('Please enter your query in the search field', {
        autoClose: 1000,
        hideProgressBar: true,
        theme: 'colored',
      });
      return;
    }
    this.props.onSubmit(this.state.searcheQuery);
    this.setState({ searcheQuery: '' });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <button type="submit" className={css.button}>
            Search
          </button>
          <input
            className={css.input}
            value={this.state.searcheQuery}
            onChange={this.handleImageGhange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
