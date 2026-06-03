import React from 'react';
import { useEffect, useState } from 'react';


const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await fetch(`${apiBase}/notes`);
    const data = await response.json();
    // When the backend responds with note data, React updates the notes state
    // and the UI re-renders to show the latest sticky notes.
    setNotes(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const noteData = { title, content };

    if (editingId) {
      const response = await fetch(`${apiBase}/notes/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
      });
      const updatedNote = await response.json();
      // After the backend updates the note, React replaces the old note object
      // in the notes array and re-renders the cards with the edited text.
      setNotes(notes.map((note) => (note._id === updatedNote._id ? updatedNote : note)));
      setEditingId(null);
    } else {
      const response = await fetch(`${apiBase}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
      });
      const newNote = await response.json();
      // When a new note is created, add it to the front of the notes array
      // so the most recent sticky note appears first on the dashboard.
      setNotes([newNote, ...notes]);
    }

    setTitle('');
    setContent('');
  };

  const startEdit = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  const deleteNote = async (id) => {
    await fetch(`${apiBase}/notes/${id}`, { method: 'DELETE' });
    // After the backend confirms deletion, React removes the note from state
    // and the matching sticky note disappears from the grid.
    setNotes(notes.filter((note) => note._id !== id));
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #f2e86d 0%, #ffd54f 100%)',
    fontFamily: 'Arial, sans-serif',
    padding: '24px',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '24px',
    color: '#333',
  };

  const formStyle = {
    maxWidth: '680px',
    margin: '0 auto 32px auto',
    padding: '24px',
    borderRadius: '18px',
    background: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    marginBottom: '16px',
    borderRadius: '12px',
    border: '1px solid #ddd',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '12px',
    border: 'none',
    background: '#ffb300',
    color: '#1a1a1a',
    fontWeight: '700',
    cursor: 'pointer',
  };

  const gridStyle = {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  };

  const noteStyle = {
    minHeight: '170px',
    padding: '18px',
    borderRadius: '20px',
    background: 'radial-gradient(circle at top left, #fff67a, #ffd54f)',
    boxShadow: '0 18px 45px rgba(0,0,0,0.14)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const noteHeaderStyle = {
    marginBottom: '12px',
    fontSize: '18px',
    fontWeight: '700',
    color: '#4a342e',
  };

  const noteContentStyle = {
    flexGrow: 1,
    fontSize: '15px',
    lineHeight: '1.5',
    color: '#4f3a2f',
    whiteSpace: 'pre-wrap',
  };

  const noteFooterStyle = {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  };

  const actionButton = {
    padding: '8px 10px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '700',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1>Sticky Notes Dashboard</h1>
        <p>Create, edit, and remove notes with a bright sticky note layout.</p>
      </header>

      <section style={formStyle}>
        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            required
          />
          <textarea
            style={{ ...inputStyle, minHeight: '110px', resize: 'vertical' }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note content"
            required
          />
          <button style={buttonStyle} type="submit">
            {editingId ? 'Update Note' : 'Create Sticky Note'}
          </button>
        </form>
      </section>

      <div style={gridStyle}>
        {notes.map((note) => (
          <article key={note._id} style={noteStyle}>
            <div>
              <h2 style={noteHeaderStyle}>{note.title}</h2>
              <p style={noteContentStyle}>{note.content}</p>
            </div>
            <div style={noteFooterStyle}>
              <button
                style={{ ...actionButton, background: '#5c6bc0', color: '#fff' }}
                onClick={() => startEdit(note)}
              >
                Edit
              </button>
              <button
                style={{ ...actionButton, background: '#ef5350', color: '#fff' }}
                onClick={() => deleteNote(note._id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default App;
