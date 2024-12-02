import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, message, Space, Select, Spin } from 'antd';
import MDEditor from '@uiw/react-md-editor';
import { noteService } from '../../services/api';
import './Editor.css';

const { Option } = Select;

const EditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [version, setVersion] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadNote();
    }
  }, [id]);

  const loadNote = async () => {
    try {
      setLoading(true);
      const response = await noteService.getNoteMeta(id);
      if (response.data) {
        const meta = response.data;
        setTitle(meta.title || '');
        setTags(meta.tags || []);
        setVersion(meta.version || 0);
      }

      const contentResponse = await noteService.getNote(id);
      if (contentResponse.data) {
        setContent(contentResponse.data.note || '');
      }
    } catch (error) {
      message.error('Failed to load note');
      console.error('Error loading note:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      message.error('Please enter a title');
      return;
    }

    try {
      const saveData = {
        title,
        content,
        tags: tags || []
      };

      if (id) {
        if (version === null) {
          throw new Error('Version information is missing');
        }
        
        const response = await noteService.updateNote({
          id,
          version,
          ...saveData
        });

        if (response.data && response.data.version) {
          setVersion(response.data.version);
        }
      } else {
        const response = await noteService.createNote(saveData);
        if (response.data && response.data.note_id) {
          navigate(`/editor/${response.data.note_id}`, { replace: true });
        }
      }
      message.success('Note saved successfully');
    } catch (error) {
      if (error.message.includes('version conflict')) {
        message.error('This note has been modified by someone else. Please refresh and try again.');
        await loadNote();
      } else {
        message.error('Failed to save note');
      }
    }
  };

  if (loading) {
    return (
      <div className="editor-page">
        <div className="editor-loading">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="editor-page">
      <div className="editor-container">
        <div className="editor-header">
          <Space size="middle" style={{ width: '100%' }}>
            <Input
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: 300 }}
              size="large"
            />
            <Select
              mode="tags"
              style={{ width: 400 }}
              placeholder="Add tags"
              value={tags}
              onChange={setTags}
              size="large"
              maxTagCount="responsive"
              allowClear
            />
            <Button
              type="primary"
              onClick={handleSave}
              size="large"
            >
              Save
            </Button>
          </Space>
        </div>
        
        <MDEditor
          value={content}
          onChange={setContent}
          height={700}
          preview="live"
          className="mde-editor"
        />
      </div>
    </div>
  );
};

export default EditorPage; 