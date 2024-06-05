import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Thank you for shopping!</h2>
      <div className="flex justify-center">
        <Link to="/inventory" className="bg-primary text-white px-6 py-3 rounded-md shadow-md hover:bg-primary-dark transition duration-300 mr-4">
          Continue Shopping
        </Link>
        <Link to="/orderHistory" className="bg-primary text-white px-6 py-3 rounded-md shadow-md hover:bg-primary-dark transition duration-300">
          Go to Order History
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
