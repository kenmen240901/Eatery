import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found in localStorage');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Error fetching orders. Please try again.');
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600';
      case 'Delivered':
        return 'text-green-600';
      case 'Cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold">Order History</h2>
        <div>
          <button onClick={handleGoToHome} className="bg-neutral text-secondary px-4 py-2 rounded mr-4">Go to Home</button>
          <button onClick={() => navigate('/inventory')} className="bg-primary text-white px-4 py-2 rounded">Continue Shopping</button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-lg shadow-md mb-4 p-4">
              <h3 className="text-xl font-semibold mb-2">Order ID: {order.orderID}</h3>
              <ul className="list-disc pl-6 mt-2">
                {order.items.map(item => (
                  <li key={item._id}>
                    {item.quantity} x {item.itemName}
                  </li>
                ))}
              </ul>
              <p>Total: ${order.total.toFixed(2)}</p>
              <p>Date: {formatDate(order.createdAt)}</p>
              <p>Tracking ID: {order.trackingID}</p>
              <br/>
              <p className={getStatusColor(order.status)}>Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
