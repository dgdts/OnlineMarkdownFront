import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Empty, message, Spin } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { noteService } from '../../services/api';
import ParticlesBackground from '../../components/ParticlesBackground';
import { useAuth } from '../../contexts/AuthContext';
import './Home.css';

const NoteCard = ({ note, onClick, style }) => (
  <Card
    className="note-card"
    style={style}
    onClick={onClick}
    hoverable
  >
    <div className="card-content">
      <h3 className="note-title">{note.title}</h3>
      <div className="note-meta">
        <div className="note-tags">
          {note.tags && note.tags.map(tag => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="note-info">
          <span className="note-date">
            {new Date(note.updated_at.seconds * 1000).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  </Card>
);

const LandingPage = () => (
  <div className="home-container">
    <ParticlesBackground />
    <div className="landing-container">
      <div className="landing-content">
        <header className="landing-header">
          <h1 className="glowing-text">Markdown Notes</h1>
          <p className="subtitle">Transform your thoughts into beautifully formatted notes</p>
        </header>
        
        <div className="cta-buttons">
          <Link to="/login" className="cta-button login">
            <span className="button-content">Login</span>
          </Link>
          <Link to="/register" className="cta-button register">
            <span className="button-content">Get Started</span>
          </Link>
        </div>

        <section className="features">
          <h2 className="features-title">Why Choose Us?</h2>
          <div className="feature-grid">
            <div className="feature-item">
              <div className="feature-icon">✍️</div>
              <h3>Markdown Support</h3>
              <p>Write your notes in Markdown format for rich text formatting</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">☁️</div>
              <h3>Cloud Sync</h3>
              <p>Access your notes from anywhere, anytime</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h3>Secure</h3>
              <p>Your notes are encrypted and secure</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🚀</div>
              <h3>Easy to Use</h3>
              <p>Simple and intuitive interface</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadNotes();
  }, [currentPage]);

  const loadNotes = async () => {
    try {
      const response = await noteService.getNotes(currentPage, 10);
      setNotes(response.data.notes || []);
    } catch (error) {
      message.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchText.toLowerCase()) ||
    (note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase())))
  );

  return (
    <div className="home-container">
      <ParticlesBackground />
      
      <div className="hero-section loaded">
        <div className="hero-content">
          <h1 className="glowing-text">Digital Notebook</h1>
          <p className="hero-subtitle">Capture your thoughts in style</p>
          <Button 
            type="primary" 
            size="large"
            icon={<PlusOutlined />}
            onClick={() => navigate('/editor')}
            className="create-button"
          >
            Create New Note
          </Button>
        </div>
      </div>

      <div className="content-section">
        <div className="search-section">
          <Input
            prefix={<SearchOutlined className="search-icon" />}
            placeholder="Search notes..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
            allowClear
          />
        </div>

        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        ) : filteredNotes.length > 0 ? (
          <div className="notes-grid">
            {filteredNotes.map((note, index) => (
              <NoteCard
                key={note.note_id}
                note={note}
                onClick={() => navigate(`/editor/${note.note_id}`)}
                style={{
                  '--delay': `${index * 0.1}s`,
                  '--color': note.color || '#6c5ce7'
                }}
              />
            ))}
          </div>
        ) : (
          <Empty
            description={
              <span className="empty-text">
                {searchText ? "No matching notes found" : "Start creating your first note"}
              </span>
            }
            className="empty-state"
          />
        )}
      </div>
    </div>
  );
};

const Home = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Dashboard /> : <LandingPage />;
};

export default Home; 