import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Empty, message, Spin } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { noteService } from '../../services/api';
import ParticlesBackground from '../../components/ParticlesBackground';
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

const Home = () => {
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

export default Home; 