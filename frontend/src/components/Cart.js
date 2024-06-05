import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem'; 

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveItem = (itemToRemove) => {
    const updatedCart = cart.filter(item => item._id !== itemToRemove._id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  

  const handleCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Your Cart</h2>
      <div className="bg-white rounded-lg shadow-md px-10 py-10">
        {cart.length === 0 ? (
          <p className="p-4">Your cart is empty</p>
        ) : (
          <div>
            {cart.map((item) => (
              <CartItem key={item._id} item={item} removeFromCart={handleRemoveItem} />
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <div className="p-4">
            <button onClick={handleCheckout} className="bg-primary text-white px-6 py-3 rounded-md shadow-md hover:bg-primary-dark transition duration-300">
              Pay and Proceed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
