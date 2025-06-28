import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ZoomIn, ZoomOut, Loader2, ExternalLink } from 'lucide-react';

const API_KEY = 'AIzaSyCNk9tzPuYdptGt0xXWiY5DB1ti1u58vmk';
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

const Reader = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1.0);

  const fetchBook = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/${bookId}?key=${API_KEY}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error?.message || 'Failed to fetch book');
      }
      
      setBook(data);
    } catch (err) {
      console.error('Error fetching book:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2.0));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleBack = () => {
    navigate('/library');
  };

  const handleRetry = () => {
    setError(null);
    fetchBook();
  };

  useEffect(() => {
    fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading book...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center p-8 bg-white/10 rounded-2xl backdrop-blur-md">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              Retry
            </button>
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Library
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBack}
              className="text-white hover:text-purple-400 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Library
            </button>
            <div className="h-6 w-px bg-purple-500/30"></div>
            <h1 className="text-xl font-bold text-white truncate max-w-md">
              {book?.volumeInfo?.title || 'Book Reader'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-sm">
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <div className="flex flex-col items-center justify-center gap-6 p-8">
              <img
                src={book?.volumeInfo?.imageLinks?.thumbnail || book?.volumeInfo?.imageLinks?.smallThumbnail}
                alt={book?.volumeInfo?.title}
                className="w-48 h-auto rounded-lg shadow-2xl"
              />
              <h2 className="text-2xl font-bold text-center">{book?.volumeInfo?.title}</h2>
              <p className="text-purple-300 text-center">by {book?.volumeInfo?.authors?.join(', ')}</p>
              <a
                href={`https://books.google.com/books?id=${bookId}&lpg=PP1&pg=PP1`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                Open Book Preview
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reader;
