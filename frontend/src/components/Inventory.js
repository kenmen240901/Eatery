import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import Item from './Item';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (searchTerm) => {
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setItems(filteredItems);
  };

  const addToCart = (item) => {
    const itemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);
  
    if (itemIndex !== -1) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };
  
  

  const filteredItems = category === 'All' ? items : items.filter(item => item.category === category);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className="container mx-auto py-4">
      {loading ? (
        <Spinner loading={loading} />
      ) : items.length > 0 ? (
        <>
          <div className="category-filter mb-4 flex justify-between items-center">
            <div>
              <label htmlFor="category" className="mr-2">Filter by category: </label>
              <select
                id="category"
                value={category}
                onChange={handleCategoryChange}
                className="px-4 py-2 rounded border border-gray-300 shadow-sm bg-white text-gray-700"
              >
                <option value="All">All</option>
                <option value="Fruit">Fruit</option>
                <option value="Vegetable">Vegetable</option>
                <option value="Meats">Meats</option>
                <option value="Breads">Breads</option>
              </select>
            </div>
            <SearchBar onSearch={handleSearch} />
            <Link to="/cart" className="bg-primary text-white px-4 py-2 rounded">Go to Cart</Link>
          </div>

          <div className="items-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {currentItems.map(item => (
              <div key={item._id}>
                <Item item={item} addToCart={addToCart} setCartItems={setCartItems} />
              </div>
            ))}
          </div>
          <div className="pagination mt-4 flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 mx-1 rounded ${
                  currentPage === index + 1 ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>No items available.</p>
      )}
    </div>
  );
};

export default Inventory;