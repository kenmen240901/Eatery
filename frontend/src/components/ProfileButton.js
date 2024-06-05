import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import defaultAvatar from '../assets/defaultImg.png';

const ProfileButton = () => {
  const { user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="relative">
      <button onClick={() => setShowDropdown(!showDropdown)} className="text-white mr-8 flex items-center">
        <img src={user.avatar || defaultAvatar} alt="Profile" className="h-8 w-8 rounded-full mr-2" />
        <span className="whitespace-nowrap">{user.username}</span>
      </button>
      {showDropdown && (
        <div className="absolute bg-white rounded shadow-md mt-2 py-2 w-36">
          <Link to="/viewProfile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            View Profile
          </Link>
          <Link to="/orderHistory" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            Order History
          </Link>
          <hr />
          <button onClick={handleLogout} className="text-red-500 px-4 py-2 w-full text-left hover:bg-gray-200">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
