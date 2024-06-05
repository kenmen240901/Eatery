import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between">
        <div className="footer-links">
          <Link to="/about" className="mr-4 text-secondary">About Us</Link>
          <Link to="/contact" className="mr-4 text-secondary">Contact Us</Link>
        </div>
        <div className="footer-copy text-secondary">
          <p>&copy; {new Date().getFullYear()} Eatery. All rights reserved.</p>
        </div>
      </div>
    </div>
    </footer>
  );
};

export default Footer;