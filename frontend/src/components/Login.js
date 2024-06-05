import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../assets/homebg.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../App';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      if (response.data && response.data.token) {
        login(response.data);
        const { token } = response.data;
        localStorage.setItem('token', token);
        setEmail('');
        setPassword('');
        navigate('/inventory');
      } else {
        toast.error('Failed to Login');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Failed to Login');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="absolute inset-0 bg-black opacity-50" style={{ backdropFilter: 'blur(5px)' }}></div>
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              <FontAwesomeIcon icon={faLock} className="mr-2" /> Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
              required
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-primary hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center mt-4">
          Don't have an account? <a href="/register" className="text-blue-500">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;