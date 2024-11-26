import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/editor">New Note</Link>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout; 