import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="home-container">
        {/* Authenticated user content */}
        <h1>Welcome to Your Notes</h1>
        <div className="notes-dashboard">
          {/* Notes dashboard content will be added later */}
        </div>
      </div>
    );
  }

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Markdown Notes</h1>
        <p className="subtitle">A simple and powerful note-taking app</p>
      </header>
      
      <div className="cta-buttons">
        <Link to="/login" className="cta-button login">Login</Link>
        <Link to="/register" className="cta-button register">Sign Up</Link>
      </div>

      <section className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <h3>Markdown Support</h3>
            <p>Write your notes in Markdown format for rich text formatting</p>
          </div>
          <div className="feature-item">
            <h3>Cloud Sync</h3>
            <p>Access your notes from anywhere, anytime</p>
          </div>
          <div className="feature-item">
            <h3>Secure</h3>
            <p>Your notes are encrypted and secure</p>
          </div>
          <div className="feature-item">
            <h3>Easy to Use</h3>
            <p>Simple and intuitive interface</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
