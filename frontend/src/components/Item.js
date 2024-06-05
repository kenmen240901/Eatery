import React, { useState, useEffect } from 'react';
import noImage from '../assets/noImage.png';

const Item = ({ item, addToCart, setCartItems }) => {
  const [quantity, setQuantity] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(cartItem => cartItem._id === item._id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
      setIsAddedToCart(true);
    }
  }, [item]);

  const handleAddToCart = () => {
    addToCart(item);
    setQuantity(1);
    setIsAddedToCart(true);
  };

  const handleIncrement = () => {
    if (item.stock - quantity > 0) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateCartQuantity(item, newQuantity);
    }
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCartQuantity(item, newQuantity);
    } else {
      setQuantity(0);
      setIsAddedToCart(false);
      removeFromCart(item);
    }
  };

  const updateCartQuantity = (item, quantity) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(cartItem => cartItem._id === item._id);

    if (itemIndex !== -1) {
      cart[itemIndex].quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      setCartItems(cart);
    }
  };

  const removeFromCart = (item) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(cartItem => cartItem._id !== item._id);
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartItems(cart);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={item.image || noImage}
        alt={item.name}
        className="h-40 w-full object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = noImage; }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">{item.description}</p>
        <p className="text-gray-800 font-bold">Price: ${item.price}</p>
        <p className={item.available && item.stock > 0 ? 'text-green-600' : 'text-red-600'}>
          {item.stock > 0 ? (item.stock > 10 ? 'Available' : `Hurry! Only ${item.stock} left in stock`) : 'Not Available'}
        </p>
        {!isAddedToCart ? (
          <button
            onClick={handleAddToCart}
            disabled={!item.available || item.stock === 0}
            className={`mt-2 py-1 px-4 ${
              !item.available || item.stock === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-dark text-white'
            }`}
          >
            {item.available && item.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        ) : (
          <div className="flex items-center">
            <button
              onClick={handleDecrement}
              className="bg-gray-200 text-gray-600 px-2 py-1 rounded-l"
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-10 text-center bg-gray-100"
            />
            <button
              onClick={handleIncrement}
              className="bg-gray-200 text-gray-600 px-2 py-1 rounded-r"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;
