import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search by item name"
        className="px-4 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:border-primary flex-grow"
      />
      {searchTerm && (
        <button type="button" onClick={handleClear} className="ml-2 text-gray-600 focus:outline-none">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
      <button type="submit" className="ml-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark focus:outline-none focus:bg-primary-dark">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
