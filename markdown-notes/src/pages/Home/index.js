import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Empty, Typography } from 'antd';
import { PlusOutlined, SearchOutlined, FireOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ParticlesBackground from '../../components/ParticlesBackground';
import './Home.css';

const { Title } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [notes] = useState([
    {
      id: 1,
      title: 'Getting Started with Markdown',
      preview: 'Markdown is a lightweight markup language...',
      createdAt: '2024-03-20',
      tags: ['guide', 'markdown'],
      color: '#a8e6cf'
    },
    {
      id: 2,
      title: 'Project Ideas',
      preview: 'List of potential project ideas for 2024...',
      createdAt: '2024-03-21',
      tags: ['ideas', 'projects'],
      color: '#ffd3b6'
    }
  ]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="home-container">
      <ParticlesBackground />
      
      <div className={`hero-section ${isLoading ? '' : 'loaded'}`}>
        <Title level={1} className="glowing-text">
          <FireOutlined className="hero-icon" /> Digital Notebook
        </Title>
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

      <div className="content-section">
        <div className="search-bar">
          <Input
            prefix={<SearchOutlined className="search-icon" />}
            placeholder="Search your notes..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
        </div>

        {notes.length > 0 ? (
          <div className="notes-grid">
            {notes.map((note, index) => (
              <Card
                key={note.id}
                className="note-card"
                style={{
                  '--delay': `${index * 0.1}s`,
                  '--color': note.color
                }}
                onClick={() => navigate(`/editor/${note.id}`)}
              >
                <div className="card-content">
                  <h3>{note.title}</h3>
                  <p className="note-preview">{note.preview}</p>
                  <div className="note-footer">
                    <div className="note-tags">
                      {note.tags.map(tag => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="note-date">{note.createdAt}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Empty
            description="No notes yet. Start creating!"
            className="empty-state"
          />
        )}
      </div>
    </div>
  );
};

export default Home;