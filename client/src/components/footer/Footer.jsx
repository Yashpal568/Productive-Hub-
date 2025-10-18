import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container text-center">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Productivity Hub.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
