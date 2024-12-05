import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, message, Space, Select, Spin } from 'antd';
import MDEditor from '@uiw/react-md-editor';
import { noteService, resourceService } from '../../services/api';
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
  const [dragOver, setDragOver] = useState(false);
  const editorRef = useRef(null);

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

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!dragOver) {
      setDragOver(true);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (!imageFile) {
      return;
    }

    try {
      const tokenResponse = await resourceService.getUploadToken(imageFile);
      if (tokenResponse.status === 0) {
        const uploadSuccess = await resourceService.uploadToOSS(tokenResponse.data.upload_url, imageFile);
        
        if (uploadSuccess) {
          const baseUrl = 'http://localhost:9000';
          const bucket = 'universalserver';
          const objectKey = tokenResponse.data.upload_url.split('?')[0].split(bucket + '/')[1];
          
          const imageUrl = `${baseUrl}/${bucket}/${objectKey}`;
          const imageMarkdown = `![${imageFile.name}](${imageUrl})`;

          const textArea = editorRef.current?.querySelector('textarea');
          if (textArea) {
            const { selectionStart } = textArea;
            const newContent = content.slice(0, selectionStart) + 
                              imageMarkdown + 
                              content.slice(selectionStart);
            
            // Use MDEditor's onChange to maintain undo history
            setContent(newContent);

            // Auto save
            const saveData = {
              title,
              content: newContent,
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
              message.success('Note saved successfully');
            }
          }
        }
      }
    } catch (error) {
      console.error('Upload failed:', error);
      message.error('Failed to upload image');
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
        
        <div 
          className={`editor-wrapper ${dragOver ? 'dragging' : ''}`}
          ref={editorRef}
        >
          <MDEditor
            value={content}
            onChange={setContent}
            height={700}
            preview="live"
            className="mde-editor"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPage; 