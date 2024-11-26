import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import './Editor.css';

const EditorPage = () => {
  const [content, setContent] = React.useState("# Hello World");

  return (
    <div className="editor-container">
      <MDEditor
        value={content}
        onChange={setContent}
        height={500}
      />
    </div>
  );
};

export default EditorPage; 