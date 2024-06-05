import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import ProfileButton from './ProfileButton';
import { AuthContext } from '../App';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-primary p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Eatery Logo" className="h-20 w-auto mr-8" />
        </Link>
      </div>
      <div className="flex items-center">
        {user ? <ProfileButton /> : <Link to="/login" className="text-white">Login</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
