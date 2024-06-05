import React, { useContext } from 'react';
import backgroundImage from '../assets/homebg.jpg';
import { AuthContext } from '../App';
import logo from '../assets/logo.png';

const Home = () => {
  const { user } = useContext(AuthContext);

  const handleShopNow = () => {
    if (user) {
      window.location.href = '/inventory';
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <div
    className="flex justify-center items-center h-screen"
    style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
  >
    <div className="text-center text-white">
      <img src={logo} alt="Eatery Logo" className="mx-auto h-auto w-auto" />
      <h2 className="text-5xl font-bold mb-2">Welcome to Eatery</h2>
      <p className="text-lg mb-4">Explore our inventory and start shopping!</p>
      <button onClick={handleShopNow} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Shop Now
      </button>
    </div>
  </div>
  );
};

export default Home;
