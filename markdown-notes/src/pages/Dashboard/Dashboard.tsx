import React, { useEffect, useState } from 'react';
import { noteService } from '../../services/api';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import MDEditor from '@uiw/react-md-editor';

interface Note {
    note_id: string;
    title: string;
    type: string;
    tags: string[] | null;
    content?: string;
    note?: string;
    created_at: string;
    updated_at: string;
    version: number;
}

const Dashboard: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await noteService.getNotes(1, 10);
            if (response.status === 0 && response.data.notes) {
                setNotes(response.data.notes);
            }
        } catch (error) {
            console.error('Failed to fetch notes:', error);
        }
    };

    const handleCreateNote = async () => {
        try {
            const newNote = {
                title: "New Note",
                type: "markdown",
                tags: [],
                content: "# New Note\nStart writing..."
            };
            await noteService.createNote(newNote);
            fetchNotes();
        } catch (error) {
            console.error('Failed to create note:', error);
        }
    };

    const handleNoteClick = async (note: Note) => {
        try {
            const response = await noteService.getNote(note.note_id);
            if (response.status === 0) {
                setSelectedNote({
                    ...note,
                    content: response.data.note
                });
            }
        } catch (error) {
            console.error('Failed to fetch note details:', error);
        }
    };

    const handleEditClick = (noteId: string) => {
        navigate(`/editor/${noteId}`);
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="sidebar-header">
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleCreateNote}
                    >
                        New Note
                    </Button>
                </div>
                <div className="notes-list">
                    {notes.map((note) => (
                        <div
                            key={note.note_id}
                            className={`note-item ${selectedNote?.note_id === note.note_id ? 'selected' : ''}`}
                            onClick={() => handleNoteClick(note)}
                        >
                            <div className="note-item-content">
                                <h3>{note.title}</h3>
                                <p className="note-preview">
                                    {((note.note || note.content) ?? '').length > 50 
                                        ? ((note.note || note.content) ?? '').substring(0, 50) + '...'
                                        : (note.note || note.content) ?? ''
                                    }
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="main-content">
                {selectedNote ? (
                    <div className="note-viewer">
                        <div className="note-viewer-header">
                            <h2>{selectedNote.title}</h2>
                            <Button
                                variant="contained"
                                startIcon={<EditIcon />}
                                onClick={() => handleEditClick(selectedNote.note_id)}
                            >
                                Edit
                            </Button>
                        </div>
                        <div className="note-viewer-content">
                            <MDEditor.Markdown 
                                source={selectedNote.note || selectedNote.content}
                                style={{ 
                                    backgroundColor: 'transparent',
                                    color: 'inherit'
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="empty-state">
                        <h2>Select or create a note to start writing</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard; 