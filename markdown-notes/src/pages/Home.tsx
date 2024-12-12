import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiEdit3, FiCloud, FiCode, FiUsers, FiBook } from 'react-icons/fi';
import { BiPalette, BiLock, BiMobile, BiRocket } from 'react-icons/bi';
import { BsMarkdown, BsQuestionCircle } from 'react-icons/bs';
import { RiStarSFill } from 'react-icons/ri';
import ParticlesBackground from '../components/ParticlesBackground';
import './Home.css';

const Home = () => {
  const [demoMarkdown, setDemoMarkdown] = useState('# Hello Markdown\n\nStart writing **beautiful** notes _instantly_.');
  
  return (
    <div className="home-container">
      <ParticlesBackground />

      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="floating-elements">
          <motion.div 
            className="floating-icon markdown"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <BsMarkdown />
          </motion.div>
          <motion.div 
            className="floating-icon code"
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FiCode />
          </motion.div>
          <motion.div 
            className="floating-icon cloud"
            animate={{ 
              y: [-10, 10, -10],
              x: [-10, 10, -10]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FiCloud />
          </motion.div>
        </div>

        <motion.div className="hero-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <FiEdit3 className="icon-main" />
        </motion.div>

        <div className="hero-background">
          <div className="grid-overlay"></div>
        </div>

        <div className="wave-container">
          <div className="wave"></div>
          <div className="wave wave2"></div>
        </div>

        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Markdown Notes
          <motion.span 
            className="title-decoration"
            animate={{ 
              rotate: [0, 10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <RiStarSFill />
          </motion.span>
        </motion.h1>
        <motion.div className="typing-container">
          <span className="typed-text">Write Elegantly, </span>
          <span className="typing-cursor">Note Effortlessly</span>
        </motion.div>
        
        <motion.div 
          className="cta-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link to="/register" className="primary-button">
            <motion.div
              className="button-content"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started</span>
              <motion.div 
                className="button-icon"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.div>
          </Link>
          <Link to="/login" className="secondary-button">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Sign In</span>
            </motion.div>
          </Link>
        </motion.div>

        <motion.div 
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>Scroll to explore</span>
          <div className="scroll-arrow">↓</div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="demo-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <h2>Try It Now</h2>
        <div className="demo-container">
          <div className="demo-editor">
            <div className="demo-header">
              <div className="demo-dot"></div>
              <div className="demo-dot"></div>
              <div className="demo-dot"></div>
            </div>
            <pre>{demoMarkdown}</pre>
          </div>
          <div className="demo-preview">
            <div className="demo-header">
              <span>Preview</span>
            </div>
            <div className="preview-content">
              <h1>Hello Markdown</h1>
              <p>Start writing <strong>beautiful</strong> notes <em>instantly</em>.</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="features-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
          <div className="icon-wrapper">
            <BsMarkdown />
          </div>
          <h3>Markdown Support</h3>
          <p>Full Markdown syntax support for efficient writing</p>
        </motion.div>
        <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
          <div className="icon-wrapper">
            <FiCloud />
          </div>
          <h3>Cloud Sync</h3>
          <p>Access your notes anywhere, anytime</p>
        </motion.div>
        <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
          <div className="icon-wrapper">
            <BiPalette />
          </div>
          <h3>Custom Themes</h3>
          <p>Personalize your writing environment</p>
        </motion.div>
      </motion.div>

      <motion.div 
        className="additional-features"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
          <div className="icon-wrapper">
            <BiLock />
          </div>
          <h3>Secure Storage</h3>
          <p>Your notes are encrypted and protected</p>
        </motion.div>
        <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
          <div className="icon-wrapper">
            <BiMobile />
          </div>
          <h3>Responsive Design</h3>
          <p>Perfect experience on any device</p>
        </motion.div>
        <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
          <div className="icon-wrapper">
            <FiCode />
          </div>
          <h3>Code Highlighting</h3>
          <p>Beautiful syntax highlighting for code blocks</p>
        </motion.div>
      </motion.div>

      <motion.div 
        className="steps-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <h2>Get Started in 3 Simple Steps</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <BiRocket className="step-icon" />
            <h3>Create Account</h3>
            <p>Sign up in seconds, no credit card required</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <FiEdit3 className="step-icon" />
            <h3>Start Writing</h3>
            <p>Use our intuitive Markdown editor</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <FiBook className="step-icon" />
            <h3>Organize Notes</h3>
            <p>Keep your thoughts structured and accessible</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="stats-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <div className="stat-card">
          <FiUsers className="stat-icon" />
          <div className="stat-number">10,000+</div>
          <div className="stat-label">Active Users</div>
        </div>
        <div className="stat-card">
          <FiEdit3 className="stat-icon" />
          <div className="stat-number">1M+</div>
          <div className="stat-label">Notes Created</div>
        </div>
        <div className="stat-card">
          <BiRocket className="stat-icon" />
          <div className="stat-number">99.9%</div>
          <div className="stat-label">Uptime</div>
        </div>
      </motion.div>

      <motion.div 
        className="faq-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>What is Markdown?</h3>
            <p>Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.</p>
          </div>
          <div className="faq-item">
            <h3>Is it free to use?</h3>
            <p>Yes! Our basic plan is completely free and includes all essential features.</p>
          </div>
          <div className="faq-item">
            <h3>Can I access my notes offline?</h3>
            <p>Yes, our progressive web app allows you to access and edit your notes even without internet connection.</p>
          </div>
          <div className="faq-item">
            <h3>How secure are my notes?</h3>
            <p>We use industry-standard encryption to ensure your notes are completely private and secure.</p>
          </div>
        </div>
      </motion.div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Product</h3>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/roadmap">Roadmap</Link>
          </div>
          <div className="footer-section">
            <h3>Resources</h3>
            <Link to="/docs">Documentation</Link>
            <Link to="/guides">Guides</Link>
            <Link to="/blog">Blog</Link>
          </div>
          <div className="footer-section">
            <h3>Company</h3>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy</Link>
          </div>
          <div className="footer-section">
            <h3>Connect</h3>
            <div className="social-links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Markdown Notes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
