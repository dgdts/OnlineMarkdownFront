import React from 'react';
import { Layout, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BookOutlined, GithubOutlined } from '@ant-design/icons';
import './Navbar.css';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Header className="navbar">
      <div className="navbar-content">
        <div className="navbar-left" onClick={() => navigate('/')}>
          <BookOutlined className="logo-icon" />
          <span className="logo-text">MarkdownNotes</span>
        </div>
        
        <div className="navbar-right">
          <Space>
            <Button 
              type="text" 
              icon={<GithubOutlined />}
              onClick={() => window.open('https://github.com/yourusername/markdown-notes', '_blank')}
            >
              GitHub
            </Button>
          </Space>
        </div>
      </div>
    </Header>
  );
};

export default Navbar; 