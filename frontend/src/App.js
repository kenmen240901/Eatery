import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './styles.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';
import Contact from './components/Contact';
import Inventory from './components/Inventory';
import Cart from './components/Cart';
import Footer from './components/Footer';
import ThankYouPage from './components/ThankYouPage';
import OrderHistory from './components/OrderHistory';
import Checkout from './components/Checkout';
import ViewProfile from './components/ViewProfile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    toast.success('Login successful!');
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    toast.info('Logged out successfully.');
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout}}>
      <Router>
        <div className='app-container'>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thankYou" element={<ThankYouPage />} />
            <Route path="/orderHistory" element={<OrderHistory />} />
            <Route path='/viewProfile' element={<ViewProfile user={user}/>}/>
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </AuthContext.Provider>
  );
};

export default App;
