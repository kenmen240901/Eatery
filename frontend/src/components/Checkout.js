import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [gst, setGst] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);

    const totalAmount = storedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let calculatedDiscount = 0;
    if (totalAmount > 100) {
      calculatedDiscount = totalAmount * 0.15;
    } else if (totalAmount > 50) {
      calculatedDiscount = totalAmount * 0.10;
    }
    const calculatedGst = totalAmount * 0.05;
    const finalAmount = totalAmount - calculatedDiscount + calculatedGst;

    setSubtotal(totalAmount);
    setDiscount(calculatedDiscount);
    setGst(calculatedGst);
    setFinalTotal(finalAmount);
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('token');
    
      const orderItems = cart.map(item => ({
        itemId: item._id,
        itemName: item.name,
        quantity: item.quantity
      }));
  
      const updateQuantityRequest = await axios.post('http://localhost:5000/api/orders/updateItemQuantity', {
        items: orderItems 
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (updateQuantityRequest.status === 200) {
        const response = await axios.post('http://localhost:5000/api/orders/add', {
          items: orderItems,
          total: finalTotal
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.status === 201) {
          toast.success('Order placed successfully!');
          localStorage.removeItem('cart');
          navigate('/thankYou');
        } else {
          toast.error('Failed to place order. Please try again.');
        }
      } else {
        toast.error('Failed to update item quantity. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error placing order. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Checkout</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <p className="font-semibold">Item</p>
          <p className="font-semibold">Quantity</p>
          <p className="font-semibold text-right">Subtotal</p>
          {cart.map((item, index) => (
            <React.Fragment key={index}>
              <p>{item.name}</p>
              <p>{item.quantity}</p>
              <p className="text-right">${(item.price * item.quantity).toFixed(2)}</p>
            </React.Fragment>
          ))}
        </div>
        <hr className="mb-4" />
        <div className="flex justify-between mb-2">
          <p>Subtotal:</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Discount:</p>
          <p>${discount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>GST (5%):</p>
          <p>${gst.toFixed(2)}</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="font-semibold">Final Total:</p>
          <p className="font-semibold">${finalTotal.toFixed(2)}</p>
        </div>
        <button onClick={handlePlaceOrder} className="bg-primary text-white px-6 py-3 rounded-md shadow-md hover:bg-primary-dark transition duration-300 mt-4">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
