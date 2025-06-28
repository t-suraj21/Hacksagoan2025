import React, { useState, useEffect } from 'react';
import { Book, Plus, Trash2, Edit2, Save, ArrowLeft, Calendar, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, refreshAccessToken } from '../utils/auth';

const Notebook = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = getAccessToken();
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5001/api/notes', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        // Token expired, try to refresh
        const newToken = await refreshAccessToken();
        // Retry the request with new token
        const retryResponse = await fetch('http://localhost:5001/api/notes', {
          headers: {
            'Authorization': `Bearer ${newToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!retryResponse.ok) {
          throw new Error('Failed to fetch notes');
        }

        const data = await retryResponse.json();
        setNotes(data);
      } else if (!response.ok) {
        throw new Error('Failed to fetch notes');
      } else {
        const data = await response.json();
        setNotes(data);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError(err.message);
      setLoading(false);
      if (err.message === 'Failed to fetch notes') {
        navigate('/login');
      }
    }
  };

  const navigateToHome = () => {
    navigate('/home');
  };

  const handleAddNote = () => {
    setIsAddingNote(true);
    setNewNote({ title: '', content: '' });
  };

  const handleSaveNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    try {
      const token = getAccessToken();
      const response = await fetch('http://localhost:5001/api/notes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
      });

      if (response.status === 401) {
        // Token expired, try to refresh
        const newToken = await refreshAccessToken();
        // Retry the request with new token
        const retryResponse = await fetch('http://localhost:5001/api/notes', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${newToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newNote)
        });

        if (!retryResponse.ok) {
          throw new Error('Failed to save note');
        }

        const data = await retryResponse.json();
        setNotes([data, ...notes]);
      } else if (!response.ok) {
        throw new Error('Failed to save note');
      } else {
        const data = await response.json();
        setNotes([data, ...notes]);
      }

      setIsAddingNote(false);
      setNewNote({ title: '', content: '' });
    } catch (err) {
      console.error('Error saving note:', err);
      setError(err.message);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const token = getAccessToken();
      const response = await fetch(`http://localhost:5001/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        // Token expired, try to refresh
        const newToken = await refreshAccessToken();
        // Retry the request with new token
        const retryResponse = await fetch(`http://localhost:5001/api/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${newToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!retryResponse.ok) {
          throw new Error('Failed to delete note');
        }

        setNotes(notes.filter(note => note._id !== noteId));
      } else if (!response.ok) {
        throw new Error('Failed to delete note');
      } else {
        setNotes(notes.filter(note => note._id !== noteId));
      }
    } catch (err) {
      console.error('Error deleting note:', err);
      setError(err.message);
    }
  };

  const handleEditNote = (note) => {
    setEditingNoteId(note._id);
    setNewNote({ title: note.title, content: note.content });
  };

  const handleUpdateNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    try {
      const token = getAccessToken();
      const response = await fetch(`http://localhost:5001/api/notes/${editingNoteId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
      });

      if (response.status === 401) {
        // Token expired, try to refresh
        const newToken = await refreshAccessToken();
        // Retry the request with new token
        const retryResponse = await fetch(`http://localhost:5001/api/notes/${editingNoteId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${newToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newNote)
        });

        if (!retryResponse.ok) {
          throw new Error('Failed to update note');
        }

        const updatedNote = await retryResponse.json();
        setNotes(notes.map(note => note._id === editingNoteId ? updatedNote : note));
      } else if (!response.ok) {
        throw new Error('Failed to update note');
      } else {
        const updatedNote = await response.json();
        setNotes(notes.map(note => note._id === editingNoteId ? updatedNote : note));
      }

      setEditingNoteId(null);
      setNewNote({ title: '', content: '' });
    } catch (err) {
      console.error('Error updating note:', err);
      setError(err.message);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50 shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button 
                onClick={navigateToHome}
                className="group text-white/80 hover:text-white transition-all duration-300 flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/5"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium">Back to Home</span>
              </button>
              
              <div className="flex items-center gap-2 text-white/60">
                <Book className="w-6 h-6 text-purple-400" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  My Notebook
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-300"
                />
              </div>

              <button
                onClick={handleAddNote}
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-medium">New Note</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-400/30 text-red-300 p-4 rounded-2xl mb-8 backdrop-blur-sm animate-slide-down">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                {error}
              </div>
            </div>
          )}

          {/* Mobile Search */}
          <div className="md:hidden mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          {/* Add/Edit Note Form */}
          {(isAddingNote || editingNoteId) && (
            <div className="bg-white/5 rounded-3xl p-8 mb-8 border border-white/10 backdrop-blur-xl shadow-2xl animate-slide-down">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  {editingNoteId ? <Edit2 className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white" />}
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {editingNoteId ? 'Edit Note' : 'Create New Note'}
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-medium text-white/70 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Give your note a catchy title..."
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-300 group-hover:bg-white/10"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-white/70 mb-2">Content</label>
                  <textarea
                    placeholder="Start writing your thoughts..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    rows="8"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-300 resize-none group-hover:bg-white/10"
                  />
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    onClick={() => {
                      setIsAddingNote(false);
                      setEditingNoteId(null);
                      setNewNote({ title: '', content: '' });
                    }}
                    className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-xl transition-all duration-300 font-medium hover:scale-105 transform"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingNoteId ? handleUpdateNote : handleSaveNote}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 flex items-center gap-2 font-medium shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform"
                  >
                    <Save className="w-5 h-5" />
                    {editingNoteId ? 'Update Note' : 'Save Note'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notes Grid */}
          {filteredNotes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredNotes.map((note, index) => (
                <div
                  key={note._id}
                  className="group bg-white/5 hover:bg-white/10 rounded-2xl p-6 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 transform animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                      {note.title || 'Untitled'}
                    </h3>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleEditNote(note)}
                        className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-all duration-300"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note._id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-4">
                    {note.content || 'No content yet...'}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/5 pt-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(note.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredNotes.length === 0 && !isAddingNote && (
            <div className="text-center py-20 animate-fade-in">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Book className="w-12 h-12 text-purple-400" />
                </div>
                <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full mx-auto animate-ping"></div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">
                {searchTerm ? 'No matching notes found' : 'Your notebook is empty'}
              </h3>
              <p className="text-white/60 mb-8 max-w-md mx-auto leading-relaxed">
                {searchTerm 
                  ? `Try searching for something else or create a new note with "${searchTerm}"`
                  : 'Start capturing your thoughts, ideas, and inspirations. Your first note is just a click away!'
                }
              </p>
              
              {!searchTerm && (
                <button
                  onClick={handleAddNote}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform font-medium"
                >
                  <Plus className="w-6 h-6" />
                  Create Your First Note
                </button>
              )}
            </div>
          )}

          {/* Stats Footer */}
          {notes.length > 0 && (
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-6 bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {notes.length}
                  </div>
                  <div className="text-xs text-white/60">Total Notes</div>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    {filteredNotes.length}
                  </div>
                  <div className="text-xs text-white/60">Showing</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Notebook;