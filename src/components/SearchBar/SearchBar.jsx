import { useState } from 'react';
import css from './SearchBar.module.css';
import toast from 'react-hot-toast';

export default function SearchBar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputValue.trim();
    if (!value) {
      toast.error('Start your search. Your query is empty!');
      return;
    }
    onSubmit(value);
    setInputValue(''); // Clear the input after submit
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
        <button className={css.submitBtn} type="submit">Search</button>
      </form>
    </header>
  );
}
