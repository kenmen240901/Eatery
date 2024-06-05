import React from 'react';

const CartItem = ({ item, removeFromCart }) => {
    return (
      <div className="flex items-center justify-between border-b border-gray-200 py-2">
        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-gray-600">Price: ${item.price}</p>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
        </div>
        <button onClick={() => removeFromCart(item)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
      </div>
    );
  };
  
  export default CartItem;
  